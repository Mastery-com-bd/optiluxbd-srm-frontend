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
  mockSupplies,
  mockUsers,
  type Supply,
} from "@/data/mockData";
import { Eye, Plus, Search } from "lucide-react";
import { useState } from "react";

// import { useToast } from '@/hooks/use-toast';
import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import SupplyForm from "@/components/dashboard/forms/SupplyForm";
import SupplyDetailModal from "@/components/dashboard/modals/SupplyDetailModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const SuppliesManagement = () => {
  const { user } = useAuth();
  // const { toast } = useToast();
  const [supplies, setSupplies] = useState<Supply[]>(mockSupplies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingSupply, setViewingSupply] = useState<Supply | null>(null);

  const filteredSupplies = supplies.filter((supply) => {
    const product = mockProducts.find((p) => p.id === supply.productId);
    const supplier = mockUsers.find((u) => u._id === supply.supplierId);
    return (
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier?.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddSupply = (
    supplyData: Omit<Supply, "id" | "createdAt" | "updatedAt">
  ) => {
    const newSupply: Supply = {
      ...supplyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSupplies([...supplies, newSupply]);
    setIsAddModalOpen(false);
    toast.success("Supply record has been added successfully.");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: Supply["status"]) => {
    const variants = {
      pending: "secondary" as const,
      completed: "default" as const,
      cancelled: "destructive" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSupplierName = (supplierId: string) => {
    const supplier = mockUsers.find((u) => u._id === supplierId);
    return supplier?.profile.name || "Unknown Supplier";
  };

  const getProductName = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  // Filter supplies based on user role
  const displaySupplies =
    user?.role === "supplier"
      ? filteredSupplies.filter((supply) => supply.supplierId === user._id)
      : filteredSupplies;

  if (user?.role !== "admin") {
    return <PreventAccessRoutes />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                {user?.role !== "supplier" && <TableHead>Supplier</TableHead>}
                <TableHead>Quantity</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Commission Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displaySupplies.map((supply) => (
                <TableRow key={supply.id}>
                  <TableCell className="font-medium">
                    {getProductName(supply.productId)}
                  </TableCell>
                  {user?.role !== "supplier" && (
                    <TableCell>{getSupplierName(supply.supplierId)}</TableCell>
                  )}
                  <TableCell>{supply.quantity}</TableCell>
                  <TableCell>{formatCurrency(supply.costPrice)}</TableCell>
                  <TableCell>{formatCurrency(supply.totalAmount)}</TableCell>
                  <TableCell>{supply.commissionRate}%</TableCell>
                  <TableCell>
                    {formatCurrency(supply.commissionAmount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(supply.status)}</TableCell>
                  <TableCell>
                    {new Date(supply.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewingSupply(supply)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supply Detail Modal */}
      {viewingSupply && (
        <SupplyDetailModal
          supply={viewingSupply}
          isOpen={!!viewingSupply}
          onClose={() => setViewingSupply(null)}
        />
      )}
    </div>
  );
};

export default SuppliesManagement;
