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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };


    const handleSignUp = async (e) => {
        e.preventDefault();

        // Gửi toàn bộ object vì Backend yêu cầu cả email và sdt
        if (!validateEmail(formData.email)) {
            toast.error("Email không hợp lệ! (Ví dụ: abc@gmail.com)");
            return;
        }

        setLoading(true);
        const result = await register(formData);

        if (result.success) {
            // 2. Lưu đúng key 'accessToken' để PublicRoute của bạn nhận diện được
            localStorage.setItem('accessToken', result.token);
            localStorage.setItem('nguoidung', JSON.stringify(result.user));

            toast.success("Đăng ký thành công!");

            // 3. Vào thẳng Home
            navigate('/');
        } else {
            setServerError(result.message);
            toast.error(result.message);
        }
        setLoading(false);
    };

    return { formData, loading, serverError, handleChange, handleSignUp, validateEmail };
};