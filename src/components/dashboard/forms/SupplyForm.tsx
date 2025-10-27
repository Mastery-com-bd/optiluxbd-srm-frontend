/* eslint-disable @typescript-eslint/no-explicit-any */

// Updated SupplyForm.tsx
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
// import { useAuth } from "@/hooks/useAuth";
import { useGetProductsQuery } from "@/redux/features/inventory/inventoryApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
// import { useState } from "react";
// import { toast } from "sonner";

const supplyProductSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  costPrice: z.number().min(0, "Cost price must be non-negative"),
});

const supplySchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  products: z
    .array(supplyProductSchema)
    .min(1, "At least one product is required"),
  commissionRate: z.number().min(0).max(100),
  status: z.enum(["pending", "received", "cancelled"]).default("pending"),
});

type SupplyFormData = z.infer<typeof supplySchema>;

interface SupplyFormProps {
  onSubmit: (data: SupplyFormData) => void;
}

const SupplyForm = ({ onSubmit }: SupplyFormProps) => {
  // const { user } = useAuth();
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: productsData } = useGetProductsQuery(undefined);

  const suppliers =
    usersData?.data?.filter((u: any) => u.role === "supplier") || [];
  const products = productsData || [];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SupplyFormData>({
    resolver: zodResolver(supplySchema) as any,
    defaultValues: {
      supplier: "",
      products: [],
      commissionRate: 12,
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onFormSubmit = (data: SupplyFormData) => {
    onSubmit(data);
  };

  const addProduct = () => {
    append({ product: "", quantity: 1, costPrice: 0 });
  };

  const calculateTotals = () => {
    let totalAmount = 0;
    fields.forEach((_, index) => {
      const quantity = watch(`products.${index}.quantity`);
      const costPrice = watch(`products.${index}.costPrice`);
      totalAmount += quantity * costPrice;
    });
    const commissionAmount = (totalAmount * watch("commissionRate")) / 100;
    return { totalAmount, commissionAmount };
  };

  const { totalAmount, commissionAmount } = calculateTotals();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier *</Label>
        <Controller
          name="supplier"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier: any) => (
                  <SelectItem key={supplier._id} value={supplier._id}>
                    {supplier.profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.supplier && (
          <p className="text-sm text-destructive">{errors.supplier.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Products *</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 mb-2">
            <Controller
              name={`products.${index}.product`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px]">
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
            <Input
              type="number"
              placeholder="Quantity"
              {...control.register(`products.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              placeholder="Cost Price"
              {...control.register(`products.${index}.costPrice`, {
                valueAsNumber: true,
              })}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addProduct}>
          Add Product
        </Button>
        {errors.products && (
          <p className="text-sm text-destructive">{errors.products.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
        <Input
          id="commissionRate"
          type="number"
          min="0"
          max="100"
          step="0.1"
          {...control.register("commissionRate", { valueAsNumber: true })}
        />
        {errors.commissionRate && (
          <p className="text-sm text-destructive">
            {errors.commissionRate.message}
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
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      {fields.length > 0 && (
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
