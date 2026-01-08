import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

export default function UserEdit() {
    return (
        <>
            <Edit title="Chỉnh sửa người dùng">
                <SimpleForm>
                    <TextInput source="id" disabled />
                    <TextInput source="email" disabled />
                    <TextInput source="sdt" label="Số điện thoại" />
                    <TextInput source="diachi" label="Địa chỉ" multiline />

                    <SelectInput source="vaitro" label="Quyền truy cập" choices={[
                        { id: '1', name: 'Admin (Quản trị)' },
                        { id: '2', name: 'User (Khách hàng)' },
                    ]} />
                </SimpleForm>
            </Edit>
        </>
    )
}
