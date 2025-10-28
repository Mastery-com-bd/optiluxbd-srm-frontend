// /* eslint-disable @typescript-eslint/no-explicit-any */
// import StatsCard from "@/components/dashboard/StatsCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { chartData, mockReportsData } from "@/data/mockData";
// import {
//   AlertTriangle,
//   BarChart3,
//   DollarSign,
//   Package,
//   ShoppingCart,
//   TrendingUp,
//   UserCheck,
//   Users,
// } from "lucide-react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold text-foreground">
//             Admin Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Welcome back! Here's an overview of your business performance.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatsCard
//             title="Total Suppliers"
//             value="24"
//             change="+2 this month"
//             changeType="positive"
//             icon={Users}
//           />
//           <StatsCard
//             title="Monthly Supply"
//             value={`৳${(
//               mockReportsData.monthlySupply.totalAmount / 100000
//             ).toFixed(1)}L`}
//             change="+12% from last month"
//             changeType="positive"
//             icon={TrendingUp}
//           />
//           <StatsCard
//             title="Total Products"
//             value={mockReportsData.stockCount.totalProducts}
//             change="+5 new products"
//             changeType="positive"
//             icon={Package}
//           />
//           <StatsCard
//             title="Due Payments"
//             value={`৳${(mockReportsData.paymentsDue.totalDue / 100000).toFixed(
//               1
//             )}L`}
//             change="8 pending payments"
//             changeType="negative"
//             icon={DollarSign}
//           />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <BarChart3 className="h-5 w-5" />
//                 <span>Monthly Supply Trends</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData.monthlySupply}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip
//                     formatter={(value: any) => [
//                       `৳${(value / 100000).toFixed(1)}L`,
//                       "Amount",
//                     ]}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="amount"
//                     stroke="var(--primary)"
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <DollarSign className="h-5 w-5" />
//                 <span>Payment Trends</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData.paymentTrends}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip
//                     formatter={(value: any) => [
//                       `৳${(value / 1000).toFixed(0)}K`,
//                     ]}
//                   />
//                   <Bar dataKey="paid" fill="var(--success)" />
//                   <Bar dataKey="due" fill="var(--warning)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Actions & Alerts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-warning" />
//                 <span>Low Stock Alert</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">MacBook Air M3</span>
//                   <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
//                     8 left
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Samsung Galaxy S24</span>
//                   <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
//                     15 left
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">iPhone 15 Pro</span>
//                   <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
//                     25 left
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <UserCheck className="h-5 w-5 text-primary" />
//                 <span>Recent Activities</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 text-sm">
//                 <div>New supplier registration - ABC Electronics</div>
//                 <div>Payment processed - ৳5.35L to Supplier #2</div>
//                 <div>Product return processed - iPhone 15 Pro (2 units)</div>
//                 <div>Stock updated - Samsung Galaxy S24</div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <ShoppingCart className="h-5 w-5 text-accent" />
//                 <span>Today's Summary</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     New Supplies
//                   </span>
//                   <span className="font-semibold">
//                     {mockReportsData.todaySupply.supplies}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Products Added
//                   </span>
//                   <span className="font-semibold">
//                     {mockReportsData.todaySupply.totalProducts}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Total Value
//                   </span>
//                   <span className="font-semibold">
//                     ৳
//                     {(mockReportsData.todaySupply.totalAmount / 100000).toFixed(
//                       1
//                     )}
//                     L
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Returns Processed
//                   </span>
//                   <span className="font-semibold">
//                     {mockReportsData.returnsCount.processedReturns}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDashboardOverviewQuery,
  useMonthlySupplyTrendsQuery,
  usePaymentTrendsQuery,
  useReturnsCountQuery,
  useStockCountQuery,
  useTodaySupplymentQuery,
  useTotalPaymentsDueQuery,
} from "@/redux/features/reports/reportsApi";
import {
  AlertTriangle,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
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

const AdminDashboard = () => {
  // Real data queries
  const { data: todaySupplyData } = useTodaySupplymentQuery(undefined);
  const { data: paymentsDueData } = useTotalPaymentsDueQuery(undefined);
  const { data: stockCountData } = useStockCountQuery(undefined);
  const { data: returnsCountData } = useReturnsCountQuery(undefined);
  const { data: monthlyTrendsData } = useMonthlySupplyTrendsQuery(undefined);
  const { data: paymentTrendsData } = usePaymentTrendsQuery(undefined);
  const { data: dashboardOverviewData } = useDashboardOverviewQuery(undefined);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatShortCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(1)}K`;
    }
    return formatCurrency(amount);
  };

  // Transform chart data for consistent format
  const monthlySupplyChartData =
    monthlyTrendsData?.map((item: any) => ({
      month: item.month,
      amount: item.amount,
      products: item.products,
    })) || [];

  const paymentTrendsChartData =
    paymentTrendsData?.map((item: any) => ({
      month: item.month,
      paid: item.paid,
      due: item.due,
    })) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Suppliers"
            value={dashboardOverviewData?.suppliersCount || 0}
            change="Active suppliers"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Monthly Supply"
            value={formatShortCurrency(
              monthlyTrendsData?.[monthlyTrendsData.length - 1]?.amount || 0
            )}
            change="Current month"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Total Products"
            value={stockCountData?.totalProducts || 0}
            change={`${stockCountData?.lowStockProducts || 0} low stock`}
            changeType={
              stockCountData?.lowStockProducts > 0 ? "negative" : "positive"
            }
            icon={Package}
          />
          <StatsCard
            title="Due Payments"
            value={formatShortCurrency(paymentsDueData?.totalDue || 0)}
            change={`${paymentsDueData?.pendingPayments || 0} pending`}
            changeType="negative"
            icon={DollarSign}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Monthly Supply Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlySupplyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlySupplyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any) => [
                        formatCurrency(Number(value)),
                        "Amount",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No supply data available for the last 6 months
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payment Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentTrendsChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentTrendsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any) => [
                        formatCurrency(Number(value)),
                      ]}
                    />
                    <Bar dataKey="paid" fill="var(--success)" name="Paid" />
                    <Bar dataKey="due" fill="var(--warning)" name="Due" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No payment data available for the last 6 months
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Low Stock Alert</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardOverviewData?.lowStockItems?.length > 0 ? (
                <div className="space-y-3">
                  {dashboardOverviewData.lowStockItems
                    .slice(0, 5)
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm truncate max-w-[150px]">
                          {item.name}
                        </span>
                        <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                          {item.quantity} left
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  No low stock items
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardOverviewData?.recentActivities?.length > 0 ? (
                <div className="space-y-3 text-sm">
                  {dashboardOverviewData.recentActivities
                    .slice(0, 5)
                    .map((activity: any, index: number) => (
                      <div key={index} className="truncate">
                        Supply from{" "}
                        {activity.supplier?.profile?.name || "Unknown"} -{" "}
                        {formatCurrency(activity.totalAmount)}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  No recent activities
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-accent" />
                <span>Today's Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    New Supplies
                  </span>
                  <span className="font-semibold">
                    {todaySupplyData?.supplies || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Products Added
                  </span>
                  <span className="font-semibold">
                    {todaySupplyData?.totalProducts || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Value
                  </span>
                  <span className="font-semibold">
                    {formatShortCurrency(todaySupplyData?.totalAmount || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Returns Processed
                  </span>
                  <span className="font-semibold">
                    {returnsCountData?.processedReturns || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
