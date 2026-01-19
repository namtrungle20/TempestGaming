// src/services/categoryService.js
import axiosInstance from "@/libs/axiosInstance";
// import { requestWithCache } from "@/libs/requestUtils";
import Category from "@/models/Category";
import axios from "axios";


export const categoryService = {
    getPublicCategories: async (signal) => {
        try {
            const response = await axiosInstance.get('/loaisanpham', { signal });
            console.log("🔥 API Response:", response.data);
            const rawList = response.data?.data || [];

            if (Array.isArray(rawList)) {
                return rawList.map(item => new Category(item));
            }

            return [];
        } catch (error) {
            if (axios.isCancel(error)) {
                // console.log("Request bị hủy (Clean up)"); // Mở dòng này nếu muốn xem log xanh
                return [];
            }

            // Các lỗi khác (404, 500...) thì vẫn log bình thường để debug
            console.error("❌ Service Error:", error);
            return [];
        }
    }
};