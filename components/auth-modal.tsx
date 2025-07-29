"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup" | "forgot-password";
  onSwitchMode: (mode: "signin" | "signup" | "forgot-password") => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
}: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle, resetPassword, loading } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Name validation
  const validateFullName = (name: string) => {
    if (mode === "signup" && !name.trim()) {
      setNameError("Full name is required");
      return false;
    }
    if (mode === "signup" && name.trim().length < 2) {
      setNameError("Full name must be at least 2 characters long");
      return false;
    }
    setNameError("");
    return true;
  };

  // Clear errors when switching modes
  const handleSwitchMode = (
    newMode: "signin" | "signup" | "forgot-password"
  ) => {
    onSwitchMode(newMode);
    setEmail("");
    setPassword("");
    setFullName("");
    setEmailError("");
    setPasswordError("");
    setNameError("");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const isEmailValid = validateEmail(email);
    const isPasswordValid =
      mode !== "forgot-password" ? validatePassword(password) : true;
    const isNameValid = validateFullName(fullName);

    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (mode === "signin") {
        result = await signIn(email, password);
      } else if (mode === "signup") {
        result = await signUp(email, password, fullName);
      } else if (mode === "forgot-password") {
        result = await resetPassword(email);
      }

      if (result?.error) {
        // Enhanced error handling with specific messages
        const errorMessage = result.error.message;

        if (mode === "signin") {
          if (
            errorMessage.toLowerCase().includes("invalid login credentials")
          ) {
            toast.error(
              "Invalid email or password. Please check your credentials and try again."
            );
          } else if (
            errorMessage.toLowerCase().includes("email not confirmed")
          ) {
            toast.error(
              "Please check your email and click the confirmation link before signing in."
            );
          } else if (errorMessage.toLowerCase().includes("too many requests")) {
            toast.error(
              "Too many login attempts. Please wait a few minutes before trying again."
            );
          } else {
            toast.error(errorMessage || "Sign in failed. Please try again.");
          }
        } else if (mode === "signup") {
          if (
            errorMessage.toLowerCase().includes("already registered") ||
            errorMessage.toLowerCase().includes("already exists")
          ) {
            toast.error(
              "An account with this email already exists. Please try signing in instead."
            );
          } else if (errorMessage.toLowerCase().includes("password")) {
            toast.error("Password must be at least 6 characters long.");
          } else if (errorMessage.toLowerCase().includes("email")) {
            toast.error("Please enter a valid email address.");
          } else {
            toast.error(
              errorMessage || "Account creation failed. Please try again."
            );
          }
        } else if (mode === "forgot-password") {
          if (errorMessage.toLowerCase().includes("user not found")) {
            toast.error(
              "No account found with this email address. Please check your email or sign up for a new account."
            );
          } else if (errorMessage.toLowerCase().includes("too many requests")) {
            toast.error(
              "Too many reset requests. Please wait a few minutes before trying again."
            );
          } else {
            toast.error(
              errorMessage || "Failed to send reset email. Please try again."
            );
          }
        }
      } else {
        // Success messages
        if (mode === "signup") {
          toast.success(
            "Account created successfully! Please check your email to confirm your account."
          );
        } else if (mode === "signin") {
          toast.success("Welcome back! You have been signed in successfully.");
        } else if (mode === "forgot-password") {
          toast.success(
            "Password reset email sent! Please check your inbox and follow the instructions."
          );
        }
        onClose();
        setEmail("");
        setPassword("");
        setFullName("");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (mode === "signin") {
        toast.error(
          "Sign in failed. Please check your internet connection and try again."
        );
      } else if (mode === "signup") {
        toast.error(
          "Account creation failed. Please check your internet connection and try again."
        );
      } else if (mode === "forgot-password") {
        toast.error(
          "Failed to send reset email. Please check your internet connection and try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        if (error.message.toLowerCase().includes("popup")) {
          toast.error(
            "Google sign-in popup was blocked. Please allow popups and try again."
          );
        } else if (error.message.toLowerCase().includes("network")) {
          toast.error(
            "Network error. Please check your internet connection and try again."
          );
        } else {
          toast.error(
            error.message || "Google authentication failed. Please try again."
          );
        }
      }
      // Don't close modal here as user will be redirected
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error(
        "Google authentication failed. Please try again or use email/password instead."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "signin":
        return "Sign In";
      case "signup":
        return "Create Account";
      case "forgot-password":
        return "Reset Password";
      default:
        return "Sign In";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "signin":
        return "Welcome back! Please sign in to your account.";
      case "signup":
        return "Create a new account to start generating Chinese names.";
      case "forgot-password":
        return "Enter your email address and we'll send you a link to reset your password.";
      default:
        return "Welcome back! Please sign in to your account.";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "forgot-password" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSwitchMode("signin")}
                className="p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google Sign In - only show for signin and signup */}
          {mode !== "forgot-password" && (
            <>
              <Button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <img
                    src="/google.svg"
                    alt="Google logo"
                    className="h-4 w-4"
                  />
                )}
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3" noValidate>
            {mode === "signup" && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) validateFullName(e.target.value);
                  }}
                  onBlur={() => validateFullName(fullName)}
                  required
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "fullName-error" : undefined}
                  className={
                    nameError ? "border-red-500 focus-visible:ring-red-500" : ""
                  }
                />
                {nameError && (
                  <p
                    id="fullName-error"
                    className="text-sm text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {nameError}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                required
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                className={
                  emailError ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              {emailError && (
                <p
                  id="email-error"
                  className="text-sm text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {emailError}
                </p>
              )}
            </div>

            {mode !== "forgot-password" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => handleSwitchMode("forgot-password")}
                      className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="Reset your password"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={() => validatePassword(password)}
                  required
                  minLength={6}
                  aria-invalid={!!passwordError}
                  aria-describedby={
                    passwordError
                      ? "password-error"
                      : mode === "signup" && password && password.length < 6
                        ? "password-hint"
                        : undefined
                  }
                  className={
                    passwordError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {passwordError && (
                  <p
                    id="password-error"
                    className="text-sm text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {passwordError}
                  </p>
                )}
                {mode === "signup" &&
                  password &&
                  password.length < 6 &&
                  !passwordError && (
                    <p
                      id="password-hint"
                      className="text-xs text-gray-500"
                      aria-live="polite"
                    >
                      Password must be at least 6 characters
                    </p>
                  )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading || !!emailError || !!passwordError || !!nameError
              }
              aria-describedby="submit-button-status"
            >
              {isLoading ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Processing...</span>
                </>
              ) : (
                <Mail className="h-4 w-4" aria-hidden="true" />
              )}
              {mode === "signin" && "Sign In"}
              {mode === "signup" && "Create Account"}
              {mode === "forgot-password" && "Send Reset Email"}
            </Button>
            {isLoading && (
              <p
                id="submit-button-status"
                className="sr-only"
                aria-live="polite"
              >
                {mode === "signin" && "Signing you in..."}
                {mode === "signup" && "Creating your account..."}
                {mode === "forgot-password" && "Sending reset email..."}
              </p>
            )}
          </form>

          {/* Switch Mode Links - only show for signin and signup */}
          {mode !== "forgot-password" && (
            <div className="text-center text-sm">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => handleSwitchMode("signup")}
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    aria-label="Switch to sign up form"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => handleSwitchMode("signin")}
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    aria-label="Switch to sign in form"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
