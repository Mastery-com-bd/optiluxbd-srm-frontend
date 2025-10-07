/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { mockUsers } from "@/data/mockData";
// import { useState } from "react";
// // import { useToast } from '@/hooks/use-toast';
// import { Edit, Save, X } from "lucide-react";
// import { toast } from "sonner";

// interface CommissionRateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CommissionRateModal = ({ isOpen, onClose }: CommissionRateModalProps) => {
//   // const { toast } = useToast();
//   const [suppliers] = useState(
//     mockUsers.filter((user) => user.role === "supplier")
//   );
//   const [commissionRates, setCommissionRates] = useState<
//     Record<string, number>
//   >(
//     suppliers.reduce((acc, supplier) => {
//       acc[supplier._id] = 12; // Default commission rate
//       return acc;
//     }, {} as Record<string, number>)
//   );
//   const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
//   const [tempRate, setTempRate] = useState<number>(0);

//   const handleEditCommission = (supplierId: string) => {
//     setEditingSupplier(supplierId);
//     setTempRate(commissionRates[supplierId]);
//   };

//   const handleSaveCommission = (supplierId: string) => {
//     setCommissionRates((prev) => ({
//       ...prev,
//       [supplierId]: tempRate,
//     }));
//     setEditingSupplier(null);
//     toast.success("The commission rate has been updated successfully.");
//   };

//   const handleCancelEdit = () => {
//     setEditingSupplier(null);
//     setTempRate(0);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Commission Rate Management</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Commission Settings</CardTitle>
//               <CardDescription>
//                 Manage commission rates for all suppliers. These rates will be
//                 applied to new supplies.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Supplier</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Phone</TableHead>
//                     <TableHead>Commission Rate (%)</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {suppliers.map((supplier) => (
//                     <TableRow key={supplier._id}>
//                       <TableCell className="font-medium">
//                         {supplier.profile.name}
//                       </TableCell>
//                       <TableCell>{supplier.email}</TableCell>
//                       <TableCell>{supplier.profile.phone}</TableCell>
//                       <TableCell>
//                         {editingSupplier === supplier._id ? (
//                           <div className="flex items-center space-x-2">
//                             <Input
//                               type="number"
//                               min="0"
//                               max="100"
//                               step="0.1"
//                               value={tempRate}
//                               onChange={(e) =>
//                                 setTempRate(parseFloat(e.target.value) || 0)
//                               }
//                               className="w-20"
//                             />
//                             <span>%</span>
//                           </div>
//                         ) : (
//                           <span className="font-medium">
//                             {commissionRates[supplier._id]}%
//                           </span>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {editingSupplier === supplier._id ? (
//                           <div className="flex items-center space-x-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => handleSaveCommission(supplier._id)}
//                             >
//                               <Save className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={handleCancelEdit}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ) : (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => handleEditCommission(supplier._id)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Commission Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold">{suppliers.length}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Total Suppliers
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold">
//                     {(
//                       Object.values(commissionRates).reduce(
//                         (sum, rate) => sum + rate,
//                         0
//                       ) / suppliers.length
//                     ).toFixed(1)}
//                     %
//                   </p>
//                   <p className="text-sm text-muted-foreground">Average Rate</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold">
//                     {Math.min(...Object.values(commissionRates))}% -{" "}
//                     {Math.max(...Object.values(commissionRates))}%
//                   </p>
//                   <p className="text-sm text-muted-foreground">Rate Range</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CommissionRateModal;

// Updated CommissionRateModal.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUsersQuery,
  useUpdateMeMutation,
} from "@/redux/features/user/userApi"; // Assume update user endpoint for commission
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CommissionRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommissionRateModal = ({ isOpen, onClose }: CommissionRateModalProps) => {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateMeMutation();
  const suppliers =
    usersData?.data?.filter((user: any) => user.role === "supplier") || [];
  const [commissionRates, setCommissionRates] = useState<
    Record<string, number>
  >(
    suppliers.reduce((acc: any, supplier: any) => {
      acc[supplier._id] = supplier.commissionRate || 12; // Assume commissionRate in user profile
      return acc;
    }, {})
  );
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);

  const handleEditCommission = (supplierId: string) => {
    setEditingSupplier(supplierId);
    setTempRate(commissionRates[supplierId]);
  };

  const handleSaveCommission = async (supplierId: string) => {
    try {
      await updateUser({ id: supplierId, commissionRate: tempRate }).unwrap(); // Assume body { commissionRate }
      setCommissionRates((prev) => ({
        ...prev,
        [supplierId]: tempRate,
      }));
      setEditingSupplier(null);
      toast.success("The commission rate has been updated successfully.");
    } catch {
      toast.error("Failed to update commission rate.");
    }
  };

  const handleCancelEdit = () => {
    setEditingSupplier(null);
    setTempRate(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Commission Rate Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
              <CardDescription>
                Manage commission rates for all suppliers. These rates will be
                applied to new supplies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Commission Rate (%)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier: any) => (
                    <TableRow key={supplier._id}>
                      <TableCell className="font-medium">
                        {supplier.profile.name}
                      </TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.profile.phone}</TableCell>
                      <TableCell>
                        {editingSupplier === supplier._id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={tempRate}
                              onChange={(e) =>
                                setTempRate(parseFloat(e.target.value) || 0)
                              }
                              className="w-20"
                            />
                            <span>%</span>
                          </div>
                        ) : (
                          <span className="font-medium">
                            {commissionRates[supplier._id]}%
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingSupplier === supplier._id ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSaveCommission(supplier._id)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditCommission(supplier._id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{suppliers.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Suppliers
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {(
                      Object.values(commissionRates).reduce(
                        (sum: number, rate: any) => sum + rate,
                        0
                      ) / suppliers.length
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Average Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {Math.min(...Object.values(commissionRates))}% -{" "}
                    {Math.max(...Object.values(commissionRates))}%
                  </p>
                  <p className="text-sm text-muted-foreground">Rate Range</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionRateModal;
