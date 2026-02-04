export default class Brand {
    constructor(data = {}) {
        this.id = data.thuonghieu_id || data.id;
        this.name = data.name || "Chưa có tên thương hiệu";
        this.image = data.image || "";
    }

    get imageUrl() {
        if (!this.rawImage) return "https://via.placeholder.com/50";

        // Nếu ảnh là link tuyệt đối (http...) thì trả về luôn
        if (this.rawImage.startsWith('http')) return this.rawImage;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        // Xử lý khoảng trắng bằng encodeURIComponent để tránh lỗi %20
        return `${backendUrl}/uploads/${encodeURIComponent(this.rawImage.trim())}`;
    }

    get link() {
        return `/thuonghieu/${this.id}`;
    }
}