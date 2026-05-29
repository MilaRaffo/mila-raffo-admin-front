# 07 - Desarrollo y Convenciones

---

## Instalacion

```bash
npm install
```

## Variables de entorno

Crear o actualizar `.env` con:

```bash
VITE_MILA_RAFFO_STORE_API=http://localhost:3000/api/v1
```

No commitear valores sensibles. Las variables con prefijo `VITE_` quedan disponibles para el bundle del navegador.

## Comandos

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor local Vite |
| `npm run build` | Typecheck con `tsc -b` y build Vite |
| `npm run lint` | ESLint sobre el repo |
| `npm run preview` | Preview del build |

## TypeScript

Configuracion relevante en `tsconfig.app.json`:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `moduleResolution: "bundler"`
- `jsx: "react-jsx"`
- `verbatimModuleSyntax: false`
- alias `@/* -> ./src/*`

`verbatimModuleSyntax: false` es requerido por shadcn-admin-kit.

## Imports

Usar imports internos con alias:

```typescript
import { apiRequest } from "@/lib/http-client";
import { TextInput } from "@/components/admin";
```

Evitar rutas relativas largas entre dominios.

## Agregar un recurso

Pasos recomendados:

1. Crear carpeta en `src/<resource>/`.
2. Implementar `List`, `Create`, `Edit` y `Show` si aplica.
3. Agregar el path en `resourcePath` dentro de `src/DataProvider.ts`.
4. Declarar `<Resource>` en `src/App.tsx`.
5. Agregar tipos en `src/types/api.ts` si el contrato no existe.
6. Agregar validadores en `src/lib/validators.ts` si son reutilizables.

## Cambiar payloads

Antes de tocar formularios o data provider:

- Revisar DTOs y errores reales del backend.
- Mantener transformaciones cerca del formulario si dependen de UI.
- Mantener sanitizacion final en `DataProvider.ts` o `http-client.ts` si evita fuga de campos no aceptados por la API.
- No enviar relaciones completas si el backend espera ids.

## Imagenes y archivos

Para uploads usar `FormData`. No definir manualmente `Content-Type` cuando el body es `FormData`; el browser debe asignar el boundary.

## shadcn-admin-kit

Para componentes nuevos:

- Revisar primero el registry disponible.
- Usar componentes existentes de `src/components/admin` o `src/components/ui` cuando cubran el caso.
- No sobrescribir componentes `ui` o `registry/ui` sin una razon explicita.

## Validacion local

Para cambios de codigo:

```bash
npm run lint
npm run build
```

Para cambios de documentacion, basta revisar links y contenido salvo que tambien se haya tocado codigo.
