/* eslint-disable @typescript-eslint/no-explicit-any */
import OptiluxLogo from "@/assets/Optilux-Logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/redux/features/auth//authSlice";
import type { RootState } from "@/redux/store";
import {
  BarChart3,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => (state as any).auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  const getNavItems = (): Array<{
    name: string;
    href: string;
    icon?: any;
  }> => {
    if (!isAuthenticated) {
      return [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "About", href: "/#about" },
      ];
    }

    const baseItems = [{ name: "Dashboard", href: "/dashboard" }];

    switch (user?.role) {
      case "admin":
        return [
          ...baseItems,
          { name: "Users", href: "/users", icon: Users },
          { name: "Products", href: "/products", icon: Package },
          { name: "Reports", href: "/reports", icon: BarChart3 },
        ];
      case "staff":
        return [
          ...baseItems,
          { name: "Inventory", href: "/inventory", icon: Package },
          { name: "Returns", href: "/returns", icon: Package },
        ];
      case "supplier":
        return [
          ...baseItems,
          { name: "My Products", href: "/my-products", icon: Package },
          { name: "Payments", href: "/payments", icon: BarChart3 },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={OptiluxLogo}
                className="h-16 w-32 object-contain"
                alt="OptiluxBD Logo"
              />
              {/* <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div> */}
              {/* <span className="font-bold text-lg text-foreground">
                OptiluxBD
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button> */}
            <ThemeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profile.avatarUrl || ""}
                        alt={user?.profile.name}
                      />
                      <AvatarFallback className="gradient-primary text-white">
                        {user?.profile.name
                          ?.split(" ")
                          .map((n: any[]) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.profile.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button with Sheet */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button> */}

            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 px-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 px-5">
                <div className="mt-6 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  <div className="border-t border-border my-4" />

                  {!isAuthenticated ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate("/login");
                          setIsOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => {
                          navigate("/register");
                          setIsOpen(false);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.profile.avatarUrl || ""}
                            alt={user?.profile.name}
                          />
                          <AvatarFallback className="gradient-primary text-white">
                            {user?.profile.name
                              ?.split(" ")
                              .map((n: any[]) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {user?.profile.name}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        size="sm"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
