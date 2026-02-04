import React from 'react';
import { List, Datagrid, TextField, NumberField, ImageField, ReferenceField, EditButton, DeleteButton } from 'react-admin';

const ProductList = (props) => (
    <List {...props} title="Quản lý Sản phẩm">
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <ImageField source="imageUrl" label="Ảnh" sx={{ '& img': { maxWidth: 50, maxHeight: 50 , objectFit: 'cover'} }} />
            <TextField source="name" label="Tên sản phẩm" style={{ fontWeight: 'bold' }} />
            
            {/* Format tiền tệ VND */}
            <NumberField 
                source="price" 
                label="Giá bán" 
                options={{ style: 'currency', currency: 'VND' }} 
                style={{ color: 'green', fontWeight: 'bold' }}
            />
            
            <NumberField source="stock" label="Kho" />

            {/* Hiển thị Category và Brand */}
            <ReferenceField source="categoryId" reference="categories" label="Loại">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="brandId" reference="brands" label="Thương hiệu">
                <TextField source="name" />
            </ReferenceField>

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
export default ProductList;