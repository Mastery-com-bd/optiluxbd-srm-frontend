import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { type Supply, mockProducts, mockUsers } from "@/data/mockData";

interface SupplyDetailModalProps {
  supply: Supply;
  isOpen: boolean;
  onClose: () => void;
}

const SupplyDetailModal = ({
  supply,
  isOpen,
  onClose,
}: SupplyDetailModalProps) => {
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

  const supplier = mockUsers.find((u) => u._id === supply.supplierId);
  const product = mockProducts.find((p) => p.id === supply.productId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Supply Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Supply #{supply.id}</h3>
              <p className="text-muted-foreground">
                Created on {new Date(supply.createdAt).toLocaleDateString()}
              </p>
            </div>
            {getStatusBadge(supply.status)}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Supplier Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium">
                    {supplier?.profile.name || "Unknown Supplier"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{supplier?.email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <p className="font-medium">
                    {supplier?.profile.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Product Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Product:</span>
                  <p className="font-medium">
                    {product?.name || "Unknown Product"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">{product?.category || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Description:</span>
                  <p className="font-medium">{product?.description || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Supply Details</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{supply.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Price:</span>
                  <span className="font-medium">
                    {formatCurrency(supply.costPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(supply.totalAmount)}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Commission Rate:
                  </span>
                  <span className="font-medium">{supply.commissionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Commission Amount:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(supply.commissionAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      supply.totalAmount - supply.commissionAmount
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium">
                {new Date(supply.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated:</span>
              <p className="font-medium">
                {new Date(supply.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplyDetailModal;
