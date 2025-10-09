// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import { mockPayments, mockUsers, type Payment } from "@/data/mockData";
// // import { type RootState } from "@/redux/store";
// import { DollarSign, Edit, Eye, Plus, Search } from "lucide-react";
// import { useState } from "react";
// // import { useSelector } from "react-redux";
// // import { useToast } from '@/hooks/use-toast';
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import PaymentForm from "@/components/dashboard/forms/PaymentForm";
// import CommissionRateModal from "@/components/dashboard/modals/CommissionRateModal";
// import PaymentDetailModal from "@/components/dashboard/modals/PaymentDetailModal";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "sonner";

// const PaymentManagement = () => {
//   // const { user } = useSelector((state: RootState) => state.auth);
//   const { user } = useAuth();
//   // const { toast } = useToast();
//   const [payments, setPayments] = useState<Payment[]>(mockPayments);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);
//   const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
//   const [commissionModalOpen, setCommissionModalOpen] = useState(false);

//   const filteredPayments = payments.filter((payment) => {
//     const supplier = mockUsers.find((u) => u._id === payment.supplierId);
//     return supplier?.profile.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//   });

//   const handleAddPayment = (
//     paymentData: Omit<Payment, "id" | "createdAt" | "updatedAt">
//   ) => {
//     const newPayment: Payment = {
//       ...paymentData,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setPayments([...payments, newPayment]);
//     setIsAddModalOpen(false);
//     toast.success("Payment record has been added successfully.");
//   };

//   const handleUpdatePayment = (
//     paymentData: Omit<Payment, "id" | "createdAt" | "updatedAt">
//   ) => {
//     if (!editingPayment) return;

//     const updatedPayment: Payment = {
//       ...paymentData,
//       id: editingPayment.id,
//       createdAt: editingPayment.createdAt,
//       updatedAt: new Date().toISOString(),
//     };

//     setPayments(
//       payments.map((p) => (p.id === editingPayment.id ? updatedPayment : p))
//     );
//     setEditingPayment(null);
//     toast.success("Payment has been updated successfully.");
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: Payment["status"]) => {
//     const variants = {
//       pending: "secondary" as const,
//       completed: "default" as const,
//       partial: "secondary" as const,
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

//   // Filter payments based on user role
//   const displayPayments =
//     user?.role === "supplier"
//       ? filteredPayments.filter((payment) => payment.supplierId === user._id)
//       : filteredPayments;

//   if (user?.role !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Payment Management</h1>
//           <p className="text-muted-foreground">
//             {user?.role === "supplier"
//               ? "View your payments"
//               : "Manage supplier payments"}
//           </p>
//         </div>

//         <div className="flex gap-2">
//           {user?.role === "admin" && (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setCommissionModalOpen(true)}
//               >
//                 <DollarSign className="h-4 w-4 mr-2" />
//                 Commission Rates
//               </Button>
//               <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Payment
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl">
//                   <DialogHeader>
//                     <DialogTitle>Add New Payment</DialogTitle>
//                   </DialogHeader>
//                   <PaymentForm onSubmit={handleAddPayment} />
//                 </DialogContent>
//               </Dialog>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Payments
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {formatCurrency(
//                 payments.reduce((sum, p) => sum + p.totalAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">
//               {formatCurrency(
//                 payments.reduce((sum, p) => sum + p.paidAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Due</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">
//               {formatCurrency(
//                 payments.reduce((sum, p) => sum + p.dueAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Commission Earned
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {formatCurrency(
//                 payments.reduce((sum, p) => sum + p.commissionAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Payments</CardTitle>
//           <CardDescription>
//             Total payments: {payments.length} | Showing:{" "}
//             {displayPayments.length}
//           </CardDescription>
//           <div className="flex items-center space-x-2">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by supplier..."
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
//                 {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Commission</TableHead>
//                 <TableHead>Paid Amount</TableHead>
//                 <TableHead>Due Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Payment Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displayPayments.map((payment) => (
//                 <TableRow key={payment.id}>
//                   {user?.role !== "supplier" && (
//                     <TableCell className="font-medium">
//                       {getSupplierName(payment.supplierId)}
//                     </TableCell>
//                   )}
//                   <TableCell>{formatCurrency(payment.totalAmount)}</TableCell>
//                   <TableCell>
//                     {formatCurrency(payment.commissionAmount)}
//                   </TableCell>
//                   <TableCell className="text-green-600">
//                     {formatCurrency(payment.paidAmount)}
//                   </TableCell>
//                   <TableCell className="text-red-600">
//                     {formatCurrency(payment.dueAmount)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(payment.status)}</TableCell>
//                   <TableCell>
//                     {payment.paymentDate
//                       ? new Date(payment.paymentDate).toLocaleDateString()
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setViewingPayment(payment)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       {user?.role === "admin" && (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => setEditingPayment(payment)}
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Edit Payment Modal */}
//       <Dialog
//         open={!!editingPayment}
//         onOpenChange={() => setEditingPayment(null)}
//       >
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Edit Payment</DialogTitle>
//           </DialogHeader>
//           {editingPayment && (
//             <PaymentForm
//               initialData={editingPayment}
//               onSubmit={handleUpdatePayment}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Payment Detail Modal */}
//       {viewingPayment && (
//         <PaymentDetailModal
//           payment={viewingPayment}
//           isOpen={!!viewingPayment}
//           onClose={() => setViewingPayment(null)}
//         />
//       )}

//       {/* Commission Rate Modal */}
//       <CommissionRateModal
//         isOpen={commissionModalOpen}
//         onClose={() => setCommissionModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default PaymentManagement;

// Updated PaymentManagement.tsx
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import PaymentForm from "@/components/dashboard/forms/PaymentForm";
// import CommissionRateModal from "@/components/dashboard/modals/CommissionRateModal";
// import PaymentDetailModal from "@/components/dashboard/modals/PaymentDetailModal";
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
//   DialogDescription,
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
//   useGeneratePaymentMutation,
//   useGetAllPaymentsQuery,
//   useMarkPaidMutation,
// } from "@/redux/features/payments/paymentsApi";
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { DollarSign, Eye, Plus, Search } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// const PaymentManagement = () => {
//   const { user } = useAuth();
//   const { data: paymentsData, isLoading } = useGetAllPaymentsQuery(undefined);
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const [generatePayment] = useGeneratePaymentMutation();
//   const [markPaid] = useMarkPaidMutation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [viewingPayment, setViewingPayment] = useState<any | null>(null);
//   const [commissionModalOpen, setCommissionModalOpen] = useState(false);

//   const payments = paymentsData?.data || [];
//   const users = usersData?.data || [];

//   console.log("Payments:", payments);

//   const filteredPayments = payments.filter((payment: any) => {
//     const supplier = users.find((u: any) => u._id === payment.supplier);
//     return supplier?.profile.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//   });

//   // const handleAddPayment = async (paymentData: any) => {
//   //   try {
//   //     await generatePayment(paymentData).unwrap();
//   //     setIsAddModalOpen(false);
//   //     toast.success("Payment record has been added successfully.");
//   //   } catch {
//   //     toast.error("Failed to add payment.");
//   //   }
//   // };

//   const handleAddPayment = async (paymentData: any) => {
//     try {
//       await generatePayment(paymentData).unwrap();
//       toast.success("Payment record has been added successfully.");
//     } catch (error) {
//       toast.error("Failed to add payment.");
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
//       completed: "default" as const,
//       partial: "secondary" as const,
//     } as const;
//     type VariantKey = keyof typeof variants;
//     const key = status as VariantKey;
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

//   // Filter payments based on user role
//   const displayPayments =
//     user?.role === "supplier"
//       ? filteredPayments.filter((payment: any) => payment.supplier === user._id)
//       : filteredPayments;

//   if (user?.role !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   async function handleMarkPaid(_id: any): Promise<void> {
//     try {
//       await markPaid(_id).unwrap();
//       toast.success("Payment marked as paid successfully.");
//     } catch {
//       toast.error("Failed to mark payment as paid.");
//     }
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Payment Management</h1>
//           <p className="text-muted-foreground">
//             {user?.role === "supplier"
//               ? "View your payments"
//               : "Manage supplier payments"}
//           </p>
//         </div>

//         <div className="flex gap-2">
//           {user?.role === "admin" && (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setCommissionModalOpen(true)}
//               >
//                 <DollarSign className="h-4 w-4 mr-2" />
//                 Commission Rates
//               </Button>
//               <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Payment
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Add New Payment</DialogTitle>
//                     <DialogDescription>
//                       Fill out the form below to add a new payment record.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <PaymentForm
//                     onSubmit={async (data) => {
//                       try {
//                         await handleAddPayment(data); // ✅ wait before closing
//                       } finally {
//                         setIsAddModalOpen(false);
//                       }
//                     }}
//                   />
//                 </DialogContent>
//               </Dialog>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Payments
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {formatCurrency(
//                 payments.reduce((sum: number, p: any) => sum + p.totalAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">
//               {formatCurrency(
//                 payments.reduce((sum: number, p: any) => sum + p.paidAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Due</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">
//               {formatCurrency(
//                 payments.reduce((sum: number, p: any) => sum + p.dueAmount, 0)
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Commission Earned
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {formatCurrency(
//                 payments.reduce(
//                   (sum: number, p: any) => sum + p.commissionAmount,
//                   0
//                 )
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Payments</CardTitle>
//           <CardDescription>
//             Total payments: {payments.length} | Showing:{" "}
//             {displayPayments.length}
//           </CardDescription>
//           <div className="flex items-center space-x-2">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by supplier..."
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
//                 {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Commission</TableHead>
//                 <TableHead>Paid Amount</TableHead>
//                 <TableHead>Due Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Payment Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displayPayments.map((payment: any) => (
//                 <TableRow key={payment._id}>
//                   {user?.role !== "supplier" && (
//                     <TableCell className="font-medium">
//                       {getSupplierName(payment.supplier)}
//                     </TableCell>
//                   )}
//                   <TableCell>{formatCurrency(payment.totalAmount)}</TableCell>
//                   <TableCell>
//                     {formatCurrency(payment.commissionAmount)}
//                   </TableCell>
//                   <TableCell className="text-green-600">
//                     {formatCurrency(payment.paidAmount)}
//                   </TableCell>
//                   <TableCell className="text-red-600">
//                     {formatCurrency(payment.dueAmount)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(payment.status)}</TableCell>
//                   <TableCell>
//                     {payment.paymentDate
//                       ? new Date(payment.paymentDate).toLocaleDateString()
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setViewingPayment(payment)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       {user?.role === "admin" &&
//                         payment.status === "pending" && (
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleMarkPaid(payment._id)}
//                           >
//                             Mark Paid
//                           </Button>
//                         )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Payment Detail Modal */}
//       {viewingPayment && (
//         <PaymentDetailModal
//           payment={viewingPayment}
//           isOpen={!!viewingPayment}
//           onClose={() => setViewingPayment(null)}
//         />
//       )}

//       {/* Commission Rate Modal */}
//       <CommissionRateModal
//         isOpen={commissionModalOpen}
//         onClose={() => setCommissionModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default PaymentManagement;

import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import PaymentForm from "@/components/dashboard/forms/PaymentForm";
import CommissionRateModal from "@/components/dashboard/modals/CommissionRateModal";
import PaymentDetailModal from "@/components/dashboard/modals/PaymentDetailModal";
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
  DialogDescription,
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
  useGeneratePaymentMutation,
  useGetAllPaymentsQuery,
  useMarkPaidMutation,
} from "@/redux/features/payments/paymentsApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { DollarSign, Eye, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const PaymentManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useGetAllPaymentsQuery(undefined);
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const [generatePayment] = useGeneratePaymentMutation();
  const [markPaid] = useMarkPaidMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingPayment, setViewingPayment] = useState<any | null>(null);
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);

  const payments = paymentsData?.data || [];
  const users = usersData?.data || [];

  console.log("Payments data:", payments);
  console.log("Payments API error:", error);
  console.log("Payments response:", paymentsData);

  // Fixed: Handle both nested supplier object and supplier ID
  const getSupplierFromPayment = (payment: any) => {
    if (payment.supplier && typeof payment.supplier === "object") {
      // Supplier is populated (nested object)
      return payment.supplier;
    } else {
      // Supplier is just an ID, find in users array
      return users.find((u: any) => u._id === payment.supplier);
    }
  };

  // Fixed: Handle both nested supplier object and supplier ID
  const filteredPayments = payments.filter((payment: any) => {
    const supplier = getSupplierFromPayment(payment);
    return supplier?.profile?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleAddPayment = async (paymentData: any) => {
    try {
      console.log("Creating payment with data:", paymentData);
      const result = await generatePayment(paymentData).unwrap();
      console.log("Payment creation result:", result);
      toast.success("Payment record has been added successfully.");
      setIsAddModalOpen(false); // Close modal after success
    } catch (error: any) {
      console.error("Payment creation error:", error);
      toast.error(error?.data?.message || "Failed to add payment.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary" as const,
      completed: "default" as const,
      partial: "secondary" as const,
    } as const;
    type VariantKey = keyof typeof variants;
    const key = status as VariantKey;
    const variant = variants[key] ?? variants.pending;
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSupplierName = (payment: any) => {
    const supplier = getSupplierFromPayment(payment);
    return supplier?.profile?.name || "Unknown Supplier";
  };

  const getSupplierId = (payment: any) => {
    if (payment.supplier && typeof payment.supplier === "object") {
      return payment.supplier._id;
    }
    return payment.supplier;
  };

  // Filter payments based on user role
  const displayPayments =
    user?.role === "supplier"
      ? filteredPayments.filter(
          (payment: any) => getSupplierId(payment) === user._id
        )
      : filteredPayments;

  if (user?.role !== "admin") {
    return <PreventAccessRoutes />;
  }

  async function handleMarkPaid(_id: any): Promise<void> {
    try {
      await markPaid(_id).unwrap();
      toast.success("Payment marked as paid successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to mark payment as paid.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Loading payments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center text-destructive">
          <p>Error loading payments</p>
          <p className="text-sm text-muted-foreground">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "supplier"
              ? "View your payments"
              : "Manage supplier payments"}
          </p>
        </div>

        <div className="flex gap-2">
          {user?.role === "admin" && (
            <>
              <Button
                variant="outline"
                onClick={() => setCommissionModalOpen(true)}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Commission Rates
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard/commission-rate")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Go TO Commission Rates
              </Button>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Payment</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to add a new payment record.
                    </DialogDescription>
                  </DialogHeader>
                  <PaymentForm
                    onSubmit={handleAddPayment}
                    onCancel={() => setIsAddModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                payments.reduce(
                  (sum: number, p: any) => sum + (p.totalAmount || 0),
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(
                payments.reduce(
                  (sum: number, p: any) => sum + (p.paidAmount || 0),
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(
                payments.reduce(
                  (sum: number, p: any) => sum + (p.dueAmount || 0),
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(
                payments.reduce(
                  (sum: number, p: any) => sum + (p.commissionAmount || 0),
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Total payments: {payments.length} | Showing:{" "}
            {displayPayments.length}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {displayPayments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {payments.length === 0
                  ? "No payments found. Add your first payment using the 'Add Payment' button."
                  : "No payments match your search criteria."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayPayments.map((payment: any) => (
                  <TableRow key={payment._id}>
                    {user?.role !== "supplier" && (
                      <TableCell className="font-medium">
                        {getSupplierName(payment)}
                      </TableCell>
                    )}
                    <TableCell>{formatCurrency(payment.totalAmount)}</TableCell>
                    <TableCell>
                      {formatCurrency(payment.commissionAmount)}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(payment.paidAmount)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {formatCurrency(payment.dueAmount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingPayment(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user?.role === "admin" &&
                          payment.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkPaid(payment._id)}
                            >
                              Mark Paid
                            </Button>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Payment Detail Modal */}
      {viewingPayment && (
        <PaymentDetailModal
          payment={viewingPayment}
          isOpen={!!viewingPayment}
          onClose={() => setViewingPayment(null)}
        />
      )}

      {/* Commission Rate Modal */}
      <CommissionRateModal
        isOpen={commissionModalOpen}
        onClose={() => setCommissionModalOpen(false)}
      />
    </div>
  );
};

export default PaymentManagement;
