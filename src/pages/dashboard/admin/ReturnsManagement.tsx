/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // useGetProductsQuery,
  useUpdateStockMutation,
} from "@/redux/features/inventory/inventoryApi";
import {
  useCreateReturnMutation,
  useGetReturnsQuery,
  useUpdateReturnMutation,
} from "@/redux/features/returns/returnApi"; // Assume returnApi.ts import
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { CheckCircle, Eye, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReturnsManagement = () => {
  const { user } = useAuth();
  const { data: returnsData, isLoading: returnsLoading } =
    useGetReturnsQuery(undefined);
  const [createReturn] = useCreateReturnMutation();
  const [updateReturn] = useUpdateReturnMutation();
  const [updateStock] = useUpdateStockMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingReturn, setViewingReturn] = useState<any | null>(null);

  const returns = returnsData || [];

  const filteredReturns = returns.filter((returnItem: any) => {
    const productName = returnItem.productId.name.toLowerCase();
    const staffName = returnItem.staffId.profile.name.toLowerCase();
    return (
      productName.includes(searchTerm.toLowerCase()) ||
      staffName.includes(searchTerm.toLowerCase()) ||
      returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddReturn = async (returnData: any) => {
    try {
      const newReturn = await createReturn(returnData).unwrap();
      if (returnData.status === "processing") {
        await addToStock(returnData.productId, returnData.quantity);
      }
      setIsAddModalOpen(false);
      toast.success(
        `Return has been added and ${
          returnData.status === "processing"
            ? "stock updated"
            : "is pending processing"
        }`
      );
      return newReturn;
    } catch {
      toast.error("Failed to add return.");
    }
  };

  const addToStock = async (productId: string, quantity: number) => {
    try {
      await updateStock({ id: productId, quantity }).unwrap(); // Assume body { quantity } adds to stock
    } catch {
      toast.error("Failed to update stock.");
    }
  };

  const handleProcessReturn = async (returnId: string) => {
    const returnItem = filteredReturns.find((r: any) => r._id === returnId);
    if (!returnItem) return;

    if (returnItem.status === "processing") {
      toast.error("This return has already been processing.");
      return;
    }

    try {
      await updateReturn({ id: returnId, status: "processing" }).unwrap();
      await addToStock(returnItem.productId._id, returnItem.quantity);
      toast.success("Return has been processing and stock has been updated.");
    } catch {
      toast.error("Failed to process return.");
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
    return productId.name || "Unknown Product";
  };

  const getStaffName = (staffId: any) => {
    return staffId.profile.name || "Unknown Staff";
  };

  // Filter returns based on user role
  const displayReturns =
    user?.role === "staff"
      ? filteredReturns.filter(
          (returnItem: any) => returnItem.staffId._id === user._id
        )
      : filteredReturns;

  if (returnsLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6">
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
            <CardTitle className="text-sm font-medium">processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {returns.filter((r: any) => r.status === "processing").length}
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
              {returns.reduce((sum: number, r: any) => sum + r.quantity, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Returns</CardTitle>
          <CardDescription>
            Total returns: {returns.length} | Showing: {displayReturns.length}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search returns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                {user?.role !== "staff" && <TableHead>Staff</TableHead>}
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayReturns.map((returnItem: any) => (
                <TableRow key={returnItem._id}>
                  <TableCell className="font-medium">
                    {getProductName(returnItem.productId)}
                  </TableCell>
                  {user?.role !== "staff" && (
                    <TableCell>{getStaffName(returnItem.staffId)}</TableCell>
                  )}
                  <TableCell>{returnItem.quantity}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                  <TableCell>
                    {new Date(returnItem.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingReturn(returnItem)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(user?.role === "admin" || user?.role === "staff") &&
                        returnItem.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProcessReturn(returnItem._id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Return Detail Modal */}
      {viewingReturn && (
        <ReturnDetailModal
          returnItem={viewingReturn}
          isOpen={!!viewingReturn}
          onClose={() => setViewingReturn(null)}
        />
      )}
    </div>
  );
};

export default ReturnsManagement;
