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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useGetProductsQuery } from "@/redux/features/inventory/inventoryApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const returnSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  staffId: z.string().min(1, "Staff is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  reason: z.string().min(1, "Reason is required"),
  status: z.enum(["pending", "processing", "completed", "cancelled"] as const, {
    message: "Invalid status",
  }),
});

type ReturnFormData = z.infer<typeof returnSchema>;

interface ReturnFormProps {
  onSubmit: (data: ReturnFormData) => void;
  initialData?: any;
  isEdit?: boolean;
}

const ReturnForm = ({
  onSubmit,
  initialData,
  isEdit = false,
}: ReturnFormProps) => {
  const { user } = useAuth();
  const { data: productsData } = useGetProductsQuery(undefined);
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const products = productsData || [];
  const staffMembers =
    usersData?.data?.filter((u: any) => u.role === "staff") || [];

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReturnFormData>({
    resolver: zodResolver(returnSchema),
    defaultValues: initialData
      ? {
          productId: initialData.productId?._id || initialData.productId,
          staffId: initialData.staffId?._id || initialData.staffId,
          quantity: initialData.quantity,
          reason: initialData.reason,
          status: initialData.status,
        }
      : {
          productId: "",
          staffId: user?.role === "staff" ? user._id : "",
          quantity: 0,
          reason: "",
          status: "pending",
        },
  });

  const selectedProductId = watch("productId");
  const selectedProduct = products.find(
    (p: any) => p._id === selectedProductId
  );

  const returnReasons = [
    "Lost and Damaged",
    "Wrong product received",
    "Partial Delivery",
    "Customer complaint",
    "Quality issues",
    "Expired product",
    "Other",
  ];

  const onFormSubmit = (data: ReturnFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productId">Product *</Label>
          <Controller
            name="productId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isEdit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product: any) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.productId && (
            <p className="text-sm text-destructive">
              {errors.productId.message}
            </p>
          )}
        </div>

        {user?.role === "admin" && (
          <div className="space-y-2">
            <Label htmlFor="staffId">Staff Member *</Label>
            <Controller
              name="staffId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff: any) => (
                      <SelectItem key={staff._id} value={staff._id}>
                        {staff.profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.staffId && (
              <p className="text-sm text-destructive">
                {errors.staffId.message}
              </p>
            )}
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
            <span className="font-medium">{selectedProduct.quantity}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Category:{" "}
            <span className="font-medium">{selectedProduct.category}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <Input
                id="quantity"
                type="number"
                min="1"
                max={selectedProduct?.quantity || 999}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">
              {errors.quantity.message}
            </p>
          )}
          {selectedProduct && watch("quantity") > selectedProduct.quantity && (
            <p className="text-sm text-destructive">
              Quantity cannot exceed current stock ({selectedProduct.quantity})
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Return Reason *</Label>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
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
          )}
        />
        {errors.reason && (
          <p className="text-sm text-destructive">{errors.reason.message}</p>
        )}
      </div>

      {watch("reason") === "Other" && (
        <div className="space-y-2">
          <Label htmlFor="customReason">Custom Reason</Label>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Textarea
                id="customReason"
                placeholder="Please specify the reason..."
                {...field}
                rows={3}
              />
            )}
          />
        </div>
      )}

      {watch("status") === "completed" && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Setting status to "Completed" will
            automatically add the returned quantity back to the product stock.
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit">{isEdit ? "Update Return" : "Add Return"}</Button>
      </div>
    </form>
  );
};

export default ReturnForm;
