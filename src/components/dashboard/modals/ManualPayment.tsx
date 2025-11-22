/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetSupplyBySupplierIdQuery } from "@/redux/features/supply/supplyApi";
import { useManualPaymentMutation } from "@/redux/features/payments/paymentsApi";
import { toast } from "sonner";

type ManualPaymentForm = {
    supplier: string;
    supplies: string[];
    totalAmount: number;
    commissionAmount: number;
    netAmount: number;
    paidAmount: number;
    dueAmount: number;
    status: "paid" | "partial" | "unpaid";
    paymentDate: Date;
    manualPaymentDetails: {
        description: string;
        referenceNumber: string;
        paymentMethod: string;
    };
};

const ManualPayment = () => {
    const { data: usersData } = useGetAllUsersQuery(undefined);
    const [manualPayment] = useManualPaymentMutation();

    const suppliers =
        usersData?.data?.items.filter((user: any) => user.role === "supplier") || [];

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
    } = useForm<ManualPaymentForm>({
        defaultValues: {
            supplier: "",
            supplies: [],
            totalAmount: 0,
            commissionAmount: 0,
            netAmount: 0,
            paidAmount: 0,
            dueAmount: 0,
            status: "partial",
            paymentDate: new Date(),
            manualPaymentDetails: {
                description: "",
                referenceNumber: "",
                paymentMethod: "",
            },
        },
    });

    const selectedSupplierId = watch("supplier");
    const { data: suppliesData } = useGetSupplyBySupplierIdQuery(selectedSupplierId,
        {
            skip: !selectedSupplierId,
        }
    );

    const [supplies, setSupplies] = useState([]);

    useEffect(() => {
        if (suppliesData?.data && Array.isArray(suppliesData.data)) {
            const keyword = searchTerm.toLowerCase();
            const filtered = suppliesData.data.filter((supply: any) =>
                (supply.name || "").toLowerCase().includes(keyword)
            );
            setSupplies(filtered);
        }
    }, [searchTerm, suppliesData?.data]);

    const onSubmit = async (data: ManualPaymentForm) => {
        const paymentDetails: ManualPaymentForm = {
            ...data,
            paymentDate: new Date(data.paymentDate),
        };
        const toastId = toast.loading("adding payment....");
        try {
            await manualPayment(paymentDetails).unwrap();
            toast.success("payment successful", {
                id: toastId
            })
            setOpen(false);
            reset();
        } catch (error: any) {
            toast.error("failed to payment...", {
                id: toastId,
            })
            console.log("error:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Manual Payment</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Manual Payment</DialogTitle>
                        <DialogDescription>
                            Create new payment entry manually.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Supplier Select */}
                        <div>
                            <Label>Supplier</Label>
                            <Controller
                                name="supplier"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select supplier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {suppliers.map((supplier: any) => (
                                                <SelectItem key={supplier._id} value={supplier._id}>
                                                    {supplier.profile?.name || supplier.email}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Supplies with Search */}
                        <div>
                            <Label>Supplies</Label>
                            <Controller
                                name="supplies"
                                control={control}
                                render={({ field }) => {

                                    return (
                                        <div className="space-y-2 border rounded-md p-2">
                                            <Input
                                                type="text"
                                                placeholder="Search product by name..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            {supplies.length === 0 ? (
                                                <div className="text-muted-foreground text-sm py-2">
                                                    No matching supplies found.
                                                </div>
                                            ) : (
                                                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                                                    {supplies.map((supply: any) => {
                                                        const supplyId = supply._id;
                                                        const name = supply?.name
                                                        const isChecked = field.value.includes(supplyId);

                                                        return (
                                                            <label
                                                                key={supplyId}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={supplyId}
                                                                    checked={isChecked}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        const newValues = new Set(field.value);
                                                                        if (checked) {
                                                                            newValues.add(supplyId);
                                                                        } else {
                                                                            newValues.delete(supplyId);
                                                                        }
                                                                        field.onChange(Array.from(newValues));
                                                                    }}
                                                                />
                                                                <span>{name}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </div>

                        {/* Amount Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Total Amount</Label>
                                <Input
                                    type="number"
                                    {...register("totalAmount", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label>Commission</Label>
                                <Input
                                    type="number"
                                    {...register("commissionAmount", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label>Net Amount</Label>
                                <Input
                                    type="number"
                                    {...register("netAmount", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label>Paid Amount</Label>
                                <Input
                                    type="number"
                                    {...register("paidAmount", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label>Due Amount</Label>
                                <Input
                                    type="number"
                                    {...register("dueAmount", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label>Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="paid">Paid</SelectItem>
                                                <SelectItem value="partial">Partial</SelectItem>
                                                <SelectItem value="unpaid">Unpaid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Date Input */}
                        <div>
                            <Label>Payment Date</Label>
                            <Input
                                type="date"
                                {...register("paymentDate", {
                                    required: true,
                                })}
                            />
                        </div>

                        {/* Manual Details */}
                        <div>
                            <Label>Description</Label>
                            <Textarea {...register("manualPaymentDetails.description")} />
                        </div>
                        <div>
                            <Label>Reference Number</Label>
                            <Input {...register("manualPaymentDetails.referenceNumber")} />
                        </div>
                        <div>
                            <Label>Payment Method</Label>
                            <Input {...register("manualPaymentDetails.paymentMethod")} />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit Payment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ManualPayment;