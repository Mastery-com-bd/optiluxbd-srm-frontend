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
import { Textarea } from "@/components/ui/textarea";
import { mockProducts, mockUsers, type ReturnProduct } from "@/data/mockData";
import { type RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ReturnFormProps {
  onSubmit: (
    data: Omit<ReturnProduct, "id" | "createdAt" | "updatedAt">
  ) => void;
}

const ReturnForm = ({ onSubmit }: ReturnFormProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    productId: "",
    staffId: user?.role === "staff" ? user._id : "",
    quantity: 0,
    reason: "",
    status: "pending" as ReturnProduct["status"],
  });

  const staffMembers = mockUsers.filter((u) => u.role === "staff");
  const selectedProduct = mockProducts.find((p) => p.id === formData.productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const returnReasons = [
    "Defective units",
    "Damaged during shipping",
    "Wrong product received",
    "Customer complaint",
    "Quality issues",
    "Expired product",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productId">Product *</Label>
          <Select
            value={formData.productId}
            onValueChange={(value) =>
              setFormData({ ...formData, productId: value })
            }
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

        {user?.role === "admin" && (
          <div className="space-y-2">
            <Label htmlFor="staffId">Staff Member *</Label>
            <Select
              value={formData.staffId}
              onValueChange={(value) =>
                setFormData({ ...formData, staffId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff._id} value={staff._id}>
                    {staff.profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
          <p className="text-sm text-muted-foreground">
            Category:{" "}
            <span className="font-medium">{selectedProduct.category}</span>
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
            max={selectedProduct?.currentStock || 999}
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: parseInt(e.target.value) || 0,
              })
            }
            required
          />
          {selectedProduct &&
            formData.quantity > selectedProduct.currentStock && (
              <p className="text-sm text-destructive">
                Quantity cannot exceed current stock (
                {selectedProduct.currentStock})
              </p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value: ReturnProduct["status"]) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Return Reason *</Label>
        <Select
          value={formData.reason}
          onValueChange={(value) => setFormData({ ...formData, reason: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            {returnReasons.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {reason}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.reason === "Other" && (
        <div className="space-y-2">
          <Label htmlFor="customReason">Custom Reason</Label>
          <Textarea
            id="customReason"
            placeholder="Please specify the reason..."
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            rows={3}
          />
        </div>
      )}

      {formData.status === "processed" && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Setting status to "Processed" will
            automatically add the returned quantity back to the product stock.
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">Add Return</Button>
      </div>
    </form>
  );
};

export default ReturnForm;
