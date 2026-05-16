export type UUID = string;

export type RoleName = "client" | "admin" | "superadmin";

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface AuthUser {
  id: UUID;
  email: string;
  name: string;
  lastName: string;
  role: {
    id: UUID;
    name: RoleName;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ProductCharacteristicInput {
  characteristicId: UUID;
  value: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  basePrice: number;
  available?: boolean;
  categoryIds?: UUID[];
  characteristics?: ProductCharacteristicInput[];
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductCategoryRef {
  id: UUID;
  name: string;
  slug: string;
}

export interface ProductCharacteristicRef {
  id: UUID;
  name: string;
  dataType: DataType;
  units?: Measureunits;
  value: string;
}

export interface ProductVariantRef {
  id: UUID;
  sku: string;
  price: number;
  isAvailable: boolean;
}

export interface Product {
  id: UUID;
  name: string;
  description?: string;
  basePrice: number;
  available: boolean;
  categories: ProductCategoryRef[];
  characteristics: ProductCharacteristicRef[];
  variants: ProductVariantRef[];
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  parentId?: UUID;
  active?: boolean;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export interface Category {
  id: UUID;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  parent: {
    id: UUID;
    name: string;
    slug: string;
  } | null;
  children: Array<{
    id: UUID;
    name: string;
    slug: string;
    description?: string;
    active: boolean;
  }>;
}

export const DATA_TYPE = {
  NUMBER: "number",
  TEXT: "text",
  BOOLEAN: "boolean",
} as const;

export type DataType = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];

export const MEASURE_UNITS = {
  KILOGRAM: "Kg",
  GRAM: "g",
  METER: "m",
  CENTIMETER: "cm",
  MILLIMETER: "mm",
  LITER: "L",
  INCH: "in",
} as const;

export type Measureunits = (typeof MEASURE_UNITS)[keyof typeof MEASURE_UNITS];

export interface CreateCharacteristicDto {
  name: string;
  dataType: DataType;
  units?: Measureunits;
}

export type UpdateCharacteristicDto = Partial<CreateCharacteristicDto>;

export interface Characteristic {
  id: UUID;
  name: string;
  dataType: DataType;
  units?: Measureunits;
}

export interface CreateColorDto {
  name: string;
  code: string;
  hex: string;
  isActive?: boolean;
  imageId?: UUID;
}

export type UpdateColorDto = Partial<CreateColorDto>;

export interface Color {
  id: UUID;
  name: string;
  code: string;
  hex: string;
  isActive: boolean;
  imageId: UUID | null;
  image: {
    url: string;
    alt: string;
  } | null;
}

export interface CreateVariantDto {
  productId: UUID;
  sku: string;
  price: number;
  stock: number;
  isAvailable?: boolean;
  colorId?: UUID;
}

export type UpdateVariantDto = Partial<Omit<CreateVariantDto, "productId">>;

export interface Variant {
  id: UUID;
  sku: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  product: {
    id: UUID;
    name: string;
  } | null;
  color: {
    id: UUID;
    name: string;
    code: string;
    hex: string;
    isActive: boolean;
    image: {
      url: string;
      alt: string;
    } | null;
  } | null;
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export interface CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  roleId?: UUID;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, "password">>;

export interface UserListItem {
  id: UUID;
  name: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface UpdateOrderDto {
  status?: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface Order {
  id: UUID;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  couponCode?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  notes?: string;
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  user: {
    id: UUID;
    name: string;
    lastName: string;
    email: string;
  } | null;
  items: Array<{
    id: UUID;
    variantId: UUID;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    discount: number;
    total: number;
  }>;
}

export interface AddressInfo {
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Role {
  id: UUID;
  name: RoleName;
  description?: string;
}
