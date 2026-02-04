import axiosInstance from "@/libs/axiosInstance";
import { resourceMap } from "../configs/resourceConfig";
import { fileProvider } from "./fileProvider";

// 1. Helper lấy Config
const getConfig = (resource) => {
    const config = resourceMap[resource];
    if (!config) throw new Error(`Resource "${resource}" chưa được khai báo trong resourceConfig.js`);
    return config;
};

// 2. Helper Map Data (API -> Model -> React Admin)
// Quan trọng: Đảm bảo luôn có trường 'id'
const formatResponse = (resource, data) => {
    if (!data) return data;

    const conf = resourceMap[resource];
    const Model = conf?.Model;
    const idField = conf?.idField || 'id'; // Nếu không khai báo thì mặc định là 'id'

    const mapItem = (item) => {
        const instance = Model ? new Model(item) : item;

        return {
            ...instance,
            // Gán động: Lấy giá trị của trường idField và bỏ vào key 'id'
            id: instance[idField] || instance.id
        };
    };
    return Array.isArray(data) ? data.map(mapItem) : mapItem(data);
};

// 3. Helper Xử lý Write (Create/Update) chung
const writeData = async (action, resource, params) => {
    const conf = getConfig(resource);
    const method = conf.methods[action]; // POST hoặc PUT

    // Xác định URL
    let url = conf.paths?.[action] || `/${conf.endpoint}`;

    // Nếu là REST update chuẩn -> thêm ID vào URL (VD: /sanpham/1)
    // Nếu là Custom User update -> giữ nguyên URL (/nguoidung/update)
    if (action === 'update' && conf.type === 'REST') {
        url += `/${params.id}`;
    }

    let finalData = { ...params.data };

    // A. Tự động Upload ảnh (nếu có cấu hình)
    if (conf.uploadField && finalData[conf.uploadField]?.rawFile) {
        try {
            finalData[conf.uploadField] = await fileProvider.uploadImage(finalData[conf.uploadField]);
        } catch (e) {
            console.error("Upload ảnh thất bại:", e);
        }
    }

    // B. Tự động gọi toApi của Model (nếu có)
    if (conf.Model && typeof conf.Model.toApi === 'function') {
        finalData = conf.Model.toApi(finalData);
    }

    // C. Nếu là User Update, backend cần ID trong body
    if (action === 'update' && conf.endpoint === 'nguoidung') {
        finalData.id = params.id;
    }

    // Gọi API
    const response = await axiosInstance[method.toLowerCase()](url, finalData);
    return { data: formatResponse(response.data.data || response.data, conf.Model) };
};

// --- MAIN DATA PROVIDER ---
export const dataProvider = {

    // 1. GET LIST
    getList: async (resource, params) => {
        const conf = getConfig(resource);
        const method = conf.methods.list; // GET hoặc POST
        const url = conf.paths?.list || `/${conf.endpoint}`;

        let response;
        if (method === 'GET') {
            // Chuẩn REST: Gửi params trên URL
            response = await axiosInstance.get(url, {
                params: { ...params.filter, ...params.pagination }
            });
        } else {
            // Custom POST: Gửi params trong Body (Users)
            response = await axiosInstance.post(url, {
                ...params.filter,
                page: params.pagination.page,
                limit: params.pagination.perPage
            });
        }

        const rawData = response.data.data || response.data;
        return {
            data: formatResponse(Array.isArray(rawData) ? rawData : [], conf.Model),
            total: response.data.total || (Array.isArray(rawData) ? rawData.length : 0),
        };
    },

    // 2. GET ONE
    getOne: async (resource, params) => {
        const conf = getConfig(resource);
        const method = conf.methods.detail;
        const url = conf.paths?.detail || `/${conf.endpoint}/${params.id}`;

        let response;
        if (method === 'GET') {
            response = await axiosInstance.get(url);
        } else {
            // Custom POST (Users)
            response = await axiosInstance.post(url, { id: params.id });
        }

        return { data: formatResponse(response.data.data || response.data, conf.Model) };
    },

    // 3. CREATE & UPDATE (Dùng hàm chung writeData)
    create: async (resource, params) => writeData('create', resource, params),
    update: async (resource, params) => writeData('update', resource, params),

    // 4. DELETE
    delete: async (resource, params) => {
        const conf = getConfig(resource);
        const method = conf.methods.delete;
        const url = conf.paths?.delete || `/${conf.endpoint}/${params.id}`;

        // Bước 1: Xóa ảnh trên Cloud (nếu có)
        if (conf.uploadField) {
            try {
                // Lấy data cũ để biết tên ảnh
                const { data: oldData } = await dataProvider.getOne(resource, { id: params.id });
                if (oldData && oldData[conf.uploadField]) {
                    await axiosInstance.delete('/images/delete', {
                        data: { image: oldData[conf.uploadField] }
                    }).catch(() => { }); // Bỏ qua lỗi xóa ảnh nếu có
                }
            } catch (e) {
                const errorMsg = e.response?.data?.message;
                return Promise.reject(new Error(errorMsg));
            }
        }

        // Bước 2: Xóa trong DB
        if (method === 'DELETE') {
            // Chuẩn REST hoặc Custom User (User cần body {id})
            await axiosInstance.delete(url, { data: { id: params.id } });
        } else {
            // Nếu backend dùng POST để xóa
            await axiosInstance.post(url, { id: params.id });
        }

        return { data: { id: params.id } };
    },

    // 5. GET MANY (Dùng Promise.all cho an toàn với mọi loại API)
    getMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id => dataProvider.getOne(resource, { id }))
        );
        return { data: responses.map(r => r.data) };
    },

    // 6. DELETE MANY
    deleteMany: async (resource, params) => {
        await Promise.all(
            params.ids.map(id => dataProvider.delete(resource, { id }))
        );
        return { data: params.ids };
    },

    // 7. GET MANY REFERENCE
    getManyReference: async (resource, params) => {
        const { target, id } = params;
        const filter = { ...params.filter, [target]: id };
        return dataProvider.getList(resource, { ...params, filter });
    },
};