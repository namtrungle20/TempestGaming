import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/dangnhap', credentials);
  const data = response.data;

  // Lưu mọi thứ vào localStorage theo yêu cầu của bạn
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.nguoidung));
  localStorage.setItem('vaitro', data.nguoidung.vaitro);

  return data;
};