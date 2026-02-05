import axiosInstance from "@/libs/axiosInstance";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const { CATEGORY } = API_ENDPOINTS;

export const categoryService = {
    // Nhận params để truyền timestamp chống cache 304
    getAll: async (params) => {
        return axiosInstance.get(CATEGORY.BASE, { params });
    },

    create: async (formData) => {
        return axiosInstance.post(CATEGORY.BASE, formData, {
            headers: { "Content-Type": undefined }
        });
    },

    update: async (id, formData) => {
        return axiosInstance.put(`${CATEGORY.BASE}/${id}`, formData, {
            headers: { "Content-Type": undefined }
        });
    },

    delete: async (id) => {
        return axiosInstance.delete(`${CATEGORY.BASE}/${id}`);
    }
};