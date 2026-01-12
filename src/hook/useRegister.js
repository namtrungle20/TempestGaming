import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@/libs/auth';
import { toast } from 'sonner';

export const useRegister = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        sdt: '',
        password: '',
        diachi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (serverError) setServerError("");
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Gửi toàn bộ object vì Backend yêu cầu cả email và sdt
        const result = await register(formData);

        if (result.success) {
            toast.success("Đăng ký thành công!");
            navigate('/login');
        } else {
            setServerError(result.message);
            toast.error(result.message);
        }
        setLoading(false);
    };

    return { formData, loading, serverError, handleChange, handleSignUp };
};