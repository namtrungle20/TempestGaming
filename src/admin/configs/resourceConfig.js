import Product from "@/models/Product";
import User from "@/models/User";
import Brand from "@/models/Brand";
import Category from "@/models/Category";

// Cấu hình mặc định cho các resource chuẩn REST
const createRestConfig = (endpoint, Model, uploadField = null) => ({
    endpoint, // VD: 'thuonghieu'
    Model,    // VD: Brand class
    uploadField,
    methods: {
        list: 'GET',
        detail: 'GET',
        create: 'POST',
        update: 'PUT',
        delete: 'DELETE',
    }
});

export const resourceMap = {
    products: {
        endpoint: 'sanpham',
        Model: Product,
        idField: 'sanpham_id', // <--- Chỉ định rõ khóa chính
        uploadField: 'image',
        type: 'REST',
        methods: { list: 'GET', detail: 'GET' }
    },
    brands: {
        endpoint: 'thuonghieu',
        idField: 'thuonghieu_id', // <--- Chỉ định rõ khóa chính
        type: 'REST',
        methods: { list: 'GET', detail: 'GET' }
    },
    categories: {
        endpoint: 'loaisanpham',
        idField: 'loai_id',       // <--- Chỉ định rõ khóa chính
        type: 'REST',
        methods: { list: 'GET', detail: 'GET' }
    },

    // 4. USERS (Custom API - Dùng POST cho List/Detail)
    users: {
        endpoint: 'nguoidung',
        Model: User,
        uploadField: 'avatar', // (Nếu có upload avatar)
        type: 'CUSTOM', // Đánh dấu là Custom
        methods: {
            list: 'POST',   // API: /nguoidung/danh-sach
            detail: 'POST', // API: /nguoidung/chi-tiet
            create: 'POST', // API: /auth/dangky (Ví dụ)
            update: 'PUT',  // API: /nguoidung/update
            delete: 'DELETE' // API: /nguoidung/delete
        },
        // Định nghĩa đường dẫn cụ thể (Override đường dẫn mặc định)
        paths: {
            list: '/nguoidung/danh-sach',
            detail: '/nguoidung/chi-tiet',
            update: '/nguoidung/update',
            delete: '/nguoidung/delete'
        }
    }
};