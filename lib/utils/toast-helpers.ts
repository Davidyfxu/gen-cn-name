/**
 * Toast消息助手
 * 统一管理应用中的Toast消息
 */

import { toast } from "sonner";

/**
 * 预定义的消息模板
 */
export const toastMessages = {
  auth: {
    signInSuccess: "Welcome back! You have been signed in successfully.",
    signUpSuccess:
      "Account created successfully! Please check your email to confirm your account.",
    resetPasswordSuccess:
      "Password reset email sent! Please check your inbox and follow the instructions.",
    passwordUpdateSuccess: "Password updated successfully!",
    signOutSuccess: "You have been signed out successfully.",

    // 错误消息
    invalidCredentials:
      "Invalid email or password. Please check your credentials and try again.",
    emailNotConfirmed:
      "Please check your email and click the confirmation link before signing in.",
    tooManyRequests:
      "Too many attempts. Please wait a few minutes before trying again.",
    userAlreadyExists:
      "An account with this email already exists. Please try signing in instead.",
    userNotFound:
      "No account found with this email address. Please check your email or sign up for a new account.",
    googlePopupBlocked:
      "Google sign-in popup was blocked. Please allow popups and try again.",
    networkError:
      "Network error. Please check your internet connection and try again.",
    genericAuthError: "Authentication failed. Please try again.",
    passwordTooShort: "Password must be at least 6 characters long.",
    invalidEmail: "Please enter a valid email address.",
    connectionError: "Please check your internet connection and try again.",
    unexpectedError: "An unexpected error occurred. Please try again.",
  },

  profile: {
    updateSuccess: "Profile updated successfully!",
    uploadSuccess: "Avatar uploaded successfully!",
    passwordUpdateSuccess: "Password updated successfully!",

    // 错误消息
    uploadError: "Failed to upload avatar. Please try again.",
    updateError: "Failed to update profile. Please try again.",
    passwordUpdateError: "Failed to update password. Please try again.",
    fileSizeError: "File size must be less than 5MB",
    fileTypeError: "Please select an image file",
    nameRequired: "Full name is required",
    passwordFieldsRequired: "Please fill in all password fields",
    passwordsNotMatch: "New passwords do not match",
    passwordTooShort: "Password must be at least 6 characters long",
  },

  payment: {
    purchaseSuccess: "Credits purchased successfully!",
    processingPayment:
      "Processing payment... Please wait while we redirect you to checkout.",

    // 错误消息
    purchaseError: "Payment failed. Please try again.",
    createPaymentError: "Failed to create payment. Please try again.",
    systemError: "Payment system error. Please try again.",
    insufficientCredits: "You need at least 1 credit to generate a name",
  },

  generation: {
    generateSuccess: "Name generated successfully!",
    saveSuccess: "Name saved to your profile successfully!",

    // 错误消息
    generateError: "Failed to generate name. Please try again.",
    saveError: "Failed to save name. Please try again.",
    systemError: "System error occurred during generation. Please try again.",
  },

  general: {
    success: "Operation completed successfully!",
    loading: "Loading...",
    processing: "Processing...",
    saving: "Saving...",

    // 错误消息
    error: "An error occurred. Please try again.",
    networkError: "Network error. Please check your internet connection.",
    systemError: "System error. Please try again later.",
    validationError: "Please check your input and try again.",
  },
} as const;

/**
 * 显示成功消息
 */
export function showSuccessToast(message: string): void {
  toast.success(message);
}

/**
 * 显示错误消息
 */
export function showErrorToast(message: string): void {
  toast.error(message);
}

/**
 * 显示信息消息
 */
export function showInfoToast(message: string): void {
  toast(message);
}

/**
 * 显示警告消息
 */
export function showWarningToast(message: string): void {
  toast.warning(message);
}

/**
 * Auth相关的Toast助手
 */
export const authToast = {
  signInSuccess: () => showSuccessToast(toastMessages.auth.signInSuccess),
  signUpSuccess: () => showSuccessToast(toastMessages.auth.signUpSuccess),
  resetPasswordSuccess: () =>
    showSuccessToast(toastMessages.auth.resetPasswordSuccess),
  passwordUpdateSuccess: () =>
    showSuccessToast(toastMessages.auth.passwordUpdateSuccess),

  invalidCredentials: () =>
    showErrorToast(toastMessages.auth.invalidCredentials),
  emailNotConfirmed: () => showErrorToast(toastMessages.auth.emailNotConfirmed),
  tooManyRequests: () => showErrorToast(toastMessages.auth.tooManyRequests),
  userAlreadyExists: () => showErrorToast(toastMessages.auth.userAlreadyExists),
  userNotFound: () => showErrorToast(toastMessages.auth.userNotFound),
  googlePopupBlocked: () =>
    showErrorToast(toastMessages.auth.googlePopupBlocked),
  networkError: () => showErrorToast(toastMessages.auth.networkError),
  genericError: (message?: string) =>
    showErrorToast(message || toastMessages.auth.genericAuthError),
  connectionError: () => showErrorToast(toastMessages.auth.connectionError),
  unexpectedError: () => showErrorToast(toastMessages.auth.unexpectedError),
};

/**
 * Profile相关的Toast助手
 */
export const profileToast = {
  updateSuccess: () => showSuccessToast(toastMessages.profile.updateSuccess),
  uploadSuccess: () => showSuccessToast(toastMessages.profile.uploadSuccess),
  passwordUpdateSuccess: () =>
    showSuccessToast(toastMessages.profile.passwordUpdateSuccess),

  uploadError: (message?: string) =>
    showErrorToast(message || toastMessages.profile.uploadError),
  updateError: (message?: string) =>
    showErrorToast(message || toastMessages.profile.updateError),
  passwordUpdateError: (message?: string) =>
    showErrorToast(message || toastMessages.profile.passwordUpdateError),
  fileSizeError: () => showErrorToast(toastMessages.profile.fileSizeError),
  fileTypeError: () => showErrorToast(toastMessages.profile.fileTypeError),
  nameRequired: () => showErrorToast(toastMessages.profile.nameRequired),
  passwordFieldsRequired: () =>
    showErrorToast(toastMessages.profile.passwordFieldsRequired),
  passwordsNotMatch: () =>
    showErrorToast(toastMessages.profile.passwordsNotMatch),
  passwordTooShort: () =>
    showErrorToast(toastMessages.profile.passwordTooShort),
};

/**
 * Payment相关的Toast助手
 */
export const paymentToast = {
  purchaseSuccess: () =>
    showSuccessToast(toastMessages.payment.purchaseSuccess),
  processingPayment: () =>
    showInfoToast(toastMessages.payment.processingPayment),

  purchaseError: () => showErrorToast(toastMessages.payment.purchaseError),
  createPaymentError: () =>
    showErrorToast(toastMessages.payment.createPaymentError),
  systemError: () => showErrorToast(toastMessages.payment.systemError),
  insufficientCredits: () =>
    showErrorToast(toastMessages.payment.insufficientCredits),
};

/**
 * Generation相关的Toast助手
 */
export const generationToast = {
  generateSuccess: () =>
    showSuccessToast(toastMessages.generation.generateSuccess),
  saveSuccess: () => showSuccessToast(toastMessages.generation.saveSuccess),

  generateError: () => showErrorToast(toastMessages.generation.generateError),
  saveError: () => showErrorToast(toastMessages.generation.saveError),
  systemError: () => showErrorToast(toastMessages.generation.systemError),
};

/**
 * 处理API错误的工具函数
 */
export function handleApiError(
  error: any,
  context: "auth" | "profile" | "payment" | "generation" = "auth"
): void {
  const errorMessage = error?.message || error?.error || "Unknown error";

  // 根据错误消息匹配特定的Toast
  if (context === "auth") {
    if (errorMessage.toLowerCase().includes("invalid login credentials")) {
      authToast.invalidCredentials();
    } else if (errorMessage.toLowerCase().includes("email not confirmed")) {
      authToast.emailNotConfirmed();
    } else if (errorMessage.toLowerCase().includes("too many requests")) {
      authToast.tooManyRequests();
    } else if (
      errorMessage.toLowerCase().includes("already registered") ||
      errorMessage.toLowerCase().includes("already exists")
    ) {
      authToast.userAlreadyExists();
    } else if (errorMessage.toLowerCase().includes("user not found")) {
      authToast.userNotFound();
    } else if (errorMessage.toLowerCase().includes("popup")) {
      authToast.googlePopupBlocked();
    } else if (errorMessage.toLowerCase().includes("network")) {
      authToast.networkError();
    } else {
      authToast.genericError(errorMessage);
    }
  } else {
    // 其他上下文的错误处理
    showErrorToast(errorMessage);
  }
}
