/* eslint-disable react-hooks/exhaustive-deps */
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
import { mockSupplies, mockUsers, type Payment } from "@/data/mockData";
import { useEffect, useState } from "react";

interface PaymentFormProps {
  initialData?: Payment;
  onSubmit: (data: Omit<Payment, "id" | "createdAt" | "updatedAt">) => void;
}

const PaymentForm = ({ initialData, onSubmit }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    supplierId: "",
    supplyIds: [] as string[],
    totalAmount: 0,
    commissionAmount: 0,
    dueAmount: 0,
    paidAmount: 0,
    status: "pending" as Payment["status"],
    paymentDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        supplierId: initialData.supplierId,
        supplyIds: initialData.supplyIds,
        totalAmount: initialData.totalAmount,
        commissionAmount: initialData.commissionAmount,
        dueAmount: initialData.dueAmount,
        paidAmount: initialData.paidAmount,
        status: initialData.status,
        paymentDate: initialData.paymentDate
          ? initialData.paymentDate.split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const suppliers = mockUsers.filter((user) => user.role === "supplier");
  const supplierSupplies = mockSupplies.filter(
    (s) => s.supplierId === formData.supplierId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      paymentDate: formData.paymentDate
        ? new Date(formData.paymentDate).toISOString()
        : undefined,
    });
  };

  const calculateTotals = () => {
    const selectedSupplies = mockSupplies.filter((s) =>
      formData.supplyIds.includes(s.id)
    );
    const totalAmount = selectedSupplies.reduce(
      (sum, s) => sum + s.totalAmount,
      0
    );
    const commissionAmount = selectedSupplies.reduce(
      (sum, s) => sum + s.commissionAmount,
      0
    );

    setFormData((prev) => ({
      ...prev,
      totalAmount,
      commissionAmount,
      dueAmount: totalAmount - commissionAmount - prev.paidAmount,
    }));
  };

  useEffect(() => {
    if (formData.supplyIds.length > 0) {
      calculateTotals();
    }
  }, [formData.supplyIds, formData.paidAmount]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="supplierId">Supplier *</Label>
        <Select
          value={formData.supplierId}
          onValueChange={(value) =>
            setFormData({ ...formData, supplierId: value, supplyIds: [] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select supplier" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier._id} value={supplier._id}>
                {supplier.profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.supplierId && supplierSupplies.length > 0 && (
        <div className="space-y-2">
          <Label>Select Supplies</Label>
          <div className="max-h-32 overflow-y-auto border rounded-md p-2">
            {supplierSupplies.map((supply) => (
              <div key={supply.id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  id={supply.id}
                  checked={formData.supplyIds.includes(supply.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        supplyIds: [...prev.supplyIds, supply.id],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        supplyIds: prev.supplyIds.filter(
                          (id) => id !== supply.id
                        ),
                      }));
                    }
                  }}
                />
                <label htmlFor={supply.id} className="text-sm">
                  Supply #{supply.id} - ৳{supply.totalAmount.toLocaleString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paidAmount">Paid Amount (BDT)</Label>
          <Input
            id="paidAmount"
            type="number"
            min="0"
            step="0.01"
            value={formData.paidAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                paidAmount: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value: Payment["status"]) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentDate">Payment Date</Label>
        <Input
          id="paymentDate"
          type="date"
          value={formData.paymentDate}
          onChange={(e) =>
            setFormData({ ...formData, paymentDate: e.target.value })
          }
        />
      </div>

      {formData.supplyIds.length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <h4 className="font-medium">Payment Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">
                ৳{formData.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Commission Amount:</span>
              <span className="font-medium">
                ৳{formData.commissionAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-medium">
                ৳{formData.paidAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Due Amount:</span>
              <span className="font-medium">
                ৳{formData.dueAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">
          {initialData ? "Update Payment" : "Add Payment"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
