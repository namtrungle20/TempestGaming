// Nơi lưu trữ tất cả "ghi chú" về đường dẫn API
export const API_ENDPOINTS = {
    USER: {
        LIST: "/nguoidung/danh-sach",
        DETAIL: "/nguoidung/chi-tiet",
        UPDATE: "/nguoidung/update",
        DELETE: "/nguoidung/delete",
    },
    BRAND: {
        BASE: "/thuonghieu",
    },
    CATEGORY: {
        BASE: "/loaisanpham",
    },
    PRODUCT:{
        BASE: "/sanpham"
    },
    IMAGE: {
        UPLOAD_LOCAL: "/images/upload",
        UPLOAD_CLOUD: "/images/cloudinary/upload"
    }
};