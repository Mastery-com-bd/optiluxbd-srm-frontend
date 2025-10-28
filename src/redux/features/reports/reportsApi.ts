/* eslint-disable @typescript-eslint/no-explicit-any */
// import { baseApi } from "@/redux/baseApi";

// export const reportsApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     todaySupplyment: build.query({
//       query: () => "/reports/today-supplyment",
//       providesTags: ["Reports"],
//     }),
//     weeklySupplyment: build.query({
//       query: () => "/reports/weekly-supplyment",
//       providesTags: ["Reports"],
//     }),
//     monthlySupplyment: build.query({
//       query: () => "/reports/monthly-supplyment",
//       providesTags: ["Reports"],
//     }),
//     totalPaymentsDue: build.query({
//       query: () => "/reports/total-payments-due",
//       providesTags: ["Reports"],
//     }),
//     stockCount: build.query({
//       query: () => "/reports/stock-count",
//       providesTags: ["Reports"],
//     }),
//     returnsCount: build.query({
//       query: () => "/reports/returns-count",
//       providesTags: ["Reports"],
//     }),
//     supplierOverview: build.query({
//       query: (id) => `/reports/supplier/${id}/overview`,
//       providesTags: ["Reports"],
//     }),
//   }),
// });

// export const {
//   useTodaySupplymentQuery,
//   useWeeklySupplymentQuery,
//   useMonthlySupplymentQuery,
//   useTotalPaymentsDueQuery,
//   useStockCountQuery,
//   useReturnsCountQuery,
//   useSupplierOverviewQuery,
// } = reportsApi;

import { baseApi } from "@/redux/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    todaySupplyment: build.query({
      query: () => "/reports/today-supplyment",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    weeklySupplyment: build.query({
      query: () => "/reports/weekly-supplyment",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    monthlySupplyment: build.query({
      query: () => "/reports/monthly-supplyment",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    totalPaymentsDue: build.query({
      query: () => "/reports/total-payments-due",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    stockCount: build.query({
      query: () => "/reports/stock-count",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    returnsCount: build.query({
      query: () => "/reports/returns-count",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    supplierOverview: build.query({
      query: (id) => `/reports/supplier/${id}/overview`,
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    // NEW: Chart data endpoints
    monthlySupplyTrends: build.query({
      query: () => "/reports/monthly-supply-trends",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    paymentTrends: build.query({
      query: () => "/reports/payment-trends",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
    dashboardOverview: build.query({
      query: () => "/reports/dashboard-overview",
      providesTags: ["Reports"],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useTodaySupplymentQuery,
  useWeeklySupplymentQuery,
  useMonthlySupplymentQuery,
  useTotalPaymentsDueQuery,
  useStockCountQuery,
  useReturnsCountQuery,
  useSupplierOverviewQuery,
  useMonthlySupplyTrendsQuery,
  usePaymentTrendsQuery,
  useDashboardOverviewQuery,
} = reportsApi;
