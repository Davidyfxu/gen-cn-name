"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";

export function Navigation() {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const handleSignOut = async () => {
    await signOut();
  };

  const openSignIn = () => {
    setAuthMode("signin");
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center">
            {/* Left section - Navigation links for logged in users */}
            <div className="flex-1 flex items-center justify-start">
              {user && (
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link
                    href="/generate"
                    className="transition-colors text-gray-600 hover:text-gray-900"
                  >
                    Generate
                  </Link>
                  <Link
                    href="/dashboard"
                    className="transition-colors text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                </nav>
              )}
            </div>

            {/* Center section - Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ChineseName.ai
                </span>
              </Link>
            </div>

            {/* Right section - Auth buttons or user menu */}
            <div className="flex-1 flex items-center justify-end space-x-4">
              {loading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        {user.user_metadata?.avatar_url && (
                          <AvatarImage 
                            src={user.user_metadata.avatar_url} 
                            alt="Avatar"
                          />
                        )}
                        <AvatarFallback>
                          {user.user_metadata?.full_name
                            ? user.user_metadata.full_name
                                .charAt(0)
                                .toUpperCase()
                            : user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.user_metadata?.full_name && (
                          <p className="font-medium">
                            {user.user_metadata.full_name}
                          </p>
                        )}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={openSignIn}
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                  <Button onClick={openSignUp}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={(mode: "signin" | "signup") => setAuthMode(mode)}
      />
    </>
  );
}
