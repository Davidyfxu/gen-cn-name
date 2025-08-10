/**
 * 加载覆盖层组件
 * 统一的加载状态显示组件
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOADING_STYLES } from "@/lib/constants/styles";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  variant?: "overlay" | "overlayDark" | "inline" | "fullscreen";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  text,
  variant = "overlay",
  size = "md",
  className,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: LOADING_STYLES.spinnerSmall,
    md: LOADING_STYLES.spinner,
    lg: LOADING_STYLES.spinnerLarge,
  };

  const spinnerClass = sizeClasses[size];

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className={spinnerClass} />
        {text && <span className="text-sm text-gray-600">{text}</span>}
      </div>
    );
  }

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className={spinnerClass} />
          {text && <p className="text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  // overlay 和 overlayDark 变体
  const overlayClass =
    variant === "overlayDark"
      ? LOADING_STYLES.overlayDark
      : LOADING_STYLES.overlay;

  return (
    <div className={cn(overlayClass, className)}>
      <div className="text-center space-y-4">
        <Loader2 className={spinnerClass} />
        {text && (
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">{text}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 按钮加载状态组件
 */
interface ButtonLoadingProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function ButtonLoading({
  isLoading,
  loadingText,
  children,
}: ButtonLoadingProps) {
  if (isLoading) {
    return (
      <>
        <Loader2 className={LOADING_STYLES.buttonSpinner} />
        {loadingText || children}
      </>
    );
  }

  return <>{children}</>;
}

/**
 * 页面加载状态组件
 */
interface PageLoadingProps {
  text?: string;
  className?: string;
}

export function PageLoading({
  text = "Loading...",
  className,
}: PageLoadingProps) {
  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className={LOADING_STYLES.dashboardSpinner}></div>
          <p className="mt-4 text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 卡片加载状态组件
 */
interface CardLoadingProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
  className?: string;
}

export function CardLoading({
  isLoading,
  text,
  children,
  className,
}: CardLoadingProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <LoadingOverlay isLoading={isLoading} text={text} variant="overlay" />
    </div>
  );
}

/**
 * 列表加载状态组件
 */
interface ListLoadingProps {
  isLoading: boolean;
  itemCount?: number;
  itemHeight?: string;
  className?: string;
}

export function ListLoading({
  isLoading,
  itemCount = 3,
  itemHeight = "h-16",
  className,
}: ListLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className={cn("animate-pulse bg-gray-200 rounded-lg", itemHeight)}
        />
      ))}
    </div>
  );
}
