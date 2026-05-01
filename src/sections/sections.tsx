import {
  List,
  DataTable,
  TextField,
  BooleanBadgeField,
  CreateButton,
  EditButton,
  DeleteButton,
} from "@/components/admin";

export const SectionsList = () => (
  <List title="Secciones" filters={undefined}>
    <DataTable bulkActionButtons={false}>
      <DataTable.Col source="title" label="Título" />
      <DataTable.Col source="type" label="Tipo" />
      <DataTable.Col source="slug" label="Slug" />
      <DataTable.Col source="order" label="Orden" />
      <DataTable.Col source="isActive" label="Activo">
        <BooleanBadgeField />
      </DataTable.Col>
      <DataTable.Col label="Acciones" sortable={false}>
        <EditButton />
        <DeleteButton />
      </DataTable.Col>
    </DataTable>
  </List>
);
