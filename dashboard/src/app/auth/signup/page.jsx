"use client";

import { SignUp } from "@/components/auth/signup";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
      <SignUp />
    </div>
  );
}
