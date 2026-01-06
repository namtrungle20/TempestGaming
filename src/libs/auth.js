import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/dangnhap', credentials);
    const data = response.data;

    // Lưu mọi thứ vào localStorage theo yêu cầu của bạn
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('nguoidung', JSON.stringify(data));
    localStorage.setItem('vaitro', data.vaitro);

    return { success: true, data };
  } catch (error) {
    console.error("Login Error:", error);

    // Trả về thông báo lỗi cụ thể từ Backend hoặc lỗi mặc định
    const message = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!";
    return { success: false, message };
  }
};
export const logout = () => {
  localStorage.clear();
  // Có thể điều hướng về trang login nếu không dùng React-admin logout
  window.location.href = '/signin';
};
export default axiosInstance;