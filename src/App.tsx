import { Resource } from 'ra-core';
import './App.css'
import { Admin } from "./components/admin"
import { ProductCreate } from './products/createProduct';
import { ProductList } from './products/products';
import { ProductShow } from './products/showProduct';
import { VariantCreate } from './products/createVariant';
import { CategoryList } from './categories/categories';
import { UserList } from './users/users';
import { CharacteristicList } from './characteristics/characteristics';
import { LeatherList } from './leathers/leathers';

export const App = () => {
    return(
        <Admin>
            <Resource name='users' list={UserList} />
            <Resource name='products' list={ProductList} create={ProductCreate} show={ProductShow} />
            <Resource name='variants' create={VariantCreate} />
            <Resource name='categories' list={CategoryList} />
            <Resource name='characteristics' list={CharacteristicList} />
            <Resource name='leathers' list={LeatherList} />
        </Admin>
    )
};

