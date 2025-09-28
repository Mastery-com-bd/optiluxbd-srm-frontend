import { baseApi } from "@/redux/baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPayments: build.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),
    getPaymentById: build.query({
      query: (id) => `/payments/${id}`,
      providesTags: ["Payments"],
    }),
    getPaymentPDF: build.query({
      query: (id) => `/payments/${id}/pdf`,
    }),
    generatePayment: build.mutation({
      query: (body) => ({ url: "/payments/generate", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),
    markPaid: build.mutation({
      query: (id) => ({ url: `/payments/${id}/mark-paid`, method: "POST" }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentPDFQuery,
  useGeneratePaymentMutation,
  useMarkPaidMutation,
} = paymentsApi;
