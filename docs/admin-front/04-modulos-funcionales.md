# 04 - Modulos Funcionales

---

## Auth

Ubicacion:

- `src/authProvider.ts`
- `src/lib/auth-storage.ts`
- `src/lib/http-client.ts`

Responsabilidades:

- Login administrativo contra `POST /auth/admin/login`.
- Logout contra `POST /auth/logout`.
- Persistencia local de `accessToken`, `refreshToken` y `user`.
- Refresh token contra `POST /auth/refresh`.
- Exponer identidad y rol a `ra-core`.

## Dashboard

Ubicacion: `src/dashboard/Dashboard.tsx`

Responsabilidades:

- Mostrar resumen operativo.
- Obtener totales de `users`, `orders`, `products`, `colors` y `categories`.

## Products

Ubicacion: `src/products`

Responsabilidades:

- Listar productos con filtros de nombre, disponibilidad, categoria y rango de precio.
- Crear y editar producto con categorias multiples.
- Asociar caracteristicas dinamicas.
- Mostrar detalle del producto y relaciones.

Campos relevantes:

- `name`
- `description`
- `categoryIds`
- `basePrice`
- `available`
- `isCustomizable`
- `characteristics[]`

## Categories

Ubicacion: `src/categories/categories.tsx`

Responsabilidades:

- CRUD de categorias.
- Relacion opcional con categoria padre.
- Estado activo/inactivo.

Campos relevantes:

- `name`
- `slug`
- `description`
- `parentId`
- `active`

## Characteristics

Ubicacion: `src/characteristics/characteristics.tsx`

Responsabilidades:

- CRUD de caracteristicas de producto.
- Definir tipo de dato y unidad.

Tipos soportados:

- `number`
- `text`
- `boolean`

Unidades soportadas:

- `Kg`
- `g`
- `m`
- `cm`
- `mm`
- `L`
- `in`

## Colors

Ubicacion: `src/leathers/leathers.tsx`

Responsabilidades:

- CRUD del recurso API `colors`.
- Mostrar swatch por `hex`.
- Asociar imagen opcional si el backend lo devuelve.

Campos relevantes:

- `name`
- `code`
- `hex`
- `isActive`
- `imageId`

## Images

Ubicacion: `src/images/images.tsx`

Responsabilidades:

- Listar imagenes con preview.
- Subir archivo con `FileInput`.
- Editar texto alternativo y asociacion opcional a variante.
- Mostrar detalle con preview grande.

Cuando se crea una imagen con archivo local, el data provider usa `POST /images/upload` con `FormData`.

## Variants

Ubicacion: `src/variants/variants.tsx`

Responsabilidades:

- CRUD de variantes.
- Asociar variante a producto.
- Asociar color.
- Gestionar precio, stock, disponibilidad y SKU.
- Subir una o mas imagenes asociadas a la variante.

Reglas relevantes del frontend:

- En creacion se incluye `productId`.
- En actualizacion no se envia `productId`.
- Despues de subir imagenes, se vuelve a pedir la variante para hidratar el registro.
- Si se crea una variante desde el detalle de producto, se puede recibir `productId` por `location.state`.

## Orders

Ubicacion: `src/orders/orders.tsx`

Responsabilidades:

- Listar ordenes.
- Crear orden manual con items y direcciones.
- Editar estado, tracking y notas.
- Mostrar resumen, importes, cliente, direcciones e items.

Restricciones de UI:

- Crear y editar ordenes esta envuelto en `CanAccess` para roles `admin` y `superadmin`.

Estados de orden usados:

- `pending`
- `confirmed`
- `processing`
- `shipped`
- `delivered`
- `cancelled`
- `refunded`

## Users

Ubicacion: `src/users/users.tsx`

Responsabilidades:

- CRUD de usuarios.
- Asociar rol via `ReferenceInput` a `roles`.
- Mostrar estado activo/inactivo.

Campos relevantes:

- `name`
- `lastName`
- `email`
- `password` solo en creacion
- `phone`
- `roleId`

## Roles

`roles` esta registrado como recurso sin vistas propias. Su uso principal es alimentar referencias desde formularios como usuarios.
