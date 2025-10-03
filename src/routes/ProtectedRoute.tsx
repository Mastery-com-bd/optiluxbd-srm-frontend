// import { useAuth } from "@/hooks/useAuth";
// // import type { RootState } from "@/redux/store";
// // import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router";

// const ProtectedRoute = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  roles?: Array<"admin" | "supplier" | "staff">;
  redirectTo?: string;
  loadingFallback?: React.ReactNode;
}

const ProtectedRoute = ({
  roles,
  redirectTo = "/login",
  loadingFallback = <div className="p-6 text-center">Loading...</div>,
}: ProtectedRouteProps) => {
  const { user, isLoading, isError, isAuthenticated } = useAuth();

  if (isLoading) return loadingFallback;
  if (isError || !isAuthenticated) return <Navigate to={redirectTo} replace />;

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
