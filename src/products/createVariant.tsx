import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
} from "@/components/admin";
import { required } from "ra-core";
import { useLocation } from "react-router-dom";

export const VariantCreate = () => {
  const location = useLocation();
  const productId = location.state?.record?.productId;

  return (
    <Create redirect={`/products/${productId}/show`}>
      <SimpleForm defaultValues={{ productId }}>
        <TextInput source="productId" label="ID del Producto" disabled />
        <TextInput source="sku" label="SKU" validate={required()} />
        <NumberInput source="price" label="Precio" step={0.01} min={0} validate={required()} />
        <NumberInput source="stock" label="Stock" step={1} min={0} validate={required()} />
        
        <ReferenceInput source="colorId" reference="colors" label="Color">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
