import { useMeQuery } from "@/redux/features/auth/authApi";

export const useAuth = () => {
  const token = new CookieStore().get("accessToken");
  const result = useMeQuery(undefined, {
    skip: !token,
  });
  if (!token)
    return {
      isLoading: false,
      isError: false,
      user: null,
      isAuthenticated: false,
    };

  return {
    user: result.data,
    role: result.data?.role,
    isAuthenticated: !!result.data?._id,
    ...result,
  };
};
