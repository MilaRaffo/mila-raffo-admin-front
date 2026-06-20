import {
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
import { AccessDeniedCard } from "@/components/security/AccessDeniedCard";
import { validators } from "@/lib/validators";
import { CanAccess } from "@/security/access";

const shipmentStatusChoices = [
  { id: "En preparacion", name: "En preparacion" },
  { id: "Enviado", name: "Enviado" },
  { id: "Entregado", name: "Entregado" },
];

export const ShipmentList = () => (
  <List title="Envíos">
    <DataTable>
      <DataTable.Col source="id" label="ID">
        <ShortIdField source="id" />
      </DataTable.Col>
      <DataTable.Col source="status" label="Estado" />
      <DataTable.Col source="courier" label="Courier" />
      <DataTable.Col source="trackingNumber" label="Tracking" />
      <DataTable.Col source="order.orderNumber" label="Orden" />
      <DataTable.Col source="order.paymentStatus" label="Pago" />
      <DataTable.Col label="Ver">
        <ShowButton />
      </DataTable.Col>
      <DataTable.Col label="Editar">
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ShipmentEdit = () => (
  <CanAccess
    roles={["admin", "superadmin"]}
    fallback={<AccessDeniedCard title="Editar envío" />}
  >
    <Edit title="Editar envío">
      <SimpleForm>
        <TextInput source="id" disabled />
        <SelectInput
          source="status"
          label="Estado"
          choices={shipmentStatusChoices}
          validate={validators.required()}
        />
        <TextInput source="courier" label="Courier" />
        <TextInput
          source="trackingNumber"
          label="Tracking"
          validate={validators.orderTracking}
        />
      </SimpleForm>
    </Edit>
  </CanAccess>
);

export const ShipmentShow = () => (
  <Show title="Detalle de envío">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Resumen
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">ID</div>
            <TextField source="id" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Estado</div>
            <TextField source="status" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Courier</div>
            <TextField source="courier" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Tracking</div>
            <TextField source="trackingNumber" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Orden
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">ID</div>
            <TextField source="order.id" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Número</div>
            <TextField source="order.orderNumber" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Estado</div>
            <TextField source="order.status" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Pago</div>
            <TextField source="order.paymentStatus" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4 md:col-span-2">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Fechas
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs text-muted-foreground">Enviado</div>
            <TextField source="shippedAt" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Entregado</div>
            <TextField source="deliveredAt" />
          </div>
        </div>
      </div>
    </div>
  </Show>
);
