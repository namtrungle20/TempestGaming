export default class Category {
    constructor(data = {}) {
        // Map đúng loai_id từ SQL query của ông
        this.id = data.loai_id || data.id || "";
        this.name = data.name || "Chưa có tên loại";
        this.image = data.image || "";
    }

    get imageUrl() {
        if (!this.image) return "https://placehold.co/100?text=No+Image";
        if (this.image.startsWith('http')) return this.image;
        const baseUrl = import.meta.env.VITE_BACKEND_URL; 
        return `${baseUrl}/images/${encodeURIComponent(this.image)}`;
    }

    static toFormData(data) {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }
        return formData;
    }
}