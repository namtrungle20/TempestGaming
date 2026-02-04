import axiosInstance from "@/libs/axiosInstance";
import User from "@/models/User";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const { USER } = API_ENDPOINTS;

export const userService = {
    // Lấy danh sách (POST)
    getAll: async (filters = {}) => {
        const { data } = await axiosInstance.post(USER.LIST, filters);
        const list = data.data || data || [];
        return list.map(u => new User(u));
    },

    // Cập nhật (PUT)
    update: async (userInstance) => {
        const instance = (userInstance instanceof User)
            ? userInstance
            : new User(userInstance);

        const payload = instance.toApi();
        return axiosInstance.put(USER.UPDATE, payload);
    },

    // Xóa (DELETE)
    delete: async (id) => {
        const payload = { id };
        console.log("Payload thực tế gửi lên Delete:", payload);
        return axiosInstance.delete(USER.DELETE, { data: payload });
    }
};