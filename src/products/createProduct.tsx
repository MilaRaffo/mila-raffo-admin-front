import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  NumberInput,
  ArrayInput,
  AutocompleteArrayInput,
  SimpleFormIterator,
} from "@/components/admin";
import { ProductCharacteristicValueInput } from "@/products/ProductCharacteristicValueInput";
import { validators } from "@/lib/validators";

const transformProductPayload = (data: any) => ({
  ...data,
  characteristics: (data.characteristics ?? []).map((item: any) => ({
    characteristicId: item.characteristicId,
    value: String(item.value ?? ""),
  })),
});

export const ProductCreate = () => (
  <Create title="Crear producto" transform={transformProductPayload}>
    <SimpleForm>
      <TextInput source="name" label="Nombre" validate={validators.productName} />
      <TextInput source="description" multiline rows={4} label="Descripción" validate={validators.productDescription} />
      <ReferenceArrayInput source="categoryIds" reference="categories">
        <AutocompleteArrayInput label="Categorías" optionText="name" />
      </ReferenceArrayInput>
      <NumberInput source="basePrice" label="Precio base" step={0.01} min={0} validate={validators.price} />
      <BooleanInput source="available" label="Disponible" />

      <ArrayInput source="characteristics" label="Características">
        <SimpleFormIterator inline>
          <ReferenceInput source="characteristicId" reference="characteristics" label="Característica">
            <AutocompleteInput validate={validators.required()} />
          </ReferenceInput>
          <ProductCharacteristicValueInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);