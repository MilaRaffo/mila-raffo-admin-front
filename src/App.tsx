import { Resource } from 'ra-core';
import './App.css'
import { Admin } from "./components/admin"
import { dataProvider } from './DataProvider';
import { authProvider } from './authProvider';
import { Dashboard } from './dashboard/Dashboard';
import { ProductList } from './products/products';
import { ProductCreate } from './products/createProduct';
import { ProductEdit } from './products/editProduct';
import { ProductShow } from './products/showProduct';
import { CategoryList, CategoryCreate, CategoryEdit, CategoryShow } from './categories/categories';
import {
    CharacteristicList,
    CharacteristicCreate,
    CharacteristicEdit,
    CharacteristicShow,
} from './characteristics/characteristics';
import { ColorList, ColorCreate, ColorEdit, ColorShow } from './colors/colors';
import { ImageCreate, ImageEdit, ImageList, ImageShow } from './images/images';
import { VariantList, VariantCreate, VariantEdit, VariantShow } from './variants/variants';
import { OrderList, OrderCreate, OrderEdit, OrderShow } from './orders/orders';
import { UserList, UserCreate, UserEdit, UserShow } from './users/users';
import { SectionsList } from './sections/sections';
import { SectionCreate } from './sections/createSection';
import { SectionEdit } from './sections/editSection';
import { NotificationCreate } from './notifications/NotificationCreate';

export const App = () => {
    return(
        <Admin
            dashboard={Dashboard}
            dataProvider={dataProvider}
            authProvider={authProvider}
            requireAuth
            title="Mila Raffo"
        >
            <Resource name='products' options={{ label: 'Productos' }} list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} recordRepresentation="name" />
            <Resource name='categories' options={{ label: 'Categorías' }} list={CategoryList} create={CategoryCreate} edit={CategoryEdit} show={CategoryShow} recordRepresentation="name" />
            <Resource name='characteristics' options={{ label: 'Características' }} list={CharacteristicList} create={CharacteristicCreate} edit={CharacteristicEdit} show={CharacteristicShow} recordRepresentation="name" />
            <Resource name='colors' options={{ label: 'Colores' }} list={ColorList} create={ColorCreate} edit={ColorEdit} show={ColorShow} recordRepresentation="name" />
            <Resource name='images' options={{ label: 'Imágenes' }} list={ImageList} create={ImageCreate} edit={ImageEdit} show={ImageShow} recordRepresentation="alt" />
            <Resource name='variants' options={{ label: 'Variantes' }} list={VariantList} create={VariantCreate} edit={VariantEdit} show={VariantShow} recordRepresentation="sku" />
            <Resource name='orders' options={{ label: 'Órdenes' }} list={OrderList} create={OrderCreate} edit={OrderEdit} show={OrderShow} recordRepresentation="orderNumber" />
            <Resource name='users' options={{ label: 'Usuarios' }} list={UserList} create={UserCreate} edit={UserEdit} show={UserShow} recordRepresentation="email" />
            <Resource name='sections' options={{ label: 'Secciones' }} list={SectionsList} create={SectionCreate} edit={SectionEdit} recordRepresentation="title" />
            <Resource name='notifications' options={{ label: 'Notificaciones' }} list={NotificationCreate} />
        </Admin>
    )
};

