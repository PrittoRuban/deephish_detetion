"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase/supabase";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { IconEye, IconEyeOff, IconMail, IconLock } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          remember: rememberMe,
        },
      });

      if (signInError) throw signInError;

      router.push("/"); // More specific destination
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border/40">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your account to continue
        </p>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="bg-destructive/10 border-destructive/30"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium"
          onClick={() => handleOAuthSignIn("github")}
          disabled={loading}
        >
          <IconBrandGithub className="mr-2 h-5 w-5" />
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium"
          onClick={() => handleOAuthSignIn("google")}
          disabled={loading}
        >
          <IconBrandGoogle className="mr-2 h-5 w-5" />
          Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSignIn}>
        <LabelInputContainer>
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <div className="relative">
            <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              aria-describedby="email-error"
              required
            />
          </div>
        </LabelInputContainer>

        <LabelInputContainer>
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              aria-describedby="password-error"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IconEyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <IconEye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </LabelInputContainer>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 font-medium"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};
