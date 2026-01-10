import axiosInstance from "@/libs/auth"; // Import cái axios bạn đã cài đặt token

export const dataProvider = {
    // 1. Lấy danh sách (Sử dụng POST cho 'nguoidung')
    getList: async (resource, params) => {
        if (resource === 'nguoidung') {
            try {
                // Gọi đúng API của bạn
                const response = await axiosInstance.post(`/${resource}/danh-sach`, {
                    pagination: params.pagination,
                    sort: params.sort,
                    filter: params.filter
                });

                // 1. Kiểm tra cấu trúc: API trả về { data: { nguoidung: [...] } }
                const rawData = response.data?.data || [];

                // 2. Ép kiểu về mảng để an toàn
                const finalArray = Array.isArray(rawData) ? rawData : [];

                // 3. Map lại dữ liệu: React-Admin BẮT BUỘC phải có trường "id"
                const mappedData = finalArray.map(item => ({
                    ...item,
                    id: item.nguoidung_id, // Lấy nguoidung_id gán vào id
                }));

                return {
                    data: mappedData,
                    total: response.data?.total || mappedData.length,
                };
            } catch (error) {
                console.error("Lỗi gọi API danh sách:", error);
                return { data: [], total: 0 };
            }
        }
        return { data: [], total: 0 };
    },

    // 2. Lấy 1 bản ghi chi tiết (để đổ vào form Edit)
    getOne: async (resource, params) => {
        if (resource === 'nguoidung') {
            // Gọi đến API POST /nguoidung/chi-tiet (hoặc route bạn đặt cho postNguoiDungById)
            const response = await axiosInstance.post(`/${resource}/chi-tiet`, {
                id: params.id // Gửi ID trong body theo yêu cầu bảo mật của bạn
            });

            const userData = response.data?.data;
            return {
                data: { 
                    ...userData, 
                    id: userData.nguoidung_id // Map lại id cho React-admin
                }
            };
        }
        return { data: {} };
    },

    // 4. Xóa dữ liệu
    delete: async (resource, params) => {
        await axiosInstance.delete(`/${resource}/${params.id}`);
        return { data: params.previousData };
    }
};