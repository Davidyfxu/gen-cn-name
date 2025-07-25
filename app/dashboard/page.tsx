"use client";

import { useEffect, useState } from "react";
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
import { Payment } from "@/lib/supabase";
import { getUserData, payment } from "@/app/api";

// Import our new components
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import { PasswordChanger } from "@/components/dashboard/password-changer";
import { GenerationHistory } from "@/components/dashboard/generation-history";
import { CreditPurchase } from "@/components/dashboard/credit-purchase";
import { PaymentHistory } from "@/components/dashboard/payment-history";
import { UserPreferences } from "@/components/dashboard/user-preferences";

export default function DashboardPage() {
  const { user } = useAuth();
  const { credits, generations, setCredits, setGenerations } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setCredits(data.credits || 0);
      setGenerations(data.generations || []);
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (creditAmount: number) => {
    setIsPurchasing(true);
    try {
      const data = await payment({ credits: creditAmount });
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.error("Payment creation failed:", data.error);
        alert("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment system error. Please try again.");
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
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
                className="flex items-center space-x-2"
              >
                <History className="h-4 w-4" />
                <span>Generation History</span>
              </TabsTrigger>
              <TabsTrigger
                value="credits"
                className="flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Credits & Billing</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <GenerationHistory generations={generations} />
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
