import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts, mockReturns } from "@/data/mockData";
import {
  AlertTriangle,
  Edit,
  Eye,
  Package,
  Plus,
  RotateCcw,
} from "lucide-react";

const StaffDashboard = () => {
  const lowStockProducts = mockProducts.filter(
    (product) => product.currentStock <= product.minimumStock
  );

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
            value={mockProducts.length}
            change="+2 added today"
            changeType="positive"
            icon={Package}
          />
          <StatsCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            change="Needs attention"
            changeType="negative"
            icon={AlertTriangle}
          />
          <StatsCard
            title="Returns This Month"
            value={mockReturns.length}
            change="1 processed today"
            changeType="neutral"
            icon={RotateCcw}
          />
          <StatsCard
            title="Total Stock Value"
            value="৳85.2L"
            change="+5% from last month"
            changeType="positive"
            icon={Package}
          />
        </div>

        {/* Quick Actions */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="gradient" className="h-20 flex-col space-y-2">
                <Plus className="h-6 w-6" />
                <span>Add New Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <RotateCcw className="h-6 w-6" />
                <span>Process Return</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
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
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
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
                          Current: {product.currentStock} | Min:{" "}
                          {product.minimumStock}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="success" size="sm">
                        Restock
                      </Button>
                    </div>
                  </div>
                ))}
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
                {mockReturns.map((returnItem) => {
                  const product = mockProducts.find(
                    (p) => p.id === returnItem.productId
                  );
                  return (
                    <div
                      key={returnItem.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
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
                            returnItem.status === "processed"
                              ? "bg-success/20 text-success"
                              : "bg-warning/20 text-warning"
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
              {mockProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Stock: {product.currentStock}</span>
                    <span className="font-medium">
                      ৳{product.sellingPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
