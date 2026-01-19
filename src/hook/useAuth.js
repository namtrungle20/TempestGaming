import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Hoặc thư viện thông báo bất kỳ
import User from '@/models/User';

export const useAuth = () => {
    const navigate = useNavigate();
    const signIn = useAuthStore((state) => state.signIn);
    const logout = useAuthStore((state) => state.logout);
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

        if (loading) return;

        const result = await signIn(formData.loginKey, formData.password);

        if (result.success) {
            toast.success("Đăng nhập thành công!");

            // Map lại User Model để check quyền
            const currentUser = new User(result.data);

            if (currentUser.isAdmin()) {
                navigate('/admin', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        } else {
            // Hiển thị lỗi từ backend (vd: Tài khoản bị khóa)
            toast.error(result.message);
        }
    };

    const handleLogout = () => {
        logout(); // Gọi action logout của Store
        toast.info("Đã đăng xuất");
        navigate('/login', { replace: true });
    };

    return { formData, loading, handleChange, handleSignIn, handleLogout };

};