import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');

  // Kiểm tra log để debug (Xóa sau khi chạy được)
  console.log("Token hiện tại:", token);

  // Nếu có token (tức là đã login), đá người dùng về Home ngay
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Nếu không có token mới cho phép vào Login/Signup
  return <Outlet />;
};