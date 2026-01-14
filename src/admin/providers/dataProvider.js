import axiosInstance from "@/libs/auth"; // Import cái axios bạn đã cài đặt token
import { adminConfig } from "../adminConfig";
import { ensureId } from "../adminUtils";

export const dataProvider = {
    getList: async (resource, params) => {
        const config = adminConfig[resource];

        // Logic: Nếu có config.list thì dùng POST, không thì mặc định dùng GET theo tên resource
        const response = config?.list
            ? await axiosInstance.post(config.list, { ...params.filter })
            : await axiosInstance.get(`/${resource}`);

        const rawData = response.data.data || response.data;
        const cleanData = ensureId(rawData);

        return {
            data: cleanData,
            total: response.data.total || cleanData.length,
        };
    },

    getOne: async (resource, params) => {
        const config = adminConfig[resource];

        const response = config?.detail
            ? await axiosInstance.post(config.detail, { id: params.id })
            : await axiosInstance.get(`/${resource}/${params.id}`);

        return { data: ensureId(response.data.data || response.data) };
    },

    update: async (resource, params) => {
        const config = adminConfig[resource];
        const url = config?.update || `/${resource}/${params.id}`;

        // Tùy theo API bạn dùng PUT hay POST để update
        const response = await axiosInstance.put(url, {
            id: params.id,
            ...params.data
        });

        return { data: ensureId(response.data.data || response.data) };
    },

    delete: async (resource, params) => {
        // 1. Lấy URL từ config: '/nguoidung/delete'
        const config = adminConfig[resource];
        const url = config?.delete || `/${resource}/delete`;

        console.log("🚀 Gọi API xóa tại:", url, "với ID:", params.id);

        try {
            // Chỉ await mà không gán vào biến 'response'
            await axiosInstance.delete(url, {
                data: { id: params.id }
            });

            // React-admin cần ID của bản ghi vừa xóa để cập nhật giao diện
            return { data: { id: params.id } };
        } catch (error) {
            // Log chi tiết lỗi từ Server (Lỗi 500, 404...)
            const errorMsg = error.response?.data?.error || error.message;
            console.error("❌ Lỗi xóa từ Server:", errorMsg);
            throw new Error(errorMsg);
        }
    },
};