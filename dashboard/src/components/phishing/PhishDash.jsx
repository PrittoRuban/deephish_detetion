"use client";

import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Link2,
  MessageSquare,
  Mail,
  Info,
  AlertTriangle,
} from "lucide-react";

export function PhishDash() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const grids = [
    {
      title: "URL Analysis",
      subtitle: "Detect malicious web addresses",
      description:
        "Our AI-powered scanner identifies suspicious patterns, redirects, and potential phishing attempts in web addresses with high precision.",
      route: "/phishing/url",
      icon: <Link2 className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      stats: "99.4% accuracy",
      infoText: "Supports all URL formats",
    },
    {
      title: "Message Analysis",
      subtitle: "Identify scam messages",
      description:
        "Detect social engineering tactics and phishing attempts in text messages, chat communications, and social media messages with advanced linguistic analysis.",
      route: "/phishing/message",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-violet-500 to-purple-500",
      gradient: "bg-gradient-to-br from-violet-500/20 to-purple-500/20",
      stats: "98.7% accuracy",
      infoText: "Works with SMS, chat apps, and more",
    },
    {
      title: "Email Analysis",
      subtitle: "Secure your inbox",
      description:
        "Our email scanner identifies suspicious senders, malicious links, spoofed domains, and common phishing tactics in email content to protect your data.",
      route: "/phishing/email",
      icon: <Mail className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      stats: "99.1% accuracy",
      infoText: "Supports all major email formats",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12 text-center"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 py-1">
            Advanced Phishing Protection
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Shield yourself from digital threats with our suite of AI-powered
            detection tools
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6"
      >
        {grids.map((grid, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300 },
            }}
            className="relative cursor-pointer h-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => router.push(grid.route)}
          >
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full">
              <div className={`p-8 h-full flex flex-col relative z-10`}>
                {/* Floating gradient background */}
                <div
                  className={`absolute inset-0 opacity-10 ${grid.gradient} filter blur-xl -z-10`}
                ></div>

                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    grid.color
                  } flex items-center justify-center mb-5 text-white shadow-lg transform transition-transform duration-300 ${
                    hoveredIndex === index ? "scale-110" : ""
                  }`}
                >
                  {grid.icon}
                </div>

                {/* Title section */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
                    {grid.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                    {grid.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                  {grid.description}
                </p>

                {/* Stats & Info */}
                <div className="flex items-center gap-1 mb-5 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {grid.stats}
                  </span>
                  <span className="inline-flex items-center text-neutral-500 dark:text-neutral-400">
                    <Info className="w-3 h-3 ml-2 mr-1" />
                    {grid.infoText}
                  </span>
                </div>

                {/* Call to action */}
                <motion.div
                  className={`flex items-center text-neutral-800 dark:text-neutral-200 font-semibold group ${
                    hoveredIndex === index
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ""
                  }`}
                  animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>Get Started</span>
                  <ArrowRight
                    className={`w-5 h-5 ml-2 transition-all duration-300 ${
                      hoveredIndex === index
                        ? "translate-x-2 text-emerald-600 dark:text-emerald-400"
                        : ""
                    }`}
                  />
                </motion.div>
              </div>
            </BackgroundGradient>

            {/* "New" badge for message analysis (middle item) */}
            {index === 0 && (
              <div className="absolute -top-3 -right-2 z-20">
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  NEW
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* FAQ Section
      <motion.div
        variants={itemVariants}
        className="mt-16 bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-neutral-500" />
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Frequently Asked Questions
          </h3>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            How accurate is the detection?
          </span>{" "}
          Our models achieve over 98% accuracy on known phishing attempts,
          though results may vary with new threats.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            Is my data private?
          </span>{" "}
          Yes, all content is analyzed securely and not stored after processing.
          Your privacy is our priority.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            How often are the models updated?
          </span>{" "}
          Our detection models are updated daily with new phishing patterns and
          tactics to ensure maximum protection.
        </p>
      </motion.div> */}
    </div>
  );
}
