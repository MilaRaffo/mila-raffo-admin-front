# 01 - Descripcion y Contexto

---

## Resumen

`mila-raffo-admin-front` es el panel administrativo web de Mila Raffo. Permite operar recursos del backend desde una interfaz CRUD construida con shadcn-admin-kit y `ra-core`.

El repositorio se limita al frontend administrativo. No define reglas de negocio persistentes, no modifica el modelo de datos y no reemplaza validaciones del backend. Su responsabilidad es presentar formularios, listas, detalle, autenticacion y payloads compatibles con la API.

## Stack

| Capa | Tecnologia |
|---|---|
| Build | Vite 7 |
| UI | React 19 |
| Lenguaje | TypeScript 5.9 |
| Admin framework | `ra-core` 5 |
| Kit UI admin | shadcn-admin-kit |
| Estilos | Tailwind CSS 4 |
| Componentes base | Radix UI + componentes `src/components/ui` |
| Formularios | `ra-core` + `react-hook-form` debajo del kit admin |
| Datos remotos | `fetch` via `src/lib/http-client.ts` |

## Alcance funcional

El panel declara estos recursos en `src/App.tsx`:

| Recurso | Nombre API | Vistas declaradas |
|---|---|---|
| Productos | `products` | list, create, edit, show |
| Categorias | `categories` | list, create, edit, show |
| Caracteristicas | `characteristics` | list, create, edit, show |
| Colores | `colors` | list, create, edit, show |
| Imagenes | `images` | list, create, edit, show |
| Variantes | `variants` | list, create, edit, show |
| Ordenes | `orders` | list, create, edit, show |
| Usuarios | `users` | list, create, edit, show |
| Roles | `roles` | recurso disponible para referencias |

## Usuarios objetivo

La interfaz esta orientada a operadores administrativos de la tienda:

- Gestion de catalogo: productos, categorias, caracteristicas, colores, variantes e imagenes.
- Gestion comercial: ordenes, estados y tracking.
- Gestion operativa: usuarios y roles.

## Dependencias externas

El frontend requiere que el backend exponga la API configurada en `VITE_MILA_RAFFO_STORE_API`.

Ejemplo local:

```bash
VITE_MILA_RAFFO_STORE_API=http://localhost:3000/api/v1
```

## Limites del repositorio

- No contiene base de datos.
- No contiene endpoints propios.
- No define guards reales de backend; solo oculta o bloquea acciones de UI segun permisos recibidos.
- No debe corregir contratos de API con workarounds genericos si el backend define DTOs concretos.
