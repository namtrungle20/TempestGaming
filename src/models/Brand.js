export default class Brand {
    constructor(data = {}) {
        // Chỉ lấy đúng các trường mà SQL đang trả về
        this.id = data.thuonghieu_id || data.id || "";
        this.name = data.name || "Chưa có tên";
        this.image = data.image || "";
    }

    // Getter duy nhất để xử lý hiển thị ảnh
    get imageUrl() {
        if (!this.image) return "https://placehold.co/100?text=No+Image";
        if (this.image.startsWith('http')) return this.image;

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        // Thêm ?t=... để ép trình duyệt tải lại ảnh mới mỗi khi load
        return `${baseUrl}/images/${encodeURIComponent(this.image)}?t=${new Date().getTime()}`;
    }

    // Hàm chuẩn bị dữ liệu gửi lên API (ngắn gọn)
    static toFormData(data) {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }
        return formData;
    }
}