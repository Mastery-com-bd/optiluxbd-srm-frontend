// import { baseApi } from "@/redux/baseApi";

// export const returnsApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createReturn: build.mutation({
//       query: (body) => ({ url: "/returns", method: "POST", body }),
//       invalidatesTags: ["Returns"],
//     }),
//     getReturns: build.query({
//       query: () => "/returns",
//       providesTags: ["Returns"],
//     }),
//     updateReturn: build.mutation({
//       query: ({ id, ...body }) => ({
//         url: `/returns/${id}`,
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["Returns"],
//     }),
//   }),
// });

// export const {
//   useCreateReturnMutation,
//   useGetReturnsQuery,
//   useUpdateReturnMutation,
// } = returnsApi;

import { baseApi } from "@/redux/baseApi";

export const returnsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReturn: build.mutation({
      query: (body) => ({ url: "/returns", method: "POST", body }),
      invalidatesTags: ["Returns"],
    }),
    getReturns: build.query({
      query: () => "/returns",
      providesTags: ["Returns"],
    }),
    updateReturn: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/returns/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Returns"],
    }),
    deleteReturn: build.mutation({
      query: (id) => ({
        url: `/returns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Returns"],
    }),
  }),
});

export const {
  useCreateReturnMutation,
  useGetReturnsQuery,
  useUpdateReturnMutation,
  useDeleteReturnMutation,
} = returnsApi;
