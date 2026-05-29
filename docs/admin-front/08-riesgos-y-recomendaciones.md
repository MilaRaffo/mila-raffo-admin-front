# 08 - Riesgos y Recomendaciones

---

## Problemas Altos

| # | Problema | Impacto |
|---|---|---|
| A1 | **Permisos de UI no sustituyen permisos de backend** | Usuarios mal autorizados podrian ejecutar acciones si el backend no valida roles |
| A2 | **Contratos tipados manualmente** | `src/types/api.ts` puede desalinearse con DTOs reales del backend |
| A3 | **Roles registrado sin vistas** | `roles` funciona para referencias, pero no tiene UI propia para operar roles |
| A4 | **Sanitizacion duplicada de variantes** | Hay filtros en formulario, data provider y HTTP client; protege el contrato, pero aumenta puntos a mantener |

## Problemas Medios

| # | Problema | Impacto |
|---|---|---|
| M1 | **Sin capa generada desde OpenAPI** | Cambios de endpoints o DTOs se detectan tarde, en runtime o lint parcial |
| M2 | **Crear orden manual es extenso** | El formulario pide items y direcciones completas sin reutilizar datos existentes del cliente |
| M3 | **Uploads sin gestion avanzada** | No hay progreso, reintentos, compresion ni eliminacion desde la vista de variante |
| M4 | **Dashboard limitado a conteos** | No muestra ventas, ordenes por estado, stock bajo ni alertas operativas |
| M5 | **Secciones no montadas** | Hay codigo para `sections`, pero no esta disponible en la navegacion actual |

## Problemas Bajos

| # | Problema | Impacto |
|---|---|---|
| B1 | **README anterior era generico de Vite** | Menor onboarding hasta documentar el repo |
| B2 | **Labels de dominio viven en componentes** | Cambiar idioma o copy requiere tocar multiples archivos |
| B3 | **Sin pruebas automatizadas visibles** | Regresiones de formularios y transforms dependen de validacion manual |

## Recomendaciones

### Alto

1. **Mantener autorizacion fuerte en backend**
   - El admin puede ocultar botones, pero el backend debe validar JWT y roles en cada endpoint sensible.

2. **Generar tipos desde OpenAPI**
   - Usar el artefacto OpenAPI del backend como fuente para tipos.
   - Reducir drift en enums como estados, unidades, roles y DTOs de update.

3. **Documentar decisiones de payload**
   - Cuando un DTO rechaza campos como relaciones completas, registrar el motivo cerca del sanitizer.
   - Mantener tests enfocados para `sanitizePayload` y `sanitizeVariantPayload` si crece la logica.

### Medio

4. **Mejorar flujo de orden manual**
   - Seleccionar usuario existente.
   - Reutilizar direcciones guardadas.
   - Mostrar precio calculado antes de guardar.

5. **Fortalecer uploads**
   - Agregar progreso.
   - Agregar feedback por archivo.
   - Permitir eliminar o reordenar imagenes cuando el backend lo soporte.

6. **Ampliar dashboard operativo**
   - Ordenes por estado.
   - Stock bajo.
   - Productos sin imagen.
   - Ventas recientes.

### Bajo

7. **Unificar copy e i18n**
   - Mover labels repetidos al i18n provider si se necesita soporte multi-idioma real.

8. **Decidir destino de sections**
   - Registrar el recurso si el admin debe gestionar contenido.
   - Eliminar o aislar codigo si quedo fuera del alcance.
