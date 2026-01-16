import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ImageField,
    EditButton,
    DeleteButton,
    FunctionField
} from 'react-admin';

const ProductList = (props) => (
    <List {...props} title="Danh sách sản phẩm">
        <Datagrid rowClick="edit">
            {/* Hiển thị ID thu gọn */}
            <TextField source="id" label="Mã SP" />

            {/* Hiển thị ảnh (Lưu ý: source="image" lấy từ ProductModel) */}
            <ImageField
                source="image"
                label="Ảnh"
                sx={{
                    '& .RaImageField-image': {
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }
                }}
            />

            <TextField source="name" label="Tên sản phẩm" />

            {/* Định dạng giá tiền VND */}
            <FunctionField
                label="Giá bán"
                render={record => `${record.price?.toLocaleString('vi-VN')} đ`}
            />

            <NumberField source="stock" label="Kho" />
        </Datagrid>
    </List>
);

export default ProductList;