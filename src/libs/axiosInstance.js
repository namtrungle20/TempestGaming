import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
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
    // CHỈ xóa token, KHÔNG redirect thủ công bằng window.location
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('nguoidung');
      // Hãy để authProvider của React-Admin lo việc redirect
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;