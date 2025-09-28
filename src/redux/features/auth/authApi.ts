import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: build.mutation({
      query: (body) => ({ url: "/auth/verify-email", method: "POST", body }),
    }),
    resendOtp: build.mutation({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),
    login: build.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth", "User"],
    }),
    refreshToken: build.mutation({
      query: () => ({ url: "/auth/refresh-token", method: "POST" }),
    }),
    logout: build.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth", "User"],
    }),
    forgotPassword: build.mutation({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),
    me: build.query({
      query: () => "/auth/me",
      providesTags: ["Auth", "User"],
    }),
    updateMe: build.mutation({
      query: (body) => ({ url: "/auth/me", method: "PATCH", body }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useMeQuery,
  useUpdateMeMutation,
} = authApi;
