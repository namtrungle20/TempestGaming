// Nơi lưu trữ tất cả "ghi chú" về đường dẫn API
export const API_ENDPOINTS = {
    USER: {
        LIST: "/nguoidung/danh-sach",
        DETAIL: "/nguoidung/chi-tiet",
        UPDATE: "/nguoidung/update",
        DELETE: "/nguoidung/delete",
    },
    BRAND: {
        LIST: "/thuonghieu",
        CREATE: "/thuonghieu",
        UPDATE: "/thuonghieu", // Thường là /id nhưng tùy backend của ông
        DELETE: "/thuonghieu",
    }
};