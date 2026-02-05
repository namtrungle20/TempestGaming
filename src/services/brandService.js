import axiosInstance from "@/libs/axiosInstance";
import Brand from "@/models/Brand";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const { BRAND } = API_ENDPOINTS;

export const brandService = {
    // GET: /api/thuonghieu
    getAll: async (params) => {
        // Nhận params để Hook có thể truyền _t (timestamp) chống 304
        return axiosInstance.get(BRAND.BASE, { params });
    },

    // GET: /api/thuonghieu/:id
    getById: async (id) => {
        const { data } = await axiosInstance.get(`${BRAND.BASE}/${id}`);
        return new Brand(data.data || data);
    },

    // POST: /api/thuonghieu (Dùng FormData để gửi cả ảnh)
    create: async (formData) => {
        return axiosInstance.post(BRAND.BASE, formData, {
            headers: { "Content-Type": undefined }
        });
    },

    // PUT: /api/thuonghieu/:id (ID nằm trên URL)
    update: async (id, formData) => {
        return axiosInstance.put(`${BRAND.BASE}/${id}`, formData, {
            headers: { "Content-Type": undefined }
        });
    },

    // DELETE: /api/thuonghieu/:id (ID nằm trên URL)
    delete: async (id) => {
        return axiosInstance.delete(`${BRAND.BASE}/${id}`);
    }
};