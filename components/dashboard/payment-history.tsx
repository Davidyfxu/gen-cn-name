import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Payment } from "@/lib/supabase";

interface PaymentHistoryProps {
  payments: Payment[];
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your past purchases and payments</CardDescription>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-2">
            {payments.map((payment: Payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Credit Purchase
                    </h4>
                    <p className="text-sm text-gray-600">
                      {payment.credits_purchased} credit
                      {payment.credits_purchased !== 1 ? "s" : ""} purchased
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium text-gray-900">
                    ${Number(payment.amount).toFixed(2)}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
