# 06 - Formularios, Estado y UI

---

## Estado de aplicacion

El estado principal lo maneja `ra-core`:

- Cache de queries.
- Estado de formularios.
- Recursos activos.
- Permisos.
- Navegacion CRUD.
- Notificaciones.

El repositorio no usa Zustand ni un store global propio. La sesion se mantiene con `authStorage`.

## Formularios

Las vistas `Create` y `Edit` usan `SimpleForm` y componentes del kit admin.

Patrones comunes:

- `TextInput` para strings.
- `NumberInput` para precios, stock, cantidades e importes.
- `BooleanInput` para flags.
- `ReferenceInput` para relaciones uno-a-uno.
- `ReferenceArrayInput` para relaciones multiples.
- `ArrayInput` + `SimpleFormIterator` para listas embebidas.
- `FileInput` + `FileField` para imagenes.

## Transforms

Algunas vistas transforman datos antes de llegar al data provider:

| Archivo | Transform |
|---|---|
| `src/products/createProduct.tsx` | Convierte caracteristicas a `{ characteristicId, value }` |
| `src/products/editProduct.tsx` | Igual que create |
| `src/variants/variants.tsx` | En update limita payload a sku, price, stock, isAvailable, colorId e imageFiles |
| `src/variants/variants.tsx` | En create completa `productId` desde `location.state` si existe |

## Validadores

Ubicacion: `src/lib/validators.ts`

Agrupa validadores de `ra-core`:

- `required`
- `email`
- `number`
- `minLength`
- `maxLength`
- `minValue`
- `regex`

Validaciones relevantes:

| Dominio | Validadores |
|---|---|
| Producto | nombre, descripcion, precio, caracteristica |
| Categoria | nombre, slug, descripcion |
| Caracteristica | nombre, tipo requerido |
| Color | nombre, codigo, hex |
| Variante | SKU, precio |
| Usuario | nombre, apellido, email, password, telefono |
| Orden | cantidad, tracking, notas, direcciones, telefono E.164 |

## Permisos de UI

Ubicacion: `src/security/access.tsx`

`CanAccess` lee permisos desde `usePermissions()` de `ra-core` y renderiza `fallback` cuando el rol actual no esta permitido.

Roles conocidos:

- `client`
- `admin`
- `superadmin`

Uso actual:

- Crear orden: roles `admin` y `superadmin`.
- Editar orden: roles `admin` y `superadmin`.

Esta restriccion es solo de UI. El backend debe mantener autorizacion real.

## Componentes visuales

El proyecto combina:

- `src/components/admin`: componentes del admin kit y wrappers de recursos.
- `src/components/ui`: primitives visuales shadcn/Radix.
- Tailwind CSS desde `src/index.css`, `src/App.css` y configuracion del proyecto.

## Tema y layout

`ThemeProvider` envuelve el `CoreAdminUI`. El layout incluye:

- Sidebar colapsable.
- Header compacto.
- Soporte de tema claro/oscuro.
- Notificaciones con `sonner`.
- Error boundary global.

## Internacionalizacion

`src/lib/i18nProvider.ts` configura traducciones mediante `ra-i18n-polyglot` y mensajes base de `ra-language-english`.

La UI del dominio usa labels en espanol directamente dentro de los componentes de recurso.
