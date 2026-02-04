import React from 'react';
import { List, Datagrid, TextField, ReferenceField, ImageField, EditButton, DeleteButton } from 'react-admin';

const CategoryList = (props) => (
    <List {...props} title="Danh sách Loại sản phẩm">
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <ImageField source="image" label="Ảnh minh họa" sx={{ '& img': { maxWidth: 50, maxHeight: 50 } }} />
            <TextField source="name" label="Tên loại" style={{ fontWeight: 'bold' }} />
            
            {/* Hiển thị tên Thương hiệu thay vì ID */}
            <ReferenceField source="thuonghieu_id" reference="brands" label="Thuộc Thương hiệu">
                <TextField source="name" />
            </ReferenceField>

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
export default CategoryList;