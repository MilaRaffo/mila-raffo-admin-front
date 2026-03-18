import {
  Create,
  DataTable,
  Edit,
  EditButton,
  FileField,
  FileInput,
  List,
  ReferenceInput,
  Show,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  AutocompleteInput,
} from "@/components/admin";
import { useRecordContext } from "ra-core";

const ImageThumb = () => {
  const record = useRecordContext<{ url?: string; alt?: string | null }>();
  if (!record?.url) {
    return <span className="text-xs text-muted-foreground">Sin archivo</span>;
  }

  return (
    <img
      src={record.url}
      alt={record.alt ?? "Imagen"}
      className="h-12 w-12 rounded-md border object-cover"
    />
  );
};

const ImagePreview = () => {
  const record = useRecordContext<{ url?: string; alt?: string | null }>();
  if (!record?.url) {
    return <span className="text-sm text-muted-foreground">Sin imagen</span>;
  }

  return (
    <img
      src={record.url}
      alt={record.alt ?? "Imagen"}
      className="h-56 w-56 rounded-xl border object-cover"
    />
  );
};

export const ImageList = () => (
  <List title="Imágenes">
    <DataTable>
      <DataTable.Col source="url" label="Preview">
        <ImageThumb />
      </DataTable.Col>
      <DataTable.Col source="id" />
      <DataTable.Col source="alt" label="Descripción" />
      <DataTable.Col source="variant.sku" label="Variante" />
      <DataTable.Col label="Ver">
        <ShowButton />
      </DataTable.Col>
      <DataTable.Col label="Editar">
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ImageCreate = () => (
  <Create title="Subir imagen">
    <SimpleForm>
      <FileInput source="file" label="Archivo" accept={{ "image/*": [] }}>
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="alt" label="Texto alternativo" />
      <ReferenceInput source="variantId" reference="variants" label="Variante (opcional)">
        <AutocompleteInput optionText="sku" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const ImageEdit = () => (
  <Edit title="Editar imagen">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="url" label="URL" disabled />
      <TextInput source="alt" label="Texto alternativo" />
      <ReferenceInput source="variantId" reference="variants" label="Variante (opcional)">
        <AutocompleteInput optionText="sku" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ImageShow = () => (
  <Show title="Detalle de imagen">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Vista previa</div>
        <ImagePreview />
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Datos</div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">ID</div>
            <TextField source="id" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">URL</div>
            <TextField source="url" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Descripción</div>
            <TextField source="alt" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Variante</div>
            <TextField source="variant.sku" />
          </div>
        </div>
      </div>
    </div>
  </Show>
);
