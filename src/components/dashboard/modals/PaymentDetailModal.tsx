/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface PaymentDetailModalProps {
  payment: any;
  isOpen: boolean;
  onClose: () => void;
}

// Styled PDF component
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#111",
  },
  section: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: "1px solid #ccc",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  supplyCard: {
    padding: 8,
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  paidText: {
    color: "green",
  },
  dueText: {
    color: "red",
  },
});

// PDF component
const MyInvoicePDF = ({ payment }: { payment: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Invoice for Payment #{payment?._id}</Text>
      <View style={styles.section}>
        <Text style={styles.text}>
          Payment Date: {new Date(payment?.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>Status: {payment?.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Supplier Info</Text>
        <Text style={styles.text}>
          Name: {payment?.supplier?.profile?.name || "Unknown"}
        </Text>
        <Text style={styles.text}>
          Email: {payment?.supplier?.email || "N/A"}
        </Text>
        <Text style={styles.text}>
          Phone: {payment?.supplier?.profile?.phone || "N/A"}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Payment Summary</Text>
        <View style={styles.row}>
          <Text>Total Payable:</Text>
          <Text>{payment?.netAmount} BDT</Text>
        </View>
        <View style={styles.row}>
          <Text>Commission:</Text>
          <Text>{payment?.commissionAmount} BDT</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "green" }}>Paid:</Text>
          <Text style={styles.paidText}>{payment?.paidAmount} BDT</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "red" }}>Due:</Text>
          <Text style={styles.dueText}>{payment?.dueAmount} BDT</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Supplies ({payment?.supplies?.length || 0})</Text>
        {(payment?.supplies || []).map((supply: any, index: number) => (
          <View key={index} style={styles.supplyCard}>
            <Text>Supply ID: {supply?._id}</Text>
            <Text>
              Quantity:{" "}
              {supply?.products?.reduce((sum: number, p: any) => sum + p.quantity, 0) ?? 0}
            </Text>
            <Text>Commission: {supply?.commissionRate ?? "N/A"}%</Text>
            <Text>Total: {supply?.totalAmount ?? "N/A"} BDT</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Modal UI Component
export const PaymentDetailModal = ({
  payment,
  isOpen,
  onClose,
}: PaymentDetailModalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const variants = {
    pending: "secondary" as const,
    completed: "default" as const,
    partial: "secondary" as const,
  } as const;

  type PaymentStatus = keyof typeof variants;

  const getStatusBadge = (status: PaymentStatus) => {
    const variant = variants[status] ?? variants.completed;
    const label =
      String(status).charAt(0).toUpperCase() + String(status).slice(1);
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div id="payment-details">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              View and download individual payment breakdown.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  Payment #{payment?._id}
                </h3>
                <p className="text-muted-foreground">
                  Created on{" "}
                  {payment?.createdAt
                    ? new Date(payment.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              {getStatusBadge(payment?.status || "pending")}
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-6">
              {/* Supplier Info */}
              <div className="space-y-4">
                <h4 className="font-medium">Supplier Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium">
                      {payment?.supplier?.profile?.name || "Unknown Supplier"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">
                      {payment?.supplier?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">
                      {payment?.supplier?.profile?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Summary */}
              <div className="space-y-4">
                <h4 className="font-medium">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payable Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(payment?.netAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission:</span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(payment?.commissionAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(payment?.paidAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(payment?.dueAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            {/* Supplies */}
            <div className="space-y-4">
              <h4 className="font-medium">
                Related Supplies ({payment?.supplies?.length || 0})
              </h4>
              <div className="space-y-2">
                {(payment?.supplies || []).map((supply: any) => (
                  <div
                    key={supply._id}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Supply #{supply._id}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity:{" "}
                        {supply?.products?.reduce(
                          (sum: number, p: any) => sum + p.quantity,
                          0
                        ) ?? 0}{" "}
                        | Commission: {supply?.commissionRate ?? "N/A"}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(supply?.totalAmount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Commission:{" "}
                        {formatCurrency(supply?.commissionAmount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            {/* Footer */}
            <div className="grid grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-muted-foreground">Payment Date:</span>
                <p className="font-medium">
                  {payment?.paymentDate
                    ? new Date(payment.paymentDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <p className="font-medium">
                  {payment?.updatedAt
                    ? new Date(payment.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                {payment && (
                  <PDFDownloadLink
                    document={<MyInvoicePDF payment={payment} />}
                    fileName={`invoice-${payment._id}.pdf`}
                  >
                    {({ loading }) => (
                      <Button disabled={loading}>
                        {loading ? "Generating..." : "Download Invoice"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentDetailModal;