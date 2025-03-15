"use client";

import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Video, Mic } from "lucide-react";

export function DeepfakeAnalysisGrids() {
  const router = useRouter();

  const grids = [
    {
      title: "Analyze Image for Deepfake",
      description:
        "Uncover the truth behind any image. Our AI-powered analyzer detects manipulations, helping you spot deepfakes instantly.",
      route: "/deepfake/image",
      icon: <Shield className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Analyze Video for Deepfake",
      description:
        "Videos can lie — but not to us. Identify AI-generated content, frame-by-frame, ensuring what you see is real and trustworthy.",
      route: "/deepfake/video",
      icon: <Video className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Analyze Audio for Deepfake",
      description:
        "Voices can be faked too. Our system reveals synthetic audio patterns, safeguarding you from AI voice cloning and deception.",
      route: "/deepfake/audio",
      icon: <Mic className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
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
