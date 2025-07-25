"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-xl">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            There was an error signing you in. This could be due to:
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Network connectivity issues</li>
            <li>• OAuth provider configuration</li>
            <li>• Temporary service disruption</li>
          </ul>
          <div className="pt-4">
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
