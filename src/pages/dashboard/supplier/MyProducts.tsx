import StatsCard from "@/components/dashboard/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProducts, mockSupplies } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { Minus, Package, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

const MyProducts = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products for current supplier
  const mySupplies = mockSupplies.filter(
    (supply) => supply.supplierId === user?._id
  );
  const myProductIds = [
    ...new Set(mySupplies.map((supply) => supply.productId)),
  ];
  const myProducts = mockProducts.filter((product) =>
    myProductIds.includes(product.id)
  );

  const filteredProducts = myProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalProducts = myProducts.length;
  const totalValue = myProducts.reduce(
    (sum, product) => sum + product.sellingPrice * product.currentStock,
    0
  );
  const lowStockCount = myProducts.filter(
    (product) => product.currentStock <= product.minimumStock
  ).length;

  const getProductStats = (productId: string) => {
    const productSupplies = mySupplies.filter(
      (supply) => supply.productId === productId
    );
    const totalSupplied = productSupplies.reduce(
      (sum, supply) => sum + supply.quantity,
      0
    );
    const totalEarnings = productSupplies.reduce(
      (sum, supply) => sum + supply.totalAmount,
      0
    );
    const avgCommission =
      productSupplies.length > 0
        ? productSupplies.reduce(
            (sum, supply) => sum + supply.commissionRate,
            0
          ) / productSupplies.length
        : 0;

    return { totalSupplied, totalEarnings, avgCommission };
  };

  const getStockTrend = (currentStock: number, minimumStock: number) => {
    if (currentStock > minimumStock * 2) return "high";
    if (currentStock > minimumStock) return "medium";
    return "low";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "high":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "low":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-warning" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "high":
        return "bg-success/10 text-success";
      case "low":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-warning/10 text-warning";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Products</h1>
        <p className="text-muted-foreground">
          View your supplied products and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          change={`${mySupplies.length} supplies made`}
          changeType="neutral"
          icon={Package}
        />
        <StatsCard
          title="Portfolio Value"
          value={`৳${(totalValue / 100000).toFixed(1)}L`}
          change="Current market value"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockCount}
          change={lowStockCount > 0 ? "Needs attention" : "All good"}
          changeType={lowStockCount > 0 ? "negative" : "positive"}
          icon={TrendingDown}
        />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Total Supplied</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Avg Commission</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stats = getProductStats(product.id);
                  const trend = getStockTrend(
                    product.currentStock,
                    product.minimumStock
                  );

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-40">
                            {product.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        ৳{product.sellingPrice.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.currentStock}</p>
                          <p className="text-xs text-muted-foreground">
                            Min: {product.minimumStock}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {stats.totalSupplied}
                      </TableCell>
                      <TableCell className="font-medium text-success">
                        ৳{stats.totalEarnings.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {stats.avgCommission.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(trend)}
                          <Badge className={getTrendColor(trend)}>
                            {trend}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProducts;
