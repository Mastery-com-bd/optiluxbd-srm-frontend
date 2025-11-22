// import { baseApi } from "@/redux/baseApi";

// export const paymentsApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     getAllPayments: build.query({
//       query: () => "/payments",
//       providesTags: ["Payments"],
//     }),
//     getPaymentById: build.query({
//       query: (id) => `/payments/${id}`,
//       providesTags: ["Payments"],
//     }),
//     getPaymentPDF: build.query({
//       query: (id) => `/payments/${id}/pdf`,
//     }),
//     generatePayment: build.mutation({
//       query: (body) => ({ url: "/payments/generate", method: "POST", body }),
//       invalidatesTags: ["Payments"],
//     }),
//     markPaid: build.mutation({
//       query: (id) => ({ url: `/payments/${id}/mark-paid`, method: "POST" }),
//       invalidatesTags: ["Payments"],
//     }),
//   }),
// });

// export const {
//   useGetAllPaymentsQuery,
//   useGetPaymentByIdQuery,
//   useGetPaymentPDFQuery,
//   useGeneratePaymentMutation,
//   useMarkPaidMutation,
// } = paymentsApi;

import { baseApi } from "@/redux/baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ Get all payments (Admin only)
    getAllPayments: build.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),

    // ✅ Get payments filtered by date (Admin only)
    filterPaymentsByDate: build.query({
      query: ({ startDate, endDate }) =>
        `/payments/payment-date?startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Payments"],
    }),

    // ✅ Get single payment by ID (Admin, Supplier)
    getPaymentById: build.query({
      query: (id) => `/payments/${id}`,
      providesTags: (id) => [{ type: "Payments", id }],
    }),
    
    // ✅ Generate new payment (Admin only)
    generatePayment: build.mutation({
      query: (body) => ({
        url: "/payments/generate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ Update payment (Admin only)
    updatePayment: build.mutation({
      query: ({ id, body }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ({ id }) => ["Payments", { type: "Payments", id }],
    }),

    // ✅ Delete payment (Admin only)
    deletePayment: build.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ Mark payment as paid (Admin only)
    markPaid: build.mutation({
      query: (id) => ({
        url: `/payments/${id}/mark-paid`,
        method: "POST",
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ Get Payment PDF (Admin, Supplier)
    getPaymentPDF: build.query({
      query: (id) => ({
        url: `/payments/${id}/pdf`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    manualPayment: build.mutation({
      query: (body) => ({
        url: `/payments/manual`,
        method: "POST",
        body,
      })
    })
  }),
});

export const {
  useGetAllPaymentsQuery,
  useFilterPaymentsByDateQuery,
  useGetPaymentByIdQuery,
  useGeneratePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useMarkPaidMutation,
  useGetPaymentPDFQuery,
  useManualPaymentMutation,
} = paymentsApi;
