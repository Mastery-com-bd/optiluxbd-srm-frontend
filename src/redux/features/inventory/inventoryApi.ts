import { baseApi } from "@/redux/baseApi";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (body) => ({ url: "/inventory", method: "POST", body }),
      invalidatesTags: ["Inventory"],
    }),
    getProducts: build.query({
      query: () => "/inventory",
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
} = inventoryApi;
