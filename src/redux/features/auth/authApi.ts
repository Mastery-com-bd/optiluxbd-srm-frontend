import { baseApi } from "@/redux/baseApi";
import Cookies from "js-cookie";

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
    // login: build.mutation({
    //   query: (body) => ({ url: "/auth/login", method: "POST", body }),
    //   invalidatesTags: ["Auth", "User"],
    // }),
    // refreshToken: build.mutation({
    //   query: () => ({ url: "/auth/refresh-token", method: "POST" }),
    // }),
    // logout: build.mutation({
    //   query: () => ({ url: "/auth/logout", method: "POST" }),
    //   invalidatesTags: ["Auth", "User"],
    // }),

    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ Save tokens & role in cookies
          Cookies.set("accessToken", data.accessToken, { secure: true });
          Cookies.set("refreshToken", data.refreshToken, { secure: true });
          Cookies.set("role", data.role, { secure: true });
          Cookies.set("status", data.status, { secure: true });
          Cookies.set("isEmailVerified", data.isEmailVerified, {
            secure: true,
          });
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: ["Auth", "User"],
    }),

    logout: build.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // ✅ Remove cookies
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("role");
          Cookies.remove("status");
          Cookies.remove("isEmailVerified");
        }
      },
      invalidatesTags: ["Auth", "User"],
    }),

    refreshToken: build.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { token: Cookies.get("refreshToken") },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ update accessToken only
          Cookies.set("accessToken", data.accessToken, { secure: true });
        } catch (err) {
          console.error("Token refresh failed", err);
        }
      },
    }),
    forgotPassword: build.mutation({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),
    resetPasswordWithOtp: build.mutation({
      query: (body) => ({
        url: "/auth/reset-password-otp",
        method: "POST",
        body,
      }),
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
  useResetPasswordWithOtpMutation,
  useMeQuery,
  useUpdateMeMutation,
} = authApi;
