import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Layout } from "@/components/layouts/Layout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage";
import PendingApproval from "@/pages/auth/PendingApproval";
import RegisterPage from "@/pages/auth/RegisterPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import AddUser from "@/pages/dashboard/admin/AddUser";
import PaymentManagement from "@/pages/dashboard/admin/PaymentManagement";
import ProductManagement from "@/pages/dashboard/admin/ProductManagement";
import ReportsPage from "@/pages/dashboard/admin/ReportPage";
import ReturnsManagement from "@/pages/dashboard/admin/ReturnsManagement";
import SuppliesManagement from "@/pages/dashboard/admin/SuppliesManagement";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/dashboard/Profile";
import Settings from "@/pages/dashboard/Settings";
import InventoryManagement from "@/pages/dashboard/staff/InventoryManagement";
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
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "pending-approval", element: <PendingApproval /> },
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
          {
            path: "dashboard/profile",
            element: <Profile />,
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
