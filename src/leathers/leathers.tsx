import {
    BooleanInput,
    BooleanBadgeField,
    Create,
    DataTable,
    Edit,
    EditButton,
    List,
    ReferenceInput,
    Show,
    ShowButton,
    ShortIdField,
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
            alt={record.image.alt ?? "Imagen del color"}
            className="h-12 w-12 rounded-md object-cover border"
        />
    );
};

const ColorPreview = () => {
    const record = useRecordContext<{ hex?: string }>();
    if (!record?.hex) {
        return <span className="text-xs text-muted-foreground">Sin color</span>;
    }
    return (
        <div className="flex items-center gap-2">
            <div
                className="h-6 w-6 rounded border"
                style={{ backgroundColor: record.hex }}
            />
            <span className="text-sm">{record.hex}</span>
        </div>
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
            alt={record.image.alt ?? "Imagen del color"}
            className="h-44 w-44 rounded-xl object-cover border"
        />
    );
};

export const LeatherList = () => (
    <List title="Colores">
        <DataTable>
            <DataTable.Col source="image.url" label="Imagen">
                <LeatherImageThumb />
            </DataTable.Col>
            <DataTable.Col source="id" label="ID">
                <ShortIdField source="id" />
            </DataTable.Col>
            <DataTable.Col source="name" label="Nombre" />
            <DataTable.Col source="code" label="Código" />
            <DataTable.Col source="hex" label="Color">
                <ColorPreview />
            </DataTable.Col>
            <DataTable.Col source="isActive" label="Activo">
                <BooleanBadgeField source="isActive" trueLabel="Sí" falseLabel="No" />
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

export const LeatherCreate = () => (
    <Create title="Crear color">
        <SimpleForm>
            <TextInput source="name" label="Nombre del color" validate={validators.leatherName} />
            <TextInput source="code" label="Código" validate={validators.leatherCode} />
            <TextInput 
                source="hex" 
                label="Código hexadecimal" 
                placeholder="#000000"
                validate={validators.leatherColor} 
            />
            <BooleanInput source="isActive" label="Activo" />
            <ReferenceInput source="imageId" reference="images" label="Imagen">
                <AutocompleteInput optionText={(choice: any) => choice?.alt || choice?.id} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const LeatherEdit = () => (
    <Edit title="Editar color">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nombre del color" validate={validators.leatherName} />
            <TextInput source="code" label="Código" validate={validators.leatherCode} />
            <TextInput 
                source="hex" 
                label="Código hexadecimal"
                placeholder="#000000"
                validate={validators.leatherColor} 
            />
            <BooleanInput source="isActive" label="Activo" />
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
                        <BooleanBadgeField source="isActive" trueLabel="Sí" falseLabel="No" />
                    </div>
                </div>
            </div>
        </div>
    </Show>
);