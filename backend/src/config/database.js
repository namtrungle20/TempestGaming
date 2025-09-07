
require('dotenv').config();
const mysql = require('mysql2/promise');

const dbState = [{
    value: 0, label: 'tắt kết nối'
}, {
    value: 1, label: 'đã kết nối'
}, {
    value: 2, label: 'đang kết nối'
}]

let connection; // Biến toàn cục để giữ kết nối

const connectDB = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }),
        console.log(dbState.find(item => item.value === 1).label, "đến database");
        return connection;
    } catch (error) {
        console.error('Lỗi kết nối database:', error);
        console.log(dbState.find(item => item.value === 0).label, "đến database");
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    }
};

module.exports = connectDB;