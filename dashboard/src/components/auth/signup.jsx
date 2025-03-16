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
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconInfoCircle,
} from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

export function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Password validation
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const validatePassword = (pass) => {
    if (!pass) return { score: 0, feedback: "" };

    const hasMinLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    let feedback = "";
    if (score < 3) feedback = "Weak password";
    else if (score < 5) feedback = "Moderate password";
    else feedback = "Strong password";

    return { score, feedback };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(validatePassword(newPassword));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordStrength.score < 3) {
      setError("Please create a stronger password");
      setLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms of service");
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      setMessage("Successfyully created account.");

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
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign up to get started with Secure One
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

      {message && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <IconInfoCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            {message}
          </AlertDescription>
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

      <form className="space-y-5" onSubmit={handleSignUp}>
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
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="pl-10"
              aria-describedby="password-feedback"
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
          {password && (
            <div className="mt-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all",
                      passwordStrength.score < 3
                        ? "bg-red-500"
                        : passwordStrength.score < 5
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {passwordStrength.feedback}
                </span>
              </div>
              <p
                id="password-feedback"
                className="text-xs text-muted-foreground mt-1"
              >
                Password must be at least 8 characters and include uppercase,
                lowercase, numbers, and special characters
              </p>
            </div>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
          </Label>
          <div className="relative">
            <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                "pl-10",
                confirmPassword && password !== confirmPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
              required
            />
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}
        </LabelInputContainer>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-snug"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-primary underline hover:text-primary/80"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary underline hover:text-primary/80"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 font-medium"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};
