import { baseApi } from "@/redux/baseApi";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStaff: build.query({
      query: () => "/staff",
      providesTags: ["Staff"],
    }),
    createStaff: build.mutation({
      query: (body) => ({ url: "/staff", method: "POST", body }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    blockStaff: build.mutation({
      query: (id) => ({ url: `/staff/${id}/block`, method: "PATCH" }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useBlockStaffMutation,
} = staffApi;
