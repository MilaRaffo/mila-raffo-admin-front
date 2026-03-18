import {
    BooleanInput,
    DataTable,
    Edit,
    EditButton,
    List,
    ReferenceInput,
    Show,
    ShowButton,
    SimpleForm,
    TextField,
    TextInput,
    AutocompleteInput,
    Create,
} from "@/components/admin";
import { validators } from "@/lib/validators";
import { useRecordContext } from "ra-core";

const CategoryChildrenPanel = () => {
    const record = useRecordContext<{
        children?: Array<{
            id: string;
            name: string;
            slug: string;
            active: boolean;
            description?: string;
        }>;
    }>();

    const children = record?.children ?? [];

    if (children.length === 0) {
        return <p className="text-sm text-muted-foreground">Esta categoría no tiene hijas.</p>;
    }

    return (
        <DataTable data={children} bulkActionButtons={false} rowClick={false}>
            <DataTable.Col source="name" label="Nombre" />
            <DataTable.Col source="slug" label="Slug" />
            <DataTable.Col source="active" label="Activa" />
        </DataTable>
    );
};

export const CategoryList = () => (
    <List title="Categorías">
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="slug" />
            <DataTable.Col source="parent.name" label="Categoría padre" />
            <DataTable.Col source="active" />
            <DataTable.Col label="Ver">
                <ShowButton />
            </DataTable.Col>
            <DataTable.Col label="Editar">
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const CategoryCreate = () => (
    <Create title="Crear categoría">
        <SimpleForm>
            <TextInput source="name" validate={validators.categoryName} />
            <TextInput source="slug" validate={validators.categorySlug} />
            <TextInput source="description" multiline validate={validators.categoryDescription} />
            <ReferenceInput source="parentId" reference="categories" label="Categoría padre">
                <AutocompleteInput optionText="name" validate={validators.uuid} />
            </ReferenceInput>
            <BooleanInput source="active" />
        </SimpleForm>
    </Create>
);

export const CategoryEdit = () => (
    <Edit title="Editar categoría">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={validators.categoryName} />
            <TextInput source="slug" validate={validators.categorySlug} />
            <TextInput source="description" multiline validate={validators.categoryDescription} />
            <ReferenceInput source="parentId" reference="categories" label="Categoría padre">
                <AutocompleteInput optionText="name" validate={validators.uuid} />
            </ReferenceInput>
            <BooleanInput source="active" />
        </SimpleForm>
    </Edit>
);

export const CategoryShow = () => (
    <Show title="Detalle de categoría">
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Información</div>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-muted-foreground">ID</div>
                        <TextField source="id" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Nombre</div>
                        <TextField source="name" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Slug</div>
                        <TextField source="slug" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Descripción</div>
                        <TextField source="description" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Activa</div>
                        <TextField source="active" />
                    </div>
                </div>
            </div>
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Jerarquía</div>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-muted-foreground">Categoría padre</div>
                        <TextField source="parent.name" />
                    </div>
                    <div>
                        <div className="mb-1 text-xs text-muted-foreground">Categorías hijas</div>
                        <CategoryChildrenPanel />
                    </div>
                </div>
            </div>
        </div>
    </Show>
);