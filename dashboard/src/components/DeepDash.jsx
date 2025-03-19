"use client";

import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Video,
  Mic,
  AlertTriangle,
  MessageSquare,
  Info,
  Image,
} from "lucide-react";

export function DeepfakeAnalysisGrids() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const grids = [
    {
      title: "Image Analysis",
      subtitle: "Detect manipulated photos",
      description:
        "Our AI-powered analyzer detects pixel-level manipulations and GAN artifacts, helping you instantly verify image authenticity.",
      route: "/deepfake/image",
      icon: <Image className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      stats: "99.2% accuracy",
      infoText: "Supports JPEG, PNG, and WebP formats",
    },
    {
      title: "Video Analysis",
      subtitle: "Frame-by-frame deepfake detection",
      description:
        "Our system identifies AI-generated content through temporal inconsistencies, facial anomalies, and unnatural movements.",
      route: "/deepfake/video",
      icon: <Video className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
      stats: "97.8% accuracy",
      infoText: "Supports MP4, MOV, and WebM formats",
    },
    {
      title: "Audio Analysis",
      subtitle: "Voice authenticity verification",
      description:
        "Detect synthetic voices, AI voice cloning, and spliced audio by analyzing spectral patterns and phonetic inconsistencies.",
      route: "/deepfake/audio",
      icon: <Mic className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      stats: "98.5% accuracy",
      infoText: "Supports MP3, WAV, and M4A formats",
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
            Advanced Deepfake Detection
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Protect yourself from digital deception with our suite of AI-powered
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

            {/* "New" badge for first item */}
            {index === 1 && (
              <div className="absolute -top-3 -right-2 z-20">
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  NEW
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      
    </div>
  );
}
