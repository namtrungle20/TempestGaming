export default class User {
    constructor(data) {

        const safeData = data || {};

        this.id = safeData.nguoidung_id || safeData._id || '';
        this.email = safeData.email || '';
        this.sdt = safeData.sdt || '';
        this.vaitro = safeData.vaitro !== undefined ? String(safeData.vaitro) : '2';
        this.diachi = safeData.diachi || '';
        this.avatar = safeData.avatar || '';
        this.ngayvao = safeData.ngayvao || new Date().toISOString();
    }

    isAdmin() {
        return this.vaitro === '1';
    }
}