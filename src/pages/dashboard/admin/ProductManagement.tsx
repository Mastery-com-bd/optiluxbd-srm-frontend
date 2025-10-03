/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // CardDescription,
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  Eye,
  Package,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductManagement = () => {
  const { user } = useAuth();
  const { data: productsData, isLoading } = useGetProductsQuery(undefined);

  console.log(productsData);

  const [deleteProduct] = useDeleteProductMutation();
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [viewingProduct, setViewingProduct] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const products = productsData || [];

  // const filteredProducts = products.filter(
  //   (product: any) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = filteredProducts.filter(
    (product: any) => product.quantity <= product.minimumStock
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  const handleEdit = (product: any) => {
    setEditingProduct(product);
  };

  const getStockStatus = (quantity: number, minimumStock: number) => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= minimumStock)
      return { label: "Low Stock", variant: "destructive" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your inventory products
          </p>
        </div> */}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage products and stock levels
          </p>
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
              <ProductForm
                onSubmit={() => setIsAddModalOpen(false)}
                isAdd={true}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-warning bg-warning/5">
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
                        Stock: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    Update
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
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
        {/* <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Total products: {products.length} | Showing:{" "}
            {filteredProducts.length}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader> */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product: any, index: number) => {
                const stockStatus = getStockStatus(
                  product.quantity,
                  product.minimumStock
                );
                const slNo = (currentPage - 1) * itemsPerPage + index + 1;
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
                          <span className="text-xs text-muted-foreground">
                            No Image
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatCurrency(product.costPrice)}</TableCell>
                    <TableCell>
                      {formatCurrency(product.sellingPrice)}
                    </TableCell>
                    <TableCell>
                      {product.quantity}/{product.minimumStock}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingProduct(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(user?.role === "admin" || user?.role === "staff") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {/* {user?.role === "admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )} */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            {user?.role !== "staff" && (
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this product?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The product{" "}
                                <span className="font-semibold">
                                  {product.name}
                                </span>{" "}
                                will be permanently removed from the database.
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
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Modal */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
      >
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

      {/* Product Detail Modal */}
      {viewingProduct && (
        <ProductDetailModal
          product={viewingProduct}
          isOpen={!!viewingProduct}
          onClose={() => setViewingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
