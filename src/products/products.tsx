import {
    AutocompleteInput,
    BooleanBadgeField,
    DataTable,
    EditButton,
    List,
    NumberInput,
    NumberField,
    ReferenceInput,
    SearchInput,
    SelectInput,
    ShortIdField,
    ShowButton,
    TextField,
} from "@/components/admin";
import { useRecordContext } from "ra-core";

const ProductImageThumb = () => {
    const record = useRecordContext<{ image?: { url?: string; alt?: string } | null }>();
    if (!record?.image?.url) {
        return <span className="text-xs text-muted-foreground">Sin imagen</span>;
    }
    return (
        <img
            src={record.image.url}
            alt={record.image.alt ?? "Imagen de producto"}
            className="h-12 w-12 rounded-md object-cover border"
        />
    );
};

const AvailabilityBadge = () => {
    return <BooleanBadgeField source="available" trueLabel="Disponible" falseLabel="No disponible" />;
};

const productFilters = [
    <SearchInput source="name" alwaysOn />,
    <SelectInput
        source="available"
        label="Disponibilidad"
        choices={[
            { id: "true", name: "Disponible" },
            { id: "false", name: "No disponible" },
        ]}
    />,
    <ReferenceInput source="categoryId" reference="categories" label="Categoría">
        <AutocompleteInput optionText="name" />
    </ReferenceInput>,
    <NumberInput source="minBasePrice" label="Precio min" min={0} step={0.01} />,
    <NumberInput source="maxBasePrice" label="Precio max" min={0} step={0.01} />,
];

export const ProductList = () => (
    <List title="Productos" filters={productFilters}>
        <DataTable>
            <DataTable.Col source="image.url" label="Imagen">
                <ProductImageThumb />
            </DataTable.Col>
            <DataTable.Col source="id" label="ID">
                <ShortIdField source="id" />
            </DataTable.Col>
            <DataTable.Col source="name">
                <TextField source="name" />
            </DataTable.Col>
            <DataTable.Col source="basePrice" label="Precio base">
                <NumberField source="basePrice" />
            </DataTable.Col>
            <DataTable.Col source="available" label="Disponibilidad">
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