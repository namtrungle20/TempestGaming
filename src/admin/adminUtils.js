export const ensureId = (data) => {
    if (!data) return data;

    // Nếu là mảng (danh sách người dùng)
    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            id: item.id || item.nguoidung_id // <--- Đảm bảo có nguoidung_id ở đây
        }));
    }

    return {
        ...data,
        id: data.id || data.nguoidung_id
    };
};

/**
 * Hàm formatCurrency: Ví dụ một tiện ích khác để hiển thị tiền tệ cho Shop Game
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};