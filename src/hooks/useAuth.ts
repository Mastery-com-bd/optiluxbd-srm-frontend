import { useMeQuery } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";

export const useAuth = () => {
  // ✅ read token from cookie client-side
  const token = Cookies.get("accessToken");

  console.log("Token from cookie:", token);

  // Skip /me query if no token
  const result = useMeQuery(undefined, { skip: !token });

  if (!token) {
    return {
      isLoading: false,
      isError: false,
      user: null,
      isAuthenticated: false,
    };
  }

  return {
    user: result.data,
    role: result.data?.role,
    isAuthenticated: !!result.data?._id,
    ...result,
  };
};

// import { useMeQuery } from "@/redux/features/auth/authApi";

// export const useAuth = () => {
//   // Remove cookie check - always run the query
//   // The browser will automatically include HTTP-only cookies
//   const result = useMeQuery(undefined);

//   return {
//     user: result.data ?? null,
//     role: result.data?.role,
//     isAuthenticated: !!result.data?._id,
//     isLoading: result.isLoading,
//     isFetching: result.isFetching,
//     error: result.error,
//     refetch: result.refetch,
//   };
// };

// import { useMeQuery } from "@/redux/features/auth/authApi";
// import { useSelector } from "react-redux";

// export const useAuth = () => {
//   const accessToken = useSelector((state: any) => state.auth.accessToken); // Adjust type if using RootState
//   // Always run /me query; backend will 401 if no valid cookie
//   const result = useMeQuery(undefined, { skip: !accessToken });

//   return {
//     user: result.data ?? null,
//     role: result.data?.role,
//     isAuthenticated: !!result.data?._id,
//     ...result,
//   };
// };

// import { useMeQuery } from "@/redux/features/auth/authApi";

// export const useAuth = () => {
//   // Always run /me query; backend will 401 if no valid cookie
//   const result = useMeQuery(undefined);

//   return {
//     user: result.data ?? null,
//     role: result.data?.role,
//     isAuthenticated: !!result.data?._id,
//     ...result,
//   };
// };
