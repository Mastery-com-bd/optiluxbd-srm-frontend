/* eslint-disable @typescript-eslint/no-explicit-any */
import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import ProductForm from "@/components/dashboard/forms/ProductForm";
import ProductDetailModal from "@/components/dashboard/modals/ProductDetailModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/inventory/inventoryApi";
import {
  AlertTriangle,
  Edit,
  Package,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductManagement = () => {
  const [filters, setFilters] = useState({ limit: 10, page: 1 });
  const { user } = useAuth();
  const { data: productsData, isLoading } = useGetProductsQuery(filters);
  const [deleteProduct] = useDeleteProductMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const products = productsData?.items || [];
  const pagination = productsData?.pagination || { page: 1, totalPages: 1, total: 0 };

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = filteredProducts.filter(
    (product: any) => product.totalQuantity <= product.minimumStock
  );

  const handleDeleteProduct = async (productId: string) => {
    if (user?.role !== "admin") {
      toast.error("Only admin can delete products.");
      return;
    }
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product has been deleted successfully.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = (product: any) => setEditingProduct(product);

  const getStockStatus = (quantity: number, minimumStock: number) => {
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= minimumStock) return { label: "Low Stock", variant: "destructive" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const minPrice = (product: any): number => {
    if (!product?.priceVariations?.length) return 0;
    return Math.min(...product.priceVariations.map((v: any) => v.sellingPrice || 0));
  };

  const maxPrice = (product: any): number => {
    if (!product?.priceVariations?.length) return 0;
    return Math.max(...product.priceVariations.map((v: any) => v.sellingPrice || 0));
  };

  if (user?.role !== "admin" && user?.role !== "staff") {
    return <PreventAccessRoutes />;
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 w-[87vw] lg:w-full overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage products and stock levels</p>
        </div>
        {(user?.role === "admin" || user?.role === "staff") && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm onSubmit={() => setIsAddModalOpen(false)} isAdd={true} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {lowStockProducts.length > 0 && (
        <Card className="border-warning bg-warning/5 w-full">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alert ({lowStockProducts.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-4 w-4 text-warning" />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.totalQuantity}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    Update
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Suppliers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: any, index: number) => {
                const stockStatus = getStockStatus(
                  product.totalQuantity,
                  product.minimumStock
                );
                const slNo = (filters.page - 1) * filters.limit + index + 1;
                return (
                  <TableRow key={product._id}>
                    <TableCell>{slNo}</TableCell>
                    <TableCell>
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">No Image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {formatCurrency(minPrice(product))} - {formatCurrency(maxPrice(product))}
                    </TableCell>
                    <TableCell>
                      {product.totalQuantity}/{product.minimumStock}
                    </TableCell>
                    <TableCell>{product.priceVariations.length}</TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ProductDetailModal product={product} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user?.role !== "staff" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete this product?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. Product{" "}
                                  <span className="font-semibold">{product.name}</span> will be
                                  permanently deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(product._id)}
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initialData={editingProduct}
              onSubmit={() => setEditingProduct(null)}
              isAdd={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;