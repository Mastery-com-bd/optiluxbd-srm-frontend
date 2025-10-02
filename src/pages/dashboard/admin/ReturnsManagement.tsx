/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  mockProducts,
  mockReturns,
  mockUsers,
  type Product,
  type ReturnProduct,
} from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, Eye, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReturnsManagement = () => {
  const { user } = useAuth();
  const [returns, setReturns] = useState<ReturnProduct[]>(mockReturns);
  const [_products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingReturn, setViewingReturn] = useState<ReturnProduct | null>(
    null
  );

  const filteredReturns = returns.filter((returnItem) => {
    const product = mockProducts.find((p) => p.id === returnItem.productId);
    const staff = mockUsers.find((u) => u._id === returnItem.staffId);
    return (
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff?.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddReturn = (
    returnData: Omit<ReturnProduct, "id" | "createdAt" | "updatedAt">
  ) => {
    const newReturn: ReturnProduct = {
      ...returnData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReturns([...returns, newReturn]);

    // Automatically add returned products back to stock
    if (newReturn.status === "processed") {
      addToStock(newReturn.productId, newReturn.quantity);
    }

    setIsAddModalOpen(false);
    toast.success(
      `Return has been added and ${
        newReturn.status === "processed"
          ? "stock updated"
          : "is pending processing"
      }`
    );
  };

  const addToStock = (productId: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, currentStock: product.currentStock + quantity }
          : product
      )
    );
  };

  const handleProcessReturn = (returnId: string) => {
    const returnItem = returns.find((r) => r.id === returnId);
    if (!returnItem) return;

    if (returnItem.status === "processed") {
      toast.error("This return has already been processed.");
      return;
    }

    // Update return status
    setReturns((prevReturns) =>
      prevReturns.map((r) =>
        r.id === returnId
          ? { ...r, status: "processed", updatedAt: new Date().toISOString() }
          : r
      )
    );

    // Add to stock
    addToStock(returnItem.productId, returnItem.quantity);

    toast.success("Return has been processed and stock has been updated.");
  };

  const getStatusBadge = (status: ReturnProduct["status"]) => {
    const variants = {
      pending: "secondary" as const,
      processed: "default" as const,
      cancelled: "destructive" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getProductName = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  const getStaffName = (staffId: string) => {
    const staff = mockUsers.find((u) => u._id === staffId);
    return staff?.profile.name || "Unknown Staff";
  };

  // Filter returns based on user role
  const displayReturns =
    user?.role === "staff"
      ? filteredReturns.filter((returnItem) => returnItem.staffId === user._id)
      : filteredReturns;

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
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {returns.filter((r) => r.status === "processed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {returns.filter((r) => r.status === "pending").length}
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
              {returns.reduce((sum, r) => sum + r.quantity, 0)}
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
              {displayReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
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
                            onClick={() => handleProcessReturn(returnItem.id)}
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
