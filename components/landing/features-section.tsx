"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Music, Users, Palette, Award } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Why 50,000+ People Choose Our AI Chinese Name Generator
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            The most advanced AI system for creating meaningful Chinese names
            with authentic cultural heritage and perfect pronunciation guides
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <Sparkles
                      className="h-7 w-7 text-indigo-600"
                      aria-label="AI-powered authenticity icon"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    AI-Powered Authenticity
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Advanced AI analyzes 50,000+ traditional names to create
                  authentic, personally meaningful Chinese names.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <BookOpen
                      className="h-7 w-7 text-purple-600"
                      aria-label="Cultural insights icon"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    Deep Cultural Insights
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Detailed cultural significance, historical context, and
                  traditional meanings - not just translations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-green-100 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Music
                      className="h-7 w-7 text-green-600"
                      aria-label="Pronunciation guide icon"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    Perfect Pronunciation
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Complete pinyin guide with tone marks and audio. Learn to
                  pronounce like a native speaker.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    <Users
                      className="h-7 w-7 text-orange-600"
                      aria-label="Personal story integration icon"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    Personal Story Integration
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Names reflect your personality, hobbies, and dreams. Each
                  character represents who you truly are.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Palette
                      className="h-7 w-7 text-blue-600"
                      aria-label="Chinese calligraphy icon"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    Beautiful Calligraphy
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Traditional and simplified characters with stroke order guides
                  for beautiful writing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-rose-100 hover:border-rose-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100">
                    <Award
                      className="h-7 w-7 text-rose-600"
                      aria-label="Lifetime access icon"
                    />
                  </div>
                  <CardTitle className="text-xl">Lifetime Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Your name and cultural profile saved forever. Download
                  certificates and access anytime.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
