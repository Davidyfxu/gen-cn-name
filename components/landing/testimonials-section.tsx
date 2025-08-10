"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

export function TestimonialsSection() {
  return (
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
            See what our users say about their Chinese name journey and cultural
            discovery
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
  );
}
