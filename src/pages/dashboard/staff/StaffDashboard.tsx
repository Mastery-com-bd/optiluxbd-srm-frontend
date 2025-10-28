/* eslint-disable @typescript-eslint/no-explicit-any */
// import StatsCard from "@/components/dashboard/StatsCard";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { mockProducts, mockReturns } from "@/data/mockData";
// import {
//   AlertTriangle,
//   Edit,
//   Eye,
//   Package,
//   Plus,
//   RotateCcw,
// } from "lucide-react";

// const StaffDashboard = () => {
//   const lowStockProducts = mockProducts.filter(
//     (product) => product.currentStock <= product.minimumStock
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold text-foreground">
//             Staff Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Manage inventory, handle returns, and monitor stock levels.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatsCard
//             title="Total Products"
//             value={mockProducts.length}
//             change="+2 added today"
//             changeType="positive"
//             icon={Package}
//           />
//           <StatsCard
//             title="Low Stock Items"
//             value={lowStockProducts.length}
//             change="Needs attention"
//             changeType="negative"
//             icon={AlertTriangle}
//           />
//           <StatsCard
//             title="Returns This Month"
//             value={mockReturns.length}
//             change="1 processed today"
//             changeType="neutral"
//             icon={RotateCcw}
//           />
//           <StatsCard
//             title="Total Stock Value"
//             value="৳85.2L"
//             change="+5% from last month"
//             changeType="positive"
//             icon={Package}
//           />
//         </div>

//         {/* Quick Actions */}
//         <Card className="dashboard-card">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button variant="gradient" className="h-20 flex-col space-y-2">
//                 <Plus className="h-6 w-6" />
//                 <span>Add New Product</span>
//               </Button>
//               <Button variant="outline" className="h-20 flex-col space-y-2">
//                 <RotateCcw className="h-6 w-6" />
//                 <span>Process Return</span>
//               </Button>
//               <Button variant="outline" className="h-20 flex-col space-y-2">
//                 <Eye className="h-6 w-6" />
//                 <span>View Inventory</span>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-warning" />
//                 <span>Low Stock Products</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {lowStockProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-r from-warning/20 to-danger/20 rounded-lg flex items-center justify-center">
//                         <Package className="h-6 w-6 text-warning" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-foreground">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           Current: {product.currentStock} | Min:{" "}
//                           {product.minimumStock}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button variant="outline" size="sm">
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button variant="success" size="sm">
//                         Restock
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <RotateCcw className="h-5 w-5 text-primary" />
//                 <span>Recent Returns</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {mockReturns.map((returnItem) => {
//                   const product = mockProducts.find(
//                     (p) => p.id === returnItem.productId
//                   );
//                   return (
//                     <div
//                       key={returnItem.id}
//                       className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
//                           <RotateCcw className="h-6 w-6 text-primary" />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-foreground">
//                             {product?.name || "Unknown Product"}
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             Quantity: {returnItem.quantity} | Reason:{" "}
//                             {returnItem.reason}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div
//                           className={`text-xs px-2 py-1 rounded-full ${
//                             returnItem.status === "processed"
//                               ? "bg-success/20 text-success"
//                               : "bg-warning/20 text-warning"
//                           }`}
//                         >
//                           {returnItem.status}
//                         </div>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           {new Date(returnItem.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Products */}
//         <Card className="dashboard-card">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Package className="h-5 w-5 text-primary" />
//               <span>Recent Products</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {mockProducts.slice(0, 3).map((product) => (
//                 <div
//                   key={product.id}
//                   className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center">
//                     <Package className="h-8 w-8 text-primary" />
//                   </div>
//                   <h3 className="font-medium text-foreground mb-1">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     {product.category}
//                   </p>
//                   <div className="flex justify-between text-sm">
//                     <span>Stock: {product.currentStock}</span>
//                     <span className="font-medium">
//                       ৳{product.sellingPrice.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;

import ProductForm from "@/components/dashboard/forms/ProductForm";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetProductsQuery } from "@/redux/features/inventory/inventoryApi";
import { useStockCountQuery } from "@/redux/features/reports/reportsApi";
import { useGetReturnsQuery } from "@/redux/features/returns/returnApi";
import { AlertTriangle, Eye, Package, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Real data queries
  const { data: productsData } = useGetProductsQuery(undefined);
  const { data: returnsData } = useGetReturnsQuery(undefined);
  const { data: stockCountData } = useStockCountQuery(undefined);

  console.log(stockCountData);

  const products = productsData || [];
  const returns = returnsData?.data || [];

  // Calculate low stock products
  const lowStockProducts = products.filter(
    (product: any) => product.quantity <= product.minimumStock
  );

  // const handleEdit = (product: any) => {
  //   setEditingProduct(product);
  // };
  // Calculate total stock value
  // const totalStockValue = products.reduce(
  //   (sum: number, product: any) => sum + product.quantity * product.costPrice,
  //   0
  // );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // const formatShortCurrency = (amount: number) => {
  //   if (amount >= 10000000) {
  //     return `৳${(amount / 10000000).toFixed(1)}Cr`;
  //   } else if (amount >= 100000) {
  //     return `৳${(amount / 100000).toFixed(1)}L`;
  //   } else if (amount >= 1000) {
  //     return `৳${(amount / 1000).toFixed(1)}K`;
  //   }
  //   return formatCurrency(amount);
  // };

  // Recent returns (last 30 days)
  const recentReturns = returns.filter((returnItem: any) => {
    const returnDate = new Date(returnItem.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return returnDate >= thirtyDaysAgo;
  });

  // Processed returns this month
  const processedReturnsThisMonth = returns.filter((returnItem: any) => {
    const returnDate = new Date(returnItem.createdAt);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    return returnDate >= thisMonth && returnItem.status === "completed";
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Staff Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage inventory, handle returns, and monitor stock levels.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Products"
            value={stockCountData?.totalProducts || 0}
            change={`${products.length} active`}
            changeType="positive"
            icon={Package}
          />
          <StatsCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            change="Needs attention"
            changeType={lowStockProducts.length > 0 ? "negative" : "positive"}
            icon={AlertTriangle}
          />
          <StatsCard
            title="Returns This Month"
            value={processedReturnsThisMonth.length}
            change={`${recentReturns.length} total`}
            changeType="neutral"
            icon={RotateCcw}
          />
          {/* <StatsCard
            title="Total Stock Value"
            value={formatShortCurrency(totalStockValue)}
            change="Inventory value"
            changeType="positive"
            icon={Package}
          /> */}
        </div>

        {/* Quick Actions */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="gradient"
                className="h-20 flex-col space-y-2"
                onClick={() => navigate("/dashboard/products-management")}
              >
                <Plus className="h-6 w-6" />
                <span>Add New Product</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => navigate("/dashboard/returns-management")}
              >
                <RotateCcw className="h-6 w-6" />
                <span>Process Return</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => navigate("/dashboard/products-management")}
              >
                <Eye className="h-6 w-6" />
                <span>View Inventory</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Low Stock Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.slice(0, 5).map((product: any) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-warning/20 to-danger/20 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Current: {product.quantity} | Min:{" "}
                          {product.minimumStock}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/dashboard/inventory/edit/${product._id}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button> */}
                      {/* <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          navigate(`/dashboard/inventory/edit/${product._id}`)
                        }
                      >
                        Restock
                      </Button> */}

                      <Dialog
                        open={isAddModalOpen}
                        onOpenChange={setIsAddModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="success" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Restock
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Update Product Stock</DialogTitle>
                          </DialogHeader>
                          <ProductForm
                            onSubmit={() => setIsAddModalOpen(false)}
                            isAdd={true}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
                {lowStockProducts.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No low stock items
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Recent Returns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {returns.slice(0, 5).map((returnItem: any) => {
                  const product = products.find(
                    (p: any) => p._id === returnItem.productId
                  );
                  return (
                    <div
                      key={returnItem._id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            returnItem.status === "completed"
                              ? "bg-success/20"
                              : returnItem.status === "processing"
                              ? "bg-warning/20"
                              : "bg-muted"
                          }`}
                        >
                          <RotateCcw className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {product?.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {returnItem.quantity} | Reason:{" "}
                            {returnItem.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            returnItem.status === "completed"
                              ? "bg-success/20 text-success"
                              : returnItem.status === "processing"
                              ? "bg-warning/20 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {returnItem.status}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(returnItem.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {returns.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No returns found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>Recent Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product: any) => (
                <div
                  key={product._id}
                  className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category || "Uncategorized"}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span
                      className={
                        product.quantity <= product.minimumStock
                          ? "text-warning"
                          : "text-success"
                      }
                    >
                      Stock: {product.quantity}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(product.sellingPrice)}
                    </span>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-8">
                  No products found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
