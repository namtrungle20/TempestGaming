import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from "@/store/useAuthStore";

export const ProtectedRoute = ({ allowAdminOnly = false }) => {
  const { user, accessToken } = useAuthStore();

  // 1. Nếu chưa đăng nhập -> Luôn đẩy về login
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Nếu route yêu cầu quyền Admin mà user không phải Admin
  if (allowAdminOnly && !user.isAdmin()) {
    // Đẩy về trang chủ của User hoặc trang 403
    return <Navigate to="/" replace />;
  }

  // 3. Nếu mọi thứ OK -> Cho phép truy cập vào các route con
  return <Outlet />;
};