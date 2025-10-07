// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BASE_URL,
//     credentials: "include", // Include cookies in requests
//   }),
//   tagTypes: [
//     "Auth",
//     "User",
//     "Inventory",
//     "Payments",
//     "Reports",
//     "Returns",
//     "Staff",
//     "Suppliers",
//     "Users",
//     "Orders",
//   ],
//   endpoints: () => ({}),
// });

// src/redux/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken"); // ✅ read from cookie
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Inventory",
    "Payments",
    "Reports",
    "Returns",
    "Staff",
    "Suppliers",
    "Supply",
    "Users",
    "Orders",
  ],
  endpoints: () => ({}),
});
