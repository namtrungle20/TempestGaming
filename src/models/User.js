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
        return {
            ...data,
            nguoidung_id: data.id, // Map lại ID
            is_lock: data.is_lock ? 1 : 0, // Convert true -> 1
            vaitro: Number(data.vaitro)
        };
    }

}