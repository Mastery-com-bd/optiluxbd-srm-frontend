import { baseApi } from "@/redux/baseApi";
import { buildParams } from "@/utills/paramBuilder";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (body) => ({ url: "/inventory", method: "POST", body }),
      invalidatesTags: ["Inventory"],
    }),
    getProducts: build.query({
      query: (params) => `/inventory?${buildParams(params)}`,
      providesTags: ["Inventory"],
    }),
    getProductById: build.query({
      query: (id) => `/inventory/${id}`,
      providesTags: ["Inventory"],
    }),
    updateProduct: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({ url: `/inventory/${id}`, method: "DELETE" }),
      invalidatesTags: ["Inventory"],
    }),
    updateStock: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/inventory/${id}/stock`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    getMinimumStock: build.query({
      query: () => "/inventory/minimum-stock",
      providesTags: ["Inventory"],
    }),
    bulkImport: build.mutation({
      query: (body) => ({
        url: "/inventory/bulk-import",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteSupplier: build.mutation<void, { productId: string; supplierId: string }>({
      query: ({ productId, supplierId }) => ({
        url: `/inventory/${productId}/price-variations/${supplierId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateStockMutation,
  useGetMinimumStockQuery,
  useBulkImportMutation,
  useDeleteSupplierMutation,
} = inventoryApi;
