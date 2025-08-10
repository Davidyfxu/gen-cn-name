"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

export function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 bg-white" aria-labelledby="faq-heading">
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
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
