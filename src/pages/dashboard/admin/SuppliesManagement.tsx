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
  useCreateSupplyMutation,
  useDeleteSupplyMutation,
  useGetAllSuppliesQuery,
  useUpdateSupplyMutation,
} from "@/redux/features/supply/supplyApi";
import { debounce } from "@/utills/debounce";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SuppliesManagement = () => {
  const [filters, setFilters] = useState({ limit: 10, page: 1, search: "" });
  const { user } = useAuth();
  const { data: suppliesData, isLoading } = useGetAllSuppliesQuery(filters);
  const pagination = suppliesData?.data?.pagination || { page: 1, totalPages: 1, total: 0 };
  const [createSupply] = useCreateSupplyMutation();
  const [updateSupply] = useUpdateSupplyMutation();
  const [deleteSupply] = useDeleteSupplyMutation();

  const [inputValue, setInputValue] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupply, setEditingSupply] = useState<any | null>(null);
  const [deletingSupply, setDeletingSupply] = useState<any | null>(null);
  const [viewingSupply, setViewingSupply] = useState<any | null>(null);

  const supplies = suppliesData?.data?.items || [];


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



  const getProductNames = (products: any[]) =>
    products.length > 1
      ? `Multiple Products (${products.length})`
      : products[0]?.product.name || "Unknown Product";

  const getTotalQuantity = (products: any[]) =>
    products.reduce((sum: number, p: any) => sum + p.quantity, 0);


  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });


  if (
    user?.role !== "admin" &&
    user?.role !== "staff" &&
    user?.role !== "supplier"
  ) {
    return <PreventAccessRoutes />;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 w-[87vw] lg:w-full">
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
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
            {supplies.length}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search supplies..."
              value={inputValue}
              onChange={(e) => { debouncedLog(e.target.value); setInputValue(e.target.value) }}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL No:</TableHead>
                  <TableHead>Product</TableHead>
                  {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Net Amount</TableHead> {/* ✅ Added */}
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplies.map((supply: any, index: number) => (
                  <TableRow key={supply._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {getProductNames(supply.products)}
                    </TableCell>
                    {user?.role !== "supplier" && (
                      <TableCell>
                        {supply?.supplier?.profile?.name || "Unknown Supplier"}
                      </TableCell>
                    )}
                    <TableCell>{getTotalQuantity(supply.products)}</TableCell>
                    <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
                    <TableCell>{supply.commissionRate}%</TableCell>
                    <TableCell>
                      {formatCurrency(supply.commissionAmount)}
                    </TableCell>
                    <TableCell>{formatCurrency(supply.netAmount)}</TableCell>
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
      {/* pagination */}
      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />
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
