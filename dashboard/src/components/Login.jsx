"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase/supabase.js";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInloading, setSignInLoading] = useState(false);
  const [signUploading, setSignUpLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Sign-up successful! Please check your email to confirm your account.');
    }

    setSignUpLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Sign-in successful!');
    }

    setSignInLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) {
      console.error('OAuth login error:', error.message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Aceternity</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up or sign in to continue
      </p>

      <form className="my-8" onSubmit={handleSignUp}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium"
          type="submit"
          disabled={signUploading}
        >
          {signUploading ? 'Signing up...' : 'Sign up'}
          <BottomGradient />
        </button>
      </form>

      <form onSubmit={handleSignIn} className="my-8">
        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium"
          type="submit"
          disabled={signInloading}
        >
          {signInloading ? 'Signing in...' : 'Sign in'}
          <BottomGradient />
        </button>
      </form>

      {message && <p className="text-sm text-center text-neutral-600 dark:text-neutral-300">{message}</p>}

      <div className="flex flex-col space-y-4 mt-4">
        <button onClick={() => handleOAuthLogin('github')} className="relative group/btn flex items-center space-x-2">
          <IconBrandGithub className="h-4 w-4" />
          <span>Sign in with GitHub</span>
          <BottomGradient />
        </button>
        <button onClick={() => handleOAuthLogin('google')} className="relative group/btn flex items-center space-x-2">
          <IconBrandGoogle className="h-4 w-4" />
          <span>Sign in with Google</span>
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};
