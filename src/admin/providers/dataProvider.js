import axiosInstance from "@/libs/auth"; // Import cái axios bạn đã cài đặt token

export const dataProvider = {
    // 1. Lấy danh sách (Sử dụng POST cho 'nguoidung')
    getList: async (resource, params) => {
        let response;

        if (resource === 'nguoidung') {
            // Theo ý bạn: Backend dùng POST để lấy danh sách
            response = await axiosInstance.post('/nguoidung', {
                // Bạn có thể truyền params nếu backend cần phân trang/tìm kiếm
                pagination: params.pagination,
                filter: params.filter
            });
        } else {
            // Các resource khác (nếu có) dùng GET chuẩn
            response = await axiosInstance.get(`/${resource}`);
        }

        // React-admin cần { data: [...], total: số_lượng }
        // Và mỗi item phải có trường "id"
        const rawData = response.data.data || response.data; // Tùy vào backend trả về object hay array trực tiếp

        return {
            data: rawData.map(item => ({
                ...item,
                id: item.nguoidung_id, // Quan trọng: chuyển _id thành id
            })),
            total: rawData.length,
        };
    },

    // 2. Lấy 1 bản ghi chi tiết (để đổ vào form Edit)
    getOne: async (resource, params) => {
        const response = await axiosInstance.get(`/${resource}/${params.id}`);
        const item = response.data.data || response.data;
        return {
            data: { ...item, id: item.nguoidung_id },
        };
    },

    // 3. Cập nhật dữ liệu
    update: async (resource, params) => {
        const response = await axiosInstance.put(`/${resource}/${params.id}`, params.data);
        return {
            data: { ...response.data, id: response.data.nguoidung_id },
        };
    },

    // 4. Xóa dữ liệu
    delete: async (resource, params) => {
        await axiosInstance.delete(`/${resource}/${params.id}`);
        return { data: params.previousData };
    }
};