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
import { mockProducts, mockUsers, type Supply } from "@/data/mockData";
import { useState } from "react";

interface SupplyFormProps {
  onSubmit: (data: Omit<Supply, "id" | "createdAt" | "updatedAt">) => void;
}

const SupplyForm = ({ onSubmit }: SupplyFormProps) => {
  const [formData, setFormData] = useState({
    supplierId: "",
    productId: "",
    quantity: 0,
    costPrice: 0,
    commissionRate: 12,
    status: "pending" as Supply["status"],
  });

  const suppliers = mockUsers.filter((user) => user.role === "supplier");
  const selectedProduct = mockProducts.find((p) => p.id === formData.productId);
  const totalAmount = formData.quantity * formData.costPrice;
  const commissionAmount = (totalAmount * formData.commissionRate) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      totalAmount,
      commissionAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplierId">Supplier *</Label>
          <Select
            value={formData.supplierId}
            onValueChange={(value) =>
              setFormData({ ...formData, supplierId: value })
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

        <div className="space-y-2">
          <Label htmlFor="productId">Product *</Label>
          <Select
            value={formData.productId}
            onValueChange={(value) => {
              const product = mockProducts.find((p) => p.id === value);
              setFormData({
                ...formData,
                productId: value,
                costPrice: product?.costPrice || 0,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProduct && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-medium">{selectedProduct.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Current Stock:{" "}
            <span className="font-medium">{selectedProduct.currentStock}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (BDT) *</Label>
          <Input
            id="costPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                costPrice: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
          <Input
            id="commissionRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formData.commissionRate}
            onChange={(e) =>
              setFormData({
                ...formData,
                commissionRate: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value: Supply["status"]) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.quantity > 0 && formData.costPrice > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <h4 className="font-medium">Supply Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">
                ৳{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Commission Amount:</span>
              <span className="font-medium">
                ৳{commissionAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">Add Supply</Button>
      </div>
    </form>
  );
};

export default SupplyForm;
