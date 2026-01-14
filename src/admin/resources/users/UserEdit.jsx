import { Edit, SimpleForm, TextInput, SelectInput, BooleanInput } from 'react-admin';

export default function UserEdit(props) {
    return (
        <Edit {...props} title="Chỉnh sửa & Khóa tài khoản">
            <SimpleForm>
                <TextInput source="id" disabled label="Mã người dùng" />
                <TextInput source="email" fullWidth />
                <TextInput source="sdt" label="Số điện thoại" />
                <TextInput source="diachi" label="Địa chỉ" fullWidth />

                {/* Chọn vai trò */}
                <SelectInput source="vaitro" id="vai_tro" label="Quyền hạn" choices={[
                    { id: 1, name: 'Admin' },
                    { id: 2, name: 'Khách hàng' },
                ]} />

                {/* TÍNH NĂNG KHÓA (LOCK) */}
                <BooleanInput
                    source="is_lock"
                    id="is_lock"
                    label="Khóa tài khoản này (Người dùng sẽ không thể đăng nhập)"
                />
            </SimpleForm>
        </Edit>
    );
};