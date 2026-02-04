import axiosInstance from "@/libs/axiosInstance";

export const fileProvider = {
    uploadImage: async (fileData) => {
        // Nếu không có file hoặc file không phải object (đã là link string), trả về luôn
        if (!fileData || typeof fileData === 'string' || !fileData.rawFile) {
            return fileData;
        }

        const formData = new FormData();
        // Backend thường yêu cầu field name là 'image' hoặc 'file'
        // Bạn check lại controller backend xem đang req.file là gì nhé. 
        // Mình để mặc định là 'image' theo thói quen.
        formData.append("image", fileData.rawFile);

        try {
            // Gọi route upload cloudinary bạn đã cung cấp
            const response = await axiosInstance.post("/images/cloudinary/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Giả sử Backend trả về: { status: 200, data: "https://res.cloudinary..." }
            // Hoặc: { url: "..." } -> Bạn cần log response ra xem cấu trúc
            return response.data.data || response.data.url || response.data;
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            throw new Error("Không thể upload hình ảnh");
        }
    }
};