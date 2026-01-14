import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Hoặc thư viện thông báo bất kỳ
import User from '@/models/User';

export const useAuth = () => {
    const navigate = useNavigate();
    const signIn = useAuthStore((state) => state.signIn);
    const loading = useAuthStore((state) => state.loading);

    const [formData, setFormData] = useState({
        loginKey: '',
        password: ''
    });

    // Hàm cập nhật data linh hoạt cho mọi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const result = await signIn(formData.loginKey, formData.password);

        if (result.success) {
            toast.success("Chào mừng bạn quay trở lại!");
            try {
                // Kiểm tra dữ liệu an toàn trước khi vào Model
                // const dataToMap = result.data?.user || result.data;
                const currentUser = new User(result.data);
                
                console.log("Quyền người dùng:", currentUser.vaitro); // Debug xem vaitro là gì

                if (currentUser.isAdmin()) {
                    console.log("Đang chuyển hướng sang /admin...");
                    navigate('/admin');
                } else {
                    console.log("Đang chuyển hướng sang /...");
                    navigate('/');
                }
            } catch (error) {
                console.error("Lỗi khi xử lý dữ liệu User:", error);
                toast.error("Lỗi dữ liệu hệ thống!");
            }
        } else {
            toast.error(result?.message || "Sai tài khoản hoặc mật khẩu");
        }
    };

    return { formData, loading, handleChange, handleSignIn };
};