import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');

  // Nếu đã có token, đá người dùng về trang chủ ngay lập tức
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};