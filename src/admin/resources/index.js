import UserList from './users/UserList';
import UserEdit from './users/UserEdit';
// import { UserCreate } from './UserCreate';
import PeopleIcon from '@mui/icons-material/People';

export default {
    list: UserList,
    edit: UserEdit,
    // create: UserCreate,
    // icon: PeopleIcon,
    recordRepresentation: 'hoten', // Hiển thị tên người dùng khi được tham chiếu ở các bảng khác
};