"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { CreditCard, History, Settings } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { payment } from "@/app/api";
import { PageLoading } from "@/components/common/loading-overlay";
import { paymentToast } from "@/lib/utils/toast-helpers";

// Import our new components
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import { PasswordChanger } from "@/components/dashboard/password-changer";
import { GenerationHistory } from "@/components/dashboard/generation-history";
import { CreditPurchase } from "@/components/dashboard/credit-purchase";
import { PaymentHistory } from "@/components/dashboard/payment-history";

export default function DashboardPage() {
  const { user } = useAuth();
  const { credits, generations, payments, isLoading } = useAppStore();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async (creditAmount: number) => {
    setIsPurchasing(true);
    try {
      const data = await payment({ credits: creditAmount });
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.error("Payment creation failed:", data.error);
        paymentToast.createPaymentError();
      }
    } catch (error) {
      console.error("Payment error:", error);
      paymentToast.systemError();
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to view your dashboard
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoading text="Loading your dashboard..." />;
  }

  return (
    <div className="container mx-auto px-3 py-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back,{" "}
            {user?.user_metadata?.full_name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-base text-gray-600">
            Manage your Chinese names, credits, and account settings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <StatsCards
            credits={credits}
            generationsCount={generations.length}
            user={user}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger
                value="history"
                className="flex items-center justify-center space-x-2"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Generation History</span>
              </TabsTrigger>
              <TabsTrigger
                value="credits"
                className="flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Credits & Billing</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center justify-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <GenerationHistory
                generations={generations}
                payments={payments}
              />
            </TabsContent>

            <TabsContent value="credits">
              <div className="space-y-4">
                <CreditPurchase
                  onPurchase={handlePurchase}
                  isPurchasing={isPurchasing}
                />
                <PaymentHistory payments={payments} />
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <ProfileEditor user={user} />
                <PasswordChanger />
                {/* <UserPreferences /> */}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
