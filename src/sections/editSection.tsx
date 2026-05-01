import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "@/components/admin";
import { ReferenceInput, AutocompleteInput } from "@/components/admin";

const SECTION_TYPES = [
  { id: "hero", name: "Hero" },
  { id: "carousel", name: "Carrusel" },
  { id: "featured_catalog", name: "Catálogo Destacado" },
  { id: "categories", name: "Categorías" },
  { id: "testimonials", name: "Testimonios" },
  { id: "banners", name: "Banners" },
];

export const SectionEdit = () => (
  <Edit title="Editar sección">
    <SimpleForm>
      <TextInput
        source="id"
        disabled
      />
      <TextInput
        source="title"
        label="Título"
        validate={required()}
      />
      <TextInput
        source="subtitle"
        label="Subtítulo"
      />
      <SelectInput
        source="type"
        label="Tipo de sección"
        choices={SECTION_TYPES}
        validate={required()}
      />
      <TextInput
        source="slug"
        label="Slug"
        validate={required()}
        help="Identificador único para la sección"
      />
      <NumberInput
        source="order"
        label="Orden"
      />
      <BooleanInput
        source="isActive"
        label="Activo"
      />

      <ArrayInput
        source="items"
        label="Items de la sección"
      >
        <SimpleFormIterator inline>
          <TextInput
            source="title"
            label="Título del item"
          />
          <TextInput
            source="description"
            label="Descripción"
            multiline
            rows={2}
          />
          <TextInput
            source="url"
            label="URL"
            type="url"
          />
          <NumberInput
            source="order"
            label="Orden"
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
