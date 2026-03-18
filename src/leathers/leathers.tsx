import {
    BooleanInput,
    Create,
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
} from "@/components/admin";
import { validators } from "@/lib/validators";
import { useRecordContext } from "ra-core";

const LeatherImageThumb = () => {
    const record = useRecordContext<{ image?: { url?: string; alt?: string } | null }>();
    if (!record?.image?.url) {
        return <span className="text-xs text-muted-foreground">Sin imagen</span>;
    }
    return (
        <img
            src={record.image.url}
            alt={record.image.alt ?? "Imagen del cuero"}
            className="h-12 w-12 rounded-md object-cover border"
        />
    );
};

const LeatherImage = () => {
    const record = useRecordContext<{ image?: { url?: string; alt?: string } | null }>();
    if (!record?.image?.url) {
        return <span className="text-sm text-muted-foreground">Sin imagen</span>;
    }
    return (
        <img
            src={record.image.url}
            alt={record.image.alt ?? "Imagen del cuero"}
            className="h-44 w-44 rounded-xl object-cover border"
        />
    );
};

export const LeatherList = () => (
    <List title="Cueros">
        <DataTable>
            <DataTable.Col source="image.url" label="Imagen">
                <LeatherImageThumb />
            </DataTable.Col>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="code" />
            <DataTable.Col source="color" />
            <DataTable.Col source="isActive" />
            <DataTable.Col label="Ver">
                <ShowButton />
            </DataTable.Col>
            <DataTable.Col label="Editar">
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const LeatherCreate = () => (
    <Create title="Crear cuero">
        <SimpleForm>
            <TextInput source="name" validate={validators.leatherName} />
            <TextInput source="code" validate={validators.leatherCode} />
            <TextInput source="color" validate={validators.leatherColor} />
            <BooleanInput source="isActive" />
            <ReferenceInput source="imageId" reference="images" label="Imagen">
                <AutocompleteInput optionText={(choice: any) => choice?.alt || choice?.id} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const LeatherEdit = () => (
    <Edit title="Editar cuero">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={validators.leatherName} />
            <TextInput source="code" validate={validators.leatherCode} />
            <TextInput source="color" validate={validators.leatherColor} />
            <BooleanInput source="isActive" />
            <ReferenceInput source="imageId" reference="images" label="Imagen">
                <AutocompleteInput optionText={(choice: any) => choice?.alt || choice?.id} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const LeatherShow = () => (
    <Show title="Detalle de cuero">
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Imagen</div>
                <LeatherImage />
            </div>
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
                        <div className="text-xs text-muted-foreground">Código</div>
                        <TextField source="code" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Color</div>
                        <TextField source="color" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Activo</div>
                        <TextField source="isActive" />
                    </div>
                </div>
            </div>
        </div>
    </Show>
);