import axiosInstance from "../libs/axiosInstance";
import { resourceMap } from '@/admin/configs/resourceConfig';

const config = resourceMap.brands;

export const brandService = {
    // Lấy toàn bộ danh sách thương hiệu
    getAll: () => axiosInstance.get(`/api/${config.endpoint}`),

    create: async (name, file) => {
        let fileName = '';
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            const uploadRes = await axiosInstance.post('/api/images/upload', formData);
            fileName = uploadRes.data.file[0].filename;
        }
        return axiosInstance.post(`/api/${config.endpoint}`, {
            ten_thuong_hieu: name,
            hinh_anh: fileName
        });
    },

    delete: (id) => axiosInstance.delete(`/api/${config.endpoint}/${id}`),
};