import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { toast } from "sonner";
import Category from "@/models/Category"; // Import model để chuẩn hóa dữ liệu

export const useCategories = () => {
    const queryClient = useQueryClient();
    const queryKey = ["admin-categories"];

    // 1. Lấy danh sách
    const { data: categories, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            // SỬA Ở ĐÂY: Gọi categoryService chứ không phải categories
            const res = await categoryService.getAll({ _t: Date.now() });

            // Kiểm tra cấu trúc data từ Backend (Log này rất quan trọng để debug)
            console.log("Dữ liệu Category trả về:", res.data);

            const rawData = res.data?.data || [];
            return rawData.map((item) => new Category(item));
        },
        staleTime: 0,
    });

    // 2. Thêm mới
    const createCategory = useMutation({
        mutationFn: (formData) => categoryService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Thêm loại sản phẩm thành công");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Lỗi thêm mới")
    });

    // 3. Cập nhật
    const updateCategory = useMutation({
        mutationFn: ({ id, formData }) => categoryService.update(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Cập nhật thành công");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Lỗi cập nhật")
    });

    // 4. Xóa
    const deleteCategory = useMutation({
        mutationFn: (id) => categoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Đã xóa loại sản phẩm");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Không thể xóa")
    });

    return {
        categories,
        isLoading,
        onCreate: createCategory.mutate,
        onUpdate: updateCategory.mutate,
        onDelete: deleteCategory.mutate
    };
};