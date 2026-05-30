import {
  Create,
  BooleanBadgeField,
  DataTable,
  Edit,
  EditButton,
  FileField,
  FileInput,
  List,
  NumberInput,
  ReferenceInput,
  ShortIdField,
  Show,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  AutocompleteInput,
  BooleanInput,
  NumberField,
} from "@/components/admin";
import { validators } from "@/lib/validators";
import { useRecordContext } from "ra-core";
import { useLocation } from "react-router";

const AvailabilityBadge = () => {
  return (
    <BooleanBadgeField
      source="isAvailable"
      trueLabel="Disponible"
      falseLabel="No disponible"
    />
  );
};

const VariantImageThumb = () => {
  const record = useRecordContext<{ images?: Array<{ url?: string; alt?: string }> }>();
  const firstImage = record?.images?.[0];

  if (!firstImage?.url) {
    return <span className="text-xs text-muted-foreground">Sin imagen</span>;
  }

  return (
    <img
      src={firstImage.url}
      alt={firstImage.alt ?? "Imagen de variante"}
      className="h-12 w-12 rounded-md object-cover border"
    />
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

const VariantEditImages = () => {
  const record = useRecordContext<{ images?: Array<{ url?: string; alt?: string }> }>();
  const images = record?.images ?? [];

  if (images.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay imágenes cargadas todavía.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
      {images.map((image, index) => (
        <img
          key={`${image.url ?? "variant-image"}-${index}`}
          src={image.url}
          alt={image.alt ?? `Imagen ${index + 1}`}
          className="h-16 w-16 rounded-md border object-cover"
        />
      ))}
    </div>
  );
};

type VariantFormData = {
  sku?: string;
  price?: number;
  stock?: number;
  isAvailable?: boolean;
  colorId?: string | null;
  imageFiles?: unknown;
};

type VariantCreateFormData = VariantFormData & {
  productId?: string;
};

const transformVariantUpdatePayload = (data: VariantFormData) => ({
  sku: data.sku,
  price: data.price,
  stock: data.stock,
  isAvailable: data.isAvailable,
  colorId: data.colorId || null,
  imageFiles: data.imageFiles,
});

const VariantColor = () => {
  const record = useRecordContext<{ color?: { id: string; name?: string; code?: string; hex?: string } | null }>();
  const color = record?.color;

  if (!color) {
    return <p className="text-sm text-muted-foreground">Sin color asignado</p>;
  }

  return (
    <div className="flex items-center gap-2">
      {color.hex && (
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: color.hex }}
          title={color.hex}
        />
      )}
      <div>
        <p className="font-medium text-sm">{color.name}</p>
        <p className="text-xs text-muted-foreground">{color.code} • {color.hex}</p>
      </div>
    </div>
  );
};

export const VariantList = () => (
  <List title="Variantes">
    <DataTable rowClick="show">
      <DataTable.Col source="images" label="Imagen">
        <VariantImageThumb />
      </DataTable.Col>
      <DataTable.Col source="id" label="ID">
        <ShortIdField source="id" />
      </DataTable.Col>
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
      transform={(data: VariantCreateFormData) => ({
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
        <NumberInput source="stock" min={0} step={1} label="Stock" />
        <BooleanInput source="isAvailable" />
        <ReferenceInput source="colorId" reference="colors" label="Color">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <FileInput
          source="imageFiles"
          label="Imágenes"
          accept={{ "image/*": [] }}
          multiple
          helperText="Puedes subir una o más imágenes para la variante"
        >
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

export const VariantEdit = () => (
  <Edit title="Editar variante" transform={transformVariantUpdatePayload}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="sku" validate={validators.sku} />
      <NumberInput source="price" min={0} step={0.01} validate={validators.price} />
      <NumberInput source="stock" min={0} step={1} label="Stock" />
      <BooleanInput source="isAvailable" />
      <ReferenceInput source="colorId" reference="colors" label="Color">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground">Imágenes actuales</div>
        <VariantEditImages />
      </div>
      <FileInput
        source="imageFiles"
        label="Agregar nuevas imágenes"
        accept={{ "image/*": [] }}
        multiple
        helperText="Las imágenes seleccionadas se agregarán a la variante al guardar"
      >
        <FileField source="src" title="title" />
      </FileInput>
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
        <div className="mb-2 text-sm font-medium text-muted-foreground">Color</div>
        <VariantColor />
      </div>
    </div>
  </Show>
);
