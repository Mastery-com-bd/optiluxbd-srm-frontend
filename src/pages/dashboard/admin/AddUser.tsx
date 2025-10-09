// /* eslint-disable @typescript-eslint/no-explicit-any */
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
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
// import {
//   useCreateUserMutation,
//   useGetMeQuery,
// } from "@/redux/features/user/userApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Lock, Save, UserPlus } from "lucide-react";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// // Zod schema for adding a user, aligned with backend registerUserSchema
// const addUserSchema = z
//   .object({
//     email: z.string().email("Invalid email address"),
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
//       .nullable()
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
//   const { data: me } = useGetMeQuery(undefined);
//   console.log("Current User from useGetMeQuery:", me);
//   const [createUser, { isLoading, error: mutationError }] =
//     useCreateUserMutation();
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
//       employeeId: undefined,
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
//           ...(data.role === "staff" && {
//             employeeId: data.employeeId || undefined,
//           }),
//         },
//       };

//       console.log("Submitting user data:", userData);

//       const response = await createUser(userData).unwrap();
//       console.log("API response:", response);

//       toast.success(
//         `${data.name} has been successfully added as a ${data.role}.`
//       );
//       reset();
//       navigate("/dashboard/user-management");
//     } catch (error: any) {
//       console.error("Failed to create user:", error);
//       const errorMessage =
//         error?.data?.message ||
//         error?.message ||
//         `Failed to create user: ${data.name}.`;
//       toast.error(errorMessage);
//     }
//   };

//   // Log mutation error if it exists
//   if (mutationError) {
//     console.error("Mutation error:", mutationError);
//   }

//   if (currentUser?.role !== "admin") {
//     return <PreventAccessRoutes />;
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
//                     <Input id="phone" placeholder="+8810XXXXXXXXX" {...field} />
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
//                     <Input
//                       id="employeeId"
//                       placeholder="STF001"
//                       {...field}
//                       value={field.value ?? ""}
//                     />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCreateUserMutation } from "@/redux/features/user/userApi";
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
      .optional()
      .or(z.literal("")), // Allow empty string
    employeeId: z
      .string()
      .min(7, "Employee ID must be at least 7 characters")
      .max(12, "Employee ID cannot exceed 12 characters")
      .optional()
      .or(z.literal("")), // Allow empty string
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
  // const { data: me } = useGetMeQuery(undefined);
  const [createUser, { isLoading }] = useCreateUserMutation();
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
      // Prepare user data for API
      const userData: any = {
        email: data.email,
        password: data.password,
        role: data.role,
        profile: {
          name: data.name,
          phone: data.phone,
          ...(data.address && { address: data.address }),
        },
      };

      // Only include employeeId for staff role and if provided
      if (data.role === "staff" && data.employeeId) {
        userData.profile.employeeId = data.employeeId;
      }

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

      // Enhanced error handling
      let errorMessage = `Failed to create user: ${data.name}.`;

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 400) {
        errorMessage = "Invalid data provided. Please check all fields.";
      } else if (error?.status === 409) {
        errorMessage = "User with this email already exists.";
      } else if (error?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(errorMessage);
    }
  };

  const handleReset = () => {
    reset({
      email: "",
      name: "",
      phone: "",
      role: undefined,
      address: "",
      employeeId: "",
      password: "",
      confirmPassword: "",
    });
  };

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

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            User Information
          </CardTitle>
          <CardDescription>
            Fill in the details to create a new user account. The account will
            be active after email verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                      className={errors.email ? "border-destructive" : ""}
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
                <Label htmlFor="role" className="flex items-center gap-1">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={errors.role ? "border-destructive" : ""}
                      >
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

            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      {...field}
                      className={errors.name ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      placeholder="+8801XXXXXXXXX"
                      {...field}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1">
                  Password <span className="text-destructive">*</span>
                </Label>
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
                        className={`pl-10 pr-10 ${
                          errors.password ? "border-destructive" : ""
                        }`}
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
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
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-1"
                >
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
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
                        className={`pl-10 pr-10 ${
                          errors.confirmPassword ? "border-destructive" : ""
                        }`}
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
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

            {/* Employee ID (only for staff) */}
            {selectedRole === "staff" && (
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID (Optional)</Label>
                <Controller
                  name="employeeId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="employeeId"
                      placeholder="OPT-000001 (Auto-generated if empty)"
                      {...field}
                      value={field.value || ""}
                    />
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to auto-generate employee ID
                </p>
                {errors.employeeId && (
                  <p className="text-sm text-destructive">
                    {errors.employeeId.message}
                  </p>
                )}
              </div>
            )}

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="address"
                    placeholder="Enter full address (optional)"
                    rows={3}
                    {...field}
                    value={field.value || ""}
                  />
                )}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 flex-1"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Creating User..." : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
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
