import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import StaffDashboard from "@/pages/dashboard/staff/StaffDashboard";
import SupplierDashboard from "@/pages/dashboard/supplier/SupplierDashboard";
// import { type RootState } from "@/redux/store";
// import { use } from "react";
// import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "staff":
      return <StaffDashboard />;
    case "supplier":
      return <SupplierDashboard />;
    default:
      return <div>Invalid role</div>;
  }
};

export default Dashboard;
