import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Plus, Volume2, CreditCard, Loader2 } from "lucide-react";
import { NameGeneration, Payment } from "@/lib/supabase";
import Link from "next/link";
import { ButtonSaying } from "@/components/button-saying";
import { useState } from "react";
import { payment } from "@/app/api";

interface GenerationHistoryProps {
  generations: NameGeneration[];
  payments: Payment[];
}

export function GenerationHistory({
  generations,
  payments,
}: GenerationHistoryProps) {
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async (creditAmount: number) => {
    setIsPurchasing(true);
    try {
      const data = await payment({ credits: creditAmount });
      if (data?.checkout_url) {
        window.location.href = data?.checkout_url;
      } else {
        console.error("Payment creation failed:", data.error);
        alert("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment system error. Please try again.");
    } finally {
      setIsPurchasing(false);
      setShowPurchaseDialog(false);
    }
  };

  const hasSuccessfulPayments = payments?.some(
    (payment) => payment.status === "completed",
  );

  return (
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
          <div className="text-center py-8">
            <Sparkles className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-900 mb-2">
              No names generated yet
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Create your first Chinese name to get started
            </p>
            <Link href="/generate">
              <Button size="sm">
                Generate Your First Name
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {generations.map((generation: NameGeneration, index) => (
              <Card
                key={generation.id}
                className="border-l-4 border-l-indigo-500"
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-indigo-600">
                          {generation.generated_name.chinese_name}
                        </h3>
                        <ButtonSaying
                          text={generation.generated_name.chinese_name}
                          lang="zh-CN"
                          variant="ghost"
                          size="sm"
                          className="text-xs px-2 py-1 h-6 w-6"
                        >
                          <Volume2 className="h-3 w-3" />
                        </ButtonSaying>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-base text-gray-600">
                          {generation.generated_name.pinyin}
                        </p>
                      </div>
                      {generation.generated_name.traditional && (
                        <p className="text-xs text-gray-500">
                          Traditional: {generation.generated_name.traditional}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {new Date(generation.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="relative">
                    {/* Check if user has any successful payments */}
                    {!hasSuccessfulPayments && (
                      <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                        <div className="text-center space-y-2 max-w-xs mx-auto p-4">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            <CreditCard className="h-8 w-8 mx-auto mb-2 text-indigo-500" />
                            <h4 className="text-sm font-bold text-gray-900 mb-1">
                              Premium Content
                            </h4>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            Unlock detailed meanings and cultural insights
                          </p>
                          <Dialog
                            open={showPurchaseDialog}
                            onOpenChange={setShowPurchaseDialog}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs px-3 py-1"
                              >
                                <Sparkles className="mr-1 h-3 w-3" />
                                Unlock
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              {isPurchasing ? (
                                <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                                  <div className="text-center space-y-2">
                                    <h3 className="text-lg font-medium">
                                      Processing Payment
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      Please wait while we redirect you to
                                      checkout...
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <DialogHeader>
                                    <DialogTitle>Purchase Credits</DialogTitle>
                                    <DialogDescription>
                                      Choose how many credits you'd like to
                                      purchase. Each name generation costs 1
                                      credit ($5).
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-4">
                                      <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                                        <CardHeader className="text-center pb-2">
                                          <CardTitle className="text-lg">
                                            1 Credit
                                          </CardTitle>
                                          <div className="text-2xl font-bold">
                                            $5
                                          </div>
                                          <CardDescription className="text-xs">
                                            Perfect for trying it out
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                          <Button
                                            className="w-full"
                                            onClick={() => handlePurchase(1)}
                                          >
                                            Purchase 1 Credit
                                          </Button>
                                        </CardContent>
                                      </Card>

                                      <Card className="border-2 border-indigo-200 bg-indigo-50 hover:border-indigo-300 transition-colors">
                                        <CardHeader className="text-center pb-2">
                                          <CardTitle className="text-lg">
                                            5 Credits
                                          </CardTitle>
                                          <div className="text-2xl font-bold">
                                            $20
                                          </div>
                                          <CardDescription className="text-xs">
                                            <span className="line-through text-gray-500">
                                              $25
                                            </span>
                                            <span className="text-green-600 ml-1">
                                              Save $5!
                                            </span>
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                          <Button
                                            className="w-full"
                                            onClick={() => handlePurchase(5)}
                                          >
                                            Purchase 5 Credits
                                          </Button>
                                        </CardContent>
                                      </Card>

                                      <Card className="border-2 border-purple-200 bg-purple-50 hover:border-purple-300 transition-colors">
                                        <CardHeader className="text-center pb-2">
                                          <CardTitle className="text-lg">
                                            10 Credits
                                          </CardTitle>
                                          <div className="text-2xl font-bold">
                                            $35
                                          </div>
                                          <CardDescription className="text-xs">
                                            <span className="line-through text-gray-500">
                                              $50
                                            </span>
                                            <span className="text-green-600 ml-1">
                                              Save $15!
                                            </span>
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                          <Button
                                            className="w-full"
                                            onClick={() => handlePurchase(10)}
                                          >
                                            Purchase 10 Credits
                                          </Button>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Meaning
                        </h4>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          {generation.generated_name.meaning}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Cultural Significance
                        </h4>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          {generation.generated_name.cultural_significance}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
