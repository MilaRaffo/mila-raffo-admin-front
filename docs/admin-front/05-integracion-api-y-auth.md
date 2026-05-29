# 05 - Integracion API y Auth

---

## Configuracion

El HTTP client usa:

```typescript
const API_URL = import.meta.env.VITE_MILA_RAFFO_STORE_API;
```

La variable debe apuntar a la base de la API del backend, incluyendo el prefijo si aplica:

```bash
VITE_MILA_RAFFO_STORE_API=http://localhost:3000/api/v1
```

## HTTP client

Ubicacion: `src/lib/http-client.ts`

Responsabilidades:

- Agregar `Content-Type: application/json` cuando corresponde.
- Agregar `Authorization: Bearer <accessToken>` cuando la request requiere auth.
- Reintentar una vez con refresh token ante `401`.
- Convertir respuestas no exitosas en `HttpError`.
- Devolver `undefined` para respuestas `204`.
- Forzar `no-store` en requests `GET`.

## Auth provider

Ubicacion: `src/authProvider.ts`

| Metodo ra-core | Implementacion |
|---|---|
| `login` | `POST /auth/admin/login` con email/password |
| `logout` | `POST /auth/logout` con refresh token, luego limpieza local |
| `checkAuth` | Requiere access token en storage local |
| `checkError` | Limpia sesion ante `401` o `403` |
| `getIdentity` | Devuelve id, nombre completo y avatar indefinido |
| `getPermissions` | Devuelve `session.user.role.name` |

## Storage de sesion

`authStorage` persiste la sesion del admin en storage local del navegador. La sesion contiene:

- `accessToken`
- `refreshToken`
- `user`

El rol efectivo usado por permisos sale de `user.role.name`.

## Data provider

Ubicacion: `src/DataProvider.ts`

Implementa los metodos del contrato `DataProvider`:

- `getList`
- `getOne`
- `getMany`
- `getManyReference`
- `create`
- `update`
- `updateMany`
- `delete`
- `deleteMany`

## Mapeo de recursos a paths

| Resource ra-core | Path API |
|---|---|
| `products` | `/products` |
| `categories` | `/categories` |
| `characteristics` | `/characteristics` |
| `colors` | `/colors` |
| `variants` | `/variants` |
| `images` | `/images` |
| `users` | `/users` |
| `orders` | `/orders` |
| `roles` | `/roles` |

## Paginacion, orden y filtros

`getList` traduce parametros de `ra-core` a query params del backend:

| Origen ra-core | Query backend |
|---|---|
| `pagination.page` + `pagination.perPage` | `limit` + `offset` |
| `sort.field` | `sortBy` |
| `sort.order` | `sortOrder` |
| `filter` | keys directas no vacias |

La respuesta esperada es:

```typescript
{
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  }
}
```

## Normalizacion de registros

`normalizeRecord()` adapta relaciones backend para formularios:

| Recurso | Normalizacion |
|---|---|
| `products` | `categories[]` -> `categoryIds[]`; asegura `characteristics[].characteristicId` |
| `categories` | `parent.id` -> `parentId` |
| `variants` | `product.id` -> `productId`; `color.id` -> `colorId` |
| `colors` | `image.id` -> `imageId` |
| `images` | `variant.id` -> `variantId` |

## Payloads especiales

Productos:

- `categoryIds` se normaliza como array de ids.
- `characteristics` se filtra por `characteristicId` y convierte `value` a string.

Variantes:

- En create puede incluir `productId`.
- En update se elimina `productId`.
- Se permite `colorId: null`.
- El HTTP client tiene una defensa adicional para sanear `PATCH /variants/:id`.

Imagenes:

- Si hay `file.rawFile`, se usa `POST /images/upload` con `FormData`.
- `alt` y `variantId` se agregan al `FormData` si existen.

## Referencias

Caso especial:

- `getManyReference("variants", { target: "productId" })` usa `GET /products/:id/variants`.

El resto de referencias usa el path base del recurso con el filtro `[target]=id`.
