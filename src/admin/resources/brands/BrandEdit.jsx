import React from 'react';
import { Edit, SimpleForm, TextInput, ImageInput, ImageField, required } from 'react-admin';

const BrandEdit = (props) => (
    <Edit {...props} title="Cập nhật Thương Hiệu">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Tên thương hiệu" fullWidth validate={required()} />
            <ImageInput source="image" label="Logo thương hiệu" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
export default BrandEdit;