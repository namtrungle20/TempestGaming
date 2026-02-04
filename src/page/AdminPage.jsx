import { Admin, Resource } from "react-admin";
import { dataProvider } from "@/admin/providers/dataProvider";
import { authProvider } from "@/admin/providers/authProvider";
import { resources } from "@/admin/resources"; // Import mảng resources tổng

const AdminPage = () => (
    <Admin
        basename="/admin"
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        {resources.map((resource) => (
            <Resource 
                key={resource.name}
                name={resource.name}
                list={resource.list}
                create={resource.create}
                edit={resource.edit}
                icon={resource.icon}
                options={resource.options}
            />
        ))}
    </Admin>
);

export default AdminPage;