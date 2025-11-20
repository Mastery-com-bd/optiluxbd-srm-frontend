/* eslint-disable @typescript-eslint/no-explicit-any */
import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import ReturnForm from "@/components/dashboard/forms/ReturnForm";
import ReturnDetailModal from "@/components/dashboard/modals/ReturnDetailModal";
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
  useCreateReturnMutation,
  useDeleteReturnMutation,
  useGetReturnsQuery,
  useUpdateReturnMutation,
} from "@/redux/features/returns/returnApi";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
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
import PaginationControls from "@/components/ui/PaginationComponent";

const ReturnsManagement = () => {
  const [filters, setFilters] = useState({ limit: 10, page: 1 });
  const { user } = useAuth();
  const {
    data: returnsData,
    isLoading: returnsLoading,
    refetch,
  } = useGetReturnsQuery(filters);
  const pagination = returnsData?.pagination || { page: 1, totalPages: 1, total: 0 };
  const [createReturn] = useCreateReturnMutation();
  const [updateReturn] = useUpdateReturnMutation();
  const [deleteReturn] = useDeleteReturnMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<any | null>(null);
  const [viewingReturn, setViewingReturn] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [returnToDelete, setReturnToDelete] = useState<any | null>(null);

  const returns = returnsData?.data?.items || [];

  const filteredReturns = returns.filter((returnItem: any) => {
    const productName = returnItem.productId?.name?.toLowerCase() || "";
    const staffName =
      returnItem.staffId?.profile?.name?.toLowerCase() ||
      returnItem.staffId?.name?.toLowerCase() ||
      "";
    const reason = returnItem.reason?.toLowerCase() || "";

    return (
      productName.includes(searchTerm.toLowerCase()) ||
      staffName.includes(searchTerm.toLowerCase()) ||
      reason.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddReturn = async (returnData: any) => {
    try {
      await createReturn(returnData).unwrap();
      setIsAddModalOpen(false);
      toast.success("Return has been added successfully");
      refetch();
    } catch (error: any) {
      console.error("Add return error:", error);
      toast.error(error?.data?.message || "Failed to add return.");
    }
  };

  const handleUpdateReturn = async (returnData: any) => {
    if (!editingReturn) return;

    try {
      await updateReturn({ id: editingReturn._id, ...returnData }).unwrap();
      setIsEditModalOpen(false);
      setEditingReturn(null);
      toast.success("Return has been updated successfully");
      refetch();
    } catch (error: any) {
      console.error("Update return error:", error);
      toast.error(error?.data?.message || "Failed to update return.");
    }
  };

  const openDeleteDialog = (returnItem: any) => {
    setReturnToDelete(returnItem);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setReturnToDelete(null);
  };

  const handleDeleteReturn = async () => {
    if (!returnToDelete) return;

    try {
      await deleteReturn(returnToDelete._id).unwrap();
      toast.success("Return has been deleted successfully");
      refetch();
    } catch (error: any) {
      console.error("Delete return error:", error);
      toast.error(error?.data?.message || "Failed to delete return.");
    } finally {
      closeDeleteDialog();
    }
  };

  const handleEditReturn = (returnItem: any) => {
    setEditingReturn(returnItem);
    setIsEditModalOpen(true);
  };

  const handleProcessReturn = async (returnId: string) => {
    const returnItem = filteredReturns.find((r: any) => r._id === returnId);
    if (!returnItem) return;

    if (returnItem.status === "completed") {
      toast.error("This return has already been completed.");
      return;
    }

    try {
      await updateReturn({ id: returnId, status: "completed" }).unwrap();
      toast.success("Return has been completed and stock has been updated.");
      refetch();
    } catch (error: any) {
      console.error("Process return error:", error);
      toast.error(error?.data?.message || "Failed to process return.");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: {
      [key: string]: "default" | "secondary" | "destructive" | "outline";
    } = {
      pending: "secondary",
      processing: "default",
      cancelled: "destructive",
      completed: "outline",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getProductName = (productId: any) => {
    if (!productId) return "Unknown Product";
    return productId.name || "Unknown Product";
  };

  const getStaffName = (staffId: any) => {
    if (!staffId) return "Unknown Staff";
    return (
      staffId.profile?.name ||
      staffId.name ||
      staffId.email?.split("@")[0] ||
      "Unknown Staff"
    );
  };

  const getStaffId = (staffId: any) => {
    if (!staffId) return null;
    return staffId._id || staffId;
  };

  const displayReturns =
    user?.role === "staff"
      ? filteredReturns.filter(
        (returnItem: any) => getStaffId(returnItem.staffId) === user._id
      )
      : filteredReturns;

  if (user?.role !== "admin" && user?.role !== "staff") {
    return <PreventAccessRoutes />;
  }

  if (returnsLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 w-[87vw] lg:w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Returns Management</h1>
          <p className="text-muted-foreground">
            {user?.role === "staff"
              ? "Manage your product returns"
              : "Manage all product returns"}
          </p>
        </div>

        {(user?.role === "admin" || user?.role === "staff") && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Return
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Product Return</DialogTitle>
              </DialogHeader>
              <ReturnForm onSubmit={handleAddReturn} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {returns.filter((r: any) => r.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {returns.filter((r: any) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {returns.reduce(
                (sum: number, r: any) => sum + (r.quantity || 0),
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Returns</CardTitle>
          <CardDescription>
            Total returns: {returns.length} | Showing: {displayReturns.length}
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search returns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {displayReturns.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {returns.length === 0
                  ? "No returns found. Add your first return using the 'Add Return' button."
                  : "No returns match your search criteria."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    {user?.role !== "staff" && <TableHead>Staff</TableHead>}
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayReturns.map((returnItem: any) => (
                    <TableRow key={returnItem._id}>
                      <TableCell className="font-medium">
                        {getProductName(returnItem.productId)}
                      </TableCell>
                      {user?.role !== "staff" && (
                        <TableCell>
                          {getStaffName(returnItem.staffId)}
                        </TableCell>
                      )}
                      <TableCell>{returnItem.quantity || 0}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {returnItem.reason || "No reason provided"}
                      </TableCell>
                      <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                      <TableCell>
                        {returnItem.createdAt
                          ? new Date(returnItem.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingReturn(returnItem)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {(user?.role === "admin" ||
                            (user?.role === "staff" &&
                              getStaffId(returnItem.staffId) === user._id)) && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditReturn(returnItem)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>

                                {returnItem.status === "pending" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleProcessReturn(returnItem._id)
                                    }
                                  >
                                    Complete
                                  </Button>
                                )}

                                {user?.role === "admin" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openDeleteDialog(returnItem)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />
      {/* Edit Return Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product Return</DialogTitle>
          </DialogHeader>
          {editingReturn && (
            <ReturnForm
              onSubmit={handleUpdateReturn}
              initialData={editingReturn}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Return Detail Modal */}
      {viewingReturn && (
        <ReturnDetailModal
          returnItem={viewingReturn}
          isOpen={!!viewingReturn}
          onClose={() => setViewingReturn(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              return for
              <span className="font-semibold">
                {" "}
                {returnToDelete?.productId?.name}
              </span>
              {returnToDelete?.applied &&
                " and adjust the inventory stock accordingly"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReturn}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Return
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReturnsManagement;
