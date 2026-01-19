import { create } from "zustand";
import User from "@/models/User";
import { authService } from "@/services/authService";


const getInitialUser = () => {
    const data = localStorage.getItem("nguoidung");
    if (!data || data === "undefined") return null;
    try {
        return new User(JSON.parse(data));
    } catch {
        localStorage.removeItem("nguoidung");
        return null;
    }
};

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    user: getInitialUser(),
    loading: false,

    signIn: async (loginKey, password) => {
        set({ loading: true });
        try {
            // 1. Gọi Service
            const responseData = await authService.login(loginKey, password);

            // 2. Phân tích dữ liệu trả về (Debug kỹ cấu trúc JSON backend trả về nhé)
            // Giả sử backend trả về: { message: "...", data: { accessToken: "...", nguoidung: {...} } }
            const { accessToken, nguoidung } = responseData.data || {};

            if (!accessToken || !nguoidung) {
                throw new Error("Dữ liệu trả về từ server không hợp lệ");
            }

            // 3. Lưu vào LocalStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("nguoidung", JSON.stringify(nguoidung));

            // Lưu refreshToken nếu có
            if (responseData.data.refreshToken) {
                localStorage.setItem("refreshToken", responseData.data.refreshToken);
            }

            // 4. Cập nhật State
            const cleanUser = new User(nguoidung);
            set({
                accessToken: accessToken,
                user: cleanUser,
                loading: false
            });

            return { success: true, data: nguoidung };

        } catch (error) {
            set({ loading: false });
            // Lấy message lỗi chuẩn từ axios
            const serverMessage = error.response?.data?.message || error.message || "Lỗi đăng nhập";
            console.error("Lỗi Store:", serverMessage);
            return {
                success: false,
                message: serverMessage
            };
        }
    },

    logout: () => {
        // Gọi API logout (không await để tránh chặn UI)
        authService.logout().catch(err => console.warn("Logout error", err));

        // Xóa sạch Storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("nguoidung");
        localStorage.removeItem("vaitro");

        // Reset State
        set({ accessToken: null, user: null });
    }
}));