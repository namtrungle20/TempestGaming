import React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, ImageInput, ImageField, required } from 'react-admin';

const CategoryEdit = (props) => (
    <Edit {...props} title="Cập nhật Loại Sản Phẩm">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Tên loại sản phẩm" fullWidth validate={required()} />
            
            <ReferenceInput source="thuonghieu_id" reference="brands">
                <SelectInput optionText="name" label="Thuộc Thương hiệu" fullWidth validate={required()} />
            </ReferenceInput>

            <ImageInput source="image" label="Ảnh minh họa" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
export default CategoryEdit;