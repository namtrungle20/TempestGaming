import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brandService } from "@/services/brandService";
import { toast } from "sonner";
import Brand from "@/models/Brand"; // Import model để map dữ liệu

export const useBrands = () => {
    const queryClient = useQueryClient();
    const queryKey = ["admin-brands"];

    // 1. Lấy danh sách (Fix lỗi 304 và map dữ liệu)
    const { data: brands, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const res = await brandService.getAll({ _t: Date.now() });
            const rawData = res.data.data || [];
            
            return rawData.map((item) => new Brand(item));
        },
        staleTime: 0,
    });

    // 2. Thêm mới
    const createBrand = useMutation({
        mutationFn: (formData) => brandService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Thêm thương hiệu thành công");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Lỗi thêm mới"),
    });

    // 3. Cập nhật
    const updateBrand = useMutation({
        mutationFn: ({ id, formData }) => brandService.update(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Cập nhật thành công");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Lỗi cập nhật"),
    });

    // 4. Xóa
    const deleteBrand = useMutation({
        mutationFn: (id) => brandService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Đã xóa thương hiệu");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Không thể xóa"),
    });

    return {
        brands,
        isLoading,
        onCreate: createBrand.mutate,
        onUpdate: updateBrand.mutate,
        onDelete: deleteBrand.mutate,
    };
};