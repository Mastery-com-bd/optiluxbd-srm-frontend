/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { mockProducts, mockUsers, type Supply } from "@/data/mockData";
// import { useState } from "react";

// interface SupplyFormProps {
//   onSubmit: (data: Omit<Supply, "id" | "createdAt" | "updatedAt">) => void;
// }

// const SupplyForm = ({ onSubmit }: SupplyFormProps) => {
//   const [formData, setFormData] = useState({
//     supplierId: "",
//     productId: "",
//     quantity: 0,
//     costPrice: 0,
//     commissionRate: 12,
//     status: "pending" as Supply["status"],
//   });

//   const suppliers = mockUsers.filter((user) => user.role === "supplier");
//   const selectedProduct = mockProducts.find((p) => p.id === formData.productId);
//   const totalAmount = formData.quantity * formData.costPrice;
//   const commissionAmount = (totalAmount * formData.commissionRate) / 100;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       totalAmount,
//       commissionAmount,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="supplierId">Supplier *</Label>
//           <Select
//             value={formData.supplierId}
//             onValueChange={(value) =>
//               setFormData({ ...formData, supplierId: value })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select supplier" />
//             </SelectTrigger>
//             <SelectContent>
//               {suppliers.map((supplier) => (
//                 <SelectItem key={supplier._id} value={supplier._id}>
//                   {supplier.profile.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="productId">Product *</Label>
//           <Select
//             value={formData.productId}
//             onValueChange={(value) => {
//               const product = mockProducts.find((p) => p.id === value);
//               setFormData({
//                 ...formData,
//                 productId: value,
//                 costPrice: product?.costPrice || 0,
//               });
//             }}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select product" />
//             </SelectTrigger>
//             <SelectContent>
//               {mockProducts.map((product) => (
//                 <SelectItem key={product.id} value={product.id}>
//                   {product.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {selectedProduct && (
//         <div className="p-3 bg-muted rounded-lg">
//           <p className="text-sm text-muted-foreground">
//             Selected:{" "}
//             <span className="font-medium">{selectedProduct.name}</span>
//           </p>
//           <p className="text-sm text-muted-foreground">
//             Current Stock:{" "}
//             <span className="font-medium">{selectedProduct.currentStock}</span>
//           </p>
//         </div>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="quantity">Quantity *</Label>
//           <Input
//             id="quantity"
//             type="number"
//             min="1"
//             value={formData.quantity}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 quantity: parseInt(e.target.value) || 0,
//               })
//             }
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="costPrice">Cost Price (BDT) *</Label>
//           <Input
//             id="costPrice"
//             type="number"
//             min="0"
//             step="0.01"
//             value={formData.costPrice}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 costPrice: parseFloat(e.target.value) || 0,
//               })
//             }
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
//           <Input
//             id="commissionRate"
//             type="number"
//             min="0"
//             max="100"
//             step="0.1"
//             value={formData.commissionRate}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 commissionRate: parseFloat(e.target.value) || 0,
//               })
//             }
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="status">Status *</Label>
//           <Select
//             value={formData.status}
//             onValueChange={(value: Supply["status"]) =>
//               setFormData({ ...formData, status: value })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.quantity > 0 && formData.costPrice > 0 && (
//         <div className="p-4 bg-primary/5 rounded-lg space-y-2">
//           <h4 className="font-medium">Supply Summary</h4>
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex justify-between">
//               <span>Total Amount:</span>
//               <span className="font-medium">
//                 ৳{totalAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Commission Amount:</span>
//               <span className="font-medium">
//                 ৳{commissionAmount.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit">Add Supply</Button>
//       </div>
//     </form>
//   );
// };

// export default SupplyForm;

// Updated SupplyForm.tsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import { useAuth } from "@/hooks/useAuth";
// import { useGetProductsQuery } from "@/redux/features/inventory/inventoryApi";
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Trash2 } from "lucide-react";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";
// // import { useState } from "react";
// // import { toast } from "sonner";

// const supplyProductSchema = z.object({
//   product: z.string().min(1, "Product is required"),
//   quantity: z.number().min(1, "Quantity must be at least 1"),
//   costPrice: z.number().min(0, "Cost price must be non-negative"),
// });

// const supplySchema = z.object({
//   supplier: z.string().min(1, "Supplier is required"),
//   products: z
//     .array(supplyProductSchema)
//     .min(1, "At least one product is required"),
//   commissionRate: z.number().min(0).max(100),
//   status: z.enum(["pending", "received", "cancelled"]).default("pending"),
// });

// type SupplyFormData = z.infer<typeof supplySchema>;

// interface SupplyFormProps {
//   onSubmit: (data: SupplyFormData) => void;
// }

// const SupplyForm = ({ onSubmit }: SupplyFormProps) => {
//   // const { user } = useAuth();
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const { data: productsData } = useGetProductsQuery(undefined);

//   const suppliers =
//     usersData?.data?.filter((u: any) => u.role === "supplier") || [];
//   const products = productsData || [];

//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<SupplyFormData>({
//     resolver: zodResolver(supplySchema) as any,
//     defaultValues: {
//       supplier: "",
//       products: [],
//       commissionRate: 12,
//       status: "pending",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const onFormSubmit = (data: SupplyFormData) => {
//     onSubmit(data);
//   };

//   const addProduct = () => {
//     append({ product: "", quantity: 1, costPrice: 0 });
//   };

//   const calculateTotals = () => {
//     let totalAmount = 0;
//     fields.forEach((_, index) => {
//       const quantity = watch(`products.${index}.quantity`);
//       const costPrice = watch(`products.${index}.costPrice`);
//       totalAmount += quantity * costPrice;
//     });
//     const commissionAmount = (totalAmount * watch("commissionRate")) / 100;
//     return { totalAmount, commissionAmount };
//   };

//   const { totalAmount, commissionAmount } = calculateTotals();

//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="supplier">Supplier *</Label>
//         <Controller
//           name="supplier"
//           control={control}
//           render={({ field }) => (
//             <Select onValueChange={field.onChange} value={field.value}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select supplier" />
//               </SelectTrigger>
//               <SelectContent>
//                 {suppliers.map((supplier: any) => (
//                   <SelectItem key={supplier._id} value={supplier._id}>
//                     {supplier.profile.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         />
//         {errors.supplier && (
//           <p className="text-sm text-destructive">{errors.supplier.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label>Products *</Label>
//         {fields.map((field, index) => (
//           <div key={field.id} className="flex space-x-2 mb-2">
//             <Controller
//               name={`products.${index}.product`}
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger className="w-[200px]">
//                     <SelectValue placeholder="Select product" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {products.map((product: any) => (
//                       <SelectItem key={product._id} value={product._id}>
//                         {product.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             <Input
//               type="number"
//               placeholder="Quantity"
//               {...control.register(`products.${index}.quantity`, {
//                 valueAsNumber: true,
//               })}
//             />
//             <Input
//               type="number"
//               placeholder="Cost Price"
//               {...control.register(`products.${index}.costPrice`, {
//                 valueAsNumber: true,
//               })}
//             />
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={() => remove(index)}
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}
//         <Button type="button" onClick={addProduct}>
//           Add Product
//         </Button>
//         {errors.products && (
//           <p className="text-sm text-destructive">{errors.products.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
//         <Input
//           id="commissionRate"
//           type="number"
//           min="0"
//           max="100"
//           step="0.1"
//           {...control.register("commissionRate", { valueAsNumber: true })}
//         />
//         {errors.commissionRate && (
//           <p className="text-sm text-destructive">
//             {errors.commissionRate.message}
//           </p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="status">Status *</Label>
//         <Controller
//           name="status"
//           control={control}
//           render={({ field }) => (
//             <Select onValueChange={field.onChange} value={field.value}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="received">Received</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         />
//         {errors.status && (
//           <p className="text-sm text-destructive">{errors.status.message}</p>
//         )}
//       </div>

//       {fields.length > 0 && (
//         <div className="p-4 bg-primary/5 rounded-lg space-y-2">
//           <h4 className="font-medium">Supply Summary</h4>
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex justify-between">
//               <span>Total Amount:</span>
//               <span className="font-medium">
//                 ৳{totalAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Commission Amount:</span>
//               <span className="font-medium">
//                 ৳{commissionAmount.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit">Add Supply</Button>
//       </div>
//     </form>
//   );
// };

// export default SupplyForm;

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
  defaultValues?: any;
}

const SupplyForm = ({ onSubmit, defaultValues }: SupplyFormProps) => {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: productsData } = useGetProductsQuery(undefined);

  const suppliers =
    usersData?.data?.filter((u: any) => u.role === "supplier") || [];
  const products = productsData || [];

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<SupplyFormData>({
    resolver: zodResolver(supplySchema) as any,
    defaultValues: defaultValues
      ? {
          supplier: defaultValues.supplier || "",
          products:
            defaultValues.products?.map((p: any) => ({
              product: p.product._id || p.product,
              quantity: p.quantity,
              costPrice: p.costPrice,
            })) || [],
          commissionRate: defaultValues.commissionRate,
          status: defaultValues.status,
        }
      : {
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

  const addProduct = () => append({ product: "", quantity: 1, costPrice: 0 });

  const onFormSubmit = (data: SupplyFormData) => {
    onSubmit(data);
    reset();
  };

  const calculateTotals = () => {
    let totalAmount = 0;
    fields.forEach((_, index) => {
      const quantity = watch(`products.${index}.quantity`) || 0;
      const costPrice = watch(`products.${index}.costPrice`) || 0;
      totalAmount += quantity * costPrice;
    });
    const commissionRate = watch("commissionRate") || 0;
    const commissionAmount = (totalAmount * commissionRate) / 100;
    return { totalAmount, commissionAmount };
  };

  const { totalAmount, commissionAmount } = calculateTotals();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* Supplier */}
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
                    {supplier.profile?.name || "Unnamed Supplier"}
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

      {/* Products */}
      <div className="space-y-3">
        <Label>Products *</Label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-wrap gap-2 items-center border p-2 rounded-lg bg-muted/20"
          >
            <Controller
              name={`products.${index}.product`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
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
              placeholder="Qty"
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
              })}
              className="w-[100px]"
            />

            <Input
              type="number"
              placeholder="Cost Price"
              {...register(`products.${index}.costPrice`, {
                valueAsNumber: true,
              })}
              className="w-[120px]"
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addProduct} variant="outline">
          + Add Product
        </Button>
        {errors.products && (
          <p className="text-sm text-destructive">{errors.products.message}</p>
        )}
      </div>

      {/* Commission Rate */}
      <div className="space-y-2">
        <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
        <Input
          id="commissionRate"
          type="number"
          min="0"
          max="100"
          step="0.1"
          {...register("commissionRate", { valueAsNumber: true })}
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
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      {/* Summary */}
      {fields.length > 0 && (
        <div className="bg-primary/5 p-3 rounded-lg space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-medium">৳{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Commission Amount:</span>
            <span className="font-medium">
              ৳{commissionAmount.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">
          {defaultValues ? "Update Supply" : "Add Supply"}
        </Button>
      </div>
    </form>
  );
};

export default SupplyForm;
