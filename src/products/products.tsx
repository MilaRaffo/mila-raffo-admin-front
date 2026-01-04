import { DataTable, List } from "@/components/admin";

export const ProductList = () => (
    <List title='Productos'>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="description" />
            <DataTable.Col source="basePrice" />
            <DataTable.Col source="available" />
        </DataTable>
    </List>
);