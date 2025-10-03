// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ProductForm from "@/components/dashboard/forms/ProductForm";
// import ProductDetailModal from "@/components/dashboard/modals/ProductDetailModal";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { mockProducts } from "@/data/mockData";
// import { AlertTriangle, Edit, Eye, Package, Plus, Search } from "lucide-react";
// import { useState } from "react";

// const InventoryManagement = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

//   const filteredProducts = mockProducts.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const lowStockProducts = mockProducts.filter(
//     (product) => product.currentStock <= product.minimumStock
//   );

//   const handleEdit = (product: any) => {
//     setSelectedProduct(product);
//     setIsEditDialogOpen(true);
//   };

//   const handleViewDetails = (product: any) => {
//     setSelectedProduct(product);
//     setIsDetailDialogOpen(true);
//   };

//   const getStockStatus = (current: number, minimum: number) => {
//     if (current <= minimum) return "critical";
//     if (current <= minimum * 1.5) return "low";
//     return "good";
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "critical":
//         return "bg-destructive/10 text-destructive";
//       case "low":
//         return "bg-warning/10 text-warning";
//       default:
//         return "bg-success/10 text-success";
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">
//             Inventory Management
//           </h1>
//           <p className="text-muted-foreground">
//             Manage products and stock levels
//           </p>
//         </div>

//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button variant="gradient">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <ProductForm onSubmit={() => setIsAddDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Low Stock Alert */}
//       {lowStockProducts.length > 0 && (
//         <Card className="border-warning bg-warning/5">
//           <CardHeader>
//             <CardTitle className="flex items-center text-warning">
//               <AlertTriangle className="h-5 w-5 mr-2" />
//               Low Stock Alert ({lowStockProducts.length} items)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {lowStockProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Package className="h-4 w-4 text-warning" />
//                     <div>
//                       <p className="font-medium text-sm">{product.name}</p>
//                       <p className="text-xs text-muted-foreground">
//                         Stock: {product.currentStock}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleEdit(product)}
//                   >
//                     Update
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Products ({filteredProducts.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Cost Price</TableHead>
//                   <TableHead>Selling Price</TableHead>
//                   <TableHead>Current Stock</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredProducts.map((product) => {
//                   const status = getStockStatus(
//                     product.currentStock,
//                     product.minimumStock
//                   );
//                   return (
//                     <TableRow key={product.id}>
//                       <TableCell>
//                         <div>
//                           <p className="font-medium">{product.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {product.description}
//                           </p>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline">{product.category}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         ৳{product.costPrice.toLocaleString()}
//                       </TableCell>
//                       <TableCell>
//                         ৳{product.sellingPrice.toLocaleString()}
//                       </TableCell>
//                       <TableCell>
//                         <div>
//                           <p>{product.currentStock}</p>
//                           <p className="text-xs text-muted-foreground">
//                             Min: {product.minimumStock}
//                           </p>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={getStatusColor(status)}>
//                           {status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleViewDetails(product)}
//                           >
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleEdit(product)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Edit Product Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <ProductForm onSubmit={() => setIsEditDialogOpen(false)} />
//         </DialogContent>
//       </Dialog>

//       {/* Product Detail Dialog */}
//       {selectedProduct && (
//         <ProductDetailModal
//           product={selectedProduct}
//           isOpen={isDetailDialogOpen}
//           onClose={() => setIsDetailDialogOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default InventoryManagement;

/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductForm from "@/components/dashboard/forms/ProductForm";
import ProductDetailModal from "@/components/dashboard/modals/ProductDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/inventory/inventoryApi";
import { AlertTriangle, Edit, Eye, Package, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const InventoryManagement = () => {
  const { user } = useAuth();
  const { data: productsData, isLoading } = useGetProductsQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const products = productsData || [];

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

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };

  const handleUpdateProduct = async (data: any) => {
    if (!selectedProduct) return;

    try {
      await updateProduct({ id: selectedProduct._id, ...data }).unwrap();
      toast.success("Product updated successfully.");
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const getStockStatus = (quantity: number, minimum: number) => {
    if (quantity <= minimum) return "critical";
    if (quantity <= minimum * 1.5) return "low";
    return "good";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive/10 text-destructive";
      case "low":
        return "bg-warning/10 text-warning";
      default:
        return "bg-success/10 text-success";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage products and stock levels
          </p>
        </div>

        {(user?.role === "admin" || user?.role === "staff") && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <ProductForm
                onSubmit={() => setIsAddDialogOpen(false)}
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product: any) => {
                  const status = getStockStatus(
                    product.quantity,
                    product.minimumStock
                  );
                  return (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(product.costPrice)}</TableCell>
                      <TableCell>
                        {formatCurrency(product.sellingPrice)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{product.quantity}</p>
                          <p className="text-xs text-muted-foreground">
                            Min: {product.minimumStock}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {(user?.role === "admin" ||
                            user?.role === "staff") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <ProductForm
              initialData={selectedProduct}
              onSubmit={handleUpdateProduct}
              isAdd={false}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
