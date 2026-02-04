export default class Brand {
    constructor(data = {}) {
        this.id = data.thuonghieu_id || data.id;
        this.name = data.name || "Chưa có tên thương hiệu";
        this.images = data.images || "";
    }
    static toApi(data) {
        return {
            id: data.thuonghieu_id,
            name: data.name, // Backend thường dùng 'ten' cho thương hiệu
            image: data.images?.filename 
                   || (typeof data.images === 'string' ? data.images : data.images?.title) 
                   || ""
        };
    }

    get imageUrl() {
        if (!this.image) return "https://via.placeholder.com/50";

        // Nếu ảnh là link tuyệt đối (http...) thì trả về luôn
        if (this.image.startsWith('http')) return this.image;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        // Xử lý khoảng trắng bằng encodeURIComponent để tránh lỗi %20
        return `${backendUrl}/uploads/${encodeURIComponent(this.image.trim())}`;
    }


    get link() {
        return `/thuonghieu/${this.id}`;
    }
}