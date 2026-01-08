import React from 'react'
import { List, Datagrid, TextField, EmailField, ChipField, EditButton, DeleteButton } from 'react-admin';

const RoleField = ({ record }) => {
    const isPrimary = record.vaitro === '1' || record.vaitro === 1;
    return (
        <span style={{
            color: isPrimary ? 'red' : 'green',
            fontWeight: 'bold'
        }}>
            {isPrimary ? 'Admin' : 'Khách hàng'}
        </span>
    );
};
export default function UserList() {
    return (
        <>
            <List title="Quản lý thành viên">
                <Datagrid rowClick="edit">
                    <TextField source="id" label="ID" />
                    <TextField source="hoten" label="Họ Tên" />
                    <TextField source="loginKey" label="Tên đăng nhập" />
                    <EmailField source="email" label="Email" />
                    <ChipField source="vaitro" label="Vai trò" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </List>
        </>
    )
}
