import React from 'react';
import { 
    Edit, SimpleForm, TextInput, NumberInput, ImageInput, ImageField, 
    ReferenceInput, SelectInput, FormDataConsumer, required 
} from 'react-admin';

const ProductEdit = (props) => (
    <Edit {...props} title="Cập nhật Sản phẩm">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="ten_sp" label="Tên sản phẩm" fullWidth validate={required()} />
            
            <div className="flex gap-4 w-full">
                <NumberInput source="gia" label="Giá bán" validate={required()} />
                <NumberInput source="so_luong" label="Tồn kho" validate={required()} />
            </div>

            {/* Logic lọc tương tự Create */}
            <ReferenceInput source="thuonghieu_id" reference="brands">
                <SelectInput label="Thương hiệu" fullWidth validate={required()} />
            </ReferenceInput>

            <FormDataConsumer>
                {({ formData, ...rest }) => (
                    <ReferenceInput 
                        source="loai_id" 
                        reference="categories" 
                        // Nếu có thuonghieu_id thì lọc, ko thì hiện tất cả hoặc rỗng tùy logic backend
                        filter={formData.thuonghieu_id ? { thuonghieu_id: formData.thuonghieu_id } : {}} 
                        {...rest}
                    >
                        <SelectInput label="Loại sản phẩm" optionText="name" fullWidth validate={required()} />
                    </ReferenceInput>
                )}
            </FormDataConsumer>

            <ImageInput source="hinh_anh" label="Hình ảnh (Cập nhật ảnh mới)" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            
            <TextInput source="mo_ta" label="Mô tả" multiline fullWidth />
        </SimpleForm>
    </Edit>
);
export default ProductEdit;