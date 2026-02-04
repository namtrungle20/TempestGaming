import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, BooleanField } from 'react-admin';

const UserList = (props) => (
    <List {...props} title="Quản lý Người dùng">
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            
            {/* Đã xóa TextField source="ten" */}
            <EmailField source="email" style={{ fontWeight: 'bold' }} />
            
            <TextField source="sdt" label="SĐT" />
            
            {/* Hiển thị trạng thái khóa cho trực quan */}
            <BooleanField source="is_lock" label="Đang khóa" />

            <EditButton />
        </Datagrid>
    </List>
);

export default UserList;