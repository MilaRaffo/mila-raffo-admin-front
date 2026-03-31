import {
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
import { AccessDeniedCard } from "@/components/security/AccessDeniedCard";
import { validators } from "@/lib/validators";
import { CanAccess, useCurrentRole } from "@/security/access";

export const UserList = () => (
    <List title="Usuarios">
        <DataTable>
            <DataTable.Col source="id" label="ID">
                <ShortIdField source="id" />
            </DataTable.Col>
            <DataTable.Col source="name" />
            <DataTable.Col source="lastName" />
            <DataTable.Col source="email" />
            <DataTable.Col source="role" />
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

export const UserCreate = () => (
    <CanAccess roles={["superadmin"]} fallback={<AccessDeniedCard title="Crear usuario" />}>
        <Create title="Crear usuario">
            <SimpleForm>
                <TextInput source="name" validate={validators.userName} />
                <TextInput source="lastName" validate={validators.userLastName} />
                <TextInput source="email" type="email" validate={validators.userEmail} />
                <TextInput source="password" type="password" validate={validators.userPassword} />
                <TextInput source="phone" validate={validators.userPhone} />
                <ReferenceInput source="roleId" reference="roles" label="Rol">
                    <AutocompleteInput optionText="name" validate={validators.required()} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    </CanAccess>
);

export const UserEdit = () => {
    const { role } = useCurrentRole();

    return (
        <Edit title="Editar usuario">
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="name" validate={validators.userName} />
                <TextInput source="lastName" validate={validators.userLastName} />
                <TextInput source="email" type="email" validate={validators.userEmail} />
                <TextInput source="phone" validate={validators.userPhone} />
                {role === "superadmin" ? (
                    <ReferenceInput source="roleId" reference="roles" label="Rol">
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                ) : null}
            </SimpleForm>
        </Edit>
    );
};

export const UserShow = () => (
    <Show title="Detalle de usuario">
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Identidad</div>
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
                        <div className="text-xs text-muted-foreground">Apellido</div>
                        <TextField source="lastName" />
                    </div>
                </div>
            </div>
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Cuenta</div>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <TextField source="email" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Rol</div>
                        <TextField source="role" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Estado</div>
                        <BooleanBadgeField source="isActive" trueLabel="Activo" falseLabel="Inactivo" />
                    </div>
                </div>
            </div>
        </div>
    </Show>
);