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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useAuth } from "@/hooks/useAuth";
// // import { type RootState } from "@/redux/store";
// import { Save, ShieldOff, UserPlus } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// // import { useSelector } from "react-redux";
// import { toast } from "sonner";
// // import { useToast } from '@/hooks/use-toast';

// interface AddUserForm {
//   email: string;
//   name: string;
//   phone: string;
//   role: "supplier" | "staff";
//   address?: string;
//   employeeId?: string;
// }

// const AddUser = () => {
//   // const { user: currentUser } = useSelector((state: RootState) => state.auth);
//   const { user: currentUser } = useAuth();
//   //   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<AddUserForm>();

//   const selectedRole = watch("role");

//   const onSubmit = async (data: AddUserForm) => {
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       console.log("Creating user:", data);
//       toast.success(
//         `${data.name} has been successfully added as a ${data.role}.`
//       );
//       reset();
//       setIsLoading(false);
//     }, 1000);
//   };

//   if (currentUser?.role !== "admin") {
//     return (
//       <div className="flex items-center justify-center h-[400px]">
//         <div className="text-center">
//           <ShieldOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//           <h3 className="text-lg font-semibold">Access Denied</h3>
//           <p className="text-muted-foreground">
//             You don't have permission to access this page.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3">
//         <UserPlus className="h-8 w-8 text-primary" />
//         <div>
//           <h1 className="text-3xl font-bold">Add New User</h1>
//           <p className="text-muted-foreground">
//             Create a new supplier or staff account
//           </p>
//         </div>
//       </div>

//       <Card className="max-w-2xl">
//         <CardHeader>
//           <CardTitle>User Information</CardTitle>
//           <CardDescription>
//             Fill in the details to create a new user account. The account will
//             be active immediately.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-destructive">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="role">Role *</Label>
//                 <Select
//                   onValueChange={(value) =>
//                     setValue("role", value as "supplier" | "staff")
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="supplier">Supplier</SelectItem>
//                     <SelectItem value="staff">Staff</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.role && (
//                   <p className="text-sm text-destructive">
//                     {errors.role.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter full name"
//                   {...register("name", { required: "Name is required" })}
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-destructive">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Input
//                   id="phone"
//                   placeholder="+880XXXXXXXXX"
//                   {...register("phone", { required: "Phone is required" })}
//                 />
//                 {errors.phone && (
//                   <p className="text-sm text-destructive">
//                     {errors.phone.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {selectedRole === "staff" && (
//               <div className="space-y-2">
//                 <Label htmlFor="employeeId">Employee ID</Label>
//                 <Input
//                   id="employeeId"
//                   placeholder="STF001"
//                   {...register("employeeId")}
//                 />
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <Textarea
//                 id="address"
//                 placeholder="Enter address (optional)"
//                 rows={3}
//                 {...register("address")}
//               />
//             </div>

//             <div className="flex gap-4">
//               <Button type="submit" disabled={isLoading} className="gap-2">
//                 <Save className="h-4 w-4" />
//                 {isLoading ? "Creating..." : "Create User"}
//               </Button>
//               <Button type="button" variant="outline" onClick={() => reset()}>
//                 Reset Form
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddUser;

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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useAuth } from "@/hooks/useAuth";
// import { useCreateUserMutation } from "@/redux/features/user/userApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Lock, Save, ShieldOff, UserPlus } from "lucide-react";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// // Zod schema for adding a user, aligned with backend registerUserSchema
// const addUserSchema = z
//   .object({
//     email: z.email("Invalid email address"),
//     name: z
//       .string()
//       .min(3, "Name must be at least 3 characters")
//       .max(50, "Name cannot exceed 50 characters"),
//     phone: z
//       .string()
//       .min(10, "Phone number must be at least 10 characters")
//       .max(15, "Phone number cannot exceed 15 characters"),
//     role: z.enum(["supplier", "staff"], { message: "Role is required" }),
//     address: z
//       .string()
//       .min(5, "Address must be at least 5 characters")
//       .max(128, "Address cannot exceed 128 characters")
//       .optional(),
//     employeeId: z
//       .string()
//       .min(7, "Employee ID must be at least 7 characters")
//       .max(12, "Employee ID cannot exceed 12 characters")
//       .optional(),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type AddUserForm = z.infer<typeof addUserSchema>;

// const AddUser = () => {
//   const { user: currentUser } = useAuth();
//   const [createUser, { isLoading }] = useCreateUserMutation();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<AddUserForm>({
//     resolver: zodResolver(addUserSchema),
//     defaultValues: {
//       email: "",
//       name: "",
//       phone: "",
//       role: undefined,
//       address: "",
//       employeeId: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const selectedRole = watch("role");

//   const onSubmit = async (data: AddUserForm) => {
//     try {
//       const userData = {
//         email: data.email,
//         password: data.password,
//         role: data.role,
//         profile: {
//           name: data.name,
//           phone: data.phone,
//           address: data.address || undefined,
//           employeeId: data.employeeId || undefined,
//         },
//       };

//       console.log("Creating user with data:", userData);

//       await createUser(userData).unwrap();
//       toast.success(
//         `${data.name} has been successfully added as a ${data.role}.`
//       );
//       reset();
//       navigate("/dashboard/user-management");
//     } catch (error) {
//       toast.error(`Failed to create user: ${data.name}.`);
//     }
//   };

//   if (currentUser?.role !== "admin") {
//     return (
//       <div className="flex items-center justify-center h-[400px]">
//         <div className="text-center">
//           <ShieldOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//           <h3 className="text-lg font-semibold">Access Denied</h3>
//           <p className="text-muted-foreground">
//             You don't have permission to access this page.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3">
//         <UserPlus className="h-8 w-8 text-primary" />
//         <div>
//           <h1 className="text-3xl font-bold">Add New User</h1>
//           <p className="text-muted-foreground">
//             Create a new supplier or staff account
//           </p>
//         </div>
//       </div>

//       <Card className="max-w-2xl">
//         <CardHeader>
//           <CardTitle>User Information</CardTitle>
//           <CardDescription>
//             Fill in the details to create a new user account. The account will
//             be active after email verification.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="user@example.com"
//                       {...field}
//                     />
//                   )}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-destructive">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="role">Role *</Label>
//                 <Controller
//                   name="role"
//                   control={control}
//                   render={({ field }) => (
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="supplier">Supplier</SelectItem>
//                         <SelectItem value="staff">Staff</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.role && (
//                   <p className="text-sm text-destructive">
//                     {errors.role.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <Controller
//                   name="name"
//                   control={control}
//                   render={({ field }) => (
//                     <Input id="name" placeholder="Enter full name" {...field} />
//                   )}
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-destructive">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Controller
//                   name="phone"
//                   control={control}
//                   render={({ field }) => (
//                     <Input id="phone" placeholder="+880XXXXXXXXX" {...field} />
//                   )}
//                 />
//                 {errors.phone && (
//                   <p className="text-sm text-destructive">
//                     {errors.phone.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password *</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Controller
//                     name="password"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Create a password"
//                         className="pl-10 pr-10"
//                         {...field}
//                       />
//                     )}
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-0 top-0"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-destructive">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password *</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Controller
//                     name="confirmPassword"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         id="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         placeholder="Confirm your password"
//                         className="pl-10 pr-10"
//                         {...field}
//                       />
//                     )}
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-0 top-0"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-destructive">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {selectedRole === "staff" && (
//               <div className="space-y-2">
//                 <Label htmlFor="employeeId">Employee ID</Label>
//                 <Controller
//                   name="employeeId"
//                   control={control}
//                   render={({ field }) => (
//                     <Input id="employeeId" placeholder="STF001" {...field} />
//                   )}
//                 />
//                 {errors.employeeId && (
//                   <p className="text-sm text-destructive">
//                     {errors.employeeId.message}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <Controller
//                 name="address"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     id="address"
//                     placeholder="Enter address (optional)"
//                     rows={3}
//                     {...field}
//                   />
//                 )}
//               />
//               {errors.address && (
//                 <p className="text-sm text-destructive">
//                   {errors.address.message}
//                 </p>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <Button type="submit" disabled={isLoading} className="gap-2">
//                 <Save className="h-4 w-4" />
//                 {isLoading ? "Creating..." : "Create User"}
//               </Button>
//               <Button type="button" variant="outline" onClick={() => reset()}>
//                 Reset Form
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddUser;

import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateUserMutation,
  useGetMeQuery,
} from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Save, UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for adding a user, aligned with backend registerUserSchema
const addUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .max(15, "Phone number cannot exceed 15 characters"),
    role: z.enum(["supplier", "staff"], { message: "Role is required" }),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(128, "Address cannot exceed 128 characters")
      .optional(),
    employeeId: z
      .string()
      .min(7, "Employee ID must be at least 7 characters")
      .max(12, "Employee ID cannot exceed 12 characters")
      .optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AddUserForm = z.infer<typeof addUserSchema>;

const AddUser = () => {
  const { user: currentUser } = useAuth();
  const { data: me } = useGetMeQuery(undefined);
  console.log("Current User from useGetMeQuery:", me);
  const [createUser, { isLoading, error: mutationError }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddUserForm>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      role: undefined,
      address: "",
      employeeId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: AddUserForm) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
        role: data.role,
        profile: {
          name: data.name,
          phone: data.phone,
          address: data.address || undefined,
          employeeId: data.employeeId || undefined,
        },
      };

      console.log("Submitting user data:", userData);

      const response = await createUser(userData).unwrap();
      console.log("API response:", response);

      toast.success(
        `${data.name} has been successfully added as a ${data.role}.`
      );
      reset();
      navigate("/dashboard/user-management");
    } catch (error: any) {
      console.error("Failed to create user:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        `Failed to create user: ${data.name}.`;
      toast.error(errorMessage);
    }
  };

  // Log mutation error if it exists
  if (mutationError) {
    console.error("Mutation error:", mutationError);
  }

  if (currentUser?.role !== "admin") {
    return <PreventAccessRoutes />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Add New User</h1>
          <p className="text-muted-foreground">
            Create a new supplier or staff account
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Fill in the details to create a new user account. The account will
            be active after email verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier">Supplier</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-sm text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input id="name" placeholder="Enter full name" {...field} />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input id="phone" placeholder="+8810XXXXXXXXX" {...field} />
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        {...field}
                      />
                    )}
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
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {selectedRole === "staff" && (
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Controller
                  name="employeeId"
                  control={control}
                  render={({ field }) => (
                    <Input id="employeeId" placeholder="STF001" {...field} />
                  )}
                />
                {errors.employeeId && (
                  <p className="text-sm text-destructive">
                    {errors.employeeId.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="address"
                    placeholder="Enter address (optional)"
                    rows={3}
                    {...field}
                  />
                )}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Creating..." : "Create User"}
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
