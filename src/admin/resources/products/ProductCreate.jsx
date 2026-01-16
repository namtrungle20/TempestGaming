import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, ImageInput, ImageField } from 'react-admin';

const ProductCreate = (props) => (
    <Create {...props} title="Thêm sản phẩm mới">
        <SimpleForm>
            <TextInput source="ten_sp" label="Tên sản phẩm" fullWidth />
            <NumberInput source="gia" label="Giá bán" />
            <NumberInput source="so_luong" label="Số lượng kho" />
            
            {/* Input cho hình ảnh - Phải khớp với validateImageExists ở backend */}
            <ImageInput source="hinh_anh" label="Hình ảnh sản phẩm" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>

            <TextInput source="mo_ta" label="Mô tả" multiline fullWidth />
        </SimpleForm>
    </Create>
);

export default ProductCreate;