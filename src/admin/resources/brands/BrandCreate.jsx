import React from 'react';
import { Create, SimpleForm, TextInput, ImageInput, ImageField, required } from 'react-admin';

const BrandCreate = (props) => (
    <Create {...props} title="Thêm Thương Hiệu Mới" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Tên thương hiệu" fullWidth validate={required()} />
            <ImageInput source="image" label="Logo thương hiệu" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
export default BrandCreate;