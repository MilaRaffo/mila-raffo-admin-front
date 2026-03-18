import {
  BadgeField,
  DataTable,
  ReferenceArrayField,
  Show,
  SingleFieldList,
  TextField,
} from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { useRecordContext } from "ra-core";
import { Link } from "react-router";

const ProductImage = () => {
  const record = useRecordContext<{ image?: { url?: string; alt?: string } | null }>();
  if (!record?.image?.url) {
    return <span className="text-sm text-muted-foreground">Sin imagen principal</span>;
  }

  return (
    <img
      src={record.image.url}
      alt={record.image.alt ?? "Imagen de producto"}
      className="h-44 w-44 rounded-xl object-cover border"
    />
  );
};

const VariantAvailabilityBadge = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Badge
      className={
        record.isAvailable
          ? "border-emerald-200 bg-emerald-100 text-emerald-800"
          : "border-rose-200 bg-rose-100 text-rose-800"
      }
    >
      {record.isAvailable ? "Disponible" : "No disponible"}
    </Badge>
  );
};

const ProductAvailabilityBadge = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Badge
      className={
        record.available
          ? "border-emerald-200 bg-emerald-100 text-emerald-800"
          : "border-rose-200 bg-rose-100 text-rose-800"
      }
    >
      {record.available ? "Disponible" : "No disponible"}
    </Badge>
  );
};

const VariantsPanel = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Variantes</h3>
        <Link
          to="/variants/create"
          state={{ productId: record.id }}
          className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          Agregar variante
        </Link>
      </div>
      <DataTable
        data={record.variants ?? []}
        resource="variants"
        bulkActionButtons={false}
        rowClick="show"
      >
        <DataTable.Col source="sku" label="SKU" />
        <DataTable.Col source="price" label="Precio" />
        <DataTable.Col source="isAvailable" label="Disponibilidad">
          <VariantAvailabilityBadge />
        </DataTable.Col>
      </DataTable>
    </div>
  );
};

const CharacteristicsPanel = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Características</h3>
      <DataTable data={record.characteristics ?? []} bulkActionButtons={false}>
        <DataTable.Col source="name" label="Nombre" />
        <DataTable.Col source="dataType" label="Tipo" />
        <DataTable.Col source="units" label="Unidad" />
        <DataTable.Col source="value" label="Valor" />
      </DataTable>
    </div>
  );
};

export const ProductShow = () => (
  <Show title="Detalle del Producto">
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Nombre</div>
        <TextField source="name" />
      </div>

      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Imagen</div>
        <ProductImage />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Descripción</div>
        <TextField source="description" />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Precio Base</div>
        <TextField source="basePrice" />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Disponible</div>
        <ProductAvailabilityBadge />
      </div>
      
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">Categorías</h3>
        <ReferenceArrayField source="categoryIds" reference="categories">
          <SingleFieldList>
            <BadgeField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </div>

      <CharacteristicsPanel />

      <VariantsPanel />
    </div>
  </Show>
);
