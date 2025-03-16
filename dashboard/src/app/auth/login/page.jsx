"use client";

import { Login } from "@/components/auth/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
      <Login />
    </div>
  );
}
