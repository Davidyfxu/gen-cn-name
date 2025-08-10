import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRICING_OPTIONS } from "@/lib/constants/pricing";
import { CARD_VARIANTS, LOADING_STYLES } from "@/lib/constants/styles";
import { LoadingOverlay } from "@/components/common/loading-overlay";
import { cn } from "@/lib/utils/cn";

interface CreditPurchaseProps {
  onPurchase: (credits: number) => void;
  isPurchasing: boolean;
}

// 使用统一的价格配置

export function CreditPurchase({
  onPurchase,
  isPurchasing,
}: CreditPurchaseProps) {
  const getCardVariant = (option: (typeof PRICING_OPTIONS)[0]): string => {
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
    <Card className="relative">
      <LoadingOverlay isLoading={isPurchasing} />

      <CardHeader>
        <CardTitle>Purchase Credits</CardTitle>
        <CardDescription>
          Buy credits to generate more Chinese names. Each name generation costs
          1 credit ($5).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-3">
          {PRICING_OPTIONS.map((option) => (
            <Card key={option.credits} className={getCardVariant(option)}>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-base">
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
              <CardContent className="pt-1">
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => onPurchase(option.credits)}
                  disabled={isPurchasing}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
