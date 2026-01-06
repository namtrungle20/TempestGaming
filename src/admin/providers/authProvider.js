import { useAuthStore } from '@/store/useAuthStore.jsx';

export const authProvider = {
    // 1. Khi nhấn nút Login (Nếu bạn dùng form login của React-admin)
    login: async ({ username, password }) => {
        const signIn = useAuthStore.getState().signIn;
        const result = await signIn(username, password);

        if (result.success) {
            return Promise.resolve();
        } else {
            // Trả về lỗi để React-admin hiển thị thông báo trên Form Login
            return Promise.reject(new Error(result.message || 'Sai tài khoản hoặc mật khẩu'));
        }
    },

    // 2. Kiểm tra quyền vào Admin (Chạy mỗi khi chuyển trang trong admin)
    checkAuth: () => {
        const token = localStorage.getItem('accessToken');
        // Nếu có token thì cho phép ở lại trang Admin, không thì đẩy ra trang Login
        return token ? Promise.resolve() : Promise.reject({ message: 'Vui lòng đăng nhập!' });
    },

    // 3. Kiểm tra lỗi trả về từ API (Ví dụ: token hết hạn 401)
    checkError: (error) => {
        const status = error.response ? error.response.status : error.status;
        if (status === 401 || status === 403) {
            // Xóa sạch session khi bị lỗi quyền hoặc hết hạn
            localStorage.removeItem('accessToken');
            localStorage.removeItem('vaitro');
            localStorage.removeItem('nguoidung');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // 4. Khi nhấn nút Logout trong trang Admin
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('nguoidung');
        localStorage.removeItem('vaitro');
        return Promise.resolve();
    },

    // 5. Lấy quyền hạn (Phục vụ việc ẩn/hiện menu)
    getPermissions: () => {
        const role = localStorage.getItem('vaitro');
        return role ? Promise.resolve(Number(role)) : Promise.reject();
    },

    // 6. Lấy thông tin cá nhân hiện lên góc màn hình Admin
    getIdentity: () => {
        try {
            const user = JSON.parse(localStorage.getItem('nguoidung') || '{}');
            return Promise.resolve({
                id: user.nguoidung_id || user._id, // Khớp với cách bạn map id ở dataProvider
                fullName: user.hoten || 'Admin',
                avatar: user.hinhanh,
            });
        } catch (e) {
            return Promise.reject(e);
        }
    },
};