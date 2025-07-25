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
import { Input } from "@/components/ui/input";
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
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { NameGeneration, Payment } from "@/lib/supabase";
import Link from "next/link";
import { getUserData, payment } from "@/app/api";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user } = useAuth();
  const { credits, generations, setCredits, setGenerations } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Profile editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
  });

  // Password change states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  // Initialize profile form when user data is available
  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
      });
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

  const handleUpdateProfile = async () => {
    if (!profileForm.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    setIsUpdatingProfile(true);
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: profileForm.fullName.trim() },
      });

      if (updateError) throw updateError;

      // Update email if changed
      if (profileForm.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: profileForm.email,
        });

        if (emailError) throw emailError;

        toast.success(
          "Profile updated! Check your email to confirm the email change."
        );
      } else {
        toast.success("Profile updated successfully!");
      }

      setIsEditingProfile(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Failed to update password:", error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setProfileForm({
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
    });
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
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
                    {payments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No transactions yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {payments.map((payment: Payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
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
                                  {payment.credits_purchased !== 1
                                    ? "s"
                                    : ""}{" "}
                                  purchased
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    payment.created_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-medium text-gray-900">
                                ${Number(payment.amount).toFixed(2)}
                              </div>
                              <div
                                className={`text-xs px-2 py-1 rounded-full ${
                                  payment.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : payment.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
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
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information
                        </CardDescription>
                      </div>
                      {!isEditingProfile && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        {isEditingProfile ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <Input
                                value={profileForm.fullName}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    fullName: e.target.value,
                                  })
                                }
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <Input
                                type="email"
                                value={profileForm.email}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    email: e.target.value,
                                  })
                                }
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={handleUpdateProfile}
                                disabled={isUpdatingProfile}
                                size="sm"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                {isUpdatingProfile
                                  ? "Saving..."
                                  : "Save Changes"}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleCancelEdit}
                                disabled={isUpdatingProfile}
                                size="sm"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-lg font-medium">
                              {user?.user_metadata?.full_name || "User"}
                            </h3>
                            <p className="text-gray-600">{user?.email}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Password Change */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your account password
                        </CardDescription>
                      </div>
                      {!isChangingPassword && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsChangingPassword(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isChangingPassword ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <Input
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) =>
                                setPasswordForm({
                                  ...passwordForm,
                                  newPassword: e.target.value,
                                })
                              }
                              placeholder="Enter new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  new: !showPasswords.new,
                                })
                              }
                            >
                              {showPasswords.new ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <Input
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) =>
                                setPasswordForm({
                                  ...passwordForm,
                                  confirmPassword: e.target.value,
                                })
                              }
                              placeholder="Confirm new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  confirm: !showPasswords.confirm,
                                })
                              }
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleUpdatePassword}
                            disabled={isUpdatingPassword}
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isUpdatingPassword
                              ? "Updating..."
                              : "Update Password"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancelPasswordChange}
                            disabled={isUpdatingPassword}
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Click "Change Password" to update your password
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Manage your notification and language preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <Button variant="outline">Save Preferences</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
