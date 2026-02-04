import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from "@/store/useAuthStore";

export const PrivateRoute = ({ allowAdminOnly = false }) => {
  const { user, accessToken } = useAuthStore();
  const location = useLocation();

  const isUserAdmin = () => {
    if (!user) return false;
    // Cách 1: Nếu user vẫn là Class Instance (có hàm)
    if (typeof user.isAdmin === 'function') {
      return user.isAdmin();
    }
    // Cách 2: Nếu user bị biến thành JSON object (mất hàm) -> Check thẳng property
    // Dựa vào model User của bạn: vaitro = 1 là Admin
    return user.vaitro === 1 || user.vaitro === '1';
  };

  // 1. Nếu chưa đăng nhập -> Đẩy về login
  // state={{ from: location }} giúp sau khi login xong tự quay lại trang này
  if (!accessToken || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Nếu route yêu cầu Admin mà user không phải Admin
  if (allowAdminOnly && !isUserAdmin()) {
    return <Navigate to="/" replace />;
  }

  // 3. OK -> Render
  return <Outlet />;
};