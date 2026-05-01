import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
} from "@/components/admin";
import { required } from "ra-core";

const SECTION_TYPES = [
  { id: "hero", name: "Hero" },
  { id: "carousel", name: "Carrusel" },
  { id: "featured_catalog", name: "Catálogo Destacado" },
  { id: "categories", name: "Categorías" },
  { id: "testimonials", name: "Testimonios" },
  { id: "banners", name: "Banners" },
];

export const SectionCreate = () => (
  <Create redirect="/sections">
    <SimpleForm>
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
        defaultValue={0}
      />
      <BooleanInput
        source="isActive"
        label="Activo"
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);
