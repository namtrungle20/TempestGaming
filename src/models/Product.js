
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default class Product {
    constructor(data = {}) {
        // Chuẩn hóa ID: React-admin cần 'id', Backend trả về 'sanpham_id'
        this.id = data.sanpham_id || data.id;
        this.name = data.name || "Chưa có tên";
        this.description = data.mota || "";
        this.price = Number(data.gia) || 0;
        this.stock = data.soluong || 0;
        this.image = data.image || "";

        // 4. Khóa ngoại (Quan trọng để link với Category/Brand)
        this.categoryId = data.loai_id || data.category_id;
        this.brandId = data.thuonghieu_id || data.brand_id;

    }

    static toApi(data) {
        return {
            // Backend yêu cầu "name", không phải "ten_san_pham"
            name: data.name,

            // Ép kiểu image về string. 
            // Nếu data.image là object của React-admin, ta lấy cái title hoặc xử lý tại dataProvider
            image: typeof data.image === 'string' ? data.image : (data.image?.title || ""),

            // Chuyển lại về tên trường Backend yêu cầu (gia, mota, soluong...)
            gia: Number(data.price || data.gia),
            mota: data.description || data.mota,
            soluong: Number(data.stock || data.soluong),

            // Foreign Keys (Phải là số)
            loai_id: Number(data.categoryId || data.loai_id),
            thuonghieu_id: Number(data.brandId || data.thuonghieu_id)
        };
    }
    // Helper: Lấy link ảnh hiển thị (Xử lý trường hợp ảnh upload local hoặc link online)
    get imageUrl() {
        if (!this.image) return "https://via.placeholder.com/150";

        // Nếu là link ảnh online (Firebase, Imgur...)
        if (this.image.startsWith('http')) return this.image;

        // Nếu là ảnh upload local (cần nối với domain backend)
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        return `${backendUrl}/uploads/${encodeURIComponent(this.image.trim())}`;
    }

    // Helper: Format giá tiền sang VND (Ví dụ: 12.500.000 ₫)
    get formattedPrice() {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(this.price);
    }

    // Helper: Trạng thái tồn kho
    get stockStatus() {
        if (this.stock > 10) return { label: 'Còn hàng', color: 'success' };
        if (this.stock > 0) return { label: 'Sắp hết', color: 'warning' };
        return { label: 'Hết hàng', color: 'danger' };
    }

    get link() {
        return `/sanpham/${this.id}`;
    }

}