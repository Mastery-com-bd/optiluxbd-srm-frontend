import OptiluxLogo from "@/assets/Optilux-Logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

import {
  BarChart3,
  Boxes,
  DollarSign,
  LayoutDashboard,
  Package,
  Receipt,
  RotateCcw,
  Settings,
  TruckIcon,
  UserPlus,
  Users,
} from "lucide-react";
// import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";

const adminItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "User Management", url: "/dashboard/user-management", icon: Users },
  { title: "Inventory", url: "/dashboard/products-management", icon: Package },
  {
    title: "Suppliers",
    url: "/dashboard/suppliers-management",
    icon: TruckIcon,
  },
  {
    title: "Payments",
    url: "/dashboard/payments-management",
    icon: DollarSign,
  },
  { title: "Reports", url: "/dashboard/reports", icon: BarChart3 },
  { title: "Returns", url: "/dashboard/returns-management", icon: RotateCcw },
];

const staffItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  // { title: "Inventory", url: "/dashboard/inventory-management", icon: Boxes },
  { title: "Inventory", url: "/dashboard/products-management", icon: Boxes },
  { title: "Returns", url: "/dashboard/returns-management", icon: RotateCcw },
];

const supplierItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Supplies", url: "/dashboard/my-products", icon: Package },
  // { title: "My Supplies", url: "/dashboard/my-supplies", icon: TruckIcon },
  { title: "My Payments", url: "/dashboard/my-payments", icon: Receipt },
];

export function AppSidebar() {
  // const { user } = useSelector((state: RootState) => state.auth);
  const { user } = useAuth();
  const { state: sidebarState } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getMenuItems = () => {
    switch (user?.role) {
      case "admin":
        return adminItems;
      case "staff":
        return staffItems;
      case "supplier":
        return supplierItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (itemUrl: string) => {
    const active = isActive(itemUrl);
    return active
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={OptiluxLogo}
              className="h-16 w-32 object-contain"
              alt="OptiluxBD Logo"
            />
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarState !== "collapsed" && (
                        <span className="ml-3">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
              Admin Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to="/dashboard/add-user"
                      className={getNavClassName("/dashboard/add-user")}
                    >
                      <UserPlus className="h-4 w-4 flex-shrink-0" />
                      {sidebarState !== "collapsed" && (
                        <span className="ml-3">Add User</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to="/dashboard/settings"
                      className={getNavClassName("/dashboard/settings")}
                    >
                      <Settings className="h-4 w-4 flex-shrink-0" />
                      {sidebarState !== "collapsed" && (
                        <span className="ml-3">Settings</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
