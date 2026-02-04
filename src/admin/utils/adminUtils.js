import Product from "@/models/Product";
import Brand from "@/models/Brand";
import Category from "@/models/Category";

/**
 * Hàm formatCurrency: Tiện ích hiển thị tiền tệ
 */
export const formatCurrency = (value) => {
    if (value === undefined || value === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

/**
 * Hàm mapResourceData: 
 * 1. Chuyển đổi dữ liệu raw từ API thành Model (nếu có).
 * 2. Đảm bảo mọi record đều có trường 'id' (React-Admin bắt buộc).
 */
export const mapResourceData = (resource, data) => {
    if (!data) return [];
    
    // Đảm bảo xử lý cả mảng (getList) và object đơn lẻ (getOne)
    const isArray = Array.isArray(data);
    const list = isArray ? data : [data];

    const mappedList = list.map((item) => {
        // Clone item để không làm biến đổi data gốc
        let newItem = { ...item };

        // --- 1. MAPPING THEO RESOURCE ---
        // Nếu là Sản Phẩm -> Dùng Model Product (để có .imageUrl, .formattedPrice...)
        if (resource === 'products' || resource === 'sanpham') {
            const productModel = new Product(item);
            newItem = { ...newItem, ...productModel }; // Merge model vào item
            
            // Map ID riêng cho sản phẩm
            if (newItem.sanpham_id) newItem.id = newItem.sanpham_id;
        }
        
        // Nếu là Thương Hiệu
        else if (resource === 'brands' || resource === 'thuonghieu') {
            const brandModel = new Brand(item);
            newItem = { ...newItem, ...brandModel };

            // Map ID riêng cho thương hiệu
            if (newItem.thuonghieu_id) newItem.id = newItem.thuonghieu_id;
        }

        // Nếu là Loại Sản Phẩm
        else if (resource === 'categories' || resource === 'loaisanpham') {
            const categoryModel = new Category(item);
            newItem = { ...newItem, ...categoryModel };

            // Map ID riêng cho loại sản phẩm
            if (newItem.loai_id) newItem.id = newItem.loai_id;
        }

        // Nếu là Người Dùng (Users)
        else if (resource === 'users' || resource === 'nguoidung') {
            // Map ID riêng cho người dùng
            if (newItem.nguoidung_id) newItem.id = newItem.nguoidung_id;
        }

        // --- 2. FALLBACK ID (AN TOÀN) ---
        // Nếu sau khi map mà vẫn chưa có 'id', thử tìm các biến thể _id
        if (!newItem.id) {
            newItem.id = newItem._id || newItem.key || Math.random().toString(36).substr(2, 9);
        }

        return newItem;
    });

    // Trả về đúng kiểu dữ liệu đầu vào (Mảng hoặc Object)
    return isArray ? mappedList : mappedList[0];
};