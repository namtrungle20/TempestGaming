import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    FunctionField,
    TextInput,
} from 'react-admin';

// 1. Đưa Filter ra ngoài hoàn toàn để không bao giờ bị re-create khi UserList render
const UserFilters = [
    <TextInput key="search" label="Tìm kiếm" source="q" alwaysOn />,
];

// 2. Tách nhỏ các logic render Style để React-admin tối ưu hóa việc diffing DOM
const StatusBadge = ({ record }) => {
    const isLocked = Number(record?.is_lock) === 1;
    return (
        <span style={{
            backgroundColor: isLocked ? '#ffebee' : '#e8f5e9',
            color: isLocked ? '#d32f2f' : '#2e7d32',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            display: 'inline-block',
            minWidth: '90px',
            textAlign: 'center'
        }}>
            {isLocked ? '🚫 Đã khóa' : '✅ Hoạt động'}
        </span>
    );
};

const RoleBadge = ({ record }) => {
    const isAdmin = Number(record?.vaitro) === 1;
    return (
        <span style={{ 
            color: isAdmin ? '#d32f2f' : '#2e7d32', 
            fontWeight: 'bold' 
        }}>
            {isAdmin ? 'Admin' : 'Khách hàng'}
        </span>
    );
};

const UserList = (props) => {
    // Log này bây giờ sẽ chỉ chạy 1-2 lần. Nếu vẫn nhảy liên tục => Lỗi tại AdminDashboard
    console.log("🚀 RENDER CHECK:", new Date().toLocaleTimeString());

    return (
        <List
            {...props}
            title="Quản lý thành viên"
            perPage={10}
            filters={UserFilters}
            sort={{ field: 'id', order: 'DESC' }}
            
            /* CÁC CHỐT CHẶN HIỆU NĂNG */
            disableSyncWithLocation // Chặn đứng việc ghi URL gây loop
            storeKey={false}        // Chặn đứng việc ghi vào Redux/Store gây lặp
            pagination={false}         // Chỉ trigger search sau khi ngừng gõ 0.5s
        >
            <Datagrid optimized
                rowClick="edit" 
                bulkActionButtons={false}
            >
                <TextField source="id" label="ID" />
                <EmailField source="email" label="Email" />
                <TextField source="sdt" label="Số điện thoại" />

                <FunctionField 
                    label="Trạng thái" 
                    render={record => <StatusBadge record={record} />} 
                />

                <FunctionField 
                    label="Vai trò" 
                    render={record => <RoleBadge record={record} />} 
                />
            </Datagrid>
        </List>
    );
};

// Sử dụng memo để tránh re-render khi component cha thay đổi state không liên quan
export default UserList;