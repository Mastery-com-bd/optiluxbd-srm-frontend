/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
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
// import { mockSupplies, mockUsers, type Payment } from "@/data/mockData";
// import { useEffect, useState } from "react";

// interface PaymentFormProps {
//   initialData?: Payment;
//   onSubmit: (data: Omit<Payment, "id" | "createdAt" | "updatedAt">) => void;
// }

// const PaymentForm = ({ initialData, onSubmit }: PaymentFormProps) => {
//   const [formData, setFormData] = useState({
//     supplierId: "",
//     supplyIds: [] as string[],
//     totalAmount: 0,
//     commissionAmount: 0,
//     dueAmount: 0,
//     paidAmount: 0,
//     status: "pending" as Payment["status"],
//     paymentDate: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         supplierId: initialData.supplierId,
//         supplyIds: initialData.supplyIds,
//         totalAmount: initialData.totalAmount,
//         commissionAmount: initialData.commissionAmount,
//         dueAmount: initialData.dueAmount,
//         paidAmount: initialData.paidAmount,
//         status: initialData.status,
//         paymentDate: initialData.paymentDate
//           ? initialData.paymentDate.split("T")[0]
//           : "",
//       });
//     }
//   }, [initialData]);

//   const suppliers = mockUsers.filter((user) => user.role === "supplier");
//   const supplierSupplies = mockSupplies.filter(
//     (s) => s.supplierId === formData.supplierId
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       paymentDate: formData.paymentDate
//         ? new Date(formData.paymentDate).toISOString()
//         : undefined,
//     });
//   };

//   const calculateTotals = () => {
//     const selectedSupplies = mockSupplies.filter((s) =>
//       formData.supplyIds.includes(s.id)
//     );
//     const totalAmount = selectedSupplies.reduce(
//       (sum, s) => sum + s.totalAmount,
//       0
//     );
//     const commissionAmount = selectedSupplies.reduce(
//       (sum, s) => sum + s.commissionAmount,
//       0
//     );

//     setFormData((prev) => ({
//       ...prev,
//       totalAmount,
//       commissionAmount,
//       dueAmount: totalAmount - commissionAmount - prev.paidAmount,
//     }));
//   };

//   useEffect(() => {
//     if (formData.supplyIds.length > 0) {
//       calculateTotals();
//     }
//   }, [formData.supplyIds, formData.paidAmount]);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="supplierId">Supplier *</Label>
//         <Select
//           value={formData.supplierId}
//           onValueChange={(value) =>
//             setFormData({ ...formData, supplierId: value, supplyIds: [] })
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select supplier" />
//           </SelectTrigger>
//           <SelectContent>
//             {suppliers.map((supplier) => (
//               <SelectItem key={supplier._id} value={supplier._id}>
//                 {supplier.profile.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {formData.supplierId && supplierSupplies.length > 0 && (
//         <div className="space-y-2">
//           <Label>Select Supplies</Label>
//           <div className="max-h-32 overflow-y-auto border rounded-md p-2">
//             {supplierSupplies.map((supply) => (
//               <div key={supply.id} className="flex items-center space-x-2 py-1">
//                 <input
//                   type="checkbox"
//                   id={supply.id}
//                   checked={formData.supplyIds.includes(supply.id)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setFormData((prev) => ({
//                         ...prev,
//                         supplyIds: [...prev.supplyIds, supply.id],
//                       }));
//                     } else {
//                       setFormData((prev) => ({
//                         ...prev,
//                         supplyIds: prev.supplyIds.filter(
//                           (id) => id !== supply.id
//                         ),
//                       }));
//                     }
//                   }}
//                 />
//                 <label htmlFor={supply.id} className="text-sm">
//                   Supply #{supply.id} - ৳{supply.totalAmount.toLocaleString()}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="paidAmount">Paid Amount (BDT)</Label>
//           <Input
//             id="paidAmount"
//             type="number"
//             min="0"
//             step="0.01"
//             value={formData.paidAmount}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 paidAmount: parseFloat(e.target.value) || 0,
//               })
//             }
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="status">Status *</Label>
//           <Select
//             value={formData.status}
//             onValueChange={(value: Payment["status"]) =>
//               setFormData({ ...formData, status: value })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//               <SelectItem value="partial">Partial</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="paymentDate">Payment Date</Label>
//         <Input
//           id="paymentDate"
//           type="date"
//           value={formData.paymentDate}
//           onChange={(e) =>
//             setFormData({ ...formData, paymentDate: e.target.value })
//           }
//         />
//       </div>

//       {formData.supplyIds.length > 0 && (
//         <div className="p-4 bg-primary/5 rounded-lg space-y-2">
//           <h4 className="font-medium">Payment Summary</h4>
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex justify-between">
//               <span>Total Amount:</span>
//               <span className="font-medium">
//                 ৳{formData.totalAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Commission Amount:</span>
//               <span className="font-medium">
//                 ৳{formData.commissionAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Paid Amount:</span>
//               <span className="font-medium">
//                 ৳{formData.paidAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Due Amount:</span>
//               <span className="font-medium">
//                 ৳{formData.dueAmount.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit">
//           {initialData ? "Update Payment" : "Add Payment"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default PaymentForm;

// Updated PaymentForm.tsx

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
import { useGetSuppliersQuery } from "@/redux/features/supplier/supplierApi"; // Assume supplyApi import
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const paymentSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  supplyIds: z.array(z.string()).min(1, "At least one supply is required"),
  paidAmount: z.number().min(0, "Paid amount must be non-negative"),
  status: z.enum(["pending", "completed", "partial"]),
  paymentDate: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  // const { user } = useAuth();
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: suppliersData } = useGetSuppliersQuery(undefined);

  const suppliers =
    usersData?.data?.filter((u: any) => u.role === "supplier") || [];
  const supplies = suppliersData?.data || [];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      supplierId: "",
      supplyIds: [],
      paidAmount: 0,
      status: "pending",
      paymentDate: "",
    },
  });

  const selectedSupplierId = watch("supplierId");
  const supplierSupplies = supplies.filter(
    (s: any) => s.supplierId === selectedSupplierId
  );

  const calculateTotals = () => {
    const selectedSupplies = supplies.filter((s: any) =>
      watch("supplyIds").includes(s._id)
    );
    const totalAmount = selectedSupplies.reduce(
      (sum: number, s: any) => sum + s.totalAmount,
      0
    );
    const commissionAmount = selectedSupplies.reduce(
      (sum: number, s: any) => sum + s.commissionAmount,
      0
    );
    const paidAmount = watch("paidAmount");
    const dueAmount = totalAmount - commissionAmount - paidAmount;

    return { totalAmount, commissionAmount, dueAmount };
  };

  const { totalAmount, commissionAmount, dueAmount } = calculateTotals();

  const onFormSubmit = (data: PaymentFormData) => {
    onSubmit(data);
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="supplierId">Supplier *</Label>
        <Controller
          name="supplierId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setValue("supplyIds", []); // Reset supplies when supplier changes
              }}
              value={field.value}
            >
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
        {errors.supplierId && (
          <p className="text-sm text-destructive">
            {errors.supplierId.message}
          </p>
        )}
      </div>

      {selectedSupplierId && supplierSupplies.length > 0 && (
        <div className="space-y-2">
          <Label>Select Supplies</Label>
          <div className="max-h-32 overflow-y-auto border rounded-md p-2">
            <Controller
              name="supplyIds"
              control={control}
              render={({ field }) => (
                <>
                  {supplierSupplies.map((supply: any) => (
                    <div
                      key={supply._id}
                      className="flex items-center space-x-2 py-1"
                    >
                      <input
                        type="checkbox"
                        id={supply._id}
                        checked={field.value.includes(supply._id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...field.value, supply._id]
                            : field.value.filter(
                                (id: string) => id !== supply._id
                              );
                          field.onChange(updated);
                        }}
                      />
                      <label htmlFor={supply._id} className="text-sm">
                        Supply #{supply._id} - ৳
                        {supply.totalAmount.toLocaleString()}
                      </label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.supplyIds && (
            <p className="text-sm text-destructive">
              {errors.supplyIds.message}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paidAmount">Paid Amount (BDT)</Label>
          <Controller
            name="paidAmount"
            control={control}
            render={({ field }) => (
              <Input
                id="paidAmount"
                type="number"
                min="0"
                step="0.01"
                {...field}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            )}
          />
          {errors.paidAmount && (
            <p className="text-sm text-destructive">
              {errors.paidAmount.message}
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
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
        <Label htmlFor="paymentDate">Payment Date</Label>
        <Controller
          name="paymentDate"
          control={control}
          render={({ field }) => (
            <Input id="paymentDate" type="date" {...field} />
          )}
        />
        {errors.paymentDate && (
          <p className="text-sm text-destructive">
            {errors.paymentDate.message}
          </p>
        )}
      </div>

      {watch("supplyIds").length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <h4 className="font-medium">Payment Summary</h4>
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
              <span>Paid Amount:</span>
              <span className="font-medium">
                ৳{watch("paidAmount").toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Due Amount:</span>
              <span className="font-medium">৳{dueAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">{"Add Payment"}</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
