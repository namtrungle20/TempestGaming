import { useState, useEffect } from "react";
import axios from "axios";
import { categoryService } from "@/services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Tạo AbortController để hủy request nếu user chuyển trang nhanh
        const controller = new AbortController();

        const fetchCategories = async () => {
            try {
                setLoading(true);

                // Gọi Service (đã bỏ cache ở bước 1)
                const data = await categoryService.getPublicCategories(controller.signal);

                if (!controller.signal.aborted) {
                    console.log("🟢 Hook: Đã set state categories:", data); // Log kiểm tra Data
                    setCategories(data);
                }

            } catch (error) {
                // Bỏ qua lỗi do hủy request
                if (error.name !== 'CanceledError' && !axios.isCancel(error)) {
                    console.error("❌ Lỗi lấy danh mục:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchCategories();

        // Cleanup function
        return () => controller.abort();
    }, []); // Dependency rỗng -> Chỉ chạy 1 lần khi mount

    return { categories, loading };
};