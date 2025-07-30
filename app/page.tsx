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
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm text-indigo-700 font-medium">
                  ✨ Trusted by 50,000+ people worldwide
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                Get Your Perfect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Chinese Name
                </span>{" "}
                in Minutes
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                Our AI creates authentic Chinese names with deep cultural
                meaning, perfect pronunciation guides, and beautiful
                calligraphy. Trusted by expats, students, and professionals
                across 50+ countries.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
                {loading ? (
                  <Button size="lg" className="text-lg px-8 py-6" disabled>
                    Loading...
                  </Button>
                ) : user ? (
                  <Link href="/generate">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Generate Your Name Now
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={handleGetStarted}
                  >
                    <span className="hidden sm:inline-block">
                      Get Your Chinese Name -{" "}
                    </span>
                    <span className="sm:hidden">Get Name - </span>
                    $5
                    <ArrowRight className="ml-2 h-5 w-5" />
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
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
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
      <section id="demo" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Try It Now - See How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience our AI-powered name generation with a quick demo. Just
              enter your basic info to see the magic happen.
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
                      onClick={handleDemoGenerate}
                      className="w-full text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      disabled={!demoName.trim() || !demoAge.trim()}
                    >
                      {user
                        ? "Generate My Real Chinese Name"
                        : "Generate Demo Name (Login Required)"}
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
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why 50,000+ People Choose ChineseName.best
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The most advanced AI system for creating meaningful Chinese names
              with authentic cultural heritage
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-6xl">
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                      <Sparkles className="h-7 w-7 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl">
                      AI-Powered Authenticity
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Our advanced AI analyzes 50,000+ traditional Chinese names,
                    cultural patterns, and meanings to create names that are
                    both authentic and personally meaningful.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <BookOpen className="h-7 w-7 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Deep Cultural Insights
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Every name includes detailed explanations of cultural
                    significance, historical context, and traditional meanings -
                    not just translations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Music className="h-7 w-7 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Perfect Pronunciation
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Complete pinyin guide with tone marks, audio pronunciation,
                    and tips for correct intonation. Sound like a native speaker
                    from day one.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                      <Users className="h-7 w-7 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Personal Story Integration
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Names reflect your unique personality, hobbies, dreams, and
                    life goals. Each character is chosen to represent who you
                    truly are.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Palette className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Beautiful Calligraphy
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Traditional and simplified characters with stroke order
                    guides. Perfect for learning to write your name beautifully.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-rose-100 hover:border-rose-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100">
                      <Award className="h-7 w-7 text-rose-600" />
                    </div>
                    <CardTitle className="text-xl">Lifetime Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Your name and its complete cultural profile are saved
                    forever. Download certificates, share with friends, and
                    access anytime.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by People Worldwide
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See what our users say about their Chinese name journey
            </p>
          </div>

          <motion.div
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
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
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get a personalized Chinese name with detailed cultural
              interpretation
            </p>
          </div>

          <motion.div
            className="mx-auto mt-16 max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="relative border-2 border-indigo-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-2xl">
                    Premium Name Generation
                  </CardTitle>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">$5</span>
                  <span className="text-lg text-gray-600">/name</span>
                </div>
                <CardDescription className="text-base">
                  Complete name package with cultural insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Personalized Chinese name</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Pinyin pronunciation guide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Traditional & Simplified characters</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Detailed cultural meaning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Historical significance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Lifetime access to your name</span>
                  </div>
                </div>

                <div className="pt-6">
                  {user ? (
                    <Link href="/generate">
                      <Button className="w-full text-lg py-6">
                        Generate Name
                        <Sparkles className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full text-lg py-6"
                      onClick={handleGetStarted}
                    >
                      Start Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything you need to know about getting your Chinese name
            </p>
          </div>

          <motion.div
            className="space-y-4"
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
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to discover your perfect Chinese name?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
            Join over 50,000 people who have found their perfect Chinese name
            with authentic cultural significance and personal meaning.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user ? (
              <Link href="/generate">
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  Generate Your Name Now
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
                <span className="hidden sm:inline-block">
                  Get Started Now -{" "}
                </span>
                <span className="sm:hidden">Start - </span>
                $5
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-indigo-200">
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
