/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCard from "@/components/dashboard/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { mockPayments, mockSupplies } from "@/data/mockData";
import { type RootState } from "@/redux/store";
import {
  Calendar,
  Clock,
  DollarSign,
  Download,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MyPayments = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter payments for current supplier
  const myPayments = mockPayments.filter(
    (payment) => payment.supplierId === user?._id
  );
  const mySupplies = mockSupplies.filter(
    (supply) => supply.supplierId === user?._id
  );

  const filteredPayments = myPayments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalPaid = myPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.paidAmount, 0);
  const totalDue = myPayments.reduce(
    (sum, payment) => sum + payment.dueAmount,
    0
  );
  const pendingPayments = myPayments.filter(
    (payment) => payment.status === "pending"
  ).length;
  const totalSupplyValue = mySupplies.reduce(
    (sum, supply) => sum + supply.totalAmount,
    0
  );

  // Chart data for payment trends
  const paymentTrends = myPayments
    .reduce((acc: any[], payment) => {
      const month = new Date(payment.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      const existing = acc.find((item) => item.month === month);

      if (existing) {
        existing.paid += payment.paidAmount;
        existing.due += payment.dueAmount;
      } else {
        acc.push({
          month,
          paid: payment.paidAmount,
          due: payment.dueAmount,
        });
      }

      return acc;
    }, [])
    .slice(-6);

  // Payment status distribution
  const statusData = [
    {
      name: "Completed",
      value: myPayments.filter((p) => p.status === "completed").length,
      color: "hsl(var(--success))",
    },
    {
      name: "Pending",
      value: myPayments.filter((p) => p.status === "pending").length,
      color: "hsl(var(--warning))",
    },
    {
      name: "Partial",
      value: myPayments.filter((p) => p.status === "partial").length,
      color: "hsl(var(--destructive))",
    },
  ].filter((item) => item.value > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "overdue":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Payments</h1>
          <p className="text-muted-foreground">
            Track your payment history and earnings
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Paid"
          value={`৳${(totalPaid / 100000).toFixed(1)}L`}
          change={`${
            myPayments.filter((p) => p.status === "completed").length
          } payments`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Amount Due"
          value={`৳${(totalDue / 100000).toFixed(1)}L`}
          change="Outstanding balance"
          changeType={totalDue > 0 ? "negative" : "positive"}
          icon={Clock}
        />
        <StatsCard
          title="Pending Payments"
          value={pendingPayments}
          change="Awaiting processing"
          changeType={pendingPayments > 0 ? "negative" : "positive"}
          icon={Clock}
        />
        <StatsCard
          title="Payment Rate"
          value={`${((totalPaid / totalSupplyValue) * 100).toFixed(1)}%`}
          change="Of total supplies"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Payment Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paymentTrends}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
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
                    dataKey="paid"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    name="Paid"
                  />
                  <Line
                    type="monotone"
                    dataKey="due"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    name="Due"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {statusData.map((entry, _index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">
                      {payment.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-success">
                      ৳{payment.paidAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium text-warning">
                      ৳{payment.dueAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">12%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPayments;
