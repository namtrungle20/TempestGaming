import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ImageInput,
    ImageField,
    Labeled
} from 'react-admin';

const ProductEdit = (props) => (
    <Edit {...props} title="Chỉnh sửa sản phẩm">
        <SimpleForm>
            {/* ID để chế độ disabled */}
            <TextInput source="id" label="Mã sản phẩm" disabled />

            <TextInput source="name" label="Tên sản phẩm" fullWidth />
            <TextInput source="description" label="Mô tả" multiline fullWidth />

            <div style={{ display: 'flex', gap: '20px' }}>
                <NumberInput source="price" label="Giá bán (VND)" />
                <NumberInput source="stock" label="Số lượng kho" />
            </div>

            {/* Hiển thị ảnh hiện tại một cách rõ ràng */}
            <Labeled label="Ảnh hiện tại">
                <ImageField source="image" sx={{ '& img': { maxWidth: 200, maxHeight: 200, objectFit: 'contain', mt: 1 } }} />
            </Labeled>

            {/* Input chọn ảnh mới */}
            <ImageInput
                source="image" // Vẫn dùng chung source để dataProvider dễ xử lý
                label="Cập nhật ảnh mới (Cloudinary)"
                accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                // QUAN TRỌNG: Format để tránh lỗi "Skipped 0"
                // Nếu giá trị là string (URL từ cloud), ta trả về null để Input không bị loạn
                // Nếu là Object (file mới chọn), giữ nguyên để hiển thị preview
                format={value => (typeof value === 'string' ? null : value)}
            >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export default ProductEdit;