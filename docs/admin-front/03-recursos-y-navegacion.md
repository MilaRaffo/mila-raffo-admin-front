# 03 - Recursos y Navegacion

---

## Modelo de navegacion

La navegacion CRUD la administra `ra-core` a partir de los `<Resource>` declarados en `src/App.tsx`.

Cada recurso puede resolver rutas de lista, creacion, edicion y detalle cuando se le pasan componentes:

```tsx
<Resource
  name="products"
  list={ProductList}
  create={ProductCreate}
  edit={ProductEdit}
  show={ProductShow}
/>
```

## Recursos activos

| Recurso | Label UI | Representacion | Componentes |
|---|---|---|---|
| `products` | Productos | `name` | `ProductList`, `ProductCreate`, `ProductEdit`, `ProductShow` |
| `categories` | Categorias | `name` | `CategoryList`, `CategoryCreate`, `CategoryEdit`, `CategoryShow` |
| `characteristics` | Caracteristicas | `name` | `CharacteristicList`, `CharacteristicCreate`, `CharacteristicEdit`, `CharacteristicShow` |
| `colors` | Colores | `name` | `LeatherList`, `LeatherCreate`, `LeatherEdit`, `LeatherShow` |
| `images` | Imagenes | `alt` | `ImageList`, `ImageCreate`, `ImageEdit`, `ImageShow` |
| `variants` | Variantes | `sku` | `VariantList`, `VariantCreate`, `VariantEdit`, `VariantShow` |
| `orders` | Ordenes | `orderNumber` | `OrderList`, `OrderCreate`, `OrderEdit`, `OrderShow` |
| `users` | Usuarios | `email` | `UserList`, `UserCreate`, `UserEdit`, `UserShow` |
| `roles` | Roles | default | Solo recurso para data/reference |

## Rutas esperadas

Las rutas son generadas por `ra-core`. El patron practico es:

| Accion | Ruta conceptual |
|---|---|
| Lista | `/<resource>` |
| Crear | `/<resource>/create` |
| Detalle | `/<resource>/:id/show` |
| Editar | `/<resource>/:id` |

## Dashboard

`src/dashboard/Dashboard.tsx` usa `useGetList` para calcular KPIs por conteo total:

- Usuarios.
- Ordenes.
- Productos.
- Colores.
- Categorias.

Cada KPI pide una pagina de 1 registro y usa el `total` devuelto por el data provider.

## Sidebar y acciones globales

El layout incluye:

- Sidebar de recursos.
- Breadcrumb.
- Menu de idioma.
- Toggle de tema.
- Boton de refresh.
- Menu de usuario.

La fuente de verdad para los recursos visibles es la combinacion de `src/App.tsx` y los componentes del kit admin.

## Recursos no montados

Existe codigo para `sections` (`src/sections/*`), pero no esta registrado como `<Resource>` en `src/App.tsx`. En el estado actual del repo no forma parte del alcance navegable del admin.
