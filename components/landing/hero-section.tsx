"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GRADIENT_STYLES, TEXT_STYLES } from "@/lib/constants/styles";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { user, loading } = useAuth();

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <div
        className={`absolute inset-0 ${GRADIENT_STYLES.heroBackground}`}
      ></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700 font-medium">
                🎉 Your first Chinese name is FREE • Trusted by 50,000+ people
              </div>
            </div>
            <h1 className={TEXT_STYLES.heroTitle} itemProp="name">
              Get Your Perfect{" "}
              <span className={GRADIENT_STYLES.primaryText}>Chinese Name</span>{" "}
              in Minutes
            </h1>
            <p className={TEXT_STYLES.heroDescription} itemProp="description">
              Our AI creates authentic Chinese names with deep cultural meaning,
              perfect pronunciation guides, and beautiful calligraphy. Trusted
              by expats, students, and professionals across 50+ countries.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6 flex-wrap">
              {loading ? (
                <Button size="lg" className="text-lg px-8 py-6" disabled>
                  Loading...
                </Button>
              ) : user ? (
                <Link href="/generate">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:text-white"
                  >
                    <span className="hidden sm:inline-block">
                      Get Your FREE Name Now
                    </span>
                    <span className="sm:hidden">Get FREE Name</span>
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:text-white"
                  onClick={onGetStarted}
                >
                  <span className="hidden sm:inline-block">
                    Get Your FREE Chinese Name
                  </span>
                  <span className="sm:hidden">Get FREE Name</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-6 py-6"
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="hidden sm:inline-block">Try Demo First</span>
                <span className="sm:hidden">Try Demo</span>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Instant delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cultural authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Pronunciation guide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Hidden brand markup for search engines */}
      <div className="sr-only">
        <h1 itemProp="name">Sinohub.best</h1>
        <span itemProp="alternateName">
          Sinohub.best - AI Chinese Name Generator
        </span>
      </div>
    </section>
  );
}
