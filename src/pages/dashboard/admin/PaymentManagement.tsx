/* eslint-disable @typescript-eslint/no-explicit-any */
import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import PaymentForm from "@/components/dashboard/forms/PaymentForm";
import CommissionRateModal from "@/components/dashboard/modals/CommissionRateModal";
import ManualPayment from "@/components/dashboard/modals/ManualPayment";
import PaymentDetailModal from "@/components/dashboard/modals/PaymentDetailModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/PaginationComponent";
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
  useDeletePaymentMutation,
  useFilterPaymentsByDateQuery,
  useGeneratePaymentMutation,
  useGetAllPaymentsQuery,
  useMarkPaidMutation,
  useUpdatePaymentMutation,
} from "@/redux/features/payments/paymentsApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { debounce } from "@/utills/debounce";
import {
  Calendar,
  DollarSign,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const PaymentManagement = () => {
  const [filters, setFilters] = useState({ limit: 10, page: 1, search: "" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [useDateFilter, setUseDateFilter] = useState(false);

  // Queries
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useGetAllPaymentsQuery(filters, { skip: useDateFilter });

  const { data: filteredPaymentsData, isLoading: isDateFilterLoading } =
    useFilterPaymentsByDateQuery(
      { startDate: dateFilter.startDate, endDate: dateFilter.endDate, ...filters },
      { skip: !useDateFilter || !dateFilter.startDate || !dateFilter.endDate }
    );

  const { data: usersData } = useGetAllUsersQuery(undefined);
  const [generatePayment] = useGeneratePaymentMutation();
  const [markPaid] = useMarkPaidMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<any | null>(null);
  const [viewingPayment, setViewingPayment] = useState<any | null>(null);
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("")

  const payments = useDateFilter
    ? filteredPaymentsData?.data?.items || []
    : paymentsData?.data?.items || [];
  const pagination = paymentsData?.pagination || { page: 1, totalPages: 1, total: 0 };
  const users = usersData?.data?.items.items || [];

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 2000, { leading: false });
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

  const handleUpdatePayment = async (paymentData: any) => {
    try {
      if (!editingPayment?._id) {
        toast.error("No payment selected for update.");
        return;
      }

      const result = await updatePayment({
        id: editingPayment._id,
        body: paymentData,
      }).unwrap();

      console.log("Payment update result:", result);
      toast.success("Payment record has been updated successfully.");
      setIsEditModalOpen(false);
      setEditingPayment(null);
    } catch (error: any) {
      console.error("Payment update error:", error);
      toast.error(error?.data?.message || "Failed to update payment.");
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this payment? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deletePayment(paymentId).unwrap();
      toast.success("Payment record has been deleted successfully.");
    } catch (error: any) {
      console.error("Payment deletion error:", error);
      toast.error(error?.data?.message || "Failed to delete payment.");
    }
  };

  const handleMarkPaid = async (paymentId: string) => {
    try {
      await markPaid(paymentId).unwrap();
      toast.success("Payment marked as paid successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to mark payment as paid.");
    }
  };

  const handleDateFilter = () => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setUseDateFilter(true);
  };

  const handleClearDateFilter = () => {
    setDateFilter({ startDate: "", endDate: "" });
    setUseDateFilter(false);
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
      ? payments.filter(
        (payment: any) => getSupplierId(payment) === user._id
      )
      : payments;

  if (user?.role !== "admin") {
    return <PreventAccessRoutes />;
  }

  if (isLoading || isDateFilterLoading) {
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
      <div className="flex justify-center items-center py-8 ">
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
    <div className="space-y-6  w-[87vw] lg:w-full">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "supplier"
              ? "View your payments"
              : "Manage supplier payments"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
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
              <ManualPayment />
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

      {/* Date Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Payments by Date</CardTitle>
          <CardDescription>
            Filter payments within a specific date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={dateFilter.startDate}
                  onChange={(e) =>
                    setDateFilter((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={(e) =>
                    setDateFilter((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleDateFilter}
                disabled={!dateFilter.startDate || !dateFilter.endDate}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
              {useDateFilter && (
                <Button variant="outline" onClick={handleClearDateFilter}>
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
          {useDateFilter && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing payments from {dateFilter.startDate} to{" "}
              {dateFilter.endDate}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Total payments: {payments.length} | Showing:{" "}
            {displayPayments.length}
            {useDateFilter && " (Filtered by date)"}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by supplier..."
              value={inputValue}
              onChange={(e) => { debouncedLog(e.target.value); setInputValue(e.target.value) }}
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
                  <TableHead>#SL NO:</TableHead>
                  {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Payable Amount</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayPayments.map((payment: any, index: number) => (
                  <TableRow key={payment._id}>
                    <TableCell>{index + 1}</TableCell>
                    {user?.role !== "supplier" && (
                      <TableCell className="font-medium">
                        {getSupplierName(payment)}
                      </TableCell>
                    )}
                    <TableCell>{formatCurrency(payment.totalAmount)}</TableCell>
                    <TableCell>
                      {formatCurrency(payment.commissionAmount)}
                    </TableCell>
                    <TableCell>{formatCurrency(payment.netAmount)}</TableCell>
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

                        {user?.role === "admin" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingPayment(payment);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            {payment.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkPaid(payment._id)}
                              >
                                Mark Paid
                              </Button>
                            )}
                            {/* Delete with Confirmation */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirm Delete
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    payment? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeletePayment(payment._id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
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
      {/* pagination */}
      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />

      {/* Payment Detail Modal */}
      {viewingPayment && (
        <PaymentDetailModal
          payment={viewingPayment}
          isOpen={!!viewingPayment}
          onClose={() => setViewingPayment(null)}
        />
      )}

      {/* Edit Payment Modal */}
      {editingPayment && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Payment</DialogTitle>
              <DialogDescription>
                Update the payment information below.
              </DialogDescription>
            </DialogHeader>
            <PaymentForm
              {...({
                defaultValues: editingPayment,
                onSubmit: handleUpdatePayment,
                onCancel: () => {
                  setIsEditModalOpen(false);
                  setEditingPayment(null);
                },
                isEdit: true,
              } as any)}
            />
          </DialogContent>
        </Dialog>
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
