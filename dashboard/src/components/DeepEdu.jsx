"use client";

import React, { useEffect, useState, useRef } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlayCircle,
  Shield,
  AlertCircle,
  FileText,
  Link,
  Book,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Lock,
  TrendingUp,
  MessageSquare,
  X,
} from "lucide-react";
import ReactPlayer from "react-player";

export function DeepfakeEducationSection() {
  const [activeTab, setActiveTab] = useState("what");
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [expandedCase, setExpandedCase] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const videoRefs = useRef([]);

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

  // Close modal when pressing escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setVideoModal(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent body scrolling when modal is open
    if (videoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [videoModal]);

  const handleCaseClick = (id) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const handleVideoClick = (videoId) => {
    // Find the video object by ID
    const video = awarenessVideos.find((v) => v.id === videoId);
    if (video) {
      setVideoModal(video);
    }
  };

  const closeModal = () => {
    setVideoModal(null);
  };

  const tabs = [
    {
      id: "what",
      label: "What are Deepfakes?",
      icon: <Info className="w-5 h-5" />,
    },
    {
      id: "awareness",
      label: "Awareness Videos",
      icon: <PlayCircle className="w-5 h-5" />,
    },
    {
      id: "cases",
      label: "Case Studies",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "protection",
      label: "Protection",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  const awarenessVideos = [
    {
      id: 1,
      title: "Understanding the Surge in Deepfake Attempts",
      description:
        "Explore the alarming growth of deepfake attempts and their impact over the last 3 years.",
      duration: "5:12",
      thumbnail: "https://img.youtube.com/vi/KYJ6w0_Gbpo/0.jpg",
      source: "CBS News",
      tags: ["Educational", "Technology"],
      videoUrl: "https://www.youtube.com/watch?v=KYJ6w0_Gbpo",
    },
    {
      id: 2,
      title: "Exploring Deepfake Phishing Threats",
      description:
        "An overview of how deepfakes are used in phishing scams and social engineering attacks.",
      duration: "4:50",
      thumbnail: "https://img.youtube.com/vi/Ap2dxzl7PSw/0.jpg",
      source: "Keepnet Labs",
      tags: ["Security", "Phishing"],
      videoUrl: "https://www.youtube.com/watch?v=Ap2dxzl7PSw",
    },
    {
      id: 3,
      title: "Defending Against AI-Generated Deception",
      description:
        "Learn how to recognize and defend against AI-generated deepfake deceptions.",
      duration: "6:32",
      thumbnail: "https://img.youtube.com/vi/cVvJgdm19Ak/0.jpg",
      source: "Tech Talks",
      tags: ["Detection", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=cVvJgdm19Ak",
    },
    {
      id: 4,
      title: "Preventing Deepfake Phishing Scams",
      description:
        "Discover methods to identify and prevent falling victim to deepfake phishing scams.",
      duration: "5:45",
      thumbnail: "https://img.youtube.com/vi/njKDrkFu5Nk/0.jpg",
      source: "Cybersecurity Hub",
      tags: ["Phishing", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=njKDrkFu5Nk",
    },
    {
      id: 5,
      title: "The Impact of Deepfakes on Elections",
      description:
        "Investigate how deepfakes can influence public opinion and election outcomes.",
      duration: "7:21",
      thumbnail: "https://img.youtube.com/vi/B4jNttRvbpU/0.jpg",
      source: "BBC News",
      tags: ["Political", "Awareness"],
      videoUrl: "https://www.youtube.com/watch?v=B4jNttRvbpU",
    },
    {
      id: 6,
      title: "Detection and Generation of Deep Fakes",
      description:
        "Dr. Peter Eisert discusses techniques for creating and identifying deepfakes.",
      duration: "1:02:15",
      thumbnail: "https://img.youtube.com/vi/YvTbHyw7jx0/0.jpg",
      source: "IEEE Signal Processing Society",
      tags: ["Deepfakes", "Detection", "Generation"],
      videoUrl: "https://www.youtube.com/watch?v=YvTbHyw7jx0",
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Political Deepfakes in the 2023 Elections",
      summary:
        "Analysis of synthetic videos that circulated during a national election and their impact on public discourse.",
      impact: "Medium",
      category: "Political",
      outcome: "Debunked within 48 hours but reached over 2 million views",
    },
    {
      id: 2,
      title: "CEO Voice Fraud Case",
      summary:
        "How criminals used AI voice cloning to authorize a fraudulent wire transfer of $243,000.",
      impact: "High",
      category: "Financial",
      outcome:
        "Funds partially recovered, company implemented voice verification protocols",
    },
    {
      id: 3,
      title: "Celebrity Deepfake Endorsements",
      summary:
        "Investigation into unauthorized AI-generated celebrity endorsements for fraudulent products.",
      impact: "Medium",
      category: "Commercial",
      outcome: "Legal action by celebrities, new platform policies implemented",
    },
  ];

  const protectionMethods = [
    {
      title: "Digital Signatures",
      description:
        "Content provenance verification using cryptographic signatures to prove authenticity.",
      icon: <Lock className="w-10 h-10" />,
      color: "from-blue-500 to-sky-500",
    },
    {
      title: "Media Literacy",
      description:
        "Educational programs to help people critically evaluate digital content they encounter.",
      icon: <Book className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Detection Tools",
      description:
        "Software solutions that can identify manipulated media through AI analysis.",
      icon: <AlertCircle className="w-10 h-10" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Verification Platforms",
      description:
        "Third-party services that authenticate important media before distribution.",
      icon: <Link className="w-10 h-10" />,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12 text-center"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 py-1">
            Understanding Deepfakes
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Learn about synthetic media technology, its implications, and how to
            protect yourself
          </p>
        </motion.div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* What are Deepfakes? */}
      {activeTab === "what" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full">
              <div className="p-8 h-full relative">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 filter blur-xl -z-10"></div>

                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
                  The Technology Behind Deepfakes
                </h3>

                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  Deepfakes are synthetic media created using deep learning
                  algorithms, specifically generative adversarial networks
                  (GANs) and diffusion models. These AI systems can generate
                  realistic images, videos, and audio that appear to show real
                  people saying or doing things they never did.
                </p>

                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Rapidly Evolving Technology
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Deepfake quality doubles approximately every 6 months
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-lg mb-2 text-neutral-800 dark:text-neutral-200">
                  Common Applications
                </h4>
                <ul className="space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                    <span>Face swapping in videos and images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                    <span>Synthetic voice generation and cloning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                    <span>Full-body puppetry and motion transfer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                    <span>Text-to-video generation</span>
                  </li>
                </ul>

                <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-xl mb-4">
                  <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                    Distinguishing Factors
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    While technology continues to improve, most deepfakes still
                    exhibit telltale artifacts like unnatural eye movements,
                    lighting inconsistencies, audio-visual misalignment, and
                    blurring around facial edges.
                  </p>
                </div>
              </div>
            </BackgroundGradient>
          </div>

          <div>
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full">
              <div className="p-8 h-full relative">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 filter blur-xl -z-10"></div>

                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
                  Potential Risks
                </h3>

                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Misinformation
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Synthetic media can be used to spread false information by
                      creating convincing but fake statements from public
                      figures.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Identity Theft
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Voice cloning can be used for authentication bypass and
                      financial fraud.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Reputation Damage
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Synthetic content can be used to portray individuals in
                      compromising situations.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Trust Erosion
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      The mere existence of deepfakes can create a "liar's
                      dividend" where authentic content is dismissed as fake.
                    </p>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </motion.div>
      )}

      {/* Awareness Videos */}
      {activeTab === "awareness" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {awarenessVideos.map((video) => (
            <BackgroundGradient
              key={video.id}
              className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              <div className="h-full flex flex-col">
                {/* Video Thumbnail & Play Button */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-2 flex items-center">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs mr-2 px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-800 dark:text-neutral-200">
                    {video.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-grow">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">
                      Source: {video.source}
                    </span>
                    <button
                      onClick={() => handleVideoClick(video.id)}
                      className="text-sm font-medium flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <span>Watch Video</span>
                      <PlayCircle className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          ))}
        </motion.div>
      )}
      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={closeModal}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-xl w-full max-w-4xl z-10 relative"
            >
              <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200">
                  {videoModal.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              <div className="relative pt-[56.25%]">
                {" "}
                {/* 16:9 aspect ratio */}
                <ReactPlayer
                  url={videoModal.videoUrl}
                  className="absolute top-0 left-0"
                  playing
                  controls
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    },
                  }}
                />
              </div>

              <div className="p-4 bg-neutral-50 dark:bg-neutral-900/90">
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  {videoModal.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {videoModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500">
                    Source: {videoModal.source}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Case Studies */}
      {activeTab === "cases" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {caseStudies.map((caseStudy) => (
            <BackgroundGradient
              key={caseStudy.id}
              className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    {caseStudy.title}
                  </h3>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        caseStudy.impact === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : caseStudy.impact === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {caseStudy.impact} Impact
                    </span>
                    <span className="ml-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2.5 py-0.5 rounded-full text-xs">
                      {caseStudy.category}
                    </span>
                  </div>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  {caseStudy.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium">Outcome:</span>{" "}
                    {caseStudy.outcome}
                  </div>
                  <button
                    onClick={() => handleCaseClick(caseStudy.id)}
                    className="text-sm font-medium flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  >
                    {expandedCase === caseStudy.id ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        <span>Full Case Study</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
                {expandedCase === caseStudy.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <h4 className="text-lg font-semibold mb-2">Background</h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        {caseStudy.category === "Political" && (
                          <>
                            During the 2023 elections, a series of deepfake
                            videos appeared showing a leading candidate making
                            controversial statements about tax policy. The
                            videos were initially shared on social media
                            platforms and quickly went viral before
                            fact-checkers could respond.
                          </>
                        )}
                        {caseStudy.category === "Financial" && (
                          <>
                            In early 2023, criminals used AI voice cloning
                            technology to mimic the voice of a multinational
                            company's CEO, convincing a financial controller to
                            authorize an emergency wire transfer of $243,000 to
                            a fraudulent account.
                          </>
                        )}
                        {caseStudy.category === "Commercial" && (
                          <>
                            Multiple celebrities discovered AI-generated
                            versions of themselves appearing in advertisements
                            for products they had never endorsed, including
                            health supplements and cryptocurrency investments.
                          </>
                        )}
                      </p>
                      <h4 className="text-lg font-semibold mb-2">Analysis</h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        {caseStudy.category === "Political" && (
                          <>
                            Technical analysis revealed several indicators of
                            manipulation, including inconsistent lip
                            synchronization and unnatural facial expressions.
                            The videos were traced to a political action group
                            using commercially available AI tools.
                          </>
                        )}
                        {caseStudy.category === "Financial" && (
                          <>
                            The fraudsters used a combination of social
                            engineering and AI voice synthesis. They first
                            researched the CEO's speaking style from public
                            interviews and earnings calls, then created a
                            convincing voice clone that matched his accent and
                            speech patterns.
                          </>
                        )}
                        {caseStudy.category === "Commercial" && (
                          <>
                            The deepfakes were created using generative
                            adversarial networks trained on publicly available
                            footage of the celebrities. Many of the fake
                            endorsements targeted vulnerable populations with
                            promises of miracle health cures or unrealistic
                            investment returns.
                          </>
                        )}
                      </p>
                      <h4 className="text-lg font-semibold mb-2">
                        Lessons Learned
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300 mb-4">
                        {caseStudy.category === "Political" && (
                          <>
                            <li>
                              Rapid response teams need to be in place during
                              sensitive periods
                            </li>
                            <li>
                              Cross-platform coordination is essential for
                              effective debunking
                            </li>
                            <li>
                              Digital literacy education is crucial for the
                              public
                            </li>
                            <li>
                              Content authentication systems need wider adoption
                            </li>
                          </>
                        )}
                        {caseStudy.category === "Financial" && (
                          <>
                            <li>
                              Multi-factor authentication must include
                              non-replicable factors
                            </li>
                            <li>
                              Establish verification protocols for high-value
                              transactions
                            </li>
                            <li>
                              Regular training for financial staff on emerging
                              threats
                            </li>
                            <li>
                              Implement callback procedures through separate,
                              secure channels
                            </li>
                          </>
                        )}
                        {caseStudy.category === "Commercial" && (
                          <>
                            <li>
                              Celebrities need to monitor their digital presence
                              more actively
                            </li>
                            <li>
                              Platforms require better detection mechanisms
                            </li>
                            <li>
                              Legal frameworks need updating to address
                              synthetic media
                            </li>
                            <li>
                              Consumer education about verification of
                              endorsements
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </BackgroundGradient>
          ))}
        </motion.div>
      )}

      {/* Protection */}
      {activeTab === "protection" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {protectionMethods.map((method, index) => (
              <BackgroundGradient
                key={index}
                className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
              >
                <div className="p-6 flex items-start">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mr-4 text-white`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
                      {method.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {method.description}
                    </p>
                  </div>
                </div>
              </BackgroundGradient>
            ))}
          </div>
          <div className="mb-8">
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                  Best Practices for Individuals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                      Verify Before You Trust
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Cross-check information through multiple credible sources
                      before accepting sensational or unusual content as
                      authentic.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-blue-500" />
                      Strengthen Authentication
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Use multi-factor authentication that includes biometric
                      verification or hardware security keys for sensitive
                      accounts.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-green-500" />
                      Establish Verification Protocols
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Create personal verification questions or code words with
                      colleagues and family members for sensitive
                      communications.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2 text-purple-500" />
                      Use Detection Tools
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Utilize deepfake detection services like ours before
                      making decisions based on potentially manipulated media.
                    </p>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </div>
          <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                For Organizations
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Develop Crisis Response Plans
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Create protocols for responding to deepfake incidents that
                      could affect your organization or leadership. Designate
                      response teams and establish verification procedures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4 text-green-600 dark:text-green-400 shrink-0">
                    <Book className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Educate Your Team
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Provide regular training on deepfake detection and
                      verification methods. Ensure employees understand the
                      risks and know how to identify potential synthetic media.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Implement Content Authentication
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Use digital signatures and content provenance solutions
                      for official communications. Consider watermarking
                      technology for your organization's media assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4 text-amber-600 dark:text-amber-400 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Monitor Brand Presence
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Utilize digital monitoring tools to track unauthorized
                      appearances of your brand or executives across the web and
                      social media platforms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h4 className="font-bold text-center mb-4 text-neutral-800 dark:text-neutral-200">
                  Legal & Policy Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                    <a
                      href="https://www.responsible.ai/a-look-at-global-deepfake-regulation-approaches/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 dark:text-neutral-300 hover:underline"
                    >
                      Deepfake Legislation Guide
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                    <a
                      href="https://www.itic.org/policy/ITI_AIContentAuthorizationPolicy_122123.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 dark:text-neutral-300 hover:underline"
                    >
                      Content Authentication Standards
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                    <a
                      href="https://media.defense.gov/2023/Sep/12/2003298925/-1/-1/0/CSI-DEEPFAKE-THREATS.PDF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 dark:text-neutral-300 hover:underline"
                    >
                      Organizational Response Templates
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                    <a
                      href="https://www.dhs.gov/sites/default/files/2022-10/AEP%20DeepFake%20PHASE2%20FINAL%20corrected20221006.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 dark:text-neutral-300 hover:underline"
                    >
                      Platform Reporting Procedures
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      )}

      {/* FAQ Section */}
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
          Our models achieve 97-99% accuracy on benchmark datasets, though
          results may vary with real-world content.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            Is my data private?
          </span>{" "}
          Yes, all uploads are analyzed securely and not stored after
          processing. Your privacy is our priority.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            Can I use this for commercial purposes?
          </span>{" "}
          Currently our service is for personal use only. Contact us for custom
          solutions.
        </p>
      </motion.div>

      {/* Bottom Call To Action */}
      <motion.div variants={itemVariants} className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
          Ready to Protect Your Digital Identity?
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
          Start with our deepfake detection tools and become part of the
          solution against digital deception
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors duration-200 flex items-center dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <Shield className="w-5 h-5 mr-2" />
            Try Our Detection Tools
          </button>
          <a
            href="https://cloud.google.com/discover/what-is-deep-learning?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neutral-100 text-neutral-800 font-medium rounded-full hover:bg-neutral-200 transition-colors duration-200 flex items-center dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            <Info className="w-5 h-5 mr-2" />
            Learn More About Deep learning Technology
          </a>
        </div>
      </motion.div>
    </div>
  );
}
