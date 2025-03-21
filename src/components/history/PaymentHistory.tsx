import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Download, Filter, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useAuth } from "../auth/AuthContext";
import { getUserItems } from "../../utils/supabase";

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "planned";
  method: string;
  notes?: string;
}

interface PaymentHistoryProps {
  payments?: PaymentRecord[];
  onExport?: () => void;
}

const PaymentHistory = ({
  payments: initialPayments,
  onExport = () => console.log("Exporting payment history..."),
}: PaymentHistoryProps) => {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // If initial payments are provided, use them
    if (initialPayments && initialPayments.length > 0) {
      setPayments(initialPayments);
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      if (!user) {
        // Use empty array if no user is logged in
        setPayments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await getUserItems<PaymentRecord>(
          "zakat_payments",
          user.id
        );

        if (error) {
          console.error("Error fetching payment history:", error);
          setPayments([]);
          return;
        }

        setPayments(data || []);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setPayments([]);
      } finally {
        // Set loading to false after a short delay to prevent flashing
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchPayments();
  }, [user, initialPayments]);

  const years = [
    "all",
    ...new Set(payments.map((p) => new Date(p.date).getFullYear().toString())),
  ];

  const filteredPayments = payments.filter((payment) => {
    const paymentYear = new Date(payment.date).getFullYear().toString();
    return (
      (yearFilter === "all" || paymentYear === yearFilter) &&
      (statusFilter === "all" || payment.status === statusFilter)
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "planned":
        return <Badge className="bg-blue-500">Planned</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Payment History</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 text-gray-500" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell className="font-medium">
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell className="text-gray-500">
                      {payment.notes || "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-gray-500"
                  >
                    No payment records found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
