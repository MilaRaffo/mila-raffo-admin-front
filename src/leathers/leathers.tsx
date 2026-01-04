import { DataTable, List } from "@/components/admin";

export const LeatherList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="code" />
            <DataTable.Col source="image.url" />
        </DataTable>
    </List>
);