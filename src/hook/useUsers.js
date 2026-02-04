import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import User from "@/models/User";

export const useUsers = (filters = {}) => {
    const queryClient = useQueryClient();

    const { data: users, isLoading } = useQuery({
        queryKey: ["admin-users", filters],
        queryFn: () => userService.getAll(filters)
    });

    const toggleLock = useMutation({
        mutationFn: ({ user }) => {
            if (!user || !user.id) {
                console.error("Hook không nhận được object user hợp lệ:", user);
                return;
            }

            return userService.update({
                ...user,
                is_lock: !user.is_lock // Đảo trạng thái
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-users"]);
            toast.success("Cập nhật thành công!");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Lỗi cập nhật"),
    });

    const removeUser = useMutation({
        mutationFn: (id) => userService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-users"]);
            toast.success("Đã xóa tài khoản");
        }
    });

    return {
        users,
        isLoading,
        onToggleLock: toggleLock.mutate,
        onDelete: removeUser.mutate
    };
};