"use client";

import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DeepfakeAnalysisGrids() {
  const router = useRouter();

  const grids = [
    {
      title: "Analyze Image for Deepfake",
      description:
        "Uncover the truth behind any image. Our AI-powered analyzer detects manipulations, and helping you spot deepfakes instantly.",
      route: "/deepfake/image",
      imgSrc: "/deepImage.png",
    },
    {
      title: "Analyze Video for Deepfake",
      description:
        "Videos can lie — but not to us. Identify AI-generated content, frame-by-frame, ensuring what you see is real and trustworthy.",
      route: "/deepfake/video",
      imgSrc: "/deepVideo.png",
    },
    {
      title: "Analyze Audio for Deepfake",
      description:
        "Voices can be faked too. Our system reveals synthetic audio patterns, safeguarding you from AI voice cloning and deception.",
      route: "/deepfake/audio",
      imgSrc: "/deepAudio.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
      {grids.map((grid, index) => (
        <div
          key={index}
          onClick={() => router.push(grid.route)}
          className="cursor-pointer"
        >
          <BackgroundGradient className="rounded-[22px] h-[400px] w-[350px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={grid.imgSrc}
              alt={grid.title}
              height={400}
              width={400}
              className="object-contain mx-auto"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {grid.title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {grid.description}
            </p>
          </BackgroundGradient>
        </div>
      ))}
    </div>
  );
}
