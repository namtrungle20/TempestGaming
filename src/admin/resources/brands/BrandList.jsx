import React from 'react';
import { List, Datagrid, TextField, ImageField, EditButton, DeleteButton } from 'react-admin';

const BrandList = (props) => (
    <List {...props} title="Danh sách Thương hiệu">
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <ImageField source="image" label="Logo" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} />
            <TextField source="name" label="Tên thương hiệu" style={{ fontWeight: 'bold' }} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
export default BrandList;