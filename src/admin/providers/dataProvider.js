import axiosInstance from "@/libs/axiosInstance"; // Import cái axios bạn đã cài đặt token
import { adminConfig } from "../configs/adminConfig";
import { mapResourceData } from "../utils/adminUtils";
import { fileProvider } from "./fileProvider";
import Product from "@/models/Product";

export const dataProvider = {
    getList: async (resource, params) => {
        const config = adminConfig[resource];
        const response = config?.list
            ? await axiosInstance.post(config.list, { ...params.filter })
            : await axiosInstance.get(`/${resource}`);

        const rawData = response.data.data || response.data;
        return {
            data: mapResourceData(resource, rawData),
            total: response.data.total || (Array.isArray(rawData) ? rawData.length : 0),
        };
    },

    getOne: async (resource, params) => {
        const config = adminConfig[resource];
        const response = config?.detail
            ? await axiosInstance.post(config.detail, { id: params.id })
            : await axiosInstance.get(`/${resource}/${params.id}`);

        return { data: mapResourceData(resource, response.data.data || response.data) };
    },

    create: async (resource, params) => {
        let imageUrl = params.data.image;

        if (resource === 'sanpham') {
            imageUrl = await fileProvider.uploadImage(params.data.image);
        }

        const payload = resource === 'sanpham'
            ? Product.toApi({ ...params.data, image: imageUrl })
            : params.data;

        const response = await axiosInstance.post(`/${resource}`, payload);
        return { data: mapResourceData(resource, response.data.data) };
    },

    update: async (resource, params) => {
        let finalImageUrl = params.data.image;

        // Chỉ upload nếu người dùng chọn file mới (kiểm tra có rawFile)
        if (resource === 'sanpham' && params.data.image?.rawFile) {
            finalImageUrl = await fileProvider.uploadImage(params.data.image);
        }

        const payload = resource === 'sanpham'
            ? Product.toApi({ ...params.data, image: finalImageUrl })
            : params.data;

        const url = adminConfig[resource]?.update || `/${resource}/${params.id}`;
        const response = await axiosInstance.put(url, payload);

        return { data: mapResourceData(resource, response.data.data || response.data) };
    },

    delete: async (resource, params) => {
        const config = adminConfig[resource];
        const url = config?.delete || `/${resource}/${params.id}`;

        try {
            // Tùy chọn: Xóa ảnh trên Cloudinary trước khi xóa record
            if (resource === 'sanpham') {
                const { data: oldData } = await dataProvider.getOne(resource, { id: params.id });
                if (oldData?.image) {
                    await axiosInstance.delete('/images/delete', { data: { image: oldData.image } })
                        .catch(() => console.warn("Ảnh không tồn tại trên Cloudinary, bỏ qua."));
                }
            }

            await axiosInstance.delete(url, { data: { id: params.id } });
            return { data: { id: params.id } };
        } catch (error) {
            throw new Error(error.response?.data?.error || "Lỗi xóa dữ liệu");
        }
    },
};