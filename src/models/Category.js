export default class Category {
    constructor(data = {}) {
        // 1. Map ID: Lấy loai_id từ API gán vào this.id
        this.id = data.loai_id || data.id || Date.now(); 

        // 2. Map Tên
        this.name = data.name || "Danh mục chưa đặt tên";

        // 3. Map Ảnh
        this.image = data.image || "https://via.placeholder.com/50";

        // Các trường phụ (nếu cần sau này)
        this.createdAt = data.createdAt;
    }

    // Helper: Tạo link chuẩn cho từng danh mục
    get link() {
        return `/loaisanpham/${this.id}`;
    }
}