/* eslint-disable @typescript-eslint/no-explicit-any */
// Updated ReturnDetailModal.tsx
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ReturnDetailModalProps {
  returnItem: any;
  isOpen: boolean;
  onClose: () => void;
}

const ReturnDetailModal = ({
  returnItem,
  isOpen,
  onClose,
}: ReturnDetailModalProps) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Return Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                Return #{returnItem?.productId?.name}
              </h3>
              <p className="text-muted-foreground">
                Created on {new Date(returnItem.createdAt).toLocaleDateString()}
              </p>
            </div>
            {getStatusBadge(returnItem.status)}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Product Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Product:</span>
                  <p className="font-medium">
                    {returnItem?.productId?.name || "Unknown Product"}{" "}
                    {/* Assume populated or add fetch */}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">
                    {returnItem?.productId?.category || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Description:</span>
                  <p className="font-medium">
                    {returnItem?.productId?.description || "N/A"}
                  </p>
                </div>
                {returnItem?.productId?.imageUrl && (
                  <div>
                    <span className="text-muted-foreground">Image:</span>
                    <img
                      src={returnItem?.productId?.imageUrl}
                      alt={returnItem?.productId?.name}
                      className="mt-2 w-24 h-24 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Return Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Staff Member:</span>
                  <p className="font-medium">
                    {returnItem?.staffId?.profile?.name || "Unknown Staff"}{" "}
                    {/* Assume populated or add fetch */}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Staff Email:</span>
                  <p className="font-medium">
                    {returnItem?.staffId?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Quantity Returned:
                  </span>
                  <p className="font-medium">{returnItem.quantity} units</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Return Reason:</span>
                  <p className="font-medium">{returnItem.reason}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Timeline</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span className="text-sm">Return Created</span>
                <span className="text-sm font-medium">
                  {new Date(returnItem.createdAt).toLocaleString()}
                </span>
              </div>
              {returnItem.updatedAt !== returnItem.createdAt && (
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-sm font-medium">
                    {new Date(returnItem.updatedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {returnItem.status === "processed" && (
            <>
              <Separator />
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">
                  Return Processed
                </h4>
                <p className="text-sm text-green-700">
                  This return has been processed and {returnItem.quantity} units
                  have been added back to the product stock.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnDetailModal;
