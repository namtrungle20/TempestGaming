import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

export default function UserEdit() {
    return (
        <>
            <Edit title="Chỉnh sửa người dùng">
                <SimpleForm>
                    <TextInput source="id" disabled />
                    <TextInput source="hoten" fullWidth />
                    <TextInput source="loginKey" label="Tên đăng nhập" fullWidth />
                    <SelectInput source="vaitro" choices={[
                        { id: 'admin', name: 'Quản trị viên' },
                        { id: 'user', name: 'Người dùng' },
                    ]} />
                </SimpleForm>
            </Edit>
        </>
    )
}
