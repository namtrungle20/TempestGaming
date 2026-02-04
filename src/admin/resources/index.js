import { MoveRight, Tag, Layers } from "lucide-react";
// 1. PRODUCTS
import ProductList from "./products/ProductList";
import ProductCreate from "./products/ProductCreate";
import ProductEdit from "./products/ProductEdit"; // Nên tạo thêm file này để sửa sản phẩm

// 2. BRANDS
import BrandList from "./brands/BrandList";
import BrandCreate from "./brands/BrandCreate";
import BrandEdit from "./brands/BrandEdit";// Nên tạo thêm file này để sửa thương hiệu

// 3. CATEGORIES
import CategoryList from "./categories/CategoryList";
import CategoryCreate from "./categories/CategoryCreate";
import CategoryEdit from "./categories/CategoryEdit";

import UserList from "./users/UserList";
import UserEdit from "./users/UserEdit";
import PeopleIcon from '@mui/icons-material/People';

export const resources = [
    {
        name: "users",          // Tên resource dùng trong code (URL là /#/users)
        list: UserList,         // Trang danh sách
        edit: UserEdit,         // <--- BẮT BUỘC CÓ DÒNG NÀY ĐỂ VÀO TRANG EDIT
        icon: PeopleIcon,
        options: { label: "Người dùng" }
    },
    {
        name: "products",
        list: ProductList,      // Hiển thị danh sách (Table)
        create: ProductCreate,  // Form thêm mới
        edit: ProductEdit,      // Form chỉnh sửa (quan trọng)
        icon: Tag,
        options: { label: "Sản phẩm" }
    },
    {
        name: "brands",
        list: BrandList,
        create: BrandCreate,
        edit: BrandEdit,
        icon: Layers,
        options: { label: "Thương hiệu" } // Thêm/Xóa thương hiệu ở đây
    },
    {
        name: "categories",
        list: CategoryList,
        create: CategoryCreate,
        edit: CategoryEdit,
        icon: MoveRight,
        options: { label: "Loại sản phẩm" } // Gán loại sp vào thương hiệu ở đây
    }
];