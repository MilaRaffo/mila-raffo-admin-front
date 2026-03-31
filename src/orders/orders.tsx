import {
  ArrayInput,
  ShortIdField,
  Create,
  DataTable,
  NumberInput,
  ReferenceInput,
  SimpleFormIterator,
  Edit,
  EditButton,
  List,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
} from "@/components/admin";
import { useRecordContext } from "ra-core";
import { AccessDeniedCard } from "@/components/security/AccessDeniedCard";
import { validators } from "@/lib/validators";
import { CanAccess } from "@/security/access";

const orderStatusChoices = [
  { id: "pending", name: "pending" },
  { id: "confirmed", name: "confirmed" },
  { id: "processing", name: "processing" },
  { id: "shipped", name: "shipped" },
  { id: "delivered", name: "delivered" },
  { id: "cancelled", name: "cancelled" },
  { id: "refunded", name: "refunded" },
];

const OrderItemsPanel = () => {
  const record = useRecordContext<{ items?: Array<Record<string, unknown>> }>();
  const items = record?.items ?? [];

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay ítems cargados.</p>;
  }

  return (
    <DataTable data={items as any[]} bulkActionButtons={false} rowClick={false}>
      <DataTable.Col source="productName" label="Producto" />
      <DataTable.Col source="sku" label="SKU" />
      <DataTable.Col source="quantity" label="Cantidad" />
      <DataTable.Col source="unitPrice" label="Precio unitario" />
      <DataTable.Col source="total" label="Total" />
    </DataTable>
  );
};

export const OrderList = () => (
  <List title="Órdenes">
    <DataTable>
      <DataTable.Col source="id" label="ID">
        <ShortIdField source="id" />
      </DataTable.Col>
      <DataTable.Col source="orderNumber" label="Número" />
      <DataTable.Col source="status" />
      <DataTable.Col source="paymentStatus" label="Pago" />
      <DataTable.Col source="total" />
      <DataTable.Col source="user.email" label="Cliente" />
      <DataTable.Col label="Ver">
        <ShowButton />
      </DataTable.Col>
      <DataTable.Col label="Editar">
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const OrderCreate = () => (
  <CanAccess roles={["admin", "superadmin"]} fallback={<AccessDeniedCard title="Crear orden" />}>
    <Create title="Crear orden">
      <SimpleForm>
        <ArrayInput source="items" label="Items">
          <SimpleFormIterator>
            <ReferenceInput source="variantId" reference="variants" label="Variante">
              <SelectInput optionText="sku" validate={validators.required()} />
            </ReferenceInput>
            <NumberInput source="quantity" min={1} validate={validators.quantity} />
          </SimpleFormIterator>
        </ArrayInput>

        <TextInput source="shippingAddress.firstName" label="Nombre envío" validate={validators.addressName} />
        <TextInput source="shippingAddress.lastName" label="Apellido envío" validate={validators.addressName} />
        <TextInput source="shippingAddress.streetAddress" label="Dirección envío" validate={validators.addressStreet} />
        <TextInput source="shippingAddress.apartment" label="Depto envío" validate={validators.addressApartment} />
        <TextInput source="shippingAddress.city" label="Ciudad envío" validate={validators.addressCityStateCountry} />
        <TextInput source="shippingAddress.stateProvince" label="Provincia envío" validate={validators.addressCityStateCountry} />
        <TextInput source="shippingAddress.postalCode" label="CP envío" validate={validators.addressPostalCode} />
        <TextInput source="shippingAddress.country" label="País envío" validate={validators.addressCityStateCountry} />
        <TextInput source="shippingAddress.phone" label="Teléfono envío" validate={validators.phoneE164} />

        <TextInput source="billingAddress.firstName" label="Nombre facturación" validate={validators.addressName} />
        <TextInput source="billingAddress.lastName" label="Apellido facturación" validate={validators.addressName} />
        <TextInput source="billingAddress.streetAddress" label="Dirección facturación" validate={validators.addressStreet} />
        <TextInput source="billingAddress.apartment" label="Depto facturación" validate={validators.addressApartment} />
        <TextInput source="billingAddress.city" label="Ciudad facturación" validate={validators.addressCityStateCountry} />
        <TextInput source="billingAddress.stateProvince" label="Provincia facturación" validate={validators.addressCityStateCountry} />
        <TextInput source="billingAddress.postalCode" label="CP facturación" validate={validators.addressPostalCode} />
        <TextInput source="billingAddress.country" label="País facturación" validate={validators.addressCityStateCountry} />
        <TextInput source="billingAddress.phone" label="Teléfono facturación" validate={validators.phoneE164} />

        <TextInput source="couponCode" />
        <TextInput source="notes" multiline validate={validators.orderNotes} />
      </SimpleForm>
    </Create>
  </CanAccess>
);

export const OrderEdit = () => (
  <CanAccess roles={["admin", "superadmin"]} fallback={<AccessDeniedCard title="Editar orden" />}>
    <Edit title="Editar orden">
      <SimpleForm>
        <TextInput source="id" disabled />
        <SelectInput source="status" choices={orderStatusChoices} />
        <TextInput source="trackingNumber" validate={validators.orderTracking} />
        <TextInput source="notes" multiline validate={validators.orderNotes} />
      </SimpleForm>
    </Edit>
  </CanAccess>
);

export const OrderShow = () => (
  <Show title="Detalle de orden">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Resumen</div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">ID</div>
            <TextField source="id" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Número</div>
            <TextField source="orderNumber" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Estado</div>
            <TextField source="status" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Pago</div>
            <TextField source="paymentStatus" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total</div>
            <TextField source="total" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Tracking</div>
            <TextField source="trackingNumber" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Importes</div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs text-muted-foreground">Subtotal</div>
            <TextField source="subtotal" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Descuento</div>
            <TextField source="discountAmount" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Envío</div>
            <TextField source="shippingCost" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Impuestos</div>
            <TextField source="taxAmount" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Cliente</div>
        <TextField source="user.email" />
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Notas</div>
        <TextField source="notes" />
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Dirección de envío</div>
        <div className="flex flex-col gap-1 text-sm">
          <TextField source="shippingAddress.firstName" />
          <TextField source="shippingAddress.lastName" />
          <TextField source="shippingAddress.streetAddress" />
          <TextField source="shippingAddress.city" />
          <TextField source="shippingAddress.stateProvince" />
          <TextField source="shippingAddress.postalCode" />
          <TextField source="shippingAddress.country" />
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Dirección de facturación</div>
        <div className="flex flex-col gap-1 text-sm">
          <TextField source="billingAddress.firstName" />
          <TextField source="billingAddress.lastName" />
          <TextField source="billingAddress.streetAddress" />
          <TextField source="billingAddress.city" />
          <TextField source="billingAddress.stateProvince" />
          <TextField source="billingAddress.postalCode" />
          <TextField source="billingAddress.country" />
        </div>
      </div>
      <div className="rounded-lg border p-4 md:col-span-2">
        <div className="mb-2 text-sm font-medium text-muted-foreground">Ítems de la orden</div>
        <OrderItemsPanel />
      </div>
    </div>
  </Show>
);
