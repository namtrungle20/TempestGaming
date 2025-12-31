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

            const data = await login({
                email: loginKey,
                password: password
            });

            const cleanUser = new User(data);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("nguoidung", JSON.stringify(data));

            set({
                accessToken: data.accessToken,
                user: cleanUser,
                loading: false
            })
            return { success: true };
        } catch (error) {
            set({ loading: false });
            console.error("Lỗi đăng nhập chi tiết:", error);
            const errMsg = error.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng";
            return { success: false, errMsg }
        }
    }
}));