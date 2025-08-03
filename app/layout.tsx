import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Get Your Perfect Chinese Name FREE | AI-Powered Generator - ChineseName.best",
  description:
    "Generate authentic Chinese names with deep cultural meaning in minutes. FREE first name, trusted by 50,000+ users worldwide. Perfect pronunciation guides included!",
  keywords:
    "Chinese name generator, AI Chinese names, authentic Chinese names, Chinese name meaning, personalized Chinese names, Chinese characters, pinyin pronunciation, cultural Chinese names, foreign Chinese names, Chinese name translator, traditional Chinese names, simplified Chinese characters, Chinese calligraphy names, expat Chinese names, study abroad Chinese names",
  authors: [{ name: "ChineseName.best" }],
  creator: "ChineseName.best",
  publisher: "ChineseName.best",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chinesename.sinohub.best",
    siteName: "ChineseName.best",
    title: "Get Your Perfect Chinese Name FREE | AI-Powered Generator",
    description:
      "Generate authentic Chinese names with deep cultural meaning in minutes. FREE first name, trusted by 50,000+ users worldwide.",
    images: [
      {
        url: "https://chinesename.sinohub.best/logo.png",
        alt: "ChineseName.best - AI-Powered Chinese Name Generator",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Get Your Perfect Chinese Name FREE | AI-Powered Generator",
  //   description:
  //     "Generate authentic Chinese names with deep cultural meaning in minutes. FREE first name, trusted by 50,000+ users worldwide.",
  //   images: ["https://chinesename.sinohub.best/og-image.jpg"],
  //   creator: "@chinesenameai",
  // },
  alternates: {
    canonical: "https://chinesename.sinohub.best",
  },
  category: "Technology",
  classification: "AI Name Generator",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://chinesename.sinohub.best/#website",
        url: "https://chinesename.sinohub.best",
        name: "ChineseName.best",
        description:
          "AI-powered Chinese name generator with authentic cultural meanings",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://chinesename.sinohub.best/generate?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://chinesename.sinohub.best/#organization",
        name: "ChineseName.best",
        url: "https://chinesename.sinohub.best",
        logo: {
          "@type": "ImageObject",
          url: "/logo.png",
          width: 300,
          height: 300,
        },
        // sameAs: ["https://twitter.com/chinesenameai"],
      },
      {
        "@type": "WebApplication",
        name: "ChineseName.best Chinese Name Generator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        description:
          "AI-powered tool to generate authentic Chinese names with cultural meanings, pronunciation guides, and calligraphy",
        url: "https://chinesename.sinohub.best",
        author: {
          "@type": "Organization",
          name: "ChineseName.best",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "First Chinese name generation is completely free",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "50000",
          bestRating: "5",
        },
      },
      {
        "@type": "Service",
        name: "Chinese Name Generation Service",
        provider: {
          "@type": "Organization",
          name: "ChineseName.best",
        },
        description:
          "Professional AI-powered service for generating authentic Chinese names with cultural significance",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Chinese"],
        serviceType: "Name Generation",
        offers: [
          {
            "@type": "Offer",
            name: "Free Chinese Name",
            price: "0",
            priceCurrency: "USD",
            description: "First Chinese name generation completely free",
          },
          {
            "@type": "Offer",
            name: "5 Names Bundle",
            price: "20",
            priceCurrency: "USD",
            description: "Bundle of 5 Chinese names with 20% savings",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navigation />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
