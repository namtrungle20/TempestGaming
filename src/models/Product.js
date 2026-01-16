
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default class Product {
    constructor(data = {}) {
        // Chuẩn hóa ID: React-admin cần 'id', Backend trả về 'sanpham_id'
        this.id = data.sanpham_id || data.id;
        this.name = data.name || "Chưa có tên";
        this.description = data.mota || "";
        this.price = Number(data.gia) || 0;
        this.stock = data.soluong || 0;

        const rawImage = data.image || "";

        if (typeof rawImage === 'string' && rawImage.startsWith('http')) {
            // Nếu là link tuyệt đối (Cloudinary/Placeholder) thì giữ nguyên
            this.image = rawImage;
        } else if (rawImage && rawImage.length > 0) {
            // Nếu là tên file cục bộ thì mới nối URL backend
            this.image = `${import.meta.env.VITE_BACKEND_URL}/images/${rawImage}`;
        } else {
            this.image = "https://via.placeholder.com/150.png";
        }

        this.categoryId = data.loai_id || null;
        this.brandId = data.thuonghieu_id || null;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    }

    // Getter để format giá tiền VND dùng cho giao diện User
    get formattedPrice() {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(this.price);
    }

    // Kiểm tra còn hàng (Dùng cho nút "Thêm vào giỏ" ở phía User)
    get isAvailable() {
        return this.stock > 0;
    }

    // Static method để convert dữ liệu trước khi gửi lên API (Dùng cho Admin Create/Update)
    static toApi(data) {
        return {
            name: data.name,
            mota: data.description,
            gia: Number(data.price),
            soluong: Number(data.stock),
            image: data.image,
            loai_id: data.categoryId,
            thuonghieu_id: data.brandId
        };
    }
}