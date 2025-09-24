import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAuth } from "@/hooks/useAuth";
// import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { Building2, LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Badge } from "../ui/badge";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  //   const { data: user } = useAuth();
  //   const [logout] = useLogoutMutation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      //   await logout().unwrap();
      window.location.href = "/login"; // redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const user = {
    id: "1",
    email: "user@example.com",
    role: "admin",
    profile: {
      name: "John Doe",
      avatarUrl: "https://example.com/avatar.jpg",
    },
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container-width">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
              <Building2 className="h-6 w-6 bg-gradient-to-r from-blue-600 to-purple-600" />
            </div>
            <span className="text-xl md:text-2xl font-heading font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OptiluxBD SRM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-muted-foreground hover:text-primary font-medium transition-colors duration-200 relative group ${
                  isActive(item.href) ? "text-primary" : ""
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex justify-between items-center space-x-2">
            {/* Desktop Auth Buttons & Theme Toggle */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.profile?.avatarUrl || ""}
                          alt={user.profile?.name}
                        />
                        <AvatarFallback className="bg-gradient-hero text-white">
                          {user.profile?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.profile?.avatarUrl || ""}
                            alt={user.profile?.name}
                          />
                          <AvatarFallback className="bg-gradient-hero text-white">
                            {user.profile?.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.profile?.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <Badge variant="outline" className="w-fit capitalize">
                          {user.role}
                        </Badge>
                      </div>

                      <div className="border-t pt-2 space-y-1">
                        <Link to="/dashboard/profile">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="hidden lg:flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    asChild
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Link to="/login" className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button asChild className="btn-cta">
                    <Link to="/signup" className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile & Tablet Navigation (Sheet) */}
            <div className="lg:hidden flex items-center space-x-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 px-5">
                  {user ? (
                    <div>
                      <div className="flex items-center space-y-1 py-4 gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.profile?.avatarUrl || ""}
                            alt={user.profile?.name}
                          />
                          <AvatarFallback className="bg-gradient-hero text-white">
                            {user.profile?.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.profile?.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Badge variant="outline" className="w-fit capitalize">
                        {user.role}
                      </Badge>
                    </div>
                  ) : null}

                  <div className="flex flex-col mt-8 space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <div className="border-t border-border my-4" />

                    {!user && (
                      <>
                        <Button
                          variant="ghost"
                          asChild
                          className="justify-start"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            to="/login"
                            className="flex items-center space-x-2"
                          >
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="justify-start btn-cta"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            to="/register"
                            className="flex items-center space-x-2"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
