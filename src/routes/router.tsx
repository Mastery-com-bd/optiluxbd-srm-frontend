import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Layout } from "@/components/layouts/Layout";
import AddUser from "@/pages/dashboard/admin/AddUser";
import PaymentManagement from "@/pages/dashboard/admin/PaymentManagement";
import ProductManagement from "@/pages/dashboard/admin/ProductManagement";
import ReportsPage from "@/pages/dashboard/admin/ReportPage";
import ReturnsManagement from "@/pages/dashboard/admin/ReturnsManagement";
import SuppliesManagement from "@/pages/dashboard/admin/SuppliesManagement";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import Dashboard from "@/pages/dashboard/Dashboard";
import Settings from "@/pages/dashboard/Settings";
import InventoryManagement from "@/pages/dashboard/staff/InventoryManagement";
// import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
// import Login from "@/pages/Auth/Login";
// import Register from "@/pages/Auth/Register";
// import ResetPassword from "@/pages/Auth/ResetPassword";
// import VerifyOTP from "@/pages/Auth/VerifyOTP";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import MyPayments from "@/pages/dashboard/supplier/MyPayment";
import MyProducts from "@/pages/dashboard/supplier/MyProducts";
import MySupplies from "@/pages/dashboard/supplier/MySupplies";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      //   { path: "verify-otp", element: <VerifyOTP /> },
      //   { path: "forgot-password", element: <ForgotPasswordPage /> },
      //   { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Protected Routes for all authenticated users
  {
    element: <ProtectedRoute />, // Checks auth
    children: [
      {
        element: <DashboardLayout />, // Layout for dashboard pages
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "dashboard/user-management", element: <UserManagement /> },
          { path: "dashboard/add-user", element: <AddUser /> },
          {
            path: "dashboard/products-management",
            element: <ProductManagement />,
          },
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
          {
            path: "dashboard/returns-management",
            element: <ReturnsManagement />,
          },
          {
            path: "dashboard/inventory",
            element: <InventoryManagement />,
          },
          {
            path: "dashboard/my-payments",
            element: <MyPayments />,
          },
          {
            path: "dashboard/my-products",
            element: <MyProducts />,
          },
          {
            path: "dashboard/my-supplies",
            element: <MySupplies />,
          },
          { path: "dashboard/settings", element: <Settings /> },
        ],
      },
    ],
  },
  // Catch-all route for 404 Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
