import { baseApi } from "@/redux/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    todaySupplyment: build.query({
      query: () => "/reports/today-supplyment",
      providesTags: ["Reports"],
    }),
    weeklySupplyment: build.query({
      query: () => "/reports/weekly-supplyment",
      providesTags: ["Reports"],
    }),
    monthlySupplyment: build.query({
      query: () => "/reports/monthly-supplyment",
      providesTags: ["Reports"],
    }),
    totalPaymentsDue: build.query({
      query: () => "/reports/total-payments-due",
      providesTags: ["Reports"],
    }),
    stockCount: build.query({
      query: () => "/reports/stock-count",
      providesTags: ["Reports"],
    }),
    returnsCount: build.query({
      query: () => "/reports/returns-count",
      providesTags: ["Reports"],
    }),
    supplierOverview: build.query({
      query: (id) => `/reports/supplier/${id}/overview`,
      providesTags: ["Reports"],
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
} = reportsApi;
