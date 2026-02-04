export default class Category {
    constructor(data = {}) {
        // 1. Map ID: Lấy loai_id từ API gán vào this.id
        this.id = data.loai_id || data.id;
        this.name = data.name || "Danh mục chưa đặt tên";
        this.image = data.image || "";
        this.brandId = data.thuonghieu_id || data.brand_id;
    }

    // Helper: Tạo link chuẩn cho từng danh mục
    static toApi(data) {
        return {
            ten_loai: data.name, // Map lại tên trường theo Backend
            hinh_anh: typeof data.image === 'string' ? data.image : (data.image?.title || ""),
        };
    }
}