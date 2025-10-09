// /* eslint-disable @typescript-eslint/no-explicit-any */

// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import { SkeletonLoader } from "@/components/common/SkeletonLoader";
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
// import {
//   useApproveUserMutation,
//   useBlockUserMutation,
//   useDeleteUserMutation,
//   useGetAllUsersQuery,
// } from "@/redux/features/user/userApi";
// import {
//   MoreHorizontal,
//   Plus,
//   Search,
//   Shield,
//   ShieldOff,
//   UserX,
// } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";

// const UserManagement = () => {
//   const { user: currentUser } = useAuth();
//   const { data: usersData, isLoading } = useGetAllUsersQuery(undefined);
//   const [approveUser] = useApproveUserMutation();
//   const [blockUser] = useBlockUserMutation();
//   const [deleteUser] = useDeleteUserMutation();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const users = usersData?.data || [];

//   const filteredUsers = users?.filter((user: any) => {
//     const matchesSearch =
//       user.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = roleFilter === "all" || user.role === roleFilter;
//     const matchesStatus =
//       statusFilter === "all" || user.status === statusFilter;

//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const handleApproveUser = async (userId: string, userName: string) => {
//     try {
//       await approveUser(userId).unwrap();
//       toast.success(`${userName} has been approved successfully.`);
//     } catch {
//       toast.error(`Failed to approve ${userName}.`);
//     }
//   };

//   const handleBlockUser = async (userId: string, userName: string) => {
//     try {
//       await blockUser(userId).unwrap();
//       toast.success(`${userName} has been blocked successfully.`);
//     } catch {
//       toast.error(`Failed to block ${userName}.`);
//     }
//   };

//   const handleUnblockUser = async (userId: string, userName: string) => {
//     try {
//       await approveUser(userId).unwrap(); // Assuming block/unblock toggles status
//       toast.success(`${userName} has been unblocked successfully.`);
//     } catch {
//       toast.error(`Failed to unblock ${userName}.`);
//     }
//   };

//   const handleDeleteUser = async (userId: string, userName: string) => {
//     try {
//       await deleteUser(userId).unwrap();
//       toast.success(`${userName} has been deleted successfully.`);
//     } catch {
//       toast.error(`Failed to delete ${userName}.`);
//     }
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
//       case "approved":
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
//     return <PreventAccessRoutes />;
//   }

//   if (isLoading) {
//     return <SkeletonLoader />;
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
//         <Button
//           className="gap-2"
//           onClick={() => navigate("/dashboard/add-user")}
//         >
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
//               {filteredUsers?.map((user: any) => (
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
//                         <Button
//                           variant="ghost"
//                           className="h-8 w-8 p-0"
//                           disabled={user._id === currentUser?._id}
//                         >
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {user.status === "pending" && (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleApproveUser(user._id, user.profile.name)
//                             }
//                             className="text-green-600"
//                           >
//                             <Shield className="mr-2 h-4 w-4" />
//                             Approve User
//                           </DropdownMenuItem>
//                         )}
//                         {user.status === "approved" ? (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleBlockUser(user._id, user.profile.name)
//                             }
//                             className="text-orange-600"
//                           >
//                             <ShieldOff className="mr-2 h-4 w-4" />
//                             Block User
//                           </DropdownMenuItem>
//                         ) : user.status === "blocked" ? (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleUnblockUser(user._id, user.profile.name)
//                             }
//                             className="text-green-600"
//                           >
//                             <Shield className="mr-2 h-4 w-4" />
//                             Unblock User
//                           </DropdownMenuItem>
//                         ) : null}
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

/* eslint-disable @typescript-eslint/no-explicit-any */

import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
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

// Import Shadcn Alert Dialog components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(undefined);
  const [approveUser] = useApproveUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(null);

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
      refetch(); // Refresh the list
    } catch {
      toast.error(`Failed to approve ${userName}.`);
    }
  };

  const handleBlockUser = async (userId: string, userName: string) => {
    try {
      await blockUser(userId).unwrap();
      toast.success(`${userName} has been blocked successfully.`);
      refetch(); // Refresh the list
    } catch {
      toast.error(`Failed to block ${userName}.`);
    }
  };

  const handleUnblockUser = async (userId: string, userName: string) => {
    try {
      await approveUser(userId).unwrap();
      toast.success(`${userName} has been unblocked successfully.`);
      refetch(); // Refresh the list
    } catch {
      toast.error(`Failed to unblock ${userName}.`);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (
    userId: string,
    userName: string,
    userRole: string
  ) => {
    setUserToDelete({ id: userId, name: userName, role: userRole });
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Handle actual user deletion
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id).unwrap();
      toast.success(`${userToDelete.name} has been deleted successfully.`);
      refetch(); // Refresh the list
    } catch (error: any) {
      console.error("Delete user error:", error);
      const errorMessage =
        error?.data?.message || `Failed to delete ${userToDelete.name}.`;
      toast.error(errorMessage);
    } finally {
      closeDeleteDialog();
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
      case "approved":
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
    return <PreventAccessRoutes />;
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
          <CardDescription>
            Manage all users in the system. Total: {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">SL No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user: any, index: number) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {user.profile.name}
                        {user._id === currentUser?._id && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={user._id === currentUser?._id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
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
                              className="text-green-600 cursor-pointer"
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Approve User
                            </DropdownMenuItem>
                          )}
                          {user.status === "approved" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleBlockUser(user._id, user.profile.name)
                              }
                              className="text-orange-600 cursor-pointer"
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                          ) : user.status === "blocked" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUnblockUser(user._id, user.profile.name)
                              }
                              className="text-green-600 cursor-pointer"
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem
                            onClick={() =>
                              openDeleteDialog(
                                user._id,
                                user.profile.name,
                                user.role
                              )
                            }
                            className="text-red-600 cursor-pointer"
                            disabled={user._id === currentUser?._id}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user
              <span className="font-semibold"> {userToDelete?.name}</span>
              {userToDelete?.role === "supplier" &&
                " and their associated supplier data"}
              {userToDelete?.role === "staff" &&
                " and their associated staff data"}
              {userToDelete?.role === "admin" && " (Admin user)"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
