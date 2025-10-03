/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useAuth } from "@/hooks/useAuth";
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import {
//   MoreHorizontal,
//   Plus,
//   Search,
//   Shield,
//   ShieldOff,
//   UserX,
// } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// // import { useToast } from '@/hooks/use-toast';

// const UserManagement = () => {
//   const { user: currentUser } = useAuth();
//   const { users }: any = useGetAllUsersQuery(undefined);
//   console.log("All users:", users);

//   //   const { toast } = useToast();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const filteredUsers = users?.filter(
//     (user: {
//       profile: { name: string };
//       email: string;
//       role: string;
//       status: string;
//     }) => {
//       const matchesSearch =
//         user.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesRole = roleFilter === "all" || user.role === roleFilter;
//       const matchesStatus =
//         statusFilter === "all" || user.status === statusFilter;

//       return matchesSearch && matchesRole && matchesStatus;
//     }
//   );

//   const handleBlockUser = (_userId: string, userName: string) => {
//     toast.success(`${userName} has been blocked successfully.`);
//   };

//   const handleUnblockUser = (_userId: string, userName: string) => {
//     toast.success(`${userName} has been unblocked successfully.`);
//   };

//   const handleDeleteUser = (_userId: string, userName: string) => {
//     toast.success(`${userName} has been deleted successfully.`);
//   };

//   const getRoleBadgeVariant = (role: string) => {
//     switch (role) {
//       case "admin":
//         return "destructive";
//       case "supplier":
//         return "default";
//       case "staff":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case "active":
//         return "default";
//       case "blocked":
//         return "destructive";
//       case "pending":
//         return "secondary";
//       default:
//         return "outline";
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
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">User Management</h1>
//           <p className="text-muted-foreground">
//             Manage users, roles, and permissions
//           </p>
//         </div>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           Add User
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Users</CardTitle>
//           <CardDescription>Manage all users in the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-[140px]">
//                 <SelectValue placeholder="Role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//                 <SelectItem value="supplier">Supplier</SelectItem>
//                 <SelectItem value="staff">Staff</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[140px]">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="blocked">Blocked</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers?.map(({ user }: any) => (
//                 <TableRow key={user._id}>
//                   <TableCell className="font-medium">
//                     {user.profile.name}
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <Badge variant={getRoleBadgeVariant(user.role)}>
//                       {user.role}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getStatusBadgeVariant(user.status)}>
//                       {user.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{user.profile.phone}</TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {user.status === "active" ? (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleBlockUser(user._id, user.profile.name)
//                             }
//                             className="text-orange-600"
//                           >
//                             <ShieldOff className="mr-2 h-4 w-4" />
//                             Block User
//                           </DropdownMenuItem>
//                         ) : (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleUnblockUser(user._id, user.profile.name)
//                             }
//                             className="text-green-600"
//                           >
//                             <Shield className="mr-2 h-4 w-4" />
//                             Unblock User
//                           </DropdownMenuItem>
//                         )}
//                         <DropdownMenuItem
//                           onClick={() =>
//                             handleDeleteUser(user._id, user.profile.name)
//                           }
//                           className="text-red-600"
//                         >
//                           <UserX className="mr-2 h-4 w-4" />
//                           Delete User
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserManagement;

import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import {
  useApproveUserMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import {
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  ShieldOff,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const { data: usersData, isLoading } = useGetAllUsersQuery(undefined);
  const [approveUser] = useApproveUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = usersData?.data || [];

  const filteredUsers = users?.filter((user: any) => {
    const matchesSearch =
      user.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleApproveUser = async (userId: string, userName: string) => {
    try {
      await approveUser(userId).unwrap();
      toast.success(`${userName} has been approved successfully.`);
    } catch {
      toast.error(`Failed to approve ${userName}.`);
    }
  };

  const handleBlockUser = async (userId: string, userName: string) => {
    try {
      await blockUser(userId).unwrap();
      toast.success(`${userName} has been blocked successfully.`);
    } catch {
      toast.error(`Failed to block ${userName}.`);
    }
  };

  const handleUnblockUser = async (userId: string, userName: string) => {
    try {
      await blockUser(userId).unwrap(); // Assuming block/unblock toggles status
      toast.success(`${userName} has been unblocked successfully.`);
    } catch {
      toast.error(`Failed to unblock ${userName}.`);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success(`${userName} has been deleted successfully.`);
    } catch {
      toast.error(`Failed to delete ${userName}.`);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "supplier":
        return "default";
      case "staff":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "blocked":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (currentUser?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <ShieldOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Access Denied</h3>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => navigate("/dashboard/add-user")}
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    {user.profile.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.profile.phone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled={user._id === currentUser?._id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleApproveUser(user._id, user.profile.name)
                            }
                            className="text-green-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Approve User
                          </DropdownMenuItem>
                        )}
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleBlockUser(user._id, user.profile.name)
                            }
                            className="text-orange-600"
                          >
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                        ) : user.status === "blocked" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleUnblockUser(user._id, user.profile.name)
                            }
                            className="text-green-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Unblock User
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteUser(user._id, user.profile.name)
                          }
                          className="text-red-600"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
