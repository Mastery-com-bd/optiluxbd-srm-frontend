import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({ url: "/users", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: build.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getMe: build.query({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    updateMe: build.mutation({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
    getAgents: build.query({
      query: () => "/users/agents",
      providesTags: ["User"],
    }),
    approveUser: build.mutation({
      query: (id) => ({ url: `/users/approve/${id}`, method: "PATCH" }),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(["User"]));
        } catch {
          // Handle error if needed
        }
      },
    }),
    blockUser: build.mutation({
      query: (id) => ({ url: `/users/block/${id}`, method: "PATCH" }),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(["User"]));
        } catch {
          // Handle error if needed
        }
      },
    }),
    deleteUser: build.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetAgentsQuery,
  useApproveUserMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
} = userApi;
