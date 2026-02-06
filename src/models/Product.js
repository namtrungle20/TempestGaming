export default class Product {
    constructor(data = {}) {
        this.id = data.sanpham_id || data.id || "";
        this.name = data.name || "";
        this.price = data.price || data.gia || 0;
        this.quantity = data.quantity || data.soluong || 0;
        this.description = data.description || data.mota || "";
        this.image = data.image || "";

        this.brandId = data.thuonghieu_id || "";
        this.categoryId = data.loai_id || "";

        this.brandName = data.ThuongHieu?.name || "N/A";
        this.categoryName = data.LoaiSanPham?.name || "N/A";
    }

    get imageUrl() {
        if (!this.image) return "https://placehold.co/100?text=No+Image";
        if (this.image instanceof File) return URL.createObjectURL(this.image); // Xem trước ảnh mới
        if (this.image.startsWith('http')) return this.image;

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        return `${baseUrl}/images/${this.image}?t=${Date.now()}`;
    }

    get formattedPrice() {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.price);
    }

    static toFormData(data) {
        const formData = new FormData();
        formData.append("name", data.name || "");
        formData.append("mota", data.description || ""); // Đảm bảo không gửi "undefined"
        formData.append("gia", data.price || 0);
        formData.append("soluong", data.quantity || 0);
        formData.append("loai_id", data.categoryId || "");
        formData.append("thuonghieu_id", data.brandId || "");

        if (data.image instanceof File) {
            formData.append("image", data.image); // Gửi file mới
        } else {
            formData.append("image", data.image || ""); // Gửi lại cái tên file cũ (String)
        }
        return formData;
    }
}