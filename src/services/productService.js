import axiosInstance from "@/libs/axiosInstance";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const { PRODUCT } = API_ENDPOINTS;

export const productService = {
    getAll: async (params) => axiosInstance.get(PRODUCT.BASE, { params }),
    
    create: async (formData) => axiosInstance.post(PRODUCT.BASE, formData, {
        headers: { "Content-Type": undefined }
    }),
    
    update: async (id, formData) => axiosInstance.put(`${PRODUCT.BASE}/${id}`, formData, {
        headers: { "Content-Type": undefined }
    }),
    
    delete: async (id) => axiosInstance.delete(`${PRODUCT.BASE}/${id}`)
};