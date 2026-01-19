import axiosInstance from "@/libs/axiosInstance";

export const fileProvider = {
    uploadImage: async (file) => {
        // 1. Nếu là URL cũ (string), trả về luôn
        if (!file || typeof file === 'string') return file;

        // 2. Lấy file vật lý. React-admin bọc file trong file.rawFile
        // Nếu file là Object {path: ...}, ta phải tìm file.rawFile
        const fileToUpload = file.rawFile;

        if (!fileToUpload) {
            console.error("Lỗi: Object nhận được không chứa rawFile vật lý!", file);
            return typeof file === 'object' && file.src ? file.src : "";
        }

        const formData = new FormData();
        // Key 'image' phải trùng với upload.single('image') ở Backend
        formData.append('image', fileToUpload);

        try {
            const response = await axiosInstance.post('/images/cloudinary/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Trả về chuỗi URL từ Cloudinary
            return response.data.file;
        } catch (error) {
            console.error("Lỗi upload:", error.response?.data || error.message);
            return "";
        }
    }
};