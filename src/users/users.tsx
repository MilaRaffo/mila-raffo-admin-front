import { DataTable, List } from "@/components/admin";

export const UserList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="lastname" />
            <DataTable.Col source="email" />
            <DataTable.Col source="phone" />
            <DataTable.Col source="role" />
            <DataTable.Col source="isActive" />
        </DataTable>
    </List>
);