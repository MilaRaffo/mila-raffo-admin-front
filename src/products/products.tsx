import {
    DataTable,
    EditButton,
    List,
    NumberField,
    SearchInput,
    ShowButton,
    TextField,
} from "@/components/admin";
import { Badge } from "@/components/ui/badge";
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
    const record = useRecordContext();
    if (!record) return null;
    return (
        <Badge variant="outline">
            {record.available ? "Disponible" : "No disponible"}
        </Badge>
    );
};

const productFilters = [<SearchInput source="name" alwaysOn />];

export const ProductList = () => (
    <List title="Productos" filters={productFilters}>
        <DataTable>
            <DataTable.Col source="image.url" label="Imagen">
                <ProductImageThumb />
            </DataTable.Col>
            <DataTable.Col source="id" />
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