import React from 'react';
import {
    Create, SimpleForm, TextInput, NumberInput, ImageInput, ImageField,
    ReferenceInput, SelectInput, FormDataConsumer, required
} from 'react-admin';

const ProductCreate = (props) => (
    <Create {...props} title="Thêm Sản Phẩm Mới" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Tên sản phẩm" fullWidth validate={required()} />

            <div className="flex gap-4 w-full">
                <NumberInput source="price" label="Giá bán (VNĐ)" validate={required()} min={0} />
                <NumberInput source="stock" label="Số lượng tồn kho" validate={required()} min={0} />
            </div>

            {/* --- LOGIC LỌC PHỤ THUỘC --- */}

            {/* 1. Chọn Thương Hiệu trước */}
            <ReferenceInput source="brandId" reference="brands">
                <SelectInput label="Chọn Thương hiệu" fullWidth validate={required()} />
            </ReferenceInput>

            {/* 2. Chọn Loại SP (Chỉ hiện loại thuộc thương hiệu đã chọn) */}
            <FormDataConsumer>
                {({ formData, ...rest }) => (
                    formData.thuonghieu_id ? (
                        <ReferenceInput
                            source="categoryId"
                            reference="categories"
                            // API Filter: ?thuonghieu_id=...
                            filter={{ thuonghieu_id: formData.thuonghieu_id }}
                            {...rest}
                        >
                            <SelectInput
                                label="Chọn Loại sản phẩm"
                                optionText="name"
                                fullWidth
                                validate={required()}
                            />
                        </ReferenceInput>
                    ) : (
                        <SelectInput source="categoryId" label="(Vui lòng chọn thương hiệu trước)" disabled fullWidth />
                    )
                )}
            </FormDataConsumer>
            {/* --------------------------- */}

            <ImageInput source="image" label="Hình ảnh sản phẩm" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>

            <TextInput source="description" label="Mô tả chi tiết" multiline fullWidth rows={3} />
        </SimpleForm>
    </Create>
);
export default ProductCreate;