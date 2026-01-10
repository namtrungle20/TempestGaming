import { List, Datagrid, TextField, EmailField, ChipField, EditButton, DeleteButton, FunctionField, TextInput, BooleanField } from 'react-admin';

const userFilters = [
    <TextInput label="Tìm theo Email" source="q" alwaysOn />, // Luôn hiện ô search
];

export default function UserList(props) {
    return (
        <List {...props} filters={userFilters} title="Quản lý thành viên">
            <Datagrid rowClick="edit">
                {/* 1. SỬA TẠI ĐÂY: Dùng source="id" vì trong dataProvider bạn đã gán id = item.nguoidung_id */}
                <TextField source="id" label="ID" />

                <EmailField source="email" label="Email" />

                {/* Đảm bảo source "sdt" viết thường giống hệt trong Database/API */}
                <TextField source="sdt" label="Số điện thoại" />
                <TextField source="diachi" label="Địa Chỉ" />

                <FunctionField
                    label="Trạng thái"
                    source="is_lock"
                    render={record => {
                        // Kiểm tra record.is_lock là số 1 hoặc chuỗi '1'
                        const isLocked = record.is_lock === 1 || record.is_lock === '1';
                        return (
                            <span style={{
                                backgroundColor: isLocked ? '#ffebee' : '#e8f5e9',
                                color: isLocked ? '#d32f2f' : '#2e7d32',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}>
                                {isLocked ? '🚫 Đã khóa' : '✅ Hoạt động'}
                            </span>
                        );
                    }}
                />

                {/* 2. Dùng FunctionField để hiển thị Role cho chuyên nghiệp */}
                <FunctionField
                    label="Vai trò"
                    render={record => {
                        const isPrimary = record.vaitro === 1 || record.vaitro === '1';
                        return (
                            <span style={{
                                color: isPrimary ? 'red' : 'green',
                                fontWeight: 'bold'
                            }}>
                                {isPrimary ? 'Admin' : 'Khách hàng'}
                            </span>
                        );
                    }}
                />

                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
}