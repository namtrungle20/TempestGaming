import { useAuthStore } from '@/store/useAuthStore.jsx';
import User from '@/models/User';

export const authProvider = {
    // 1. Khi nhấn nút Login (Nếu bạn dùng form login của React-admin)
    login: async ({ username, password }) => {
        try {
            const signIn = useAuthStore.getState().signIn;
            const result = await signIn(username, password);

            if (result.success) {
                const currentUser = new User(result.data);
                if (currentUser.isAdmin) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error('Tài khoản không có quyền Admin'));
                }
            } else {
                return Promise.reject(new Error(result.message || 'Sai tài khoản hoặc mật khẩu'));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi đăng nhập';
            return Promise.reject(new Error(errorMsg));
        }
    },

    // 2. Kiểm tra quyền vào Admin (Chạy mỗi khi chuyển trang trong admin)
    checkAuth: () => {
        const { user, accessToken } = useAuthStore.getState();
        // Nếu có token VÀ là admin thì cho qua
        if (!accessToken) {
            return Promise.reject({ redirectTo: '/login' });
        }
        let currentUserData = user;

        if (!currentUserData) {
            try {
                const storage = JSON.parse(localStorage.getItem('auth-storage') || '{}');
                currentUserData = storage.state?.user;
            } catch (e) {
                const errorMsg = e.response?.data?.message || 'Lỗi đăng nhập';
                return Promise.reject(new Error(errorMsg));
            }
        }

        if (!currentUserData) {
            return Promise.reject({ redirectTo: '/login' });
        }
        const currentUser = new User(currentUserData);

        if (currentUser.isAdmin) {
            return Promise.resolve();
        }

        return Promise.reject({ redirectTo: '/login', message: 'Không đủ quyền truy cập' });
    },

    // 3. Kiểm tra lỗi trả về từ API (Ví dụ: token hết hạn 401)
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('accessToken');
            return Promise.reject(); // React-Admin sẽ tự động đưa người dùng về trang /login một cách mượt mà (Soft Redirect)
        }
        return Promise.resolve();
    },

    // 4. Khi nhấn nút Logout trong trang Admin
    logout: () => {
        useAuthStore.getState().logout(); // Giả sử store của bạn có hàm logout để reset state
        localStorage.clear(); // Xóa sạch cho an toàn
        return Promise.resolve();
    },

    // 5. Lấy quyền hạn (Phục vụ việc ẩn/hiện menu)
    getPermissions: () => {
        const { user } = useAuthStore.getState();
        return Promise.resolve(user?.vaitro);
    },

    // getIdentity: () => {
    //     try {
    //         const user = JSON.parse(localStorage.getItem('nguoidung') || '{}');
    //         return Promise.resolve({
    //             id: user.nguoidung_id || user._id, // Khớp với cách bạn map id ở dataProvider
    //             fullName: user.hoten || 'Admin',
    //             avatar: user.hinhanh,
    //         });
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // },
};