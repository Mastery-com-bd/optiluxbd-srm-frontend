/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Calendar, Clock, Package, Search, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MySupplies = () => {
  const { user } = useAuth();
  // const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter supplies for current supplier
  const mySupplies = mockSupplies.filter(
    (supply) => supply.supplierId === user?._id
  );

  const filteredSupplies = mySupplies.filter((supply) => {
    const product = mockProducts.find((p) => p.id === supply.productId);
    return (
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supply.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate stats
  const totalSupplies = mySupplies.length;
  const totalEarnings = mySupplies.reduce(
    (sum, supply) => sum + supply.totalAmount,
    0
  );
  const pendingSupplies = mySupplies.filter(
    (supply) => supply.status === "pending"
  ).length;
  const avgCommission =
    mySupplies.length > 0
      ? mySupplies.reduce((sum, supply) => sum + supply.commissionRate, 0) /
        mySupplies.length
      : 0;

  // Chart data - group by month
  const chartData = mySupplies
    .reduce((acc: any[], supply) => {
      const month = new Date(supply.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      const existing = acc.find((item) => item.month === month);

      if (existing) {
        existing.supplies += 1;
        existing.earnings += supply.totalAmount;
      } else {
        acc.push({
          month,
          supplies: 1,
          earnings: supply.totalAmount,
        });
      }

      return acc;
    }, [])
    .slice(-6); // Last 6 months

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const getProduct = (productId: string) => {
    return mockProducts.find((p) => p.id === productId);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Supplies</h1>
        <p className="text-muted-foreground">
          Track your supply history and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Supplies"
          value={totalSupplies}
          change="All time"
          changeType="neutral"
          icon={Package}
        />
        <StatsCard
          title="Total Earnings"
          value={`৳${(totalEarnings / 100000).toFixed(1)}L`}
          change={`Avg: ৳${Math.round(
            totalEarnings / totalSupplies
          ).toLocaleString()}`}
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pending Supplies"
          value={pendingSupplies}
          change="Awaiting approval"
          changeType={pendingSupplies > 0 ? "negative" : "positive"}
          icon={Clock}
        />
        <StatsCard
          title="Avg Commission"
          value={`${avgCommission.toFixed(1)}%`}
          change="Current rate"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Supply Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Supply Trends (Last 6 Months)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="supplies"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Supplies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supply History ({filteredSupplies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSupplies.map((supply) => {
                  const product = getProduct(supply.productId);

                  return (
                    <TableRow key={supply.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(supply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {product?.name || "Unknown Product"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {product?.category}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {supply.quantity}
                      </TableCell>
                      <TableCell>
                        ৳
                        {Math.round(
                          supply.totalAmount / supply.quantity
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        ৳{supply.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium text-success">
                            {supply.commissionRate}%
                          </span>
                          <p className="text-xs text-muted-foreground">
                            ৳
                            {Math.round(
                              (supply.totalAmount * supply.commissionRate) / 100
                            ).toLocaleString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(supply.status)}>
                          {supply.status}
                        </Badge>
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

export default MySupplies;
