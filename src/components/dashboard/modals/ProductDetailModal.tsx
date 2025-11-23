/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteSupplierMutation } from "@/redux/features/inventory/inventoryApi";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProductDetailModalProps {
  product: any;
}

const ProductDetailModal = ({ product }: ProductDetailModalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatus = (quantity: number, minimumStock: number) => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= minimumStock)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const stockStatus = getStockStatus(product.quantity, product.minimumStock);
  const profitMargin =
    product.costPrice && product.sellingPrice
      ? (
        ((product.sellingPrice - product.costPrice) / product.costPrice) *
        100
      ).toFixed(1)
      : "0";


  const [deleteSupplier] = useDeleteSupplierMutation();
  const handleDeleteSupplier = async (productId: string, supplierId: string) => {
    const toastId = toast.loading(`delete-supplier-${supplierId}.....`);

    try {
      await deleteSupplier({ productId, supplierId }).unwrap();
      toast.success("Supplier removed ", {
        id: toastId
      })
    } catch (error: any) {
      toast.error("failed to delete...", {
        id: toastId,
      })
      console.log("error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="w-4" />
        </Button>
      </DialogTrigger>
      {/* Updated modal size */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image & Basic Info */}
          <div className="flex gap-6">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <Badge variant="outline">{product.category}</Badge>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          <Separator />

          {/* Pricing Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Pricing Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Price:</span>
                  <span className="font-medium">
                    {formatCurrency(product.costPrice ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selling Price:</span>
                  <span className="font-medium">
                    {formatCurrency(product.sellingPrice ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Margin:</span>
                  <span className="font-medium text-green-600">
                    {profitMargin}%
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Stock Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className="font-medium">{product.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Stock:</span>
                  <span className="font-medium">
                    {product.minimumStock} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={stockStatus.variant}>
                    {stockStatus.label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Supplier Price Variations */}
          <div className="space-y-4">
            <h4 className="font-medium">Supplier Price Variations</h4>
            <div className="rounded border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Cost Price</TableHead>
                    <TableHead className="text-right">Selling Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.priceVariations?.map((pv: any, i: number) => (
                    <TableRow key={pv._id || i}>
                      <TableCell>
                        {pv.supplier?.profile?.name || "Unknown"}
                      </TableCell>
                      <TableCell>
                        {Array.isArray(pv.size) ? pv.size.join(", ") : pv.size || "N/A"}
                      </TableCell>
                      <TableCell>
                        {Array.isArray(pv.color) ? pv.color.join(", ") : pv.color || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(pv.costPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(pv.sellingPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        {pv.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this supplier?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The supplier entry for{" "}
                                <span className="font-semibold">{product.name}</span> will be removed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteSupplier(product._id, pv?._id)}
                              >
                                Yes, Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated:</span>
              <p className="font-medium">
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;