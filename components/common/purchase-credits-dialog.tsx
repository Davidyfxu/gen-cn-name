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
import { PRICING_OPTIONS, type PricingOption } from "@/lib/constants/pricing";
import { CARD_VARIANTS } from "@/lib/constants/styles";
import { LoadingOverlay } from "./loading-overlay";

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
