import {
    Create,
    DataTable,
    Edit,
    EditButton,
    List,
    SelectInput,
    Show,
    ShowButton,
    ShortIdField,
    SimpleForm,
    TextField,
    TextInput,
} from "@/components/admin";
import { validators } from "@/lib/validators";

const dataTypeChoices = [
    { id: "number", name: "number" },
    { id: "text", name: "text" },
    { id: "boolean", name: "boolean" },
];

const unitChoices = [
    { id: "Kg", name: "Kg" },
    { id: "g", name: "g" },
    { id: "m", name: "m" },
    { id: "cm", name: "cm" },
    { id: "mm", name: "mm" },
    { id: "L", name: "L" },
    { id: "in", name: "in" },
];

export const CharacteristicList = () => (
    <List title="Características">
        <DataTable>
            <DataTable.Col source="id" label="ID">
                <ShortIdField source="id" />
            </DataTable.Col>
            <DataTable.Col source="name" />
            <DataTable.Col source="dataType" />
            <DataTable.Col source="units" />
            <DataTable.Col label="Ver">
                <ShowButton />
            </DataTable.Col>
            <DataTable.Col label="Editar">
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const CharacteristicCreate = () => (
    <Create title="Crear característica">
        <SimpleForm>
            <TextInput source="name" validate={validators.characteristicName} />
            <SelectInput source="dataType" choices={dataTypeChoices} validate={validators.required()} />
            <SelectInput source="units" choices={unitChoices} />
        </SimpleForm>
    </Create>
);

export const CharacteristicEdit = () => (
    <Edit title="Editar característica">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={validators.characteristicName} />
            <SelectInput source="dataType" choices={dataTypeChoices} validate={validators.required()} />
            <SelectInput source="units" choices={unitChoices} />
        </SimpleForm>
    </Edit>
);

export const CharacteristicShow = () => (
    <Show title="Detalle de característica">
        <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Información</div>
            <div className="grid gap-3 md:grid-cols-2">
                <div>
                    <div className="text-xs text-muted-foreground">ID</div>
                    <TextField source="id" />
                </div>
                <div>
                    <div className="text-xs text-muted-foreground">Nombre</div>
                    <TextField source="name" />
                </div>
                <div>
                    <div className="text-xs text-muted-foreground">Tipo de dato</div>
                    <TextField source="dataType" />
                </div>
                <div>
                    <div className="text-xs text-muted-foreground">Unidad</div>
                    <TextField source="units" />
                </div>
            </div>
        </div>
    </Show>
);
