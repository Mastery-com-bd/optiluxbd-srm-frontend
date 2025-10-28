"use client";
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
import { useAuth } from "@/hooks/useAuth";
import {
  Clock,
  DollarSign,
  Download,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
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

import { Skeleton } from "@/components/ui/skeleton";

import { useGetSupplierPaymentsQuery } from "@/redux/features/supplier/supplierApi";
import { toast } from "sonner";

const MyPayments = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const supplierId = user?._id;

  // ✅ Fetch supplier payments only
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useGetSupplierPaymentsQuery(supplierId, { skip: !supplierId });

  if (isLoading)
    return (
      <div className="p-10 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );

  if (isError) {
    toast.error("Failed to load payment data");
    return <div className="text-center py-10 text-red-500">Error loading payments</div>;
  }

  // ✅ Filter search
  const filteredPayments = payments.filter(
    (payment: any) =>
      payment._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Calculate stats
  const totalPaid = payments
    .filter((p: any) => p.status === "completed")
    .reduce((sum: number, p: any) => sum + (p.paidAmount || 0), 0);

  const totalDue = payments.reduce(
    (sum: number, p: any) => sum + (p.dueAmount || 0),
    0
  );

  const pendingPayments = payments.filter(
    (p: any) => p.status === "pending"
  ).length;

  const totalSupplyValue = payments.reduce(
    (sum: number, p: any) => sum + (p.totalAmount || 0),
    0
  );

  // ✅ Payment trend chart (without useMemo)
  const paymentTrends: { month: string; paid: number; due: number }[] = [];
  if (Array.isArray(payments)) {
    payments.forEach((p: any) => {
      const month = new Date(p.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      const existing = paymentTrends.find((g) => g.month === month);
      if (existing) {
        existing.paid += p.paidAmount || 0;
        existing.due += p.dueAmount || 0;
      } else {
        paymentTrends.push({
          month,
          paid: p.paidAmount || 0,
          due: p.dueAmount || 0,
        });
      }
    });
  }
  const last6MonthsTrends = paymentTrends.slice(-6);

  // ✅ Payment status chart data
  const statusData = [
    {
      name: "Completed",
      value: payments.filter((p: any) => p.status === "completed").length,
      color: "hsl(var(--success))",
    },
    {
      name: "Pending",
      value: payments.filter((p: any) => p.status === "pending").length,
      color: "hsl(var(--warning))",
    },
    {
      name: "Partial",
      value: payments.filter((p: any) => p.status === "partial").length,
      color: "hsl(var(--destructive))",
    },
  ].filter((item) => item.value > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "partial":
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Paid"
          value={`৳${totalPaid.toLocaleString()}`}
          change={`${payments.filter((p: any) => p.status === "completed").length} payments`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Amount Due"
          value={`৳${totalDue.toLocaleString()}`}
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
          value={
            totalSupplyValue > 0
              ? `${((totalPaid / totalSupplyValue) * 100).toFixed(1)}%`
              : "0%"
          }
          change="Of total supplies"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
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
                <LineChart data={last6MonthsTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
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

        {/* Payment Status */}
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
              {statusData.map((entry) => (
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
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment: any) => (
                  <TableRow key={payment._id}>
                    <TableCell>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>৳{payment.totalAmount?.toLocaleString()}</TableCell>
                    <TableCell className="text-success font-medium">
                      ৳{payment.paidAmount?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-warning font-medium">
                      ৳{payment.dueAmount?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
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
