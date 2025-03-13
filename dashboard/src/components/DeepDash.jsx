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
        "Uncover the truth behind any image. Our AI-powered analyzer detects manipulations, helping you spot deepfakes instantly.",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {grids.map((grid, index) => (
        <div
          key={index}
          onClick={() => router.push(grid.route)}
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <BackgroundGradient className="rounded-[22px] w-full max-w-[350px] h-[400px] p-4 sm:p-8 bg-white dark:bg-zinc-900">
            <Image
              src={grid.imgSrc}
              alt={grid.title}
              height={300}
              width={300}
              className="object-contain mx-auto"
            />
            <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
              {grid.title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              {grid.description}
            </p>
          </BackgroundGradient>
        </div>
      ))}
    </div>
  );
}
