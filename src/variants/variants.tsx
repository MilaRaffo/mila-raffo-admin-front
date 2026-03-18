import {
  Create,
  DataTable,
  Edit,
  EditButton,
  List,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  Show,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  AutocompleteInput,
  BooleanInput,
  NumberField,
} from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { validators } from "@/lib/validators";
import { useRecordContext } from "ra-core";
import { useLocation } from "react-router";

const AvailabilityBadge = () => {
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

const VariantImages = () => {
  const record = useRecordContext<{ images?: Array<{ url?: string; alt?: string }> }>();
  const images = record?.images ?? [];

  if (images.length === 0) {
    return <p className="text-sm text-muted-foreground">Esta variante todavía no tiene imágenes.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {images.map((image, index) => (
        <img
          key={`${image.url ?? "image"}-${index}`}
          src={image.url}
          alt={image.alt ?? `Imagen ${index + 1}`}
          className="h-24 w-24 rounded-lg border object-cover"
        />
      ))}
    </div>
  );
};

const VariantLeathers = () => {
  const record = useRecordContext<{ leathers?: Array<{ id: string; name?: string; code?: string; color?: string }> }>();
  const leathers = (record?.leathers ?? []).filter((leather) => leather.id);

  if (leathers.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay cueros vinculados.</p>;
  }

  return (
    <DataTable data={leathers} bulkActionButtons={false}>
      <DataTable.Col source="name" label="Nombre" />
      <DataTable.Col source="code" label="Código" />
      <DataTable.Col source="color" label="Color" />
    </DataTable>
  );
};

export const VariantList = () => (
  <List title="Variantes">
    <DataTable rowClick="show">
      <DataTable.Col source="id" />
      <DataTable.Col source="sku" />
      <DataTable.Col source="price">
        <NumberField source="price" />
      </DataTable.Col>
      <DataTable.Col source="product.name" label="Producto" />
      <DataTable.Col source="isAvailable" label="Disponibilidad">
        <AvailabilityBadge />
      </DataTable.Col>
      <DataTable.Col label="Ver">
        <ShowButton />
      </DataTable.Col>
      <DataTable.Col label="Editar">
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const VariantCreate = () => (
  <VariantCreateForm />
);

const VariantCreateForm = () => {
  const location = useLocation();
  const preselectedProductId =
    (location.state as { productId?: string } | null)?.productId;

  return (
    <Create
      title="Crear variante"
      redirect={preselectedProductId ? `/products/${preselectedProductId}/show` : "list"}
      transform={(data: any) => ({
        ...data,
        productId: preselectedProductId ?? data.productId,
      })}
    >
      <SimpleForm defaultValues={{ productId: preselectedProductId }}>
        {preselectedProductId ? (
          <TextInput source="productId" label="Producto" disabled />
        ) : (
          <ReferenceInput source="productId" reference="products" label="Producto">
            <AutocompleteInput optionText="name" validate={validators.required()} />
          </ReferenceInput>
        )}
        <TextInput source="sku" validate={validators.sku} />
        <NumberInput source="price" min={0} step={0.01} validate={validators.price} />
        <BooleanInput source="isAvailable" />
        <ReferenceArrayInput source="leatherIds" reference="leathers" label="Cueros">
          <AutocompleteInput optionText="name" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};

export const VariantEdit = () => (
  <Edit title="Editar variante">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="sku" validate={validators.sku} />
      <NumberInput source="price" min={0} step={0.01} validate={validators.price} />
      <BooleanInput source="isAvailable" />
      <ReferenceArrayInput source="leatherIds" reference="leathers" label="Cueros">
        <AutocompleteInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const VariantShow = () => (
  <Show title="Detalle de variante">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Información</div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">ID</div>
            <TextField source="id" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">SKU</div>
            <TextField source="sku" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Precio</div>
            <TextField source="price" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Producto</div>
            <TextField source="product.name" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Disponible</div>
            <AvailabilityBadge />
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Imágenes</div>
        <VariantImages />
      </div>
      <div className="rounded-lg border p-4 md:col-span-2">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Cueros asociados</div>
        <VariantLeathers />
      </div>
    </div>
  </Show>
);
