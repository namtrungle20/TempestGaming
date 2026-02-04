
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
        try {
            const response = await axiosInstance.post('/auth/dangky', userData);
            // Backend trả về success: true
            return {
                success: true,
                token: response.data.data.accessToken,
                user: response.data.data.nguoidung
            };
        } catch (error) {
            // Lấy message lỗi từ Backend trả về
            const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
            return {
                success: false,
                message: errorMessage
            };
        }
    },

        logout: async () => {
            await axiosInstance.post('/auth/logout');
        }
    };