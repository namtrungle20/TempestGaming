create database TempestGaming
go

CREATE TABLE NguoiDung (
    MaNguoiDung INT PRIMARY KEY IDENTITY(1,1), -- Mã người dùng
    TenDangNhap NVARCHAR(50) NOT NULL,         -- Tên đăng nhập
    Email NVARCHAR(100) NOT NULL UNIQUE,       -- Email
    MatKhau NVARCHAR(255) NOT NULL,            -- Mật khẩu (đã mã hóa)
    VaiTro NVARCHAR(20) NOT NULL CHECK (VaiTro IN ('User', 'Admin')), -- Vai trò (Khách hàng hoặc Quản trị)
    NgayTao DATETIME DEFAULT GETDATE(),        -- Ngày tạo tài khoản
    NgayCapNhat DATETIME DEFAULT GETDATE()     -- Ngày cập nhật thông tin
);

CREATE TABLE SanPham (
    MaSanPham INT PRIMARY KEY IDENTITY(1,1),   -- Mã sản phẩm
    TenSanPham NVARCHAR(100) NOT NULL,         -- Tên sản phẩm
    MoTa NVARCHAR(MAX),                        -- Mô tả sản phẩm
    Gia DECIMAL(18, 2) NOT NULL,               -- Giá sản phẩm
    SoLuongTon INT NOT NULL,                   -- Số lượng tồn kho
    NgayTao DATETIME DEFAULT GETDATE(),        -- Ngày tạo sản phẩm
    NgayCapNhat DATETIME DEFAULT GETDATE()     -- Ngày cập nhật sản phẩm
);

CREATE TABLE DonHang (
    MaDonHang INT PRIMARY KEY IDENTITY(1,1),   -- Mã đơn hàng
    MaNguoiDung INT NOT NULL,                  -- Mã người dùng (khách hàng đặt hàng)
    NgayDatHang DATETIME DEFAULT GETDATE(),    -- Ngày đặt hàng
    TongTien DECIMAL(18, 2) NOT NULL,          -- Tổng tiền của đơn hàng
    TrangThai NVARCHAR(20) NOT NULL CHECK (TrangThai IN ('ChoXuLy', 'HoanThanh', 'Huy')), -- Trạng thái đơn hàng
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) -- Khóa ngoại liên kết với bảng NgườiDùng
);

CREATE TABLE ChiTietDonHang (
    MaChiTietDonHang INT PRIMARY KEY IDENTITY(1,1), -- Mã chi tiết đơn hàng
    MaDonHang INT NOT NULL,                         -- Mã đơn hàng
    MaSanPham INT NOT NULL,                         -- Mã sản phẩm
    SoLuong INT NOT NULL,                           -- Số lượng sản phẩm
    Gia DECIMAL(18, 2) NOT NULL,                   -- Giá tại thời điểm đặt hàng
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang), -- Khóa ngoại liên kết với bảng DonHang
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham) -- Khóa ngoại liên kết với bảng SanPham
);

CREATE TABLE DanhGia (
    MaDanhGia INT PRIMARY KEY IDENTITY(1,1),    -- Mã đánh giá
    MaSanPham INT NOT NULL,                     -- Mã sản phẩm
    MaNguoiDung INT NOT NULL,                   -- Mã người dùng
    SoSao INT NOT NULL CHECK (SoSao BETWEEN 1 AND 5), -- Số sao (1 đến 5)
    BinhLuan NVARCHAR(MAX),                     -- Bình luận
    NgayDanhGia DATETIME DEFAULT GETDATE(),     -- Ngày đánh giá
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham), -- Khóa ngoại liên kết với bảng SanPham
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung) -- Khóa ngoại liên kết với bảng NguoiDung
);

CREATE TABLE HoaDonThanhToan (
    MaHoaDon INT PRIMARY KEY IDENTITY(1,1),       -- Mã hóa đơn
    MaDonHang INT NOT NULL,                       -- Mã đơn hàng (liên kết với bảng DonHang)
    PhuongThucThanhToan NVARCHAR(50) NOT NULL,   -- Phương thức thanh toán (VD: Tiền mặt, Thẻ tín dụng)
    SoTienThanhToan DECIMAL(18, 2) NOT NULL,     -- Số tiền thanh toán
    NgayThanhToan DATETIME DEFAULT GETDATE(),    -- Ngày thanh toán
    TrangThaiThanhToan NVARCHAR(20) NOT NULL CHECK (TrangThaiThanhToan IN ('ChuaThanhToan', 'DaThanhToan')), -- Trạng thái thanh toán
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang) -- Khóa ngoại liên kết với bảng DonHang
);

INSERT INTO NguoiDung (TenDangNhap, Email, MatKhau, VaiTro, NgayTao)
VALUES 
('admin', 'admin@tempest.com', 'hashed_password_admin', 'Admin', '2025-03-21 10:00:00'),
('khachhang1', 'user1@gmail.com', 'hashed_password_user1', 'User', '2025-03-21 10:05:00'),
('khachhang2', 'user2@gmail.com', 'hashed_password_user2', 'User', '2025-03-21 10:10:00');

INSERT INTO SanPham (TenSanPham, MoTa, Gia, SoLuongTon, NgayTao)
VALUES 
('PlayStation 5', 'Sony PS5 Console', 499.99, 10, '2025-03-21 10:15:00'),
('Xbox Series X', 'Microsoft Console', 499.99, 15, '2025-03-21 10:20:00'),
('Nintendo Switch', 'Nintendo Console', 299.99, 20, '2025-03-21 10:25:00');

INSERT INTO DonHang (MaNguoiDung, NgayDatHang, TongTien, TrangThai)
VALUES 
(2, '2025-03-21 11:00:00', 999.98, 'HoanThanh');

INSERT INTO ChiTietDonHang (MaDonHang, MaSanPham, SoLuong, Gia)
VALUES 
(3, 1, 1, 499.99); -- Đơn hàng 1, sản phẩm PlayStation 5

INSERT INTO DanhGia (MaSanPham, MaNguoiDung, SoSao, BinhLuan, NgayDanhGia)
VALUES 
(1, 2, 5, 'Sản phẩm tuyệt vời', '2025-03-21 12:00:00'), -- Đánh giá cho PlayStation 5
(2, 2, 4, 'Rất tốt', '2025-03-21 12:30:00'),           -- Đánh giá cho Xbox Series X
(3, 3, 5, 'Đáng tiền', '2025-03-21 13:00:00');         -- Đánh giá cho Nintendo Switch

INSERT INTO HoaDonThanhToan (MaDonHang, PhuongThucThanhToan, SoTienThanhToan, NgayThanhToan, TrangThaiThanhToan)
VALUES 
(3, 'Thẻ tín dụng', 999.98, '2025-03-21 11:30:00', 'DaThanhToan'), -- Thanh toán cho đơn hàng 1
(3, 'Tiền mặt', 299.99, '2025-03-21 12:00:00', 'DaThanhToan');     -- Thanh toán cho đơn hàng 2

use TempestGaming
go


SELECT * FROM DonHang;


USE TempestGaming; -- Thay 'TempestGamings' bằng tên database của bạn
GO
SELECT name, type_desc
FROM sys.database_principals