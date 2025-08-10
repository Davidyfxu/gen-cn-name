"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const { user } = useAuth();

  return (
    <section
      className="bg-gray-50 py-12 sm:py-16"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Chinese Name Generator Pricing - First Name Free
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get your first authentic Chinese name completely free, then choose
            the plan that works for you. No hidden fees, lifetime access
            included.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm text-green-700 font-medium">
            🎉 First Chinese name generation is completely FREE!
          </div>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Free + Single Name Combined */}
            <Card className="relative border-2 border-green-200 shadow-xl bg-green-50 h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  START HERE
                </span>
              </div>
              <CardHeader className="text-center pt-8 pb-6 flex-shrink-0">
                <CardTitle className="text-xl mb-4">Get Started</CardTitle>

                {/* Main pricing display */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $0
                    <span className="text-xl text-gray-600">/first name</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Try it completely free
                  </div>
                </div>

                {/* Additional names pricing - smaller and subdued */}
                <div className="text-xs text-gray-500">
                  Additional names: $5 each
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow flex flex-col">
                <div className="space-y-2 text-sm flex-grow">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>1st Chinese name completely FREE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Pinyin pronunciation guide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cultural meaning & significance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Traditional & Simplified characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  {user ? (
                    <Link href="/generate">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Start Free
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={onGetStarted}
                    >
                      Start Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 5 Credits */}
            <Card className="relative border-2 border-indigo-200 shadow-xl bg-indigo-50 h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  POPULAR
                </span>
              </div>
              <CardHeader className="text-center pt-8 pb-6 flex-shrink-0">
                <CardTitle className="text-xl mb-4">5 Names Bundle</CardTitle>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    $20
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="line-through">$25</span>
                    <span className="text-green-600 ml-1 font-medium">
                      Save $5!
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Great for exploring options
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow flex flex-col">
                <div className="space-y-2 text-sm flex-grow">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>5 Chinese names</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>All premium features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>$4 per name (20% off)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cultural meaning & significance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  {user ? (
                    <Link href="/generate">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Purchase
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={onGetStarted}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 10 Credits */}
            <Card className="relative border-2 border-purple-200 shadow-xl bg-purple-50 h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  BEST VALUE
                </span>
              </div>
              <CardHeader className="text-center pt-8 pb-6 flex-shrink-0">
                <CardTitle className="text-xl mb-4">10 Names Bundle</CardTitle>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    $35
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="line-through">$50</span>
                    <span className="text-green-600 ml-1 font-medium">
                      Save $15!
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Maximum savings & flexibility
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow flex flex-col">
                <div className="space-y-2 text-sm flex-grow">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>10 Chinese names</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>All premium features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>$3.50 per name (30% off)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cultural meaning & significance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  {user ? (
                    <Link href="/generate">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Purchase
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={onGetStarted}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
