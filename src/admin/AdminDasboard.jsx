import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import users from './resources';

export const AdminDashboard = () => (
    <Admin basename="/admin"
        dataProvide={dataProvider}
        authProvider={authProvider}>

        <Resource
            name='nguoidung'
            {...users} // Tự động hiểu list={UserList}, edit={UserEdit}...
            options={{ label: 'Người Dùng' }}
        />
    </Admin>
);

export default AdminDashboard;