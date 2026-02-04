import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./admin/UserManagement";

// import UserManagement from "./admin/UserManagement"; // Sẽ tạo ở bước 4

const AdminPage = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Route mặc định khi vào /admin */}
        <Route index element={
          <div className="p-4">
            <h2 className="text-2xl font-bold italic text-primary">Bảng điều khiển Admin</h2>
            <p className="text-muted-foreground">Chào mừng ông đã quay trở lại hệ thống quản trị.</p>
          </div>
        } />

        {/* Trang quản lý người dùng */}
        <Route path="users" element={<UserManagement />} />
        
        {/* Các trang khác ông có thể thêm sau */}
        <Route path="brands" element={<div>Đang phát triển trang Thương hiệu...</div>} />
        <Route path="products" element={<div>Đang phát triển trang Sản phẩm...</div>} />
      </Route>
    </Routes>
  );
};

export default AdminPage;