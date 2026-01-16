import ProductList from './ProductList';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export { ProductList, ProductCreate, ProductEdit };

export default {
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit,
    icon: ShoppingCartIcon,
    name: 'sanpham' // Khớp với key trong adminConfig và tên resource API
};