/**
 * 样式常量
 * 统一管理应用中的样式类
 */

export const GRADIENT_STYLES = {
  // 主要渐变色
  primary: "bg-gradient-to-r from-indigo-600 to-purple-600",
  primaryHover: "hover:from-indigo-700 hover:to-purple-700",
  primaryText:
    "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
  primaryButton:
    "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:text-white",

  // 较浅的渐变色（用于背景）
  primaryLight: "bg-gradient-to-r from-indigo-500 to-purple-600",
  primaryLightHover: "hover:from-indigo-600 hover:to-purple-700",

  // 背景渐变
  heroBackground: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
  cardHeaderBackground: "bg-gradient-to-r from-indigo-50 to-purple-50",
  ctaBackground: "bg-gradient-to-r from-indigo-600 to-purple-600",
} as const;

export const CARD_VARIANTS = {
  default: "border-2 border-gray-200 hover:border-gray-300 transition-colors",
  indigo:
    "border-2 border-indigo-200 bg-indigo-50 hover:border-indigo-300 transition-colors",
  purple:
    "border-2 border-purple-200 bg-purple-50 hover:border-purple-300 transition-colors",
  green:
    "border-2 border-green-200 bg-green-50 hover:border-green-300 transition-colors",

  // 带阴影的变体
  shadow: "border-2 border-indigo-200 shadow-xl",
  shadowGreen: "border-2 border-green-200 shadow-xl bg-green-50",
  shadowIndigo: "border-2 border-indigo-200 shadow-xl bg-indigo-50",
  shadowPurple: "border-2 border-purple-200 shadow-xl bg-purple-50",

  // 简单边框变体
  simpleBorder: "border-2 border-gray-100",
  hoverBorder:
    "border-2 border-gray-100 hover:border-indigo-200 transition-colors",
} as const;

export const LOADING_STYLES = {
  // 覆盖层样式
  overlay:
    "absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg",
  overlayDark:
    "absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg",

  // 加载动画样式
  spinner: "h-8 w-8 animate-spin text-indigo-600",
  spinnerSmall: "h-4 w-4 animate-spin",
  spinnerLarge: "h-12 w-12 animate-spin",

  // 特定场景的加载样式
  dashboardSpinner:
    "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto",
  buttonSpinner: "h-4 w-4 animate-spin",
  avatarSpinner: "h-3 w-3 animate-spin",

  // 脉冲动画
  pulse: "animate-pulse",
  pulseStrong: "animate-pulse-strong",
} as const;

export const TEXT_STYLES = {
  // 标题样式
  heroTitle: "text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl",
  sectionTitle: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
  cardTitle: "text-xl",

  // 描述文本
  heroDescription: "mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto",
  sectionDescription: "mt-4 text-lg leading-8 text-gray-600",

  // 特殊文本
  brandText:
    "hidden sm:inline-block font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
  priceText: "text-2xl font-bold",
  savingsText: "text-green-600 ml-1",

  // 中文名字显示
  chineseNameLarge: "text-6xl font-bold text-indigo-600",
  pinyinText: "text-2xl text-gray-600",
  traditionalText: "text-lg text-gray-500",
} as const;
