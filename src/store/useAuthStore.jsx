import { create } from "zustand";
import User from "@/models/User";
import { login } from "@/libs/auth";




export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    user: localStorage.getItem("user") ? new User(JSON.parse(localStorage.getItem("user"))) : null,
    loading: false,

    signIn: async (loginKey, password) => {
        try {
            set({ loading: true });

            const data = await login({
                email: loginKey,
                matkhau: password
            });

            const cleanUser = new User(data.nguoidung);

            localStorage.getItem("accessToken", data.accessToken);
            localStorage.getItem("user", JSON.stringify(data.nguoidung));

            set({
                accessToken: data.accessToken,
                user: cleanUser,
                loading: false
            })
            return { success: true };
        } catch {
            set({ loading: false });
            return { success: false, message: "Tài khoản hoặc mật khẩu không đúng" }
        }
    }


}));