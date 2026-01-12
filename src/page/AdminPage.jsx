import { Admin, Resource } from "react-admin";
import { dataProvider } from "@/admin/providers/dataProvider";
import { authProvider } from "@/admin/providers/authProvider";
import user from "../admin/resources";
import PeopleIcon from '@mui/icons-material/People'; // Thêm icon cho đẹp

const AdminPage = () => (
    <Admin
        basename="/admin"
        dataProvider={dataProvider}
        authProvider={authProvider}
        // Bỏ thuộc tính dashboard ở đây
    >
        {/* Resource nào nằm trên cùng sẽ là trang chủ mặc định của Admin */}
        <Resource 
            name="nguoidung" 
            {...user} 
            icon={PeopleIcon}
            options={{ label: "Quản lý thành viên" }} 
        />

        {/* Thêm các Resource khác bên dưới */}
        {/* <Resource 
            name="sanpham" 
            list={UserList} // Tạm thời dùng chung List để test
            options={{ label: "Sản phẩm" }} 
        /> */}
    </Admin>
);

export default AdminPage;