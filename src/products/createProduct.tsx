import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
} from "@/components/admin";
import { required } from "ra-core";

export const ProductCreate = () => (
  <Create title='Crear Productos'>
    <SimpleForm>
      <TextInput source="name" label="Nombre" validate={required()} />
      <TextInput source="description" multiline rows={4} label="Descripción"  />
      <ReferenceArrayInput source="categoryIds" reference="categories">
        <AutocompleteInput label="Categorias" validate={required()} />
      </ReferenceArrayInput>
      <NumberInput source="basePrice" label='Precio base' step={0.1} min={0}/>
      
      <ArrayInput source='characteristics' label='Características'>
        <SimpleFormIterator inline>
          <ReferenceInput source="characteristicId" reference="characteristics" label="Característica">
            <AutocompleteInput validate={required()} />
          </ReferenceInput>
          <TextInput source="value" label="Valor" validate={required()} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);