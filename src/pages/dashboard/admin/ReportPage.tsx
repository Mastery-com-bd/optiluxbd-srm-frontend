/* eslint-disable @typescript-eslint/no-explicit-any */
// import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { chartData, mockReportsData } from "@/data/mockData";
// import Cookies from "js-cookie";
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

// const ReportsPage = () => {
//   // const { user } = useAuth();

//   const userRole = Cookies.get("role");

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   if (userRole !== "admin") {
//     return <PreventAccessRoutes />;
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold">Reports & Analytics</h1>
//         <p className="text-muted-foreground">
//           Comprehensive business insights and analytics
//         </p>
//       </div>

//       {/* Supply Reports */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Today's Supply</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {mockReportsData.todaySupply.totalProducts}
//             </div>
//             <p className="text-muted-foreground">Products supplied</p>
//             <div className="text-sm text-muted-foreground mt-2">
//               Amount: {formatCurrency(mockReportsData.todaySupply.totalAmount)}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Weekly Supply</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {mockReportsData.weeklySupply.totalProducts}
//             </div>
//             <p className="text-muted-foreground">Products supplied</p>
//             <div className="text-sm text-muted-foreground mt-2">
//               Amount: {formatCurrency(mockReportsData.weeklySupply.totalAmount)}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Supply</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {mockReportsData.monthlySupply.totalProducts}
//             </div>
//             <p className="text-muted-foreground">Products supplied</p>
//             <div className="text-sm text-muted-foreground mt-2">
//               Amount:{" "}
//               {formatCurrency(mockReportsData.monthlySupply.totalAmount)}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Supply Trend</CardTitle>
//             <CardDescription>
//               Supply amount and product count over months
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={chartData.monthlySupply}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value, name) => [
//                     name === "amount" ? formatCurrency(Number(value)) : value,
//                     name === "amount" ? "Amount" : "Products",
//                   ]}
//                 />
//                 <Bar dataKey="amount" fill="var(--primary)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Trends</CardTitle>
//             <CardDescription>Paid vs Due amounts over time</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={chartData.paymentTrends}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => formatCurrency(Number(value))} />
//                 <Line
//                   type="monotone"
//                   dataKey="paid"
//                   stroke="var(--primary)"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="due"
//                   stroke="var(--destructive)"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Additional Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Summary</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span>Total Due:</span>
//               <span className="font-medium text-red-600">
//                 {formatCurrency(mockReportsData.paymentsDue.totalDue)}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Total Paid:</span>
//               <span className="font-medium text-green-600">
//                 {formatCurrency(mockReportsData.paymentsDue.totalPaid)}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Pending Payments:</span>
//               <span className="font-medium">
//                 {mockReportsData.paymentsDue.pendingPayments}
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Inventory & Returns</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span>Total Products:</span>
//               <span className="font-medium">
//                 {mockReportsData.stockCount.totalProducts}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Low Stock Items:</span>
//               <span className="font-medium text-yellow-600">
//                 {mockReportsData.stockCount.lowStockProducts}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Total Returns:</span>
//               <span className="font-medium">
//                 {mockReportsData.returnsCount.totalReturns}
//               </span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ReportsPage;

import PreventAccessRoutes from "@/components/common/PreventAccessRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useMonthlySupplymentQuery,
  useMonthlySupplyTrendsQuery,
  usePaymentTrendsQuery,
  useReturnsCountQuery,
  useStockCountQuery,
  useTodaySupplymentQuery,
  useTotalPaymentsDueQuery,
  useWeeklySupplymentQuery,
} from "@/redux/features/reports/reportsApi";
import Cookies from "js-cookie";
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
  const userRole = Cookies.get("role");

  // Real data queries
  const { data: todaySupplyData, isLoading: todayLoading } =
    useTodaySupplymentQuery(undefined);
  const { data: weeklySupplyData, isLoading: weeklyLoading } =
    useWeeklySupplymentQuery(undefined);
  const { data: monthlySupplyData, isLoading: monthlyLoading } =
    useMonthlySupplymentQuery(undefined);
  const { data: paymentsDueData, isLoading: paymentsLoading } =
    useTotalPaymentsDueQuery(undefined);
  const { data: stockCountData, isLoading: stockLoading } =
    useStockCountQuery(undefined);
  const { data: returnsCountData, isLoading: returnsLoading } =
    useReturnsCountQuery(undefined);
  const { data: monthlyTrendsData, isLoading: trendsLoading } =
    useMonthlySupplyTrendsQuery(undefined);
  const { data: paymentTrendsData, isLoading: paymentTrendsLoading } =
    usePaymentTrendsQuery(undefined);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Transform chart data
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

  const isLoading =
    todayLoading ||
    weeklyLoading ||
    monthlyLoading ||
    paymentsLoading ||
    stockLoading ||
    returnsLoading ||
    trendsLoading ||
    paymentTrendsLoading;

  if (userRole !== "admin") {
    return <PreventAccessRoutes />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

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
              {todaySupplyData?.totalProducts || 0}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount: {formatCurrency(todaySupplyData?.totalAmount || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Supplies: {todaySupplyData?.supplies || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklySupplyData?.totalProducts || 0}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount: {formatCurrency(weeklySupplyData?.totalAmount || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Supplies: {weeklySupplyData?.supplies || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlySupplyData?.totalProducts || 0}
            </div>
            <p className="text-muted-foreground">Products supplied</p>
            <div className="text-sm text-muted-foreground mt-2">
              Amount: {formatCurrency(monthlySupplyData?.totalAmount || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Supplies: {monthlySupplyData?.supplies || 0}
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
            {monthlySupplyChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySupplyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "amount" ? formatCurrency(Number(value)) : value,
                      name === "amount" ? "Amount" : "Products",
                    ]}
                  />
                  <Bar dataKey="amount" fill="var(--primary)" name="Amount" />
                  <Bar
                    dataKey="products"
                    fill="var(--secondary)"
                    name="Products"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No supply trend data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Trends</CardTitle>
            <CardDescription>Paid vs Due amounts over time</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentTrendsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentTrendsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Line
                    type="monotone"
                    dataKey="paid"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    name="Paid"
                  />
                  <Line
                    type="monotone"
                    dataKey="due"
                    stroke="var(--destructive)"
                    strokeWidth={2}
                    name="Due"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No payment trend data available
              </div>
            )}
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
                {formatCurrency(paymentsDueData?.totalDue || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(paymentsDueData?.totalPaid || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pending Payments:</span>
              <span className="font-medium">
                {paymentsDueData?.pendingPayments || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Commission Earned:</span>
              <span className="font-medium text-blue-600">
                {formatCurrency(
                  (paymentsDueData?.totalPaid || 0) * 0.1 // Assuming 10% commission
                )}
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
                {stockCountData?.totalProducts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Low Stock Items:</span>
              <span className="font-medium text-yellow-600">
                {stockCountData?.lowStockProducts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Inventory Value:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(stockCountData?.totalInventoryValue || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Returns:</span>
              <span className="font-medium">
                {returnsCountData?.totalReturns || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pending Returns:</span>
              <span className="font-medium text-orange-600">
                {returnsCountData?.pendingReturns || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
