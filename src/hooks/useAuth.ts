import { useMeQuery } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";

export const useAuth = () => {
  // ✅ read token from cookie client-side
  const token = Cookies.get("accessToken");

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
