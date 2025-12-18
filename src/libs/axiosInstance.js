import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Gắn token theo chuẩn Bearer
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// XỬ LÝ LỖI TRẢ VỀ TOÀN CỤC (Ví dụ: Token hết hạn)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu lỗi 401 (Unauthorized), có thể logout hoặc refresh token tại đây
      console.error("Phiên đăng nhập hết hạn");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;