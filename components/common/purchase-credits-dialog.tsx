/**
 * 购买Credits对话框组件
 * 统一的购买Credits界面
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { PRICING_OPTIONS, type PricingOption } from "@/lib/constants/pricing";
import { CARD_VARIANTS, GRADIENT_STYLES } from "@/lib/constants/styles";
import { LoadingOverlay } from "./loading-overlay";
import { cn } from "@/lib/utils";

interface PurchaseCreditsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (credits: number) => void;
  isPurchasing: boolean;
  title?: string;
  description?: string;
  triggerClassName?: string;
}

export function PurchaseCreditsDialog({
  isOpen,
  onOpenChange,
  onPurchase,
  isPurchasing,
  title = "Purchase Credits",
  description = "Choose how many credits you'd like to purchase. Each name generation costs 1 credit ($5).",
}: PurchaseCreditsDialogProps) {
  const getCardVariant = (option: PricingOption): string => {
    if (!option.highlight) return CARD_VARIANTS.default;

    switch (option.variant) {
      case "indigo":
        return CARD_VARIANTS.indigo;
      case "purple":
        return CARD_VARIANTS.purple;
      case "green":
        return CARD_VARIANTS.green;
      default:
        return CARD_VARIANTS.default;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <LoadingOverlay
          isLoading={isPurchasing}
          text="Processing Payment"
          variant="overlayDark"
        />

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            {PRICING_OPTIONS.map((option, index) => (
              <Card key={option.credits} className={getCardVariant(option)}>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">
                    {option.credits} Credit{option.credits > 1 ? "s" : ""}
                  </CardTitle>
                  <div className="text-2xl font-bold">${option.price}</div>
                  <CardDescription className="text-xs">
                    {option.originalPrice ? (
                      <>
                        <span className="line-through text-gray-500">
                          ${option.originalPrice}
                        </span>
                        <span className="text-green-600 ml-1">
                          {option.savings}
                        </span>
                      </>
                    ) : (
                      option.description
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button
                    className="w-full"
                    onClick={() => onPurchase(option.credits)}
                    disabled={isPurchasing}
                  >
                    Purchase {option.credits} Credit
                    {option.credits > 1 ? "s" : ""}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 带触发器的购买对话框
 */
interface PurchaseCreditsDialogWithTriggerProps
  extends PurchaseCreditsDialogProps {
  trigger: React.ReactNode;
}

export function PurchaseCreditsDialogWithTrigger({
  trigger,
  ...props
}: PurchaseCreditsDialogWithTriggerProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      {trigger}
      <DialogContent className="sm:max-w-md">
        <LoadingOverlay
          isLoading={props.isPurchasing}
          text="Processing Payment"
          variant="overlayDark"
        />

        <DialogHeader>
          <DialogTitle>{props.title || "Purchase Credits"}</DialogTitle>
          <DialogDescription>
            {props.description ||
              "Choose how many credits you'd like to purchase. Each name generation costs 1 credit ($5)."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            {PRICING_OPTIONS.map((option) => (
              <Card
                key={option.credits}
                className={
                  option.highlight
                    ? option.variant === "indigo"
                      ? CARD_VARIANTS.indigo
                      : CARD_VARIANTS.purple
                    : CARD_VARIANTS.default
                }
              >
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">
                    {option.credits} Credit{option.credits > 1 ? "s" : ""}
                  </CardTitle>
                  <div className="text-2xl font-bold">${option.price}</div>
                  <CardDescription className="text-xs">
                    {option.originalPrice ? (
                      <>
                        <span className="line-through text-gray-500">
                          ${option.originalPrice}
                        </span>
                        <span className="text-green-600 ml-1">
                          {option.savings}
                        </span>
                      </>
                    ) : (
                      option.description
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button
                    className="w-full"
                    onClick={() => props.onPurchase(option.credits)}
                    disabled={props.isPurchasing}
                  >
                    Purchase {option.credits} Credit
                    {option.credits > 1 ? "s" : ""}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 简化的购买按钮组件
 */
interface PurchaseButtonProps {
  onPurchase: (credits: number) => void;
  isPurchasing: boolean;
  variant?: "default" | "unlock";
  className?: string;
  children?: React.ReactNode;
}

export function PurchaseButton({
  onPurchase,
  isPurchasing,
  variant = "default",
  className,
  children,
}: PurchaseButtonProps) {
  const buttonText =
    children || (variant === "unlock" ? "Unlock Now" : "Purchase Credits");
  const buttonClass =
    variant === "unlock"
      ? cn(GRADIENT_STYLES.primary, "px-6 py-2", className)
      : className;

  return (
    <PurchaseCreditsDialogWithTrigger
      isOpen={false}
      onOpenChange={() => {}}
      onPurchase={onPurchase}
      isPurchasing={isPurchasing}
      trigger={
        <Button className={buttonClass} disabled={isPurchasing}>
          {variant === "unlock" && <Sparkles className="mr-2 h-4 w-4" />}
          {buttonText}
        </Button>
      }
    />
  );
}
