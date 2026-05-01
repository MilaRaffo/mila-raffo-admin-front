import {
  BooleanBadgeField,
  DataTable,
  Show,
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
        <DataTable.Col source="image.url" label="Imagen">
          <VariantImageThumb />
        </DataTable.Col>
        <DataTable.Col source="sku" label="SKU" />
        <DataTable.Col source="price" label="Precio" />
        <DataTable.Col source="stock" label="Stock" />
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
      <DataTable data={record.characteristics ?? []} bulkActionButtons={false} rowClick={false}>
        <DataTable.Col source="name" label="Nombre">
          <CharacteristicLink />
        </DataTable.Col>
        <DataTable.Col source="dataType" label="Tipo" />
        <DataTable.Col source="units" label="Unidad" />
        <DataTable.Col source="value" label="Valor">
          <CharacteristicValueField />
        </DataTable.Col>
      </DataTable>
    </div>
  );
};

const CharacteristicValueField = () => {
  const record = useRecordContext<{ dataType?: string; value?: unknown }>();
  const dataType = String(record?.dataType ?? "").toLowerCase().trim();
  const isBooleanType = dataType.includes("bool");

  if (isBooleanType) {
    return <BooleanBadgeField source="value" trueLabel="Sí" falseLabel="No" />;
  }

  return <TextField source="value" />;
};

const CharacteristicLink = () => {
  const record = useRecordContext<{ id?: string; name?: string }>();
  if (!record?.id) {
    return <span>{record?.name ?? "-"}</span>;
  }

  return (
    <Link
      to={`/characteristics/${record.id}/show`}
      className="text-primary hover:underline"
    >
      {record.name}
    </Link>
  );
};

const CategoryBadgeLink = () => {
  const record = useRecordContext<{ id?: string; name?: string }>();

  if (!record?.id) {
    return <Badge variant="outline">{record?.name ?? "Categoría"}</Badge>;
  }

  return (
    <Link
      to={`/categories/${record.id}/show`}
      className="inline-flex"
    >
      <Badge variant="outline" className="hover:bg-accent">
        {record.name}
      </Badge>
    </Link>
  );
};

const ProductCategoriesPanel = () => {
  const record = useRecordContext<{ categories?: Array<{ id: string; name: string }> }>();
  const categories = record?.categories ?? [];

  if (categories.length === 0) {
    return <p className="text-sm text-muted-foreground">Sin categorías</p>;
  }

  return (
    <DataTable data={categories} bulkActionButtons={false} rowClick={false}>
      <DataTable.Col source="name" label="Categoría">
        <CategoryBadgeLink />
      </DataTable.Col>
    </DataTable>
  );
};

const VariantImageThumb = () => {
  const record = useRecordContext<{ image?: { url?: string; alt?: string } | null }>();

  if (!record?.image?.url) {
    return <span className="text-xs text-muted-foreground">Sin imagen</span>;
  }

  return (
    <img
      src={record.image.url}
      alt={record.image.alt ?? "Imagen de variante"}
      className="h-12 w-12 rounded-md object-cover border"
    />
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
        <ProductCategoriesPanel />
      </div>

      <CharacteristicsPanel />

      <VariantsPanel />
    </div>
  </Show>
);
