import React from 'react'
import { List, Datagrid, TextField, EmailField, ChipField } from 'react-admin';
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
                </Datagrid>
            </List>
        </>
    )
}
