export default class User {
    constructor(data) {

        const safeData = data || {};

        this.id = safeData.nguoidung_id || safeData._id || '';
        this.email = safeData.email || '';
        this.sdt = safeData.sdt || '';
        this.vaitro = safeData.vaitro !== undefined ? String(safeData.vaitro) : '2';
        this.diachi = safeData.diachi || '';
        this.avatar = safeData.avatar || '';
        this.is_lock = safeData.is_lock == 1;
        this.ngayvao = safeData.ngayvao || new Date().toISOString();
    }

    get isAdmin() {
        return this.vaitro === '1';
    }
    static toApi(data) {
        const apiPayload = {
            // QUAN TRỌNG: Backend cần tên này, giá trị lấy từ data.id (là nguoidung_id cũ)
            id: data.id,
            email: data.email,
            sdt: data.sdt,
            diachi: data.diachi,
            vaitro: Number(data.vaitro),
            is_lock: data.is_lock ? 1 : 0
        };

        // Log ra để ông tự kiểm tra ở Console trước khi gửi
        console.log("Dữ liệu sau khi qua toApi:", apiPayload);

        return apiPayload;
    }

}