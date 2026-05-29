# 02 - Arquitectura

---

## Resumen

La aplicacion es una SPA Vite. `src/main.tsx` monta `<App />`, y `src/App.tsx` monta el `<Admin>` de shadcn-admin-kit con proveedores de datos, autenticacion, dashboard y recursos.

```
src/
|-- App.tsx                 # Admin root y declaracion de Resource
|-- DataProvider.ts         # Adaptador ra-core -> API Mila Raffo
|-- authProvider.ts         # Login, logout, permisos e identidad
|-- components/
|   |-- admin/              # shadcn-admin-kit y wrappers admin
|   `-- ui/                 # Componentes base shadcn/Radix
|-- lib/                    # HTTP client, storage, i18n, validators, utils
|-- types/                  # Tipos del contrato API
|-- dashboard/              # KPIs del panel
|-- products/
|-- categories/
|-- characteristics/
|-- leathers/               # UI del recurso API colors
|-- images/
|-- variants/
|-- orders/
|-- users/
|-- sections/               # Componentes existentes no registrados en App.tsx
`-- security/               # Helpers de permisos de UI
```

## Entrada de aplicacion

Flujo inicial:

```
src/main.tsx
  -> <App />
  -> <Admin dataProvider authProvider requireAuth>
  -> <Resource ... />
  -> ra-core routing + layout + vistas CRUD
```

`src/App.tsx` es el punto de verdad para saber que recursos aparecen en el admin.

## Admin root

`src/components/admin/admin.tsx` envuelve:

- `CoreAdminContext` de `ra-core`.
- `CoreAdminUI` de `ra-core`.
- `ThemeProvider`.
- `Layout`.
- `LoginPage`.
- `Ready`.
- `AuthCallback`.

La app usa `requireAuth`, por lo que las vistas administrativas dependen de `authProvider.checkAuth()`.

## Layout

`src/components/admin/layout.tsx` define:

- Sidebar (`AppSidebar`).
- Header con breadcrumb, selector de idioma, theme toggle, refresh y menu de usuario.
- `ErrorBoundary`.
- `Suspense` con `Loading`.
- Notificaciones.

## Componentes admin

Los archivos en `src/components/admin` exponen primitives compatibles con `ra-core`:

- Vistas: `List`, `Create`, `Edit`, `Show`.
- Tablas: `DataTable`.
- Campos: `TextField`, `NumberField`, `BooleanBadgeField`, `ShortIdField`.
- Inputs: `TextInput`, `NumberInput`, `BooleanInput`, `SelectInput`, `ReferenceInput`, `ReferenceArrayInput`, `FileInput`, `ArrayInput`.
- Acciones: `CreateButton`, `EditButton`, `ShowButton`, `DeleteButton`, bulk actions.

Los componentes base visuales viven en `src/components/ui`.

## Proveedores

| Archivo | Responsabilidad |
|---|---|
| `src/DataProvider.ts` | Implementa el contrato `DataProvider` de `ra-core` contra endpoints del backend |
| `src/authProvider.ts` | Implementa login, logout, checkAuth, checkError, identidad y permisos |
| `src/lib/http-client.ts` | Centraliza `fetch`, Bearer token, refresh token, errores y cache headers |
| `src/lib/auth-storage.ts` | Persistencia local de sesion |
| `src/lib/i18nProvider.ts` | Traducciones y labels del admin |

## Flujo de datos

Ejemplo de listado de productos:

```
ProductList
  -> <List resource="products">
  -> dataProvider.getList("products", params)
  -> GET /products?limit=...&offset=...&sortBy=...&sortOrder=...
  -> apiRequest()
  -> Backend Mila Raffo
  -> normalizeRecord("products", record)
  -> DataTable
```

Ejemplo de guardado de variante:

```
VariantEdit
  -> transformVariantUpdatePayload()
  -> dataProvider.update("variants", params)
  -> sanitizeVariantPayload(includeProductId: false)
  -> PATCH /variants/:id
  -> upload opcional de imagenes a POST /images/upload
  -> GET /variants/:id para hidratar el registro
```

## Alias de imports

`tsconfig.app.json` define:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Usar `@/` para imports internos.
