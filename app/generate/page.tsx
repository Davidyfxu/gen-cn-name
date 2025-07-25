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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  FileText,
  CreditCard,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { redirect } from "next/navigation";
import { generateName, payment } from "@/app/api";

interface FormData {
  age: string;
  name: string;
  hobbies: string;
  expectations: string;
  chinaKnowledge: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function GeneratePage() {
  const { user } = useAuth();
  const { credits } = useAppStore();

  const [formData, setFormData] = useState<FormData>({
    age: "",
    name: "",
    hobbies: "",
    expectations: "",
    chinaKnowledge: "",
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'd love to help you find the perfect Chinese name. Can you tell me a bit about yourself? What's your name, age, and what are you hoping your Chinese name will represent?",
    },
  ]);

  const [chatInput, setChatInput] = useState("");
  const [generatedName, setGeneratedName] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  if (!user) {
    redirect("/");
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credits < 1) {
      // Redirect to payment
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateName({ type: "form", data: formData });
      setGeneratedName(result);
    } catch (error) {
      console.error("Generation failed:", error);
    }
    setIsGenerating(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || credits < 1) return;

    const newMessages = [
      ...chatMessages,
      { role: "user" as const, content: chatInput },
    ];
    setChatMessages(newMessages);
    setChatInput("");

    setIsGenerating(true);
    try {
      const result = await generateName({ type: "chat", data: newMessages });
      setGeneratedName(result);
    } catch (error) {
      console.error("Generation failed:", error);
    }
    setIsGenerating(false);
  };

  const handlePurchase = async (creditAmount: number) => {
    setIsPurchasing(true);
    try {
      const data = await payment({ credits: creditAmount });
      if (data?.checkout_url) {
        // Redirect to Creem.io checkout
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

  if (generatedName) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl">Your Chinese Name</CardTitle>
              <CardDescription>
                Here's your personalized Chinese name with cultural meaning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-indigo-600">
                  {generatedName.chinese_name}
                </div>
                <div className="text-2xl text-gray-600">
                  {generatedName.pinyin}
                </div>
                {generatedName.traditional && (
                  <div className="text-lg text-gray-500">
                    Traditional: {generatedName.traditional}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Meaning & Significance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {generatedName.meaning}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Cultural Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {generatedName.cultural_significance}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={() => setGeneratedName(null)}>
                  Generate Another
                </Button>
                <Button variant="outline">Save to Profile</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Your Chinese Name
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Choose your preferred method to provide information for your
            personalized Chinese name
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Credits: {credits}</span>
            </div>
            <span>•</span>
            <span>$5 per generation</span>
          </div>
        </div>

        {credits < 1 ? (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Insufficient Credits</CardTitle>
              <CardDescription>
                You need at least 1 credit to generate a name
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Dialog
                open={showPurchaseDialog}
                onOpenChange={setShowPurchaseDialog}
              >
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Purchase Credits
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Purchase Credits</DialogTitle>
                    <DialogDescription>
                      Choose how many credits you'd like to purchase. Each name
                      generation costs 1 credit ($5).
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                      <Card className="border-2 border-gray-200">
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">1 Credit</CardTitle>
                          <div className="text-2xl font-bold">$5</div>
                          <CardDescription className="text-xs">
                            Perfect for trying it out
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(1)}
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Purchase 1 Credit"
                            )}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-indigo-200 bg-indigo-50">
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">5 Credits</CardTitle>
                          <div className="text-2xl font-bold">$20</div>
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
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Purchase 5 Credits"
                            )}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-purple-200 bg-purple-50">
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">10 Credits</CardTitle>
                          <div className="text-2xl font-bold">$35</div>
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
                            disabled={isPurchasing}
                          >
                            {isPurchasing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Purchase 10 Credits"
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Structured Form</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Natural Conversation</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Tell Us About Yourself</CardTitle>
                  <CardDescription>
                    Fill out this form to help us create the perfect Chinese
                    name for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Age</label>
                        <Input
                          type="number"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                          placeholder="Your age"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Hobbies & Interests
                      </label>
                      <Textarea
                        value={formData.hobbies}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hobbies: e.target.value,
                          }))
                        }
                        placeholder="What do you enjoy doing? (e.g., reading, traveling, music, sports)"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Expectations & Aspirations
                      </label>
                      <Textarea
                        value={formData.expectations}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            expectations: e.target.value,
                          }))
                        }
                        placeholder="What qualities would you like your Chinese name to represent? What are your life goals?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Knowledge of China
                      </label>
                      <Textarea
                        value={formData.chinaKnowledge}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            chinaKnowledge: e.target.value,
                          }))
                        }
                        placeholder="Tell us about your connection to or knowledge of Chinese culture"
                        rows={3}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Your Name...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate My Chinese Name
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Chat with Our AI</CardTitle>
                  <CardDescription>
                    Have a natural conversation to help us understand what kind
                    of Chinese name would suit you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4 bg-gray-50">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.role === "user"
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-900 border"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleChatSubmit}
                      className="flex space-x-2"
                    >
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isGenerating}
                      />
                      <Button
                        type="submit"
                        disabled={isGenerating || !chatInput.trim()}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Send"
                        )}
                      </Button>
                    </form>

                    {chatMessages.length > 1 && (
                      <Button
                        onClick={() =>
                          handleChatSubmit({ preventDefault: () => {} } as any)
                        }
                        className="w-full"
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Your Name...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate My Chinese Name
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
