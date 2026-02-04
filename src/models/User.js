export default class User {
    constructor(data = {}) {
        const safeData = data || {};
        // Map từ API về Model (Dùng trong code Frontend)
        this.id = safeData.nguoidung_id || safeData.id || safeData._id || '';
        this.email = safeData.email || '';
        this.sdt = safeData.sdt || '';
        this.ten = safeData.ten || safeData.email?.split('@')[0] || 'User';
        this.vaitro = safeData.vaitro !== undefined ? String(safeData.vaitro) : '2';
        this.diachi = safeData.diachi || '';
        this.is_lock = safeData.is_lock == 1;
        this.ngayvao = safeData.ngayvao || "";
    }

    get isAdmin() {
        return this.vaitro === '1';
    }

    // ĐÓNG GÓI DỮ LIỆU GỬI ĐI: Đảm bảo luôn có nguoidung_id
    toApi() {
        return {
            id: this.id, // Đây là cái Backend cần!
            email: this.email,
            sdt: this.sdt,
            vaitro: Number(this.vaitro),
            is_lock: this.is_lock ? 1 : 0,
            diachi: this.diachi
        };
    }
}