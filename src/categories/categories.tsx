import { DataTable, List } from "@/components/admin";

export const CategoryList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="description" />
            <DataTable.Col source="active" />
        </DataTable>
    </List>
);