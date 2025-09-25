/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPayments, mockProducts, mockSupplies } from "@/data/mockData";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SupplierDashboard = () => {
  const supplierSupplies = mockSupplies.filter(
    (supply) => supply.supplierId === "2"
  );
  const supplierPayments = mockPayments.filter(
    (payment) => payment.supplierId === "2"
  );
  const supplierProducts = mockProducts.filter(
    (product) => product.supplierId === "2"
  );

  const totalEarned = supplierPayments.reduce(
    (sum, payment) => sum + payment.paidAmount,
    0
  );
  const totalDue = supplierPayments.reduce(
    (sum, payment) => sum + payment.dueAmount,
    0
  );

  const monthlyData = [
    { month: "Jan", supplies: 12, earnings: 450000 },
    { month: "Feb", supplies: 15, earnings: 580000 },
    { month: "Mar", supplies: 18, earnings: 720000 },
    { month: "Apr", supplies: 14, earnings: 535000 },
    { month: "May", supplies: 20, earnings: 785000 },
    { month: "Jun", supplies: 16, earnings: 620000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Supplier Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your supplies, payments, and business performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Earnings"
            value={`৳${(totalEarned / 100000).toFixed(1)}L`}
            change="+15% this month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatsCard
            title="Pending Payments"
            value={`৳${(totalDue / 100000).toFixed(1)}L`}
            change="Due in 5 days"
            changeType="neutral"
            icon={Clock}
          />
          <StatsCard
            title="My Products"
            value={supplierProducts.length}
            change="All active"
            changeType="positive"
            icon={Package}
          />
          <StatsCard
            title="Commission Rate"
            value="12%"
            change="Average rate"
            changeType="neutral"
            icon={TrendingUp}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Earnings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => [
                      `৳${(value / 100000).toFixed(1)}L`,
                      "Earnings",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Supply Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="supplies"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Recent Supplies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierSupplies.map((supply) => {
                  const product = supplierProducts.find(
                    (p) => p.id === supply.productId
                  );
                  return (
                    <div
                      key={supply.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {product?.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {supply.quantity} | Commission:{" "}
                            {supply.commissionRate}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          ৳{(supply.commissionAmount / 100000).toFixed(1)}L
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full mt-1 ${
                            supply.status === "completed"
                              ? "bg-success/20 text-success"
                              : "bg-warning/20 text-warning"
                          }`}
                        >
                          {supply.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span>Payment History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-success/20 to-primary/20 rounded-lg flex items-center justify-center">
                        {payment.status === "completed" ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-warning" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          Payment #{payment.id}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {payment.paymentDate
                            ? new Date(payment.paymentDate).toLocaleDateString()
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-success">
                        ৳{(payment.paidAmount / 100000).toFixed(1)}L
                      </div>
                      {payment.dueAmount > 0 && (
                        <div className="text-sm text-warning">
                          Due: ৳{(payment.dueAmount / 100000).toFixed(1)}L
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Performance */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-accent" />
              <span>My Products Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supplierProducts.map((product) => (
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
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Stock:</span>
                      <span className="font-medium">
                        {product.currentStock}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Price:</span>
                      <span className="font-medium">
                        ৳{product.costPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selling Price:</span>
                      <span className="font-medium text-success">
                        ৳{product.sellingPrice.toLocaleString()}
                      </span>
                    </div>
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

export default SupplierDashboard;
