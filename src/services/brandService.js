import axiosInstance from "../libs/axiosInstance";
import Brand from "../models/Brand";

export const brandService = {
    // Lấy toàn bộ danh sách thương hiệu
    getAll: async (signal) => {
        try {
            const response = await axiosInstance.get("/thuonghieu", { signal });
            const rawList = response.data?.data || (Array.isArray(response.data) ? response.data : []);

            if (Array.isArray(rawList)) {
                return rawList.map(item => new Brand(item));
            }

            return [];
        } catch (error) {
            if (axiosInstance.isCancel(error)) return [];

            console.error("❌ Brand Service Error:", error);
            return [];
        }
    },

    // Lấy chi tiết một thương hiệu theo ID
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`/thuonghieu/${id}`);
            return new Brand(response.data);
        } catch (error) {
            console.error(`Lỗi lấy thương hiệu ${id}:`, error);
            return null;
        }
    }
};