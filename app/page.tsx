"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import {
  HeroSection,
  DemoSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FaqSection,
  CtaSection,
} from "@/components/landing";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowAuthModal = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection onShowAuthModel={handleShowAuthModal} />
      <DemoSection onShowAuthModal={handleShowAuthModal} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection onShowAuthModal={handleShowAuthModal} />
      <FaqSection />
      <CtaSection onShowAuthModal={handleShowAuthModal} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
        onSwitchMode={() => {}}
      />
    </div>
  );
}
