import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CreditPurchaseProps {
  onPurchase: (credits: number) => void;
  isPurchasing: boolean;
}

interface PurchaseOption {
  credits: number;
  price: number;
  originalPrice?: number;
  description: string;
  highlight?: boolean;
}

const purchaseOptions: PurchaseOption[] = [
  {
    credits: 1,
    price: 5,
    description: "Perfect for trying it out",
  },
  {
    credits: 5,
    price: 20,
    originalPrice: 25,
    description: "Save $5!",
    highlight: true,
  },
  {
    credits: 10,
    price: 35,
    originalPrice: 50,
    description: "Save $15!",
    highlight: true,
  },
];

export function CreditPurchase({
  onPurchase,
  isPurchasing,
}: CreditPurchaseProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Credits</CardTitle>
        <CardDescription>
          Buy credits to generate more Chinese names. Each name generation costs
          1 credit ($5).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-3">
          {purchaseOptions.map((option, index) => (
            <Card
              key={option.credits}
              className={`border-2 ${
                option.highlight
                  ? index === 1
                    ? "border-indigo-200 bg-indigo-50"
                    : "border-purple-200 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
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
                        {option.description}
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
                  {isPurchasing ? "Processing..." : "Purchase"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
