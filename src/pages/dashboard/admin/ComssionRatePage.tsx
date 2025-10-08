/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CommissionRatePage = () => {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  // Mock update commission mutation - replace with your actual API
  const [updateCommission] = useState(
    () =>
      async ({ id, body }: { id: string; body: any }) => {
        // This is a mock function - replace with your actual mutation
        console.log("Updating commission:", id, body);
        return Promise.resolve();
      }
  );

  // Get only suppliers from users data
  const suppliers =
    usersData?.data?.filter((user: any) => user.role === "supplier") || [];

  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);

  const handleEditCommission = (supplierId: string, currentRate: number) => {
    setEditingSupplier(supplierId);
    setTempRate(currentRate);
  };

  const handleSaveCommission = async (supplierId: string) => {
    try {
      await updateCommission({
        id: supplierId,
        body: { commissionRate: tempRate },
      });
      setEditingSupplier(null);
      toast.success("The commission rate has been updated successfully.");
    } catch {
      toast.error("Failed to update commission rate.");
    }
  };

  const handleCancelEdit = () => {
    setEditingSupplier(null);
    setTempRate(0);
  };

  // Calculate statistics safely
  const calculateStats = () => {
    if (suppliers.length === 0) {
      return {
        averageRate: 0,
        minRate: 0,
        maxRate: 0,
      };
    }

    const rates = suppliers.map((s: any) => s.commissionRate || 12); // Default to 12% if not set
    const averageRate =
      rates.reduce((sum: number, rate: number) => sum + rate, 0) / rates.length;
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);

    return { averageRate, minRate, maxRate };
  };

  const { averageRate, minRate, maxRate } = calculateStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Commission Rate Management</h1>
          <p className="text-muted-foreground">
            Manage commission rates for all suppliers
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Settings</CardTitle>
          <CardDescription>
            Manage commission rates for all suppliers. These rates will be
            applied to new supplies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {suppliers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No suppliers found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Commission Rate (%)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier: any) => (
                  <TableRow key={supplier._id}>
                    <TableCell className="font-medium">
                      {supplier.profile?.name ||
                        supplier.name ||
                        "Unknown Supplier"}
                    </TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.profile?.phone || "N/A"}</TableCell>
                    <TableCell>
                      {editingSupplier === supplier._id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={tempRate}
                            onChange={(e) =>
                              setTempRate(parseFloat(e.target.value) || 0)
                            }
                            className="w-20"
                          />
                          <span>%</span>
                        </div>
                      ) : (
                        <span className="font-medium">
                          {supplier.commissionRate || 12}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingSupplier === supplier._id ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSaveCommission(supplier._id)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleEditCommission(
                              supplier._id,
                              supplier.commissionRate || 12
                            )
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{suppliers.length}</p>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{averageRate.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Average Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {minRate}% - {maxRate}%
              </p>
              <p className="text-sm text-muted-foreground">Rate Range</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• Commission rates are applied to new supply orders</p>
            <p>• Default commission rate is 12% if not specified</p>
            <p>• Rates can range from 0% to 100%</p>
            <p>• Changes take effect immediately for new supplies</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionRatePage;
