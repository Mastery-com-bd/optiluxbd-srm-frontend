/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/useAuth";
// import { useLoginMutation } from "@/redux/features/auth/authApi"; // Adjust import
// import { Eye, EyeOff, Lock, Mail } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { toast } from "sonner";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [login] = useLoginMutation();
//   // const { data: user } = useMeQuery(undefined); // Assuming this is called after login, but might need to refetch or handle in effect

//   const { user } = useAuth();
//   console.log("user after login:", user);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await login({ email, password }).unwrap();
//       // After login, check user status
//       // Assuming me query refetches automatically due to invalidatesTags ["Auth", "User"]
//       if (user.email && !user.isApproved) {
//         // Assume user has isApproved field
//         navigate("/pending-approval");
//       } else {
//         toast.success("Login successful");
//         navigate("/dashboard"); // Or home
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     await login({ email, password }).unwrap();

//   //     // 🔑 Force re-fetch user after login (cookies are set now)
//   //     const { data: freshUser } = await refetch();
//   //     console.log("user after login:", freshUser);

//   //     if (freshUser?.email && !freshUser?.isApproved) {
//   //       navigate("/pending-approval");
//   //     } else {
//   //       toast.success("Login successful");
//   //       navigate("/dashboard");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Login failed. Please check your credentials.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
//               <Mail className="h-6 w-6 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
//           <CardDescription>
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10"
//                   required
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-0"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               variant="gradient"
//               disabled={loading}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center space-y-2">
//             <p className="text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-primary hover:underline font-medium"
//               >
//                 Create one
//               </Link>
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Forgot password?{" "}
//               <Link
//                 to="/forgot-password"
//                 className="text-primary hover:underline font-medium"
//               >
//                 Reset it
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const getRoleBasedRedirect = (role: string) => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "driver":
        return "/dashboard/driver";
      case "rider":
        return "/dashboard/rider";
      default:
        return "/dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Login Successful!");

      const role = res.role || Cookies.get("role");
      if (role) {
        navigate(getRoleBasedRedirect(role), { replace: true });
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="text-primary hover:underline font-medium"
              >
                Reset it
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
