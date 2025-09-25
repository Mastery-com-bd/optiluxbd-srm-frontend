import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Layout } from "@/components/layouts/Layout";
import AddUser from "@/pages/dashboard/AddUser";
import Dashboard from "@/pages/dashboard/Dashboard";
import PaymentManagement from "@/pages/dashboard/PaymentManagement";
import ProductManagement from "@/pages/dashboard/ProductManagement";
import ReportsPage from "@/pages/dashboard/ReportPage";
import ReturnsManagement from "@/pages/dashboard/ReturnsManagement";
import SuppliesManagement from "@/pages/dashboard/SuppliesManagement";
import UserManagement from "@/pages/dashboard/UserManagement";
// import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
// import Login from "@/pages/Auth/Login";
// import Register from "@/pages/Auth/Register";
// import ResetPassword from "@/pages/Auth/ResetPassword";
// import VerifyOTP from "@/pages/Auth/VerifyOTP";
import HomePage from "@/pages/HomePage";
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
  {
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard/user-management", element: <UserManagement /> },
      { path: "dashboard/add-user", element: <AddUser /> },
      { path: "dashboard/products-management", element: <ProductManagement /> },
      {
        path: "dashboard/suppliers-management",
        element: <SuppliesManagement />,
      },
      {
        path: "dashboard/payments-management",
        element: <PaymentManagement />,
      },
      {
        path: "dashboard/reports",
        element: <ReportsPage />,
      },
      { path: "dashboard/returns-management", element: <ReturnsManagement /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
