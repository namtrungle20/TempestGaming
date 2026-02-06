import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { toast } from "sonner";
import Product from "@/models/Product";

export const useProducts = () => {
    const queryClient = useQueryClient();
    const queryKey = ["admin-products"];

    // 1. Fetch Data
    const { data: products, isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await productService.getAll({ _t: Date.now() });
            const rawData = res.data?.data || [];
            return rawData.map(item => new Product(item));
        },
        staleTime: 0
    });

    // 2. Helper Config
    const mutationConfig = (msg) => ({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success(msg);
        },
        onError: (err) => toast.error(err.response?.data?.message || "Thao tác thất bại")
    });

    // 3. Mutations
    const createProduct = useMutation({
        mutationFn: productService.create,
        ...mutationConfig("Thêm sản phẩm thành công")
    });

    const updateProduct = useMutation({
        mutationFn: ({ id, formData }) => productService.update(id, formData),
        ...mutationConfig("Cập nhật thành công")
    });

    const deleteProduct = useMutation({
        mutationFn: productService.delete,
        ...mutationConfig("Đã xóa sản phẩm")
    });

    return { 
        products, isLoading, 
        onCreate: createProduct.mutate, 
        onUpdate: updateProduct.mutate, 
        onDelete: deleteProduct.mutate 
    };
};