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
// import { useGetAllSuppliesQuery } from "@/redux/features/supply/supplyApi";
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// // import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// // import { toast } from "sonner";

// const paymentSchema = z.object({
//   supplier: z.string().min(1, "Supplier is required"),
//   supplies: z.array(z.string()).min(1, "At least one supply is required"),
//   paidAmount: z.number().min(0, "Paid amount must be non-negative"),
//   status: z.enum(["pending", "partial", "completed"]),
//   paymentDate: z.string().optional(),
// });

// type PaymentFormData = z.infer<typeof paymentSchema>;

// interface PaymentFormProps {
//   onSubmit: (data: PaymentFormData) => void;
// }

// const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const { data: suppliesData } = useGetAllSuppliesQuery(undefined);

//   const suppliers =
//     usersData?.data?.filter((user: any) => user.role === "supplier") || [];
//   const supplies = suppliesData?.data || [];

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<PaymentFormData>({
//     resolver: zodResolver(paymentSchema),
//     defaultValues: {
//       supplier: "",
//       supplies: [],
//       paidAmount: 0,
//       status: "pending",
//       paymentDate: "",
//     },
//   });

//   const selectedSupplier = watch("supplier");
//   const supplierSupplies = supplies.filter(
//     (s: any) => s.supplier === selectedSupplier
//   );

//   const calculateTotals = () => {
//     const selectedSupplies = supplies.filter((s: any) =>
//       watch("supplies").includes(s._id)
//     );
//     const totalAmount = selectedSupplies.reduce(
//       (sum: number, s: any) => sum + s.totalAmount,
//       0
//     );
//     const commissionAmount = selectedSupplies.reduce(
//       (sum: number, s: any) => sum + s.commissionAmount,
//       0
//     );
//     const paidAmount = watch("paidAmount");
//     const dueAmount = totalAmount - commissionAmount - paidAmount;
//     return { totalAmount, commissionAmount, dueAmount };
//   };

//   const { totalAmount, commissionAmount, dueAmount } = calculateTotals();

//   const onFormSubmit = (data: PaymentFormData) => {
//     onSubmit(data);
//     console.log("Form Submitted:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="supplier">Supplier *</Label>
//         <Controller
//           name="supplier"
//           control={control}
//           render={({ field }) => (
//             <Select
//               onValueChange={(value) => {
//                 field.onChange(value);
//                 setValue("supplies", []);
//               }}
//               value={field.value}
//             >
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

//       {selectedSupplier && supplierSupplies.length > 0 && (
//         <div className="space-y-2">
//           <Label>Select Supplies</Label>
//           <div className="max-h-32 overflow-y-auto border rounded-md p-2">
//             <Controller
//               name="supplies"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   {supplierSupplies.map((supply: any) => (
//                     <div
//                       key={supply._id}
//                       className="flex items-center space-x-2 py-1"
//                     >
//                       <input
//                         type="checkbox"
//                         id={supply._id}
//                         checked={field.value.includes(supply._id)}
//                         onChange={(e) => {
//                           const updated = e.target.checked
//                             ? [...field.value, supply._id]
//                             : field.value.filter(
//                                 (id: string) => id !== supply._id
//                               );
//                           field.onChange(updated);
//                         }}
//                       />
//                       <label htmlFor={supply._id} className="text-sm">
//                         Supply #{supply._id} - ৳
//                         {supply.totalAmount.toLocaleString()}
//                       </label>
//                     </div>
//                   ))}
//                 </>
//               )}
//             />
//           </div>
//           {errors.supplies && (
//             <p className="text-sm text-destructive">
//               {errors.supplies.message}
//             </p>
//           )}
//         </div>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="paidAmount">Paid Amount (BDT)</Label>
//           <Controller
//             name="paidAmount"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="paidAmount"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 {...field}
//                 onChange={(e) =>
//                   field.onChange(parseFloat(e.target.value) || 0)
//                 }
//               />
//             )}
//           />
//           {errors.paidAmount && (
//             <p className="text-sm text-destructive">
//               {errors.paidAmount.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="status">Status *</Label>
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="partial">Partial</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.status && (
//             <p className="text-sm text-destructive">{errors.status.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="paymentDate">Payment Date</Label>
//         <Controller
//           name="paymentDate"
//           control={control}
//           render={({ field }) => (
//             <Input id="paymentDate" type="date" {...field} />
//           )}
//         />
//       </div>

//       {watch("supplies").length > 0 && (
//         <div className="p-4 bg-primary/5 rounded-lg space-y-2">
//           <h4 className="font-medium">Payment Summary</h4>
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
//             <div className="flex justify-between">
//               <span>Paid Amount:</span>
//               <span className="font-medium">
//                 ৳{watch("paidAmount").toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Due Amount:</span>
//               <span className="font-medium">৳{dueAmount.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit">Add Payment</Button>
//       </div>
//     </form>
//   );
// };

// export default PaymentForm;

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
// import { useGetAllSuppliesQuery } from "@/redux/features/supply/supplyApi";
// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";

// const paymentSchema = z.object({
//   supplier: z.string().min(1, "Supplier is required"),
//   supplies: z.array(z.string()).min(1, "At least one supply is required"),
//   paidAmount: z.number().min(0, "Paid amount must be non-negative"),
//   status: z.enum(["pending", "partial", "completed"]),
//   paymentDate: z.string().optional(),
// });

// type PaymentFormData = z.infer<typeof paymentSchema>;

// interface PaymentFormProps {
//   onSubmit: (data: PaymentFormData) => void;
//   onCancel?: () => void;
// }

// const PaymentForm = ({ onSubmit, onCancel }: PaymentFormProps) => {
//   const { data: usersData } = useGetAllUsersQuery(undefined);
//   const { data: suppliesData } = useGetAllSuppliesQuery(undefined);

//   const suppliers =
//     usersData?.data?.filter((user: any) => user.role === "supplier") || [];
//   const supplies = suppliesData?.data || [];

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<PaymentFormData>({
//     resolver: zodResolver(paymentSchema),
//     defaultValues: {
//       supplier: "",
//       supplies: [],
//       paidAmount: 0,
//       status: "pending",
//       paymentDate: new Date().toISOString().split("T")[0],
//     },
//   });

//   const selectedSupplier = watch("supplier");
//   const selectedSupplies = watch("supplies");
//   const paidAmount = watch("paidAmount");

//   const supplierSupplies = supplies.filter(
//     (s: any) => s.supplier === selectedSupplier && s._id
//   );

//   const calculateTotals = () => {
//     const selectedSupplyObjects = supplies.filter((s: any) =>
//       selectedSupplies.includes(s._id)
//     );

//     const totalAmount = selectedSupplyObjects.reduce(
//       (sum: number, s: any) => sum + (s.totalAmount || 0),
//       0
//     );

//     const commissionAmount = selectedSupplyObjects.reduce(
//       (sum: number, s: any) => sum + (s.commissionAmount || 0),
//       0
//     );

//     const dueAmount = Math.max(0, totalAmount - commissionAmount - paidAmount);

//     return { totalAmount, commissionAmount, dueAmount };
//   };

//   const { totalAmount, commissionAmount, dueAmount } = calculateTotals();

//   const onFormSubmit = async (data: PaymentFormData) => {
//     try {
//       // Transform data to match backend expectations
//       const submissionData = {
//         ...data,
//         totalAmount,
//         commissionAmount,
//         dueAmount,
//       };

//       await onSubmit(submissionData);
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="supplier">Supplier *</Label>
//         <Controller
//           name="supplier"
//           control={control}
//           render={({ field }) => (
//             <Select
//               onValueChange={(value) => {
//                 field.onChange(value);
//                 setValue("supplies", []);
//               }}
//               value={field.value}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select supplier" />
//               </SelectTrigger>
//               <SelectContent>
//                 {suppliers.map((supplier: any) => (
//                   <SelectItem key={supplier._id} value={supplier._id}>
//                     {supplier.profile?.name ||
//                       supplier.name ||
//                       "Unknown Supplier"}
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

//       {selectedSupplier && supplierSupplies.length > 0 && (
//         <div className="space-y-2">
//           <Label>Select Supplies *</Label>
//           <div className="max-h-32 overflow-y-auto border rounded-md p-2">
//             <Controller
//               name="supplies"
//               control={control}
//               render={({ field }) => (
//                 <>
//                   {supplierSupplies.map((supply: any) => (
//                     <div
//                       key={supply._id}
//                       className="flex items-center space-x-2 py-1"
//                     >
//                       <input
//                         type="checkbox"
//                         id={supply._id}
//                         checked={field.value.includes(supply._id)}
//                         onChange={(e) => {
//                           const updated = e.target.checked
//                             ? [...field.value, supply._id]
//                             : field.value.filter(
//                                 (id: string) => id !== supply._id
//                               );
//                           field.onChange(updated);
//                         }}
//                         className="rounded border-gray-300"
//                       />
//                       <label htmlFor={supply._id} className="text-sm">
//                         {supply.title || `Supply #${supply._id}`} - ৳
//                         {(supply.totalAmount || 0).toLocaleString()}
//                       </label>
//                     </div>
//                   ))}
//                 </>
//               )}
//             />
//           </div>
//           {errors.supplies && (
//             <p className="text-sm text-destructive">
//               {errors.supplies.message}
//             </p>
//           )}
//         </div>
//       )}

//       {selectedSupplier && supplierSupplies.length === 0 && (
//         <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
//           <p className="text-sm text-yellow-800">
//             No supplies found for this supplier.
//           </p>
//         </div>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="paidAmount">Paid Amount (BDT) *</Label>
//           <Controller
//             name="paidAmount"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="paidAmount"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={field.value}
//                 onChange={(e) =>
//                   field.onChange(parseFloat(e.target.value) || 0)
//                 }
//               />
//             )}
//           />
//           {errors.paidAmount && (
//             <p className="text-sm text-destructive">
//               {errors.paidAmount.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="status">Status *</Label>
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="partial">Partial</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.status && (
//             <p className="text-sm text-destructive">{errors.status.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="paymentDate">Payment Date</Label>
//         <Controller
//           name="paymentDate"
//           control={control}
//           render={({ field }) => (
//             <Input
//               id="paymentDate"
//               type="date"
//               value={field.value}
//               onChange={field.onChange}
//             />
//           )}
//         />
//       </div>

//       {selectedSupplies.length > 0 && (
//         <div className="p-4 bg-primary/5 rounded-lg space-y-2">
//           <h4 className="font-medium">Payment Summary</h4>
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
//             <div className="flex justify-between">
//               <span>Paid Amount:</span>
//               <span className="font-medium">
//                 ৳{paidAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Due Amount:</span>
//               <span className="font-medium">৳{dueAmount.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         {onCancel && (
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>
//         )}
//         <Button
//           type="submit"
//           disabled={isSubmitting || selectedSupplies.length === 0}
//         >
//           {isSubmitting ? "Adding..." : "Add Payment"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default PaymentForm;

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
import { useGetAllSuppliesQuery } from "@/redux/features/supply/supplyApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
  const { data: usersData, isLoading: usersLoading } =
    useGetAllUsersQuery(undefined);
  const { data: suppliesData, isLoading: suppliesLoading } =
    useGetAllSuppliesQuery(undefined);

  const suppliers =
    usersData?.data?.filter((user: any) => user.role === "supplier") || [];
  const supplies = suppliesData?.data || [];

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

  // Get supplies for the selected supplier that are not yet paid
  const supplierSupplies = supplies.filter((s: any) => {
    // Check if supply belongs to selected supplier and has outstanding amount
    const isSupplierMatch =
      s.supplier?._id === selectedSupplier || s.supplier === selectedSupplier;

    // You might want to add additional checks here for unpaid supplies
    // For example: check if supply is not already included in a completed payment
    return isSupplierMatch && s._id;
  });

  // Calculate totals based on selected supplies
  const calculateTotals = () => {
    const selectedSupplyObjects = supplies.filter((s: any) =>
      selectedSupplies.includes(s._id)
    );

    // Calculate total amount from selected supplies
    const totalAmount = selectedSupplyObjects.reduce((sum: number, s: any) => {
      // Try different possible fields for total amount
      const supplyAmount = s.totalAmount || s.amount || s.cost || 0;
      return sum + supplyAmount;
    }, 0);

    // Calculate commission amount from selected supplies
    const commissionAmount = selectedSupplyObjects.reduce(
      (sum: number, s: any) => {
        // Try different possible fields for commission
        const commission =
          s.commissionAmount ||
          s.commission ||
          (s.totalAmount * (s.commissionRate || 0)) / 100 ||
          0;
        return sum + commission;
      },
      0
    );

    const dueAmount = Math.max(0, totalAmount - commissionAmount - paidAmount);

    return {
      totalAmount: Number(totalAmount.toFixed(2)),
      commissionAmount: Number(commissionAmount.toFixed(2)),
      dueAmount: Number(dueAmount.toFixed(2)),
    };
  };

  const { totalAmount, commissionAmount, dueAmount } = calculateTotals();

  // Auto-update status based on amounts
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
      console.log("Form data before submission:", data);
      console.log("Calculated totals:", {
        totalAmount,
        commissionAmount,
        dueAmount,
      });

      // Transform data to match backend expectations
      const submissionData = {
        supplier: data.supplier,
        supplies: data.supplies,
        paidAmount: data.paidAmount,
        status: data.status,
        paymentDate: data.paymentDate || undefined,
        // Include calculated fields for validation
        totalAmount,
        commissionAmount,
        dueAmount,
      };

      console.log("Submitting payment data:", submissionData);
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Get supplier details for display
  const getSupplierDetails = (supplierId: string) => {
    return suppliers.find((s: any) => s._id === supplierId);
  };

  const currentSupplier = getSupplierDetails(selectedSupplier);

  if (usersLoading || suppliesLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Supplier Selection */}
      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier *</Label>
        <Controller
          name="supplier"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setValue("supplies", []); // Reset supplies when supplier changes
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier: any) => (
                  <SelectItem key={supplier._id} value={supplier._id}>
                    <div className="flex flex-col">
                      <span>
                        {supplier.profile?.name ||
                          supplier.name ||
                          "Unknown Supplier"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {supplier.email || supplier.profile?.email || ""}
                      </span>
                    </div>
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

      {/* Supplier Information */}
      {currentSupplier && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="font-medium text-sm text-blue-800">
            Supplier Information
          </h4>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
            <div>
              <span className="text-blue-600">Name:</span>{" "}
              {currentSupplier.profile?.name || currentSupplier.name || "N/A"}
            </div>
            <div>
              <span className="text-blue-600">Email:</span>{" "}
              {currentSupplier.email || currentSupplier.profile?.email || "N/A"}
            </div>
            <div>
              <span className="text-blue-600">Phone:</span>{" "}
              {currentSupplier.profile?.phone || currentSupplier.phone || "N/A"}
            </div>
            <div>
              <span className="text-blue-600">Available Supplies:</span>{" "}
              {supplierSupplies.length}
            </div>
          </div>
        </div>
      )}

      {/* Supplies Selection */}
      {selectedSupplier && supplierSupplies.length > 0 && (
        <div className="space-y-3">
          <Label>Select Supplies *</Label>
          <div className="max-h-48 overflow-y-auto border rounded-md p-3 bg-muted/20">
            <Controller
              name="supplies"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {supplierSupplies.map((supply: any) => (
                    <div
                      key={supply._id}
                      className="flex items-start space-x-3 p-2 rounded-md border bg-white"
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
                          autoUpdateStatus();
                        }}
                        className="rounded border-gray-300 mt-1"
                      />
                      <label
                        htmlFor={supply._id}
                        className="flex-1 text-sm cursor-pointer"
                      >
                        <div className="font-medium">
                          {supply.title || `Supply #${supply._id.slice(-6)}`}
                        </div>
                        <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
                          <span>
                            Total: ৳
                            {(
                              supply.totalAmount ||
                              supply.amount ||
                              0
                            ).toLocaleString()}
                          </span>
                          <span>
                            Commission: ৳
                            {(supply.commissionAmount || 0).toLocaleString()}
                          </span>
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
            <p className="text-sm text-destructive">
              {errors.supplies.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Selected {selectedSupplies.length} supplies
          </p>
        </div>
      )}

      {selectedSupplier && supplierSupplies.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            No available supplies found for this supplier. The supplier might
            not have any supplies or all supplies might already be paid.
          </p>
        </div>
      )}

      {/* Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paidAmount">Paid Amount (BDT) *</Label>
          <Controller
            name="paidAmount"
            control={control}
            render={({ field }) => (
              <Input
                id="paidAmount"
                type="number"
                min="0"
                step="0.01"
                value={field.value}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                  autoUpdateStatus();
                }}
                placeholder="0.00"
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
            <Input
              id="paymentDate"
              type="date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Payment Summary */}
      {selectedSupplies.length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-3 border">
          <h4 className="font-medium text-lg">Payment Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
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
              <span>Payable Amount:</span>
              <span className="font-medium">
                ৳{(totalAmount - commissionAmount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-medium text-green-600">
                ৳{paidAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 col-span-2">
              <span className="font-medium">Due Amount:</span>
              <span
                className={`font-medium ${
                  dueAmount > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ৳{dueAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || selectedSupplies.length === 0 || !isValid}
          className="min-w-24"
        >
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
