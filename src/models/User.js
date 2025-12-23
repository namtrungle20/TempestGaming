export default class User {
    constructor(data) {
        this.id = data.nguoidung_id || '';
        this.email = data.email || '';
        this.sdt = data.sdt || '';
        this.vaitro = data.vaitro || 2;
        this.diachi = data.diachi || '';
        this.avatar = data.avatar || '';
        this.ngayvao = data.ngayvao || new Date().toISOString();
    }
}