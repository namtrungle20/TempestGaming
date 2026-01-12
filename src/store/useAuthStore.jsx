import { create } from "zustand";
import User from "@/models/User";
import { login } from "@/libs/auth";


const getInitialUser = () => {
    const data = localStorage.getItem("nguoidung");

    // Nếu ngăn kéo trống (null) hoặc bị kẹt chữ "undefined"
    if (!data || data === "undefined") {
        return null;
    }

    try {
        // Chỉ parse khi chắc chắn data là một chuỗi JSON hợp lệ
        return new User(JSON.parse(data));
    } catch {
        console.error("Dữ liệu lưu trữ bị lỗi, đang xóa...");
        localStorage.removeItem("nguoidung");
        return null;
    }
};

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    user: getInitialUser(),
    loading: false,

    signIn: async (loginKey, password) => {
        try {
            set({ loading: true });

            // 1. Gọi login (Kết quả trả về là { success, data, message })
            const result = await login({
                email: loginKey,
                password: password
            });

            if (result.success) {
                // Dựa trên JSON bạn gửi, cấu trúc là result.data.data.nguoidung
                const userRawData = result.data.data.nguoidung;
                const token = result.data.data.accessToken;

                const cleanUser = new User(userRawData);

                localStorage.setItem("accessToken", token);
                localStorage.setItem("nguoidung", JSON.stringify(userRawData));

                set({
                    accessToken: token,
                    user: cleanUser,
                    loading: false
                });

                // Trả về userRawData để useAuth.js dùng làm currentUser
                return { success: true, data: userRawData };
            }

            set({ loading: false });
            return result;

        } catch (error) {
            set({ loading: false });
            const serverMessage = error.response?.data?.message || "Lỗi kết nối hệ thống";
            console.error("Lỗi Store:", serverMessage);
            return {
                success: false,
                message: serverMessage // Bây giờ message sẽ là "Tài khoản của bạn đã bị khóa..."
            };
        }
    }
}));