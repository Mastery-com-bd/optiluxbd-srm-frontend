import { baseApi } from "@/redux/baseApi";

export const supplierApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuppliers: build.query({
      query: () => "/suppliers",
      providesTags: ["Suppliers"],
    }),
    getSupplierById: build.query({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Suppliers"],
    }),
    getSupplierProducts: build.query({
      query: (id) => `/suppliers/${id}/products`,
      providesTags: ["Suppliers"],
    }),

    getSupplierPayments: build.query({
      query: () => ({
        url: `/payments/my-payments`,
        method: "GET",
      })
    }),

    getPaymentSummary: build.query({
      query: (id) => `/suppliers/${id}/payments/summary`,
      providesTags: ["Suppliers"],
    }),
    addPayment: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/suppliers/${id}/payments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    updateCommission: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/suppliers/${id}/commission`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useGetSupplierProductsQuery,
  useGetPaymentSummaryQuery,
  useAddPaymentMutation,
  useUpdateCommissionMutation,
  useGetSupplierPaymentsQuery,
} = supplierApi;
