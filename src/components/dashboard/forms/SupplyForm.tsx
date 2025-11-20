/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { useGetProductsQuery } from "@/redux/features/inventory/inventoryApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// Schema
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
type SupplyFormSubmit = SupplyFormData & {
  totalAmount: number;
  commissionAmount: number;
  netAmount: number;
};

interface SupplyFormProps {
  onSubmit: (data: SupplyFormSubmit) => void;
}

const SupplyForm = ({ onSubmit }: SupplyFormProps) => {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: productsData } = useGetProductsQuery(undefined);

  const suppliers =
    usersData?.data?.items.filter((u: any) => u.role === "supplier") || [];
  const products = productsData?.items || [];
  console.log("supplier", products);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SupplyFormData>({
    resolver: zodResolver(supplySchema) as any,
    defaultValues: {
      supplier: "",
      products: [],
      commissionRate: 10,
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  // Supplier search state
  const [supplierSearch, setSupplierSearch] = useState("");

  const filteredSuppliers = suppliers.filter((supplier: any) =>
    supplier?.profile?.name
      ?.toLowerCase()
      .includes(supplierSearch.toLowerCase())
  );

  const handleProductSelect = (productId: string, index: number) => {
    const selectedProduct = products.find((p: any) => p._id === productId);
    if (selectedProduct) {
      setValue(`products.${index}.costPrice`, selectedProduct.costPrice || 0);
    }
  };

  const calculateTotals = () => {
    let totalAmount = 0;
    const productsList = watch("products") || [];
    productsList.forEach((p) => {
      totalAmount += (p.quantity || 0) * (p.costPrice || 0);
    });
    const commissionRate = watch("commissionRate") || 0;
    const commissionAmount = (totalAmount * commissionRate) / 100;
    const netAmount = totalAmount + commissionAmount;
    return { totalAmount, commissionAmount, netAmount };
  };

  const { totalAmount, commissionAmount, netAmount } = calculateTotals();

  const addProduct = () => {
    append({ product: "", quantity: 1, costPrice: 0 });
  };

  const onFormSubmit = (data: SupplyFormData) => {
    onSubmit({
      ...data,
      totalAmount,
      commissionAmount,
      netAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Supplier */}
      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier *</Label>
        <Controller
          name="supplier"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSupplierSearch("");
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search supplier..."
                    value={supplierSearch}
                    onChange={(e) => setSupplierSearch(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier: any) => (
                    <SelectItem key={supplier._id} value={supplier._id}>
                      {supplier.profile.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-muted-foreground text-sm">
                    No suppliers found.
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

      {/* Products Section */}
      <div className="space-y-2">
        <Label>Products *</Label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-wrap gap-2 mb-2 items-center"
          >
            <Controller
              name={`products.${index}.product`}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleProductSelect(value, index);
                  }}
                  value={field.value}
                >
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
            <Controller
              name={`products.${index}.quantity`}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Controller
              name={`products.${index}.costPrice`}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Cost Price"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
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

      {/* Commission */}
      <div className="space-y-2">
        <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
        <Controller
          name="commissionRate"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              min={0}
              max={100}
              step={0.1}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.commissionRate && (
          <p className="text-sm text-destructive">
            {errors.commissionRate.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Totals/Summary */}
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
            <div className="flex justify-between">
              <span>Net Amount:</span>
              <span className="font-medium">৳{netAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">Add Supply</Button>
      </div>
    </form>
  );
};

export default SupplyForm;