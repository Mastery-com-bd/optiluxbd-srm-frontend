import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartData, mockReportsData } from "@/data/mockData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReportsPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive business insights and analytics
        </p>
      </div>

      {/* Supply Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Today's Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReportsData.todaySupply.totalProducts}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount: {formatCurrency(mockReportsData.todaySupply.totalAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReportsData.weeklySupply.totalProducts}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount: {formatCurrency(mockReportsData.weeklySupply.totalAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReportsData.monthlySupply.totalProducts}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount:{" "}
              {formatCurrency(mockReportsData.monthlySupply.totalAmount)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Supply Trend</CardTitle>
            <CardDescription>
              Supply amount and product count over months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.monthlySupply}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "amount" ? formatCurrency(Number(value)) : value,
                    name === "amount" ? "Amount" : "Products",
                  ]}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Trends</CardTitle>
            <CardDescription>Paid vs Due amounts over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.paymentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="paid"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="due"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Due:</span>
              <span className="font-medium text-red-600">
                {formatCurrency(mockReportsData.paymentsDue.totalDue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(mockReportsData.paymentsDue.totalPaid)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pending Payments:</span>
              <span className="font-medium">
                {mockReportsData.paymentsDue.pendingPayments}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory & Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Products:</span>
              <span className="font-medium">
                {mockReportsData.stockCount.totalProducts}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Low Stock Items:</span>
              <span className="font-medium text-yellow-600">
                {mockReportsData.stockCount.lowStockProducts}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Returns:</span>
              <span className="font-medium">
                {mockReportsData.returnsCount.totalReturns}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
