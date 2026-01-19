
import axiosInstance from "@/libs/axiosInstance";


export const authService = {
    login: async (loginKey, password) => {
        const payload = { password };

        if (String(loginKey).includes('@')) {
            payload.email = loginKey;
        } else {
            payload.sdt = loginKey;
        }
        const response = await axiosInstance.post('/auth/dangnhap', payload);

        return response.data;
    },

    register: async (userData) => {
        const response = await axiosInstance.post('/auth/dangky', userData);
        return response.data;
    },

    logout: async () => {
        await axiosInstance.post('/auth/logout');
    }
};