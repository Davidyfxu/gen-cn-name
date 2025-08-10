"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Sparkles, ArrowRight, Users, MapPin, Award } from "lucide-react";
import Link from "next/link";

interface CtaSectionProps {
  onGetStarted: () => void;
}

export function CtaSection({ onGetStarted }: CtaSectionProps) {
  const { user } = useAuth();

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12 sm:py-16 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Ready to Get Your FREE Chinese Name with Cultural Meaning?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-indigo-100">
          Start completely free! Join over 50,000 people who have discovered
          their perfect Chinese name with authentic cultural significance,
          pronunciation guides, and personal meaning.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          {user ? (
            <Link href="/generate">
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6"
              >
                Get Your FREE Name Now
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={onGetStarted}
            >
              <span>Start FREE Now</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-indigo-200">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>50,000+ happy users</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>50+ countries</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
