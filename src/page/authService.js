import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/nguoidung";

/**
 * Đăng nhập người dùng
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, nguoidung: object}>}
 */
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/dangnhap`, { email, password });
    return res.data.data; // { token, nguoidung }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};

/**
 * Đăng xuất người dùng
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("vaitro");
  localStorage.removeItem("email");
};

/**
 * Lấy thông tin người dùng hiện tại từ localStorage
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  const vaitro = localStorage.getItem("vaitro");
  const email = localStorage.getItem("email");
  if (!token) return null;
  return { token, role: Number(vaitro), email };
};
