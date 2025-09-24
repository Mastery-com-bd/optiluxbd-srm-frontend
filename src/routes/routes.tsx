import { Layout } from "@/components/layouts/Layout";
// import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
// import Login from "@/pages/Auth/Login";
// import Register from "@/pages/Auth/Register";
// import ResetPassword from "@/pages/Auth/ResetPassword";
// import VerifyOTP from "@/pages/Auth/VerifyOTP";
import HomePage from "@/pages/HomePage";

// import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
// import DriverManagement from "@/pages/Dashboard/AdminPages/DriverManagement";
// import ReportsOverview from "@/pages/Dashboard/AdminPages/ReportsOverView";
// import RideDetailPage from "@/pages/Dashboard/AdminPages/RideDetailPage";
// import RideManagement from "@/pages/Dashboard/AdminPages/RideManagement";
// import UserDetailPage from "@/pages/Dashboard/AdminPages/userDetailPage";
// import UserManagement from "@/pages/Dashboard/AdminPages/UserManagement";
// import DriverDashboard from "@/pages/Dashboard/DriverDashboard";
// import Profile from "@/pages/Dashboard/Profile";
// import RiderDashboard from "@/pages/Dashboard/RiderDashboard";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      //   { path: "login", element: <Login /> },
      //   { path: "signup", element: <Register /> },
      //   { path: "verify-otp", element: <VerifyOTP /> },
      //   { path: "forgot-password", element: <ForgotPasswordPage /> },
      //   { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Admin Dashboard
  //   {
  //     element: <DashboardLayout />,
  //     children: [
  //       { path: "dashboard/profile", element: <Profile /> },
  //       { path: "dashboard/user-management", element: <UserManagement /> },
  //       {
  //         path: "dashboard/user-management/:userId",
  //         element: <UserDetailPage />,
  //       },
  //       { path: "dashboard/driver-management", element: <DriverManagement /> },
  //       { path: "dashboard/ride-management", element: <RideManagement /> },
  //       {
  //         path: "dashboard/ride-management/:rideId",
  //         element: <RideDetailPage />,
  //       },
  //       {
  //         path: "dashboard/analytics",
  //         element: <ReportsOverview />,
  //       },
  //       { path: "dashboard/rider", element: <RiderDashboard /> },
  //       { path: "dashboard/driver", element: <DriverDashboard /> },
  //       { path: "dashboard/admin", element: <AdminDashboard /> },
  //     ],
  //   },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
