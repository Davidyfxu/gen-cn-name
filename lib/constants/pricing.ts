/**
 * 价格配置常量
 * 统一管理所有价格相关的配置
 */

export interface PricingOption {
  credits: number;
  price: number;
  originalPrice?: number;
  description: string;
  highlight?: boolean;
  savings?: string;
  variant?: "default" | "indigo" | "purple" | "green";
}

export const PRICING_OPTIONS: PricingOption[] = [
  {
    credits: 1,
    price: 5,
    description: "Perfect for trying it out",
    variant: "default",
  },
  {
    credits: 5,
    price: 20,
    originalPrice: 25,
    description: "Save $5!",
    savings: "Save $5!",
    highlight: true,
    variant: "indigo",
  },
  {
    credits: 10,
    price: 35,
    originalPrice: 50,
    description: "Save $15!",
    savings: "Save $15!",
    highlight: true,
    variant: "purple",
  },
];

// Stripe需要的价格映射（以分为单位）
export const PRICING_MAP = PRICING_OPTIONS.reduce(
  (acc, option) => {
    acc[option.credits] = option.price * 100;
    return acc;
  },
  {} as Record<number, number>
);

// 有效的积分数量
export const VALID_CREDIT_AMOUNTS = PRICING_OPTIONS.map(
  (option) => option.credits
);

// 价格相关的常量
export const PRICE_CONSTANTS = {
  CREDIT_COST: 5, // 每个积分的基础价格
  FREE_CREDITS_FOR_NEW_USERS: 1,
  CURRENCY: "USD",
  CURRENCY_SYMBOL: "$",
} as const;

// 获取价格选项的工具函数
export function getPricingOption(credits: number): PricingOption | undefined {
  return PRICING_OPTIONS.find((option) => option.credits === credits);
}

// 计算节省金额
export function calculateSavings(credits: number): number {
  const option = getPricingOption(credits);
  if (!option || !option.originalPrice) return 0;
  return option.originalPrice - option.price;
}

// 获取单价
export function getPricePerCredit(credits: number): number {
  const option = getPricingOption(credits);
  if (!option) return PRICE_CONSTANTS.CREDIT_COST;
  return option.price / option.credits;
}
