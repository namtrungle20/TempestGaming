import React from "react";

export const RenderImage = ({ src, alt, className, ...props }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getImageUrl = (fileName) => {
    // 1. Nếu không có tên file hoặc là text rỗng
    if (!fileName || fileName === "") return "https://via.placeholder.com/50?text=No+Image";

    // 2. Nếu là link tuyệt đối (ảnh từ internet)
    const baseUrl = BACKEND_URL.replace('/api', '');

    // 3. FIX LỖI: Sử dụng fileName (tham số truyền vào) thay vì bra.image
    // encodeURIComponent sẽ biến "Sony - Logo.png" thành "Sony%20-%20Logo.png" chuẩn URL
    const cleanFileName = fileName.trim();
    return `${baseUrl}/uploads/${encodeURIComponent(cleanFileName)}`;
  };

  return (
    <img
      src={getImageUrl(src)}
      alt={alt || "Tempest Image"}
      className={className}
      {...props}
      onError={(e) => {
        e.target.onerror = null; // Tránh lặp vô tận nếu link placeholder cũng die
        e.target.src = "https://via.placeholder.com/50";
      }}
    />
  );
};