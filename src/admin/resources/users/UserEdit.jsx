import { Edit, SimpleForm, TextInput, SelectInput, BooleanInput, required } from 'react-admin';

export default function UserEdit(props) {
    return (
        <Edit {...props} title="Chỉnh sửa Tài khoản">
            <SimpleForm>
                <TextInput source="id" disabled label="Mã người dùng" />
                
                {/* Đã xóa nhập Tên, đưa Email lên đầu */}
                <TextInput source="email" fullWidth validate={required()} type="email" />
                
                <TextInput source="sdt" label="Số điện thoại" />
                <TextInput source="diachi" label="Địa chỉ" fullWidth />

                <SelectInput source="vaitro" label="Quyền hạn" choices={[
                    { id: 1, name: 'Admin' },
                    { id: 2, name: 'Khách hàng' },
                ]} />

                <BooleanInput
                    source="is_lock"
                    label="Khóa tài khoản (Cấm đăng nhập)"
                />
            </SimpleForm>
        </Edit>
    );
};