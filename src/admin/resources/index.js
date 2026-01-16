import user from './users';
import product from './products';

// Export lẻ nếu cần dùng component riêng biệt
export * from './users';
export * from './products';

// Export mặc định là một object chứa tất cả các resource để AdminPage loop qua
export const resources = [
    user,
    product
];