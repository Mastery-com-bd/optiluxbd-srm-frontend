import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { type Payment, mockSupplies, mockUsers } from "@/data/mockData";

interface PaymentDetailModalProps {
  payment: Payment;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentDetailModal = ({
  payment,
  isOpen,
  onClose,
}: PaymentDetailModalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: Payment["status"]) => {
    const variants = {
      pending: "secondary" as const,
      completed: "default" as const,
      partial: "secondary" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const supplier = mockUsers.find((u) => u._id === payment.supplierId);
  const relatedSupplies = mockSupplies.filter((s) =>
    payment.supplyIds.includes(s.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Payment #{payment.id}</h3>
              <p className="text-muted-foreground">
                Created on {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
            {getStatusBadge(payment.status)}
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
              <h4 className="font-medium">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(payment.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission:</span>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(payment.commissionAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paid Amount:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(payment.paidAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Amount:</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(payment.dueAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">
              Related Supplies ({relatedSupplies.length})
            </h4>
            <div className="space-y-2">
              {relatedSupplies.map((supply) => (
                <div
                  key={supply.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Supply #{supply.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {supply.quantity} | Commission:{" "}
                      {supply.commissionRate}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(supply.totalAmount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Commission: {formatCurrency(supply.commissionAmount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-muted-foreground">Payment Date:</span>
              <p className="font-medium">
                {payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated:</span>
              <p className="font-medium">
                {new Date(payment.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailModal;
