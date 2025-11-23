/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSuppliersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { z } from "zod";
import {  useGetSuppliersSupplyQuery } from "@/redux/features/supplier/supplierApi";

const paymentSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  supplies: z.array(z.string()).min(1, "At least one supply is required"),
  paidAmount: z.number().min(0, "Paid amount must be non-negative"),
  status: z.enum(["pending", "partial", "completed"]),
  paymentDate: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  onCancel?: () => void;
}

const PaymentForm = ({ onSubmit, onCancel }: PaymentFormProps) => {
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");

  const { data: usersData, isLoading: usersLoading } = useGetSuppliersQuery(undefined);


  const suppliers = usersData?.data || [];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      supplier: "",
      supplies: [],
      paidAmount: 0,
      status: "pending",
      paymentDate: new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
  });

  const selectedSupplier = watch("supplier");
  const selectedSupplies = watch("supplies");
  const paidAmount = watch("paidAmount");

  const filteredSuppliers = useMemo(() => {
    const keyword = supplierSearchTerm.toLowerCase();
    return suppliers.filter((supplier: any) => {
      const name = supplier?.profile?.name || supplier?.name || "";
      return name.toLowerCase().includes(keyword);
    });
  }, [supplierSearchTerm, suppliers]);

  const { data: suppliesData, isLoading: suppliesLoading } = useGetSuppliersSupplyQuery(selectedSupplier, {
    skip: !selectedSupplier
  });
  const supplies = suppliesData?.data || [];
  const calculateTotals = () => {
    const selectedSupplyObjects = supplies.filter((s: any) =>
      selectedSupplies.includes(s._id)
    );
    const totalAmount = selectedSupplyObjects.reduce((sum: number, s: any) => {
      const supplyAmount = s.totalAmount || s.amount || s.cost || 0;
      return sum + supplyAmount;
    }, 0);
    const commissionAmount = selectedSupplyObjects.reduce((sum: number, s: any) => {
      const commission =
        s.commissionAmount ||
        s.commission ||
        (s.totalAmount * (s.commissionRate || 0)) / 100 ||
        0;
      return sum + commission;
    }, 0);
    const dueAmount = Math.max(0, totalAmount + commissionAmount - paidAmount);
    return {
      totalAmount: Number(totalAmount.toFixed(2)),
      commissionAmount: Number(commissionAmount.toFixed(2)),
      dueAmount: Number(dueAmount.toFixed(2)),
    };
  };

  const { totalAmount, commissionAmount, dueAmount } = calculateTotals();

  const autoUpdateStatus = () => {
    if (paidAmount >= totalAmount - commissionAmount) {
      setValue("status", "completed");
    } else if (paidAmount > 0) {
      setValue("status", "partial");
    } else {
      setValue("status", "pending");
    }
  };

  const onFormSubmit = async (data: PaymentFormData) => {
    try {
      const submissionData = {
        ...data,
        totalAmount,
        commissionAmount,
        dueAmount,
      };
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const getSupplierDetails = (supplierId: string) => {
    return suppliers.find((s: any) => s._id === supplierId);
  };

  const currentSupplier = getSupplierDetails(selectedSupplier);

  if (usersLoading || suppliesLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Supplier Selection with Search */}
      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier *</Label>
        <Controller
          name="supplier"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("supplies", []);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent className="dark:bg-muted">
                <div className="px-2 py-2 sticky top-0 z-10 bg-white dark:bg-muted border-b">
                  <Input
                    placeholder="Search supplier..."
                    value={supplierSearchTerm}
                    onChange={(e) => setSupplierSearchTerm(e.target.value)}
                    className="h-8"
                  />
                </div>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier: any) => (
                    <SelectItem
                      key={supplier._id}
                      value={supplier._id}
                      className="dark:text-white dark:hover:bg-muted-foreground/10"
                    >
                      <div className="flex flex-col">
                        <span>
                          {supplier.profile?.name || supplier.name || "Unknown"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {supplier.email || supplier.profile?.email || ""}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-3 text-sm text-muted-foreground text-center">
                    No suppliers found
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.supplier && (
          <p className="text-sm text-destructive">{errors.supplier.message}</p>
        )}
      </div>

      {/* Supplier Info */}
      {currentSupplier && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-md">
          <h4 className="font-medium text-sm text-blue-800 dark:text-blue-100">
            Supplier Information
          </h4>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs dark:text-blue-100">
            <div><span className="text-blue-600 dark:text-blue-300">Name:</span> {currentSupplier.profile?.name || currentSupplier.name || "N/A"}</div>
            <div><span className="text-blue-600 dark:text-blue-300">Email:</span> {currentSupplier.email || currentSupplier.profile?.email || "N/A"}</div>
            <div><span className="text-blue-600 dark:text-blue-300">Phone:</span> {currentSupplier.profile?.phone || currentSupplier.phone || "N/A"}</div>
            <div><span className="text-blue-600 dark:text-blue-300">Available Supplies:</span> {supplies.length}</div>
          </div>
        </div>
      )}

      {/* Supplies */}
      {selectedSupplier && supplies.length > 0 && (
        <div className="space-y-3">
          <Label>Select Supplies *</Label>
          <div className="max-h-48 overflow-y-auto border rounded-md p-3 bg-muted/20 dark:bg-muted/40">
            <Controller
              name="supplies"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {supplies.map((supply: any) => (
                    <div key={supply._id} className="flex items-start space-x-3 p-2 rounded-md border bg-white dark:bg-muted">
                      <input
                        type="checkbox"
                        id={supply._id}
                        checked={field.value.includes(supply._id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...field.value, supply._id]
                            : field.value.filter((id: string) => id !== supply._id);
                          field.onChange(updated);
                          autoUpdateStatus();
                        }}
                        className="mt-1"
                      />
                      <label htmlFor={supply._id} className="flex-1 text-sm cursor-pointer dark:text-white">
                        <div className="font-medium">{supply.title || `Supply #${supply._id.slice(-6)}`}</div>
                        <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
                          <span>Total: ৳{(supply.totalAmount || supply.amount || 0).toLocaleString()}</span>
                          <span>Commission: ৳{(supply.commissionAmount || 0).toLocaleString()}</span>
                          <span>Products: {supply.products?.length || 0}</span>
                          <span>Status: {supply.status || "unknown"}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
          {errors.supplies && (
            <p className="text-sm text-destructive">{errors.supplies.message}</p>
          )}
        </div>
      )}
      {selectedSupplier && supplies.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 dark:bg-yellow-950 dark:border-yellow-700 rounded-md text-yellow-800 dark:text-yellow-300">
          No supplies found for selected supplier
        </div>
      )}

      {/* Payment Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Paid Amount *</Label>
          <Controller
            name="paidAmount"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                min="0"
                value={field.value}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                  autoUpdateStatus();
                }}
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label>Status *</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Payment Date */}
      <div className="space-y-2">
        <Label>Payment Date</Label>
        <Controller
          name="paymentDate"
          control={control}
          render={({ field }) => (
            <Input type="date" value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      {/* Summary */}
      {selectedSupplies.length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-3 border dark:bg-muted">
          <h4 className="font-medium text-lg dark:text-white">Payment Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm dark:text-white">
            <div className="flex justify-between"><span>Total Amount:</span><span>৳{totalAmount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Commission:</span><span>৳{commissionAmount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Payable Amount:</span><span>৳{(totalAmount + commissionAmount).toLocaleString()}</span></div>
            <div className="flex justify-between text-green-600 dark:text-green-400"><span>Paid Amount:</span><span>৳{paidAmount.toLocaleString()}</span></div>
            <div className={`flex justify-between font-medium border-t pt-2 col-span-2 ${dueAmount > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
              <span>Due Amount:</span><span>৳{dueAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || selectedSupplies.length === 0 || !isValid}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : (
            "Add Payment"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;