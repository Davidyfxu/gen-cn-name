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
import {
  CreditCard,
  History,
  Settings,
  Sparkles,
  Calendar,
  User,
  Plus,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { NameGeneration } from "@/lib/supabase";
import Link from "next/link";
import {getUserData, payment} from "@/app/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const { credits, generations, setCredits, setGenerations } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const data = await getUserData()
      setCredits(data.credits || 0);
      setGenerations(data.generations || []);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (creditAmount: number) => {
    setIsPurchasing(true);
    try {
      const data = await payment({ credits: creditAmount })
      if (data?.checkout_url) {
        // Redirect to Creem.io checkout
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.user_metadata?.full_name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your Chinese names, credits, and account settings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Credits
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{credits}</div>
              <p className="text-xs text-muted-foreground">
                Each generation costs 1 credit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Names Generated
              </CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generations.length}</div>
              <p className="text-xs text-muted-foreground">
                Total names created
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Member Since
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Recently"}
              </div>
              <p className="text-xs text-muted-foreground">
                Account creation date
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
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
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Generated Names</CardTitle>
                      <CardDescription>
                        All the Chinese names you've created with their meanings
                      </CardDescription>
                    </div>
                    <Link href="/generate">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate New Name
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {generations.length === 0 ? (
                    <div className="text-center py-12">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No names generated yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Create your first Chinese name to get started
                      </p>
                      <Link href="/generate">
                        <Button>
                          Generate Your First Name
                          <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {generations.map((generation: NameGeneration, index) => (
                        <Card
                          key={generation.id}
                          className="border-l-4 border-l-indigo-500"
                        >
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-indigo-600">
                                  {generation.generated_name.chinese_name}
                                </h3>
                                <p className="text-lg text-gray-600">
                                  {generation.generated_name.pinyin}
                                </p>
                                {generation.generated_name.traditional && (
                                  <p className="text-sm text-gray-500">
                                    Traditional:{" "}
                                    {generation.generated_name.traditional}
                                  </p>
                                )}
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                {new Date(
                                  generation.created_at
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Meaning
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {generation.generated_name.meaning}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Cultural Significance
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {
                                    generation.generated_name
                                      .cultural_significance
                                  }
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credits">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Credits</CardTitle>
                    <CardDescription>
                      Buy credits to generate more Chinese names. Each name
                      generation costs 1 credit ($5).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-2 border-gray-200">
                        <CardHeader className="text-center">
                          <CardTitle className="text-lg">1 Credit</CardTitle>
                          <div className="text-3xl font-bold">$5</div>
                          <CardDescription>
                            Perfect for trying it out
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(1)}
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? "Processing..." : "Purchase"}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-indigo-200 bg-indigo-50">
                        <CardHeader className="text-center">
                          <CardTitle className="text-lg">5 Credits</CardTitle>
                          <div className="text-3xl font-bold">$20</div>
                          <CardDescription>
                            <span className="line-through text-gray-500">
                              $25
                            </span>
                            <span className="text-green-600 ml-1">
                              Save $5!
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(5)}
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? "Processing..." : "Purchase"}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-purple-200 bg-purple-50">
                        <CardHeader className="text-center">
                          <CardTitle className="text-lg">10 Credits</CardTitle>
                          <div className="text-3xl font-bold">$35</div>
                          <CardDescription>
                            <span className="line-through text-gray-500">
                              $50
                            </span>
                            <span className="text-green-600 ml-1">
                              Save $15!
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(10)}
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? "Processing..." : "Purchase"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      View your past purchases and payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      No transactions yet
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {user?.user_metadata?.full_name || "User"}
                      </h3>
                      <p className="text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Notifications
                      </h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded"
                            defaultChecked
                          />
                          <span className="text-sm">
                            Email notifications for new features
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded"
                            defaultChecked
                          />
                          <span className="text-sm">Payment confirmations</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Language Preferences
                      </h4>
                      <select className="w-full p-2 border rounded-md">
                        <option>English</option>
                        <option>Chinese (Simplified)</option>
                        <option>Chinese (Traditional)</option>
                      </select>
                    </div>

                    <Button variant="outline">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
