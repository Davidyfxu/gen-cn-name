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
import { AuthModal } from "@/components/auth-modal";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowRight,
  Check,
  Users,
  Award,
  BookOpen,
  Palette,
  Music,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [demoName, setDemoName] = useState("");
  const [demoAge, setDemoAge] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleDemoGenerate = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      // Redirect to actual generate page if logged in
      window.location.href = "/generate";
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "English Teacher in Beijing",
      content:
        "I've been living in China for 3 years and finally have a Chinese name that truly represents who I am. My students love it and it's helped me connect more deeply with the culture.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "International Business Executive",
      content:
        "The cultural significance explanation was incredible. I now understand the deeper meaning behind my Chinese name and feel more confident using it in business meetings.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Study Abroad Student",
      content:
        "Perfect for my semester in Shanghai! The pronunciation guide made it so easy to introduce myself properly. My Chinese friends were impressed with the authenticity.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How does the AI generate Chinese names?",
      answer:
        "Our AI analyzes your personality traits, interests, and aspirations to select characters with appropriate meanings. It considers traditional naming conventions, cultural significance, and phonetic harmony to create authentic Chinese names.",
    },
    {
      question: "Are the names culturally appropriate?",
      answer:
        "Yes! Our AI is trained on traditional Chinese naming conventions and cultural practices. Each name comes with detailed explanations of its cultural significance and appropriate usage contexts.",
    },
    {
      question: "Can I get multiple name options?",
      answer:
        "Each generation provides one carefully crafted name. If you'd like alternatives, you can generate additional names. We focus on quality over quantity to ensure each name is meaningful.",
    },
    {
      question: "Do you provide pronunciation help?",
      answer:
        "Absolutely! Every name includes pinyin pronunciation, tone marks, and audio guidance to help you pronounce your Chinese name correctly and confidently.",
    },
    {
      question:
        "What's the difference between traditional and simplified characters?",
      answer:
        "We provide both forms when applicable. Traditional characters are used in Taiwan, Hong Kong, and Macau, while simplified characters are used in mainland China. We explain when to use each.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <section
        className="relative overflow-hidden py-12 sm:py-16"
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
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
              <h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl"
                itemProp="name"
              >
                Get Your Perfect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Chinese Name
                </span>{" "}
                in Minutes
              </h1>
              <p
                className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto"
                itemProp="description"
              >
                Our AI creates authentic Chinese names with deep cultural
                meaning, perfect pronunciation guides, and beautiful
                calligraphy. Trusted by expats, students, and professionals
                across 50+ countries.
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
                    onClick={handleGetStarted}
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
      </section>

      {/* Demo Section with Login Requirement */}
      <section
        id="demo"
        className="py-12 bg-gray-50"
        aria-labelledby="demo-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <h2
              id="demo-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Try Our Free Chinese Name Generator - See How It Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Experience our AI-powered Chinese name generation with a quick
              demo. Just enter your basic info to see the magic happen - your
              first Chinese name is completely free!
            </p>
          </div>

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
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age</label>
                      <Input
                        value={demoAge}
                        onChange={(e) => setDemoAge(e.target.value)}
                        placeholder="e.g., 25"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={handleDemoGenerate}
                      className="w-full text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:text-white"
                      disabled={!demoName.trim() || !demoAge.trim()}
                    >
                      {user
                        ? "Generate My FREE Name"
                        : "Generate FREE (Login Required)"}
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
                        analysis, please create an account first. It only takes
                        30 seconds!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
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
                    Traditional and simplified characters with stroke order
                    guides for beautiful writing.
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

      {/* Testimonials Section */}
      <section
        className="bg-gray-50 py-12 sm:py-16"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Real Reviews from Chinese Name Generator Users Worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              See what our users say about their Chinese name journey and
              cultural discovery
            </p>
          </div>

          <motion.div
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-indigo-200 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-indigo-600 font-medium">
                    {testimonial.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
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
                        onClick={handleGetStarted}
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
                        onClick={handleGetStarted}
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
                  <CardTitle className="text-xl mb-4">
                    10 Names Bundle
                  </CardTitle>
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
                        onClick={handleGetStarted}
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

      {/* FAQ Section */}
      <section
        className="py-12 sm:py-16 bg-white"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2
              id="faq-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Chinese Name Generator FAQ - Common Questions Answered
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need to know about getting your authentic Chinese
              name with cultural meanings
            </p>
          </div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-left">
                      {faq.question}
                    </CardTitle>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
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
                onClick={handleGetStarted}
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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
        onSwitchMode={() => {}}
      />
    </div>
  );
}
