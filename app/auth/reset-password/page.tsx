"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { createBrowserSupabaseClient } from "@/lib/supabase";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();

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
    if (password.length > 72) {
      setPasswordError("Password must be less than 72 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Confirm password validation
  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have auth code/tokens in URL parameters
        const code = searchParams.get("code");
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");

        if (code) {
          // Exchange code for session
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error("Code exchange error:", error);
            setIsValidSession(false);
          } else {
            setIsValidSession(true);
          }
        } else if (accessToken && refreshToken) {
          // Set session from tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Session set error:", error);
            setIsValidSession(false);
          } else {
            setIsValidSession(true);
          }
        } else {
          // Check if we already have a valid session
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error("Session check error:", error);
            setIsValidSession(false);
          } else if (session) {
            setIsValidSession(true);
          } else {
            setIsValidSession(false);
          }
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        setIsValidSession(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    handleAuthCallback();
  }, [supabase.auth, searchParams]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("same as")) {
          toast.error(
            "New password must be different from your current password"
          );
        } else if (error.message.toLowerCase().includes("weak")) {
          toast.error(
            "Password is too weak. Please choose a stronger password"
          );
        } else {
          toast.error(error.message || "Failed to update password");
        }
      } else {
        toast.success(
          "Password updated successfully! Redirecting to dashboard..."
        );
        // Small delay to show success message before redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-sm text-gray-600">Verifying reset link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-xl">Invalid Reset Link</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Button onClick={() => router.push("/")} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Check className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-xl">Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                  // Re-validate confirm password if it exists
                  if (confirmPassword)
                    validateConfirmPassword(confirmPassword, e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                required
                minLength={6}
                maxLength={72}
                aria-invalid={!!passwordError}
                aria-describedby={
                  passwordError
                    ? "password-error"
                    : password && password.length < 6
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
              {password && password.length < 6 && !passwordError && (
                <p
                  id="password-hint"
                  className="text-xs text-gray-500"
                  aria-live="polite"
                >
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError)
                    validateConfirmPassword(e.target.value, password);
                }}
                onBlur={() =>
                  validateConfirmPassword(confirmPassword, password)
                }
                required
                minLength={6}
                maxLength={72}
                aria-invalid={!!confirmPasswordError}
                aria-describedby={
                  confirmPasswordError ? "confirmPassword-error" : undefined
                }
                className={
                  confirmPasswordError
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {confirmPasswordError && (
                <p
                  id="confirmPassword-error"
                  className="text-sm text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !!passwordError ||
                !!confirmPasswordError ||
                !password ||
                !confirmPassword
              }
              aria-describedby="reset-button-status"
            >
              {isLoading ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Updating password...</span>
                </>
              ) : (
                "Update Password"
              )}
            </Button>
            {isLoading && (
              <p
                id="reset-button-status"
                className="sr-only"
                aria-live="polite"
              >
                Updating your password, please wait...
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
          </Card>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
