export const adminConfig = {
    nguoidung: {
        list: '/nguoidung/danh-sach',
        detail: '/nguoidung/chi-tiet',
        update: '/nguoidung/update',
        delete: '/nguoidung/delete' // Ví dụ nếu có API xóa riêng
    },
    sanpham: {
        root: '/sanpham'
    }
};

export const ADMIN_SETTINGS = {
    PER_PAGE: 10,
    API_TIMEOUT: 5000
};