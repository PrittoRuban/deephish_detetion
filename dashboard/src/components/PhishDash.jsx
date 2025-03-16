"use client";

import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Link2, MessageSquare, Mail } from "lucide-react";

export function PhishDash() {
  const router = useRouter();

  const grids = [
    {
      title: "Analyze URL for Phishing",
      description:
        "Instantly detect malicious URLs. Our AI-powered scanner identifies suspicious patterns and potential phishing attempts in web addresses.",
      route: "/phishing/url",
      icon: <Link2 className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Analyze Messages for Phishing",
      description:
        "Don't fall for scam messages. Our advanced analysis detects social engineering tactics and phishing attempts in text messages and chat communications.",
      route: "/phishing/message",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Analyze Emails for Phishing",
      description:
        "Protect your inbox from threats. Our email scanner identifies suspicious senders, malicious links, and common phishing tactics in email content.",
      route: "/phishing/email",
      icon: <Mail className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {grids.map((grid, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => router.push(grid.route)}
          >
            <BackgroundGradient className="p-8 h-full">
              <div className="flex flex-col h-full">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grid.color} flex items-center justify-center mb-6 text-white`}
                >
                  {grid.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                  {grid.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                  {grid.description}
                </p>
                <div className="flex items-center text-neutral-700 dark:text-neutral-300 group">
                  <span className="font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
