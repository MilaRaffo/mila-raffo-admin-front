import { DataTable, List } from "@/components/admin";

export const CharacteristicList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="dataType" />
            <DataTable.Col source="unit" />
        </DataTable>
    </List>
);