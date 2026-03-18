import {
  email,
  maxLength,
  minLength,
  minValue,
  number,
  regex,
  required,
} from "ra-core";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const e164PhoneRegex = /^\+?[1-9]\d{1,14}$/;

export const validators = {
  required,
  email,
  number,
  uuid: regex(uuidV4Regex, "Debe ser un UUID v4 válido"),
  phoneE164: regex(e164PhoneRegex, "Formato inválido. Usa E.164, ej: +5491122334455"),

  productName: [required(), minLength(2), maxLength(200)],
  productDescription: [maxLength(5000)],
  price: [required(), number(), minValue(0)],
  quantity: [required(), number(), minValue(1)],
  characteristicValue: [required(), minLength(1), maxLength(500)],

  categoryName: [required(), minLength(2), maxLength(100)],
  categorySlug: [required(), minLength(2), maxLength(100)],
  categoryDescription: [maxLength(5000)],

  characteristicName: [required(), minLength(2), maxLength(100)],

  leatherName: [required(), minLength(2), maxLength(100)],
  leatherCode: [required(), minLength(2), maxLength(50)],
  leatherColor: [required(), minLength(2), maxLength(20)],

  sku: [required(), minLength(2), maxLength(100)],

  userName: [required(), minLength(2), maxLength(100)],
  userLastName: [required(), minLength(2), maxLength(100)],
  userEmail: [required(), email()],
  userPassword: [required(), minLength(8), maxLength(50)],
  userPhone: [maxLength(20)],

  orderTracking: [maxLength(100)],
  orderNotes: [maxLength(500)],
  addressName: [required(), minLength(2), maxLength(100)],
  addressStreet: [required(), minLength(5), maxLength(200)],
  addressApartment: [maxLength(100)],
  addressCityStateCountry: [required(), minLength(2), maxLength(100)],
  addressPostalCode: [required(), minLength(3), maxLength(20)],
};
