import { baseApi } from "@/redux/baseApi";

export const supplyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Supply
    createSupply: builder.mutation({
      query: (data) => ({
        url: "/supply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supply", "Inventory"],
    }),

    // 🔹 Get All Supplies
    getAllSupplies: builder.query({
      query: () => ({
        url: "/supply",
        method: "GET",
      }),
      providesTags: ["Supply"],
    }),

    // 🔹 Get Supply By ID
    getSupplyById: builder.query({
      query: (id) => ({
        url: `/supply/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Supply", id }],
    }),

    // 🔹 Update Supply
    updateSupply: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/supply/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (id) => [{ type: "Supply", id }, "Inventory"],
    }),

    // 🔹 Delete Supply
    deleteSupply: builder.mutation({
      query: (id) => ({
        url: `/supply/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supply", "Inventory"],
    }),
  }),
});

export const {
  useCreateSupplyMutation,
  useGetAllSuppliesQuery,
  useGetSupplyByIdQuery,
  useUpdateSupplyMutation,
  useDeleteSupplyMutation,
} = supplyApi;
