/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SupplyDetailModalProps {
  supply: any;
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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "secondary" | "default" | "destructive"> = {
      pending: "secondary",
      received: "default",
      cancelled: "destructive",
    };
    const variant = variants[status] ?? "secondary";
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Supply Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Supply #{supply._id}</h3>
              <p className="text-muted-foreground">
                Created on {new Date(supply.createdAt).toLocaleDateString()}
              </p>
            </div>
            {getStatusBadge(supply.status)}
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Supplier Information</h4>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="font-medium">
                  {supply.supplier.profile.name || "Unknown Supplier"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{supply.supplier.email || "N/A"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-medium">
                  {supply.supplier.profile.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Products ({supply.products.length})</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supply.products.map((p: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{p.product.name}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>{formatCurrency(p.costPrice)}</TableCell>
                    <TableCell>
                      {formatCurrency(p.quantity * p.costPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Supply Summary</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(supply.totalAmount)}
                  </span>
                </div>
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
                  <span className="font-medium">
                    {formatCurrency(supply.commissionAmount)}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
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
