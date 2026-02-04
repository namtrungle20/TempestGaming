export const adminConfig = {
    users: {
        list: {
            url: '/nguoidung/danh-sach',
            method: 'post'
        },
        // Lấy chi tiết để Edit (Backend dùng POST - Quan trọng để fix 404 Edit)
        detail: {
            url: '/nguoidung/chi-tiet',
            method: 'post'
        },
        // Cập nhật (Backend dùng PUT)
        update: {
            url: '/nguoidung/update',
            method: 'put'
        },
        // Xóa (Backend dùng DELETE)
        delete: {
            url: '/nguoidung/delete',
            method: 'delete'
        }
    },
    products: {
        root: '/sanpham'
    }
};

export const ADMIN_SETTINGS = {
    PER_PAGE: 10,
    API_TIMEOUT: 5000
};