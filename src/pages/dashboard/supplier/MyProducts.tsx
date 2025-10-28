"use client";

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
import { useAuth } from "@/hooks/useAuth";
import { Minus, Package, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetSupplierProductsQuery } from "@/redux/features/supplier/supplierApi";

// ==================== Types ====================

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  sellingPrice: number;
  quantity: number;
  minimumStock: number;
  costPrice: number;
}

interface User {
  _id: string;
}

interface AuthState {
  user: User | null;
}

type StockTrend = "high" | "medium" | "low";

// ==================== Component ====================

const MyProducts = () => {
  const { user } = useAuth() as AuthState;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetSupplierProductsQuery(user?._id, {
    skip: !user?._id,
  });

  if (isLoading) {
    return (
      <div className="p-10 space-y-4">
        <Card className="h-10 w-48 animate-pulse" />
        <Card className="h-6 w-full animate-pulse" />
        <Card className="h-64 w-full animate-pulse" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load products");
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products
      </div>
    );
  }

  const filteredProducts: Product[] = products.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (product: Product) => product.quantity <= product.minimumStock
  ).length;

  const getStockTrend = (currentStock: number, minimumStock: number): StockTrend => {
    if (currentStock > minimumStock * 2) return "high";
    if (currentStock > minimumStock) return "medium";
    return "low";
  };

  const getTrendIcon = (trend: StockTrend) => {
    switch (trend) {
      case "high":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "low":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-warning" />;
    }
  };

  const getTrendColor = (trend: StockTrend): string => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          change={`${totalProducts} products`}
          changeType="neutral"
          icon={Package}
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
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product: Product) => {
                  const trend = getStockTrend(product.quantity, product.minimumStock);
                  return (
                    <TableRow key={product._id}>
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
                      <TableCell>৳{product.sellingPrice.toLocaleString()}</TableCell>
                      <TableCell>৳{product.costPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.quantity}</p>
                          <p className="text-xs text-muted-foreground">
                            Min: {product.minimumStock}
                          </p>
                        </div>
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