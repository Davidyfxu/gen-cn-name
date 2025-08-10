"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, User, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";

interface DemoSectionProps {
  onShowAuthModal: () => void;
}

export function DemoSection({ onShowAuthModal }: DemoSectionProps) {
  const { user } = useAuth();
  const [demoName, setDemoName] = useState("");
  const [demoSex, setDemoSex] = useState("");

  const handleDemoGenerate = () => {
    if (!user) {
      onShowAuthModal();
    } else {
      // Redirect to actual generate page if logged in
      const path = `/generate?name=${encodeURIComponent(demoName)}${
        demoSex ? `&gender=${encodeURIComponent(demoSex)}` : ""
      }`;
      redirect(path);
    }
  };

  return (
    <section
      id="demo"
      className="py-12 bg-gray-50"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-8"
        >
          <h2
            id="demo-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Try Our Free Chinese Name Generator - See How It Works
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Experience our AI-powered Chinese name generation with a quick demo.
            Just enter your basic info to see the magic happen - your first
            Chinese name is completely free!
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-2 border-indigo-200 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="text-2xl">Quick Demo</CardTitle>
              <CardDescription>
                See what your Chinese name could look like
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="e.g., Sarah Johnson"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Gender (Optional)
                    </label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={demoSex === "male" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() =>
                          setDemoSex(demoSex === "male" ? "" : "male")
                        }
                      >
                        <User className="mr-2 h-4 w-4" />
                        Male
                      </Button>
                      <Button
                        type="button"
                        variant={demoSex === "female" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() =>
                          setDemoSex(demoSex === "female" ? "" : "female")
                        }
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Female
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleDemoGenerate}
                    className="w-full text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:text-white"
                    disabled={!demoName.trim()}
                  >
                    Generate My FREE Name
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {!user && (
                  <div className="text-center text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Demo Preview</span>
                    </div>
                    <p>
                      To generate your actual Chinese name with full cultural
                      analysis, please create an account first. It only takes 30
                      seconds!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
