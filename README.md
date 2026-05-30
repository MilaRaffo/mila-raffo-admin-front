# Mila Raffo Admin Front

Panel administrativo web para la tienda Mila Raffo.

Stack principal:

- Vite 7
- React 19
- TypeScript 5.9
- shadcn-admin-kit sobre `ra-core`
- Tailwind CSS 4

## Documentacion

La documentacion funcional y tecnica de este repositorio esta en:

- [Indice de documentacion](./docs/admin-front/00-index.md)

## Requisitos

- Node.js compatible con Vite 7
- npm
- Backend de Mila Raffo disponible

Variable de entorno requerida:

```bash
VITE_MILA_RAFFO_STORE_API=http://localhost:3000/api/v1
```

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Alcance

Este frontend administra recursos del backend: productos, categorias, caracteristicas, colores, imagenes, variantes, ordenes, usuarios y roles. No contiene logica de negocio persistente; adapta formularios, filtros, autenticacion y payloads al contrato HTTP del backend.
