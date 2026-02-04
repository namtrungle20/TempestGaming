import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');

  if (token && token !== "undefined" && token !== "null") {
    console.log("Đã có token, chặn vào trang login/signup");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};