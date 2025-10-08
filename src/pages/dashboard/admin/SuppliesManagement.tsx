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
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   mockProducts,
//   mockSupplies,
//   mockUsers,
//   type Supply,
// } from "@/data/mockData";
// import { Eye, Plus, Search } from "lucide-react";
// import { useState } from "react";

// // import { useToast } from '@/hooks/use-toast';
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import SupplyForm from "@/components/dashboard/forms/SupplyForm";
// import SupplyDetailModal from "@/components/dashboard/modals/SupplyDetailModal";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "sonner";

// const SuppliesManagement = () => {
//   const { user } = useAuth();
//   // const { toast } = useToast();
//   const [supplies, setSupplies] = useState<Supply[]>(mockSupplies);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [viewingSupply, setViewingSupply] = useState<Supply | null>(null);

//   const filteredSupplies = supplies.filter((supply) => {
//     const product = mockProducts.find((p) => p.id === supply.productId);
//     const supplier = mockUsers.find((u) => u._id === supply.supplierId);
//     return (
//       product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       supplier?.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const handleAddSupply = (
//     supplyData: Omit<Supply, "id" | "createdAt" | "updatedAt">
//   ) => {
//     const newSupply: Supply = {
//       ...supplyData,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setSupplies([...supplies, newSupply]);
//     setIsAddModalOpen(false);
//     toast.success("Supply record has been added successfully.");
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: Supply["status"]) => {
//     const variants = {
//       pending: "secondary" as const,
//       completed: "default" as const,
//       cancelled: "destructive" as const,
//     };
//     return (
//       <Badge variant={variants[status]}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   const getSupplierName = (supplierId: string) => {
//     const supplier = mockUsers.find((u) => u._id === supplierId);
//     return supplier?.profile.name || "Unknown Supplier";
//   };

//   const getProductName = (productId: string) => {
//     const product = mockProducts.find((p) => p.id === productId);
//     return product?.name || "Unknown Product";
//   };

//   // Filter supplies based on user role
//   const displaySupplies =
//     user?.role === "supplier"
//       ? filteredSupplies.filter((supply) => supply.supplierId === user._id)
//       : filteredSupplies;

//   if (user?.role !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Supplies Management</h1>
//           <p className="text-muted-foreground">
//             {user?.role === "supplier"
//               ? "Manage your supplies"
//               : "Manage all supplies"}
//           </p>
//         </div>

//         {user?.role === "admin" && (
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Supply
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Add New Supply</DialogTitle>
//               </DialogHeader>
//               <SupplyForm onSubmit={handleAddSupply} />
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Supplies</CardTitle>
//           <CardDescription>
//             Total supplies: {supplies.length} | Showing:{" "}
//             {displaySupplies.length}
//           </CardDescription>
//           <div className="flex items-center space-x-2">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search supplies..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Cost Price</TableHead>
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Commission Rate</TableHead>
//                 <TableHead>Commission Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displaySupplies.map((supply) => (
//                 <TableRow key={supply.id}>
//                   <TableCell className="font-medium">
//                     {getProductName(supply.productId)}
//                   </TableCell>
//                   {user?.role !== "supplier" && (
//                     <TableCell>{getSupplierName(supply.supplierId)}</TableCell>
//                   )}
//                   <TableCell>{supply.quantity}</TableCell>
//                   <TableCell>{formatCurrency(supply.costPrice)}</TableCell>
//                   <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
//                   <TableCell>{supply.commissionRate}%</TableCell>
//                   <TableCell>
//                     {formatCurrency(supply.commissionAmount)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(supply.status)}</TableCell>
//                   <TableCell>
//                     {new Date(supply.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setViewingSupply(supply)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Supply Detail Modal */}
//       {viewingSupply && (
//         <SupplyDetailModal
//           supply={viewingSupply}
//           isOpen={!!viewingSupply}
//           onClose={() => setViewingSupply(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default SuppliesManagement;

// Updated SuppliesManagement.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import SupplyForm from "@/components/dashboard/forms/SupplyForm";
// import SupplyDetailModal from "@/components/dashboard/modals/SupplyDetailModal";
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
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
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
//   useCreateSupplyMutation,
//   useGetAllSuppliesQuery,
// } from "@/redux/features/supply/supplyApi"; // Adjust import based on your supplyApi.ts
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { Eye, Plus, Search } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// const SuppliesManagement = () => {
//   const { user } = useAuth();
//   const { data: suppliesData, isLoading } = useGetAllSuppliesQuery(undefined);
//   const [createSupply] = useCreateSupplyMutation();
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [viewingSupply, setViewingSupply] = useState<any | null>(null);

//   const supplies = suppliesData?.data || [];
//   const users = usersData?.data || [];

//   const filteredSupplies = supplies.filter((supply: any) => {
//     const supplier = users.find((u: any) => u._id === supply.supplier);
//     return (
//       supply.products.some((p: any) =>
//         p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       ) ||
//       supplier?.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const handleAddSupply = async (supplyData: any) => {
//     try {
//       await createSupply(supplyData).unwrap();
//       setIsAddModalOpen(false);
//       toast.success("Supply record has been added successfully.");
//     } catch {
//       toast.error("Failed to add supply.");
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       pending: "secondary" as const,
//       received: "default" as const,
//       cancelled: "destructive" as const,
//     } as const;
//     const key = status as keyof typeof variants;
//     const variant = variants[key] ?? variants.pending;
//     return (
//       <Badge variant={variant}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   const getSupplierName = (supplierId: string) => {
//     const supplier = users.find((u: any) => u._id === supplierId);
//     return supplier?.profile.name || "Unknown Supplier";
//   };

//   const getProductNames = (products: any[]) => {
//     return products.length > 1
//       ? `Multiple Products (${products.length})`
//       : products[0]?.product.name || "Unknown Product";
//   };

//   const getTotalQuantity = (products: any[]) => {
//     return products.reduce((sum: number, p: any) => sum + p.quantity, 0);
//   };

//   // Filter supplies based on user role
//   const displaySupplies =
//     user?.role === "supplier"
//       ? filteredSupplies.filter((supply: any) => supply.supplier === user._id)
//       : filteredSupplies;

//   if (user?.role !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Supplies Management</h1>
//           <p className="text-muted-foreground">
//             {user?.role === "supplier"
//               ? "Manage your supplies"
//               : "Manage all supplies"}
//           </p>
//         </div>

//         {user?.role === "admin" && (
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Supply
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Add New Supply</DialogTitle>
//               </DialogHeader>
//               <SupplyForm onSubmit={handleAddSupply} />
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Supplies</CardTitle>
//           <CardDescription>
//             Total supplies: {supplies.length} | Showing:{" "}
//             {displaySupplies.length}
//           </CardDescription>
//           <div className="flex items-center space-x-2">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search supplies..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Cost Price</TableHead>
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Commission Rate</TableHead>
//                 <TableHead>Commission Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displaySupplies.map((supply: any) => (
//                 <TableRow key={supply._id}>
//                   <TableCell className="font-medium">
//                     {getProductNames(supply.products)}
//                   </TableCell>
//                   {user?.role !== "supplier" && (
//                     <TableCell>{getSupplierName(supply.supplier)}</TableCell>
//                   )}
//                   <TableCell>{getTotalQuantity(supply.products)}</TableCell>
//                   <TableCell>Varied</TableCell> {/* Since multiple products */}
//                   <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
//                   <TableCell>{supply.commissionRate}%</TableCell>
//                   <TableCell>
//                     {formatCurrency(supply.commissionAmount)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(supply.status)}</TableCell>
//                   <TableCell>
//                     {new Date(supply.date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setViewingSupply(supply)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Supply Detail Modal */}
//       {viewingSupply && (
//         <SupplyDetailModal
//           supply={viewingSupply}
//           isOpen={!!viewingSupply}
//           onClose={() => setViewingSupply(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default SuppliesManagement;

// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import SupplyForm from "@/components/dashboard/forms/SupplyForm";
// import SupplyDetailModal from "@/components/dashboard/modals/SupplyDetailModal";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
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
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
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
//   useCreateSupplyMutation,
//   useDeleteSupplyMutation,
//   useGetAllSuppliesQuery,
//   useUpdateSupplyMutation,
// } from "@/redux/features/supply/supplyApi"; // Adjust import based on your supplyApi.ts
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// const SuppliesManagement = () => {
//   const { user } = useAuth();
//   const { data: suppliesData, isLoading } = useGetAllSuppliesQuery(undefined);
//   const [createSupply] = useCreateSupplyMutation();
//   const [updateSupply] = useUpdateSupplyMutation();
//   const [deleteSupply] = useDeleteSupplyMutation();
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingSupply, setEditingSupply] = useState<any | null>(null);
//   const [_deletingSupplyId, setDeletingSupplyId] = useState<string | null>(
//     null
//   );
//   const [viewingSupply, setViewingSupply] = useState<any | null>(null);

//   const supplies = suppliesData?.data || [];
//   const users = usersData?.data || [];

//   const filteredSupplies = supplies.filter((supply: any) => {
//     const supplier = users.find((u: any) => u._id === supply.supplier);
//     return (
//       supply.products.some((p: any) =>
//         p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       ) ||
//       supplier?.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const handleAddSupply = async (supplyData: any) => {
//     try {
//       await createSupply(supplyData).unwrap();
//       setIsAddModalOpen(false);
//       toast.success("Supply record has been added successfully.");
//     } catch {
//       toast.error("Failed to add supply.");
//     }
//   };

//   const handleUpdateSupply = async (supplyData: any) => {
//     if (!editingSupply) return;
//     try {
//       await updateSupply({ id: editingSupply._id, ...supplyData }).unwrap();
//       setIsEditModalOpen(false);
//       setEditingSupply(null);
//       toast.success("Supply record has been updated successfully.");
//     } catch {
//       toast.error("Failed to update supply.");
//     }
//   };

//   const handleDeleteSupply = async (id: string) => {
//     try {
//       await deleteSupply(id).unwrap();
//       toast.success("Supply record has been deleted successfully.");
//     } catch {
//       toast.error("Failed to delete supply.");
//     } finally {
//       setDeletingSupplyId(null);
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       pending: "secondary" as const,
//       received: "default" as const,
//       cancelled: "destructive" as const,
//     } as const;
//     const key = status as keyof typeof variants;
//     const variant = variants[key] ?? variants.pending;
//     return (
//       <Badge variant={variant}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   const getSupplierName = (supplierId: string) => {
//     const supplier = users.find((u: any) => u._id === supplierId);
//     return supplier?.profile.name || "Unknown Supplier";
//   };

//   const getProductNames = (products: any[]) => {
//     return products.length > 1
//       ? `Multiple Products (${products.length})`
//       : products[0]?.product.name || "Unknown Product";
//   };

//   const getTotalQuantity = (products: any[]) => {
//     return products.reduce((sum: number, p: any) => sum + p.quantity, 0);
//   };

//   const getTotalCostPrice = (products: any[]) => {
//     return products.length > 1
//       ? "Varied"
//       : formatCurrency(products[0]?.costPrice || 0);
//   };

//   // Filter supplies based on user role
//   const displaySupplies =
//     user?.role === "supplier"
//       ? filteredSupplies.filter((supply: any) => supply.supplier === user._id)
//       : filteredSupplies;

//   if (user?.role !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Supplies Management</h1>
//           <p className="text-muted-foreground">
//             {user?.role === "supplier"
//               ? "Manage your supplies"
//               : "Manage all supplies"}
//           </p>
//         </div>

//         {user?.role === "admin" && (
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Supply
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Add New Supply</DialogTitle>
//               </DialogHeader>
//               <SupplyForm onSubmit={handleAddSupply} />
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Supplies</CardTitle>
//           <CardDescription>
//             Total supplies: {supplies.length} | Showing:{" "}
//             {displaySupplies.length}
//           </CardDescription>
//           <div className="flex items-center space-x-2">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search supplies..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Cost Price</TableHead>
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Commission Rate</TableHead>
//                 <TableHead>Commission Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displaySupplies.map((supply: any) => (
//                 <TableRow key={supply._id}>
//                   <TableCell className="font-medium">
//                     {getProductNames(supply.products)}
//                   </TableCell>
//                   {user?.role !== "supplier" && (
//                     <TableCell>{getSupplierName(supply.supplier)}</TableCell>
//                   )}
//                   <TableCell>{getTotalQuantity(supply.products)}</TableCell>
//                   <TableCell>{getTotalCostPrice(supply.products)}</TableCell>
//                   <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
//                   <TableCell>{supply.commissionRate}%</TableCell>
//                   <TableCell>
//                     {formatCurrency(supply.commissionAmount)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(supply.status)}</TableCell>
//                   <TableCell>
//                     {new Date(supply.date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setViewingSupply(supply)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => {
//                           setEditingSupply(supply);
//                           setIsEditModalOpen(true);
//                         }}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button variant="ghost" size="sm">
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                           <AlertDialogHeader>
//                             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                               This action cannot be undone. This will
//                               permanently delete the supply record.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction
//                               onClick={() => handleDeleteSupply(supply._id)}
//                             >
//                               Delete
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Edit Supply Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Edit Supply</DialogTitle>
//           </DialogHeader>
//           {editingSupply && (
//             <SupplyForm
//               {...({
//                 initialData: editingSupply,
//                 onSubmit: handleUpdateSupply,
//               } as any)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Supply Detail Modal */}
//       {viewingSupply && (
//         <SupplyDetailModal
//           supply={viewingSupply}
//           isOpen={!!viewingSupply}
//           onClose={() => setViewingSupply(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default SuppliesManagement;

/* eslint-disable @typescript-eslint/no-explicit-any */
import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import SupplyForm from "@/components/dashboard/forms/SupplyForm";
import SupplyDetailModal from "@/components/dashboard/modals/SupplyDetailModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  useCreateSupplyMutation,
  useDeleteSupplyMutation,
  useGetAllSuppliesQuery,
  useUpdateSupplyMutation,
} from "@/redux/features/supply/supplyApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SuppliesManagement = () => {
  const { user } = useAuth();
  const { data: suppliesData, isLoading } = useGetAllSuppliesQuery(undefined);
  const [createSupply] = useCreateSupplyMutation();
  const [updateSupply] = useUpdateSupplyMutation();
  const [deleteSupply] = useDeleteSupplyMutation();
  const { data: usersData } = useGetAllUsersQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupply, setEditingSupply] = useState<any | null>(null);
  const [deletingSupply, setDeletingSupply] = useState<any | null>(null);
  const [viewingSupply, setViewingSupply] = useState<any | null>(null);

  const supplies = suppliesData?.data || [];
  const users = usersData?.data || [];

  const filteredSupplies = supplies.filter((supply: any) => {
    const supplier = users.find((u: any) => u._id === supply.supplier);
    return (
      supply.products.some((p: any) =>
        p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      supplier?.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddSupply = async (supplyData: any) => {
    try {
      await createSupply(supplyData).unwrap();
      setIsAddModalOpen(false);
      toast.success("Supply record added successfully.");
    } catch {
      toast.error("Failed to add supply.");
    }
  };

  const handleUpdateSupply = async (supplyData: any) => {
    try {
      await updateSupply({ id: editingSupply._id, ...supplyData }).unwrap();
      setEditingSupply(null);
      toast.success("Supply updated successfully.");
    } catch {
      toast.error("Failed to update supply.");
    }
  };

  const handleDeleteSupply = async () => {
    try {
      await deleteSupply(deletingSupply._id).unwrap();
      toast.success("Supply deleted successfully.");
      setDeletingSupply(null);
    } catch {
      toast.error("Failed to delete supply.");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary" as const,
      received: "default" as const,
      cancelled: "destructive" as const,
    } as const;
    const key = status as keyof typeof variants;
    const variant = variants[key] ?? variants.pending;
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSupplierName = (supplierId: string) => {
    const supplier = users.find((u: any) => u._id === supplierId);
    return supplier?.profile.name || "Unknown Supplier";
  };

  const getProductNames = (products: any[]) =>
    products.length > 1
      ? `Multiple Products (${products.length})`
      : products[0]?.product.name || "Unknown Product";

  const getTotalQuantity = (products: any[]) =>
    products.reduce((sum: number, p: any) => sum + p.quantity, 0);

  const displaySupplies =
    user?.role === "supplier"
      ? filteredSupplies.filter((s: any) => s.supplier === user._id)
      : filteredSupplies;

  if (
    user?.role !== "admin" &&
    user?.role !== "staff" &&
    user?.role !== "supplier"
  ) {
    return <PreventAccessRoutes />;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Supplies Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "supplier"
              ? "Manage your supplies"
              : "Manage all supplies"}
          </p>
        </div>

        {user?.role === "admin" && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Supply
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Supply</DialogTitle>
              </DialogHeader>
              <SupplyForm onSubmit={handleAddSupply} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplies</CardTitle>
          <CardDescription>
            Total supplies: {supplies.length} | Showing:{" "}
            {displaySupplies.length}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search supplies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displaySupplies.map((supply: any) => (
                  <TableRow key={supply._id}>
                    <TableCell className="font-medium">
                      {getProductNames(supply.products)}
                    </TableCell>
                    {user?.role !== "supplier" && (
                      <TableCell>{getSupplierName(supply.supplier)}</TableCell>
                    )}
                    <TableCell>{getTotalQuantity(supply.products)}</TableCell>
                    <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
                    <TableCell>{supply.commissionRate}%</TableCell>
                    <TableCell>
                      {formatCurrency(supply.commissionAmount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(supply.status)}</TableCell>
                    <TableCell>
                      {new Date(supply.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingSupply(supply)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {(user?.role === "admin" || user?.role === "staff") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSupply(supply)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}

                      {user?.role === "admin" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingSupply(supply)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      {viewingSupply && (
        <SupplyDetailModal
          supply={viewingSupply}
          isOpen={!!viewingSupply}
          onClose={() => setViewingSupply(null)}
        />
      )}

      {/* Edit Modal */}
      {editingSupply && (
        <Dialog
          open={!!editingSupply}
          onOpenChange={() => setEditingSupply(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Supply</DialogTitle>
            </DialogHeader>
            {/* pass edit props using a spread cast to any to avoid TS error */}
            <SupplyForm
              onSubmit={handleUpdateSupply}
              {...({ initialData: editingSupply } as any)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingSupply}
        onOpenChange={() => setDeletingSupply(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this supply?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSupply}
              className="bg-destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SuppliesManagement;
