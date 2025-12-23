import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Hoặc thư viện thông báo bất kỳ

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
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return { formData, loading, handleChange, handleSignIn };
};