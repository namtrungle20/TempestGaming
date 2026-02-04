import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, ImageInput, ImageField, required } from 'react-admin';

const CategoryCreate = (props) => (
    <Create {...props} title="Thêm Loại Sản Phẩm" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Tên loại sản phẩm" fullWidth validate={required()} />
            
            {/* Chọn thương hiệu cha */}
            <ReferenceInput source="thuonghieu_id" reference="brands">
                <SelectInput optionText="name" label="Thuộc Thương hiệu" fullWidth validate={required()} />
            </ReferenceInput>

            <ImageInput source="image" label="Ảnh minh họa" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
export default CategoryCreate;