import {
  Show,
  TextField,
  NumberField,
  ReferenceArrayField,
  SingleFieldList,
  BadgeField,
  ReferenceManyField,
  DataTable,
  CreateButton,
} from "@/components/admin";
import { useRecordContext, useFieldValue } from "ra-core";

const BooleanDisplay = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const value = useFieldValue({ source, record });
  return <span>{value ? "Sí" : "No"}</span>;
};

const VariantsPanel = () => {
  const record = useRecordContext();
  
  if (!record) return null;
  
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Variantes</h3>
        <CreateButton resource="variants"/>
      </div>
      <ReferenceManyField
        reference="variants"
        target="productId"
      >
        <DataTable>
          <DataTable.Col source="sku" label="SKU" />
          <DataTable.Col source="price" label="Precio" />
          <DataTable.Col source="leatherIds" label="Cueros">
            <ReferenceArrayField source="leatherIds" reference="leathers">
              <SingleFieldList>
                <BadgeField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
          </DataTable.Col>
        </DataTable>
      </ReferenceManyField>
    </div>
  );
};

export const ProductShow = () => (
  <Show title="Detalle del Producto">
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Nombre</div>
        <TextField source="name" />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Descripción</div>
        <TextField source="description" />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Precio Base</div>
        <NumberField source="basePrice" />
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">Disponible</div>
        <BooleanDisplay source="available" />
      </div>
      
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">Categorías</h3>
        <ReferenceArrayField source="categoryIds" reference="categories">
          <SingleFieldList>
            <BadgeField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">Características</h3>
        {/* Aquí se mostrarían las características del producto */}
      </div>

      <VariantsPanel />
    </div>
  </Show>
);
