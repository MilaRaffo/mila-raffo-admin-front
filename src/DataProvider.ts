import type { DataProvider, GetListParams, GetManyReferenceParams, RaRecord } from "ra-core";
import { apiRequest } from "@/lib/http-client";
import type { PaginatedResponse } from "@/types/api";

const toQueryString = (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            searchParams.set(key, String(value));
        }
    });
    const query = searchParams.toString();
    return query ? `?${query}` : "";
};

const resourcePath: Record<string, string> = {
    products: "/products",
    categories: "/categories",
    characteristics: "/characteristics",
    colors: "/colors",
    variants: "/variants",
    images: "/images",
    users: "/users",
    orders: "/orders",
    roles: "/roles",
    sections: "/sections",
};

const normalizeRecord = <T extends RaRecord>(resource: string, record: T): T => {
    if (resource === "products") {
        const product = record as T & {
            categories?: Array<{ id: string }>;
            characteristics?: Array<{ id?: string; characteristicId?: string; value: string }>;
        };
        return {
            ...product,
            categoryIds: (product.categories ?? []).map((category) => category.id),
            characteristics:
                product.characteristics?.map((item) => ({
                    ...item,
                    characteristicId: item.characteristicId ?? item.id,
                    value: item.value,
                })) ?? [],
        } as T;
    }

    if (resource === "categories") {
        const category = record as T & { parent?: { id: string } | null };
        return {
            ...category,
            parentId: category.parent?.id,
        } as T;
    }

    if (resource === "variants") {
        const variant = record as T & {
            product?: { id: string } | null;
            color?: { id: string } | null;
        };
        return {
            ...variant,
            productId: variant.product?.id,
            colorId: variant.color?.id,
        } as T;
    }

    if (resource === "images") {
        const image = record as T & {
            variant?: { id: string } | null;
        };

        return {
            ...image,
            variantId: image.variant?.id,
        } as T;
    }

    if (resource === "sections") {
        const section = record as T & { items?: Array<Record<string, unknown>> };
        return {
            ...section,
            items: section.items ?? [],
        } as T;
    }

    return record;
};

const mapPaginationParams = (params: GetListParams | GetManyReferenceParams) => {
    const page = params.pagination?.page ?? 1;
    const perPage = params.pagination?.perPage ?? 10;
    const offset = (page - 1) * perPage;

    return {
        limit: perPage,
        offset,
    };
};

const mapSortParams = (params: GetListParams | GetManyReferenceParams) => {
    if (!params.sort) {
        return {};
    }

    return {
        sortBy: params.sort.field,
        sortOrder: params.sort.order,
    };
};

const mapFilterParams = (params: GetListParams | GetManyReferenceParams) => {
    if (!params.filter) {
        return {};
    }

    const mapped: Record<string, string> = {};

    Object.entries(params.filter).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        mapped[key] = String(value);
    });

    return mapped;
};

const getResourcePath = (resource: string) => {
    const path = resourcePath[resource];
    if (!path) {
        throw new Error(`Resource no soportado: ${resource}`);
    }
    return path;
};

const normalizeIdArray = (value: unknown): string[] | undefined => {
    if (Array.isArray(value)) {
        const normalized = value
            .map((item) => String(item).trim())
            .filter(Boolean);
        return normalized.length > 0 ? normalized : undefined;
    }

    if (typeof value === "string") {
        const normalized = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        return normalized.length > 0 ? normalized : undefined;
    }

    return undefined;
};

type VariantPayloadInput = {
    productId?: unknown;
    sku?: unknown;
    price?: unknown;
    stock?: unknown;
    isAvailable?: unknown;
    colorId?: unknown;
};

const sanitizeVariantPayload = (data: VariantPayloadInput, options: { includeProductId: boolean }) => {
    const payload: Record<string, unknown> = {};

    if (options.includeProductId && data.productId) {
        payload.productId = data.productId;
    }

    if (data.sku !== undefined) {
        payload.sku = data.sku;
    }

    if (data.price !== undefined) {
        payload.price = data.price;
    }

    if (data.stock !== undefined) {
        payload.stock = data.stock;
    }

    if (data.isAvailable !== undefined) {
        payload.isAvailable = data.isAvailable;
    }

    if (data.colorId !== undefined) {
        payload.colorId = data.colorId || null;
    }

    return payload;
};

const sanitizePayload = (resource: string, data: any) => {
    if (resource === "products") {
        const characteristics = Array.isArray(data.characteristics)
            ? data.characteristics
                .filter((item: any) => item?.characteristicId)
                .map((item: any) => ({
                    characteristicId: item.characteristicId,
                    value: String(item.value ?? ""),
                }))
            : undefined;

        return {
            ...data,
            categoryIds: normalizeIdArray(data.categoryIds),
            characteristics,
        };
    }

    if (resource === "variants") {
        return sanitizeVariantPayload(data, { includeProductId: true });
    }

    return data;
};

export const dataProvider: DataProvider = {
    async getList(resource, params) {
        const basePath = getResourcePath(resource);
        const query = toQueryString({
            ...mapPaginationParams(params),
            ...mapSortParams(params),
            ...mapFilterParams(params),
        });

        const response = await apiRequest<PaginatedResponse<RaRecord>>(
            `${basePath}${query}`,
            {
                method: "GET",
            },
        );

        return {
            data: response.data.map((record) => normalizeRecord(resource, record)),
            total: response.pagination.total,
            pageInfo: {
                hasNextPage:
                    response.pagination.offset + response.pagination.limit <
                    response.pagination.total,
                hasPreviousPage: response.pagination.offset > 0,
            },
        } as any;
    },

    async getOne(resource, params) {
        const basePath = getResourcePath(resource);
        const record = await apiRequest<RaRecord>(`${basePath}/${params.id}`, {
            method: "GET",
        });

        return {
            data: normalizeRecord(resource, record),
        } as any;
    },

    async getMany(resource, params) {
        const records = await Promise.all(
            params.ids.map(async (id) => {
                const record = await this.getOne(resource, { id });
                return record.data;
            }),
        );

        return { data: records } as any;
    },

    async getManyReference(resource, params: GetManyReferenceParams) {
        const basePath = getResourcePath(resource);

        if (resource === "variants" && params.target === "productId") {
            const query = toQueryString({
                ...mapPaginationParams(params),
            });
            const response = await apiRequest<PaginatedResponse<RaRecord>>(
                `/products/${params.id}/variants${query}`,
                { method: "GET" },
            );

            return {
                data: response.data.map((record) =>
                    normalizeRecord(resource, { ...record, productId: params.id }),
                ),
                total: response.pagination.total,
            } as any;
        }

        const query = toQueryString({
            ...mapPaginationParams(params),
            ...mapSortParams(params),
            ...mapFilterParams(params),
            [params.target]: String(params.id),
        });

        const response = await apiRequest<PaginatedResponse<RaRecord>>(
            `${basePath}${query}`,
            { method: "GET" },
        );

        return {
            data: response.data.map((record) => normalizeRecord(resource, record)),
            total: response.pagination.total,
        } as any;
    },

    async create(resource, params) {
        const basePath = getResourcePath(resource);

        if (resource === "images") {
            const imageData = params.data as {
                file?: { rawFile?: File };
                alt?: string;
                variantId?: string;
                url?: string;
            };

            if (imageData.file?.rawFile instanceof File) {
                const formData = new FormData();
                formData.append("file", imageData.file.rawFile);
                if (imageData.alt) {
                    formData.append("alt", imageData.alt);
                }
                if (imageData.variantId) {
                    formData.append("variantId", imageData.variantId);
                }

                const uploaded = await apiRequest<RaRecord>("/images/upload", {
                    method: "POST",
                    body: formData,
                });

                return {
                    data: normalizeRecord(resource, uploaded),
                } as any;
            }
        }

        if (resource === "variants") {
            const variantData = params.data as {
                imageFiles?: Array<{ rawFile?: File; title?: string }> | { rawFile?: File; title?: string };
                sku?: string;
            };

            const record = await apiRequest<RaRecord>(basePath, {
                method: "POST",
                body: JSON.stringify(sanitizePayload(resource, variantData)),
            });

            const files = Array.isArray(variantData.imageFiles)
                ? variantData.imageFiles
                : variantData.imageFiles
                    ? [variantData.imageFiles]
                    : [];

            const uploadCandidates = files
                .map((fileItem, index) => ({
                    rawFile: fileItem?.rawFile,
                    alt:
                        typeof fileItem?.title === "string" && fileItem.title.trim().length > 0
                            ? fileItem.title
                            : `${variantData.sku ?? "Variante"} - ${index + 1}`,
                }))
                .filter((item) => item.rawFile instanceof File) as Array<{
                    rawFile: File;
                    alt: string;
                }>;

            if (uploadCandidates.length > 0) {
                await Promise.all(
                    uploadCandidates.map(async (item) => {
                        const formData = new FormData();
                        formData.append("file", item.rawFile);
                        formData.append("variantId", String(record.id));
                        formData.append("alt", item.alt);

                        await apiRequest<RaRecord>("/images/upload", {
                            method: "POST",
                            body: formData,
                        });
                    }),
                );
            }

            const hydratedRecord = await apiRequest<RaRecord>(
                `${basePath}/${record.id}`,
                {
                    method: "GET",
                },
            );

            return {
                data: normalizeRecord(resource, hydratedRecord),
            } as any;
        }

        const record = await apiRequest<RaRecord>(basePath, {
            method: "POST",
            body: JSON.stringify(sanitizePayload(resource, params.data)),
        });

        return {
            data: normalizeRecord(resource, record),
        } as any;
    },

    async update(resource, params) {
        const basePath = getResourcePath(resource);

        if (resource === "variants") {
            const variantData = params.data as {
                imageFiles?: Array<{ rawFile?: File; title?: string }> | { rawFile?: File; title?: string };
                sku?: string;
            };

            const updatedVariant = await apiRequest<RaRecord>(`${basePath}/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(sanitizeVariantPayload(variantData, { includeProductId: false })),
            });

            const files = Array.isArray(variantData.imageFiles)
                ? variantData.imageFiles
                : variantData.imageFiles
                    ? [variantData.imageFiles]
                    : [];

            const uploadCandidates = files
                .map((fileItem, index) => ({
                    rawFile: fileItem?.rawFile,
                    alt:
                        typeof fileItem?.title === "string" && fileItem.title.trim().length > 0
                            ? fileItem.title
                            : `${variantData.sku ?? "Variante"} - ${index + 1}`,
                }))
                .filter((item) => item.rawFile instanceof File) as Array<{
                    rawFile: File;
                    alt: string;
                }>;

            if (uploadCandidates.length > 0) {
                await Promise.all(
                    uploadCandidates.map(async (item) => {
                        const formData = new FormData();
                        formData.append("file", item.rawFile);
                        formData.append("variantId", String(params.id));
                        formData.append("alt", item.alt);

                        await apiRequest<RaRecord>("/images/upload", {
                            method: "POST",
                            body: formData,
                        });
                    }),
                );
            }

            const hydratedRecord = await apiRequest<RaRecord>(
                `${basePath}/${updatedVariant.id}`,
                {
                    method: "GET",
                },
            );

            return {
                data: normalizeRecord(resource, hydratedRecord),
            } as any;
        }

        const record = await apiRequest<RaRecord>(`${basePath}/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(sanitizePayload(resource, params.data)),
        });

        return {
            data: normalizeRecord(resource, record),
        } as any;
    },

    async updateMany(resource, params) {
        const basePath = getResourcePath(resource);
        const result = await Promise.all(params.ids.map(async (id) => {
            const payload = resource === "variants"
                ? sanitizeVariantPayload(params.data, { includeProductId: false })
                : sanitizePayload(resource, params.data);

            await apiRequest(`${basePath}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(payload),
            });
            return id;
        }));

        return { data: result } as any;
    },

    async delete(resource, params) {
        const basePath = getResourcePath(resource);
        await apiRequest<void>(`${basePath}/${params.id}`, {
            method: "DELETE",
        });

        return {
            data: { id: params.id } as RaRecord,
        } as any;
    },

    async deleteMany(resource, params) {
        const basePath = getResourcePath(resource);
        const result = await Promise.all(params.ids.map(async (id) => {
            await apiRequest(`${basePath}/${id}`, {
                method: "DELETE",
            });
            return id;
        }));

        return { data: result } as any;
    },
};
