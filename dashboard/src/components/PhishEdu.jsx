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
  Mail,
  Smartphone,
  Globe,
  User,
} from "lucide-react";
import ReactPlayer from "react-player";

export function PhishingEducationSection() {
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
      label: "What is Phishing?",
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
      title: "Recognize and Report Phishing",
      description:
        "Learn how to identify phishing attempts and the steps to report them effectively.",
      duration: "2:01",
      thumbnail: "https://img.youtube.com/vi/JlQovysQBn0/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=JlQovysQBn0",
    },
    {
      id: 2,
      title: "Protect Yourself from Phishing",
      description:
        "Understand the tactics used in phishing scams and how to safeguard your personal information.",
      duration: "1:48",
      thumbnail: "https://img.youtube.com/vi/gbsPwpd5UAU/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=gbsPwpd5UAU",
    },
    {
      id: 3,
      title: "Phishing Training in Under 2 Minutes",
      description:
        "A concise guide to recognizing and avoiding phishing attacks.",
      duration: "1:55",
      thumbnail: "https://img.youtube.com/vi/Wd-T8-VlmhU/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=Wd-T8-VlmhU",
    },
    {
      id: 4,
      title: "What is Phishing?",
      description:
        "A brief overview of phishing and how to protect yourself from such attacks.",
      duration: "1:38",
      thumbnail: "https://img.youtube.com/vi/3GBmpqhQI8s/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=3GBmpqhQI8s",
    },
    {
      id: 5,
      title: "How to Avoid Phishing! (We Can Secure Our World)",
      description:
        "A recent video highlighting methods to avoid phishing attacks.",
      duration: "3:30",
      thumbnail: "https://img.youtube.com/vi/sg0kQYvTlnc/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl: "https://www.youtube.com/watch?v=sg0kQYvTlnc",
    },
    {
      id: 6,
      title: "Phishing Awareness Training",
      description: "Comprehensive training on phishing awareness.",
      duration: "Varies",
      thumbnail: "https://img.youtube.com/vi/3GBmpqhQI8s/0.jpg",
      source: "YouTube",
      tags: ["Educational", "Security"],
      videoUrl:
        "https://www.youtube.com/playlist?list=PLMMeMp5fhaUwf0Gua92pLpfqyI4zzhLHE",
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Major Healthcare Provider Breach",
      summary:
        "How a sophisticated phishing campaign led to the compromise of 1.2 million patient records at a national healthcare provider.",
      impact: "High",
      category: "Healthcare",
      outcome: "HIPAA violations, $4.3 million in fines, class action lawsuits",
    },
    {
      id: 2,
      title: "Energy Sector Spear Phishing",
      summary:
        "Targeted spear phishing attack against utility company employees nearly caused critical infrastructure disruption.",
      impact: "High",
      category: "Critical Infrastructure",
      outcome:
        "Attack contained before operational impact, significant security overhaul implemented",
    },
    {
      id: 3,
      title: "University Financial Aid Scam",
      summary:
        "Widespread phishing campaign targeting university students redirected financial aid deposits to attacker-controlled accounts.",
      impact: "Medium",
      category: "Education",
      outcome:
        "Over $1.2 million stolen, partial recovery through cyber insurance",
    },
  ];

  const protectionMethods = [
    {
      title: "Email Security Gateways",
      description:
        "Advanced filtering systems that scan incoming messages for phishing indicators before delivery.",
      icon: <Mail className="w-10 h-10" />,
      color: "from-blue-500 to-sky-500",
    },
    {
      title: "Security Awareness Training",
      description:
        "Regular, scenario-based education to help users recognize and respond appropriately to phishing attempts.",
      icon: <User className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Multi-Factor Authentication",
      description:
        "Adding additional verification layers beyond passwords to prevent account compromise.",
      icon: <Smartphone className="w-10 h-10" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Web Filtering & DNS Protection",
      description:
        "Blocking malicious sites and domains that are linked in phishing messages.",
      icon: <Globe className="w-10 h-10" />,
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
            Understanding Phishing Attacks
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Learn how to identify, avoid, and protect yourself from increasingly
            sophisticated phishing attempts
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

      {/* What is Phishing? */}
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
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 filter blur-xl -z-10"></div>

                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
                  The Mechanics of Phishing
                </h3>

                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  Phishing is a type of social engineering attack where
                  attackers disguise themselves as trustworthy entities to trick
                  victims into revealing sensitive information, installing
                  malware, or taking harmful actions. These attacks exploit
                  human psychology rather than technical vulnerabilities.
                </p>

                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Increasingly Sophisticated Attacks
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Phishing attacks have evolved from obvious scams to highly
                      personalized, targeted campaigns
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-lg mb-2 text-neutral-800 dark:text-neutral-200">
                  Common Phishing Types
                </h4>
                <ul className="space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>
                      Email phishing - Fraudulent messages mimicking legitimate
                      organizations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>
                      Spear phishing - Targeted attacks using personal
                      information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>Smishing - SMS/text message-based phishing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>Vishing - Voice-based phishing calls</span>
                  </li>
                </ul>

                <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-xl mb-4">
                  <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                    Recognizing Phishing Attempts
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Watch for urgent requests, grammatical errors, suspicious
                    links/attachments, requests for sensitive information, and
                    unexpected emails or messages asking you to verify accounts.
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
                  Potential Impacts
                </h3>

                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Identity Theft
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Attackers can use stolen personal information to
                      impersonate victims, open accounts, or make fraudulent
                      purchases.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Financial Loss
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Direct theft from bank accounts, unauthorized charges, or
                      fraudulent transfers.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Data Breaches
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Organizational phishing can lead to system compromise and
                      large-scale data exposure.
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800/70 p-4 rounded-xl">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Malware Installation
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Ransomware, keyloggers, and other malicious software can
                      be deployed through phishing links or attachments.
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
                        {caseStudy.category === "Healthcare" && (
                          <>
                            In 2023, a major healthcare provider with facilities
                            across multiple states fell victim to a
                            sophisticated phishing campaign. Attackers
                            impersonated the company's IT department, sending
                            emails requesting password resets due to "security
                            concerns." The emails included the company's logo,
                            legitimate-looking sender addresses, and convincing
                            language that created urgency.
                          </>
                        )}
                        {caseStudy.category === "Critical Infrastructure" && (
                          <>
                            Attackers conducted extensive reconnaissance on a
                            regional utility company, gathering information
                            about key employees from LinkedIn, social media, and
                            company publications. They then crafted highly
                            personalized spear phishing emails to senior
                            engineers with specialized malware attachments
                            disguised as industry reports.
                          </>
                        )}
                        {caseStudy.category === "Education" && (
                          <>
                            During the 2023 spring semester, attackers launched
                            a widespread phishing campaign targeting university
                            students across multiple institutions. The campaign
                            involved fake emails claiming to be from financial
                            aid offices, instructing students to "verify" their
                            direct deposit information through a convincing but
                            fraudulent portal.
                          </>
                        )}
                      </p>
                      <h4 className="text-lg font-semibold mb-2">Analysis</h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        {caseStudy.category === "Healthcare" && (
                          <>
                            The attackers leveraged stolen employee credentials
                            to move laterally through the network, eventually
                            gaining access to patient databases. The breach went
                            undetected for 47 days, during which time attackers
                            exfiltrated patient data including names, addresses,
                            Social Security numbers, and medical histories.
                          </>
                        )}
                        {caseStudy.category === "Critical Infrastructure" && (
                          <>
                            The malware was designed to establish persistence
                            and map the network, specifically searching for
                            operational technology (OT) systems. Security
                            researchers later determined this was part of a
                            coordinated attempt to gain access to industrial
                            control systems. An alert network administrator
                            noticed unusual outbound traffic patterns,
                            triggering the incident response plan before
                            attackers could move from IT to OT networks.
                          </>
                        )}
                        {caseStudy.category === "Education" && (
                          <>
                            The fake portal captured students' university login
                            credentials and financial account information.
                            Additionally, it redirected students to update their
                            direct deposit information, which the attackers then
                            changed in the actual university systems using the
                            stolen credentials. When financial aid disbursements
                            were made, funds were sent to attacker-controlled
                            accounts.
                          </>
                        )}
                      </p>
                      <h4 className="text-lg font-semibold mb-2">
                        Lessons Learned
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300 mb-4">
                        {caseStudy.category === "Healthcare" && (
                          <>
                            <li>
                              Healthcare organizations need frequent security
                              awareness training for all staff
                            </li>
                            <li>
                              Multi-factor authentication is essential for
                              accessing sensitive systems
                            </li>
                            <li>
                              Network segmentation can limit damage from
                              compromised credentials
                            </li>
                            <li>
                              Advanced email filtering and authentication
                              protocols (DMARC/SPF) can reduce phishing success
                            </li>
                          </>
                        )}
                        {caseStudy.category === "Critical Infrastructure" && (
                          <>
                            <li>
                              Air-gapping or strict segmentation between IT and
                              OT networks is crucial
                            </li>
                            <li>
                              Role-specific security training for engineers with
                              system access
                            </li>
                            <li>
                              Enhanced monitoring for unusual traffic patterns
                              and data flows
                            </li>
                            <li>
                              Regular tabletop exercises for security incidents
                              involving critical systems
                            </li>
                          </>
                        )}
                        {caseStudy.category === "Education" && (
                          <>
                            <li>
                              Financial systems should require additional
                              verification for changing payment information
                            </li>
                            <li>
                              Educational campaigns specific to financial aid
                              season
                            </li>
                            // Continuation of the code where it left off -
                            completing the case studies lessons learned for
                            education category
                            <li>
                              Financial systems should require additional
                              verification for changing payment information
                            </li>
                            <li>
                              Educational campaigns specific to financial aid
                              season
                            </li>
                            <li>
                              Implement notification systems for account changes
                            </li>
                            <li>
                              Partner with financial institutions to improve
                              fraud detection
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
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionMethods.map((method, index) => (
              <BackgroundGradient
                key={index}
                className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
              >
                <div className="p-6 h-full">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} mb-4 flex items-center justify-center`}
                  >
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
                    {method.title}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {method.description}
                  </p>
                </div>
              </BackgroundGradient>
            ))}
          </div>

          <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                Best Practices for Phishing Prevention
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Verify Before Taking Action
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Always verify requests for sensitive information or urgent
                      actions through a separate channel
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Check Links Before Clicking
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Hover over links to view the actual URL destination and
                      verify legitimacy
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Continuous Education
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Stay informed about the latest phishing techniques and
                      attack vectors
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Use Password Managers
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Password managers help identify legitimate sites and won't
                      autofill on fraudulent domains
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Report Suspicious Messages
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Report phishing attempts to your IT department and
                      relevant authorities
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Access Sites Directly
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Navigate directly to websites instead of following email
                      links for sensitive operations
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Remember:
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Even the most technically secure systems can be
                      compromised through social engineering. Your awareness and
                      skepticism are powerful defensive tools against phishing
                      attempts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://www.okta.com/sites/default/files/2024-08/ultimate-guide-to-phishing-prevention.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-full transition-all duration-200 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Phishing Prevention Guide
                </a>
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
            What should I do if I suspect I've clicked on a phishing link?
          </span>{" "}
          Immediately change your passwords from a different device, monitor
          your accounts for suspicious activity, and report the incident to your
          IT department or relevant authorities.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            Can phishing attacks target mobile devices?
          </span>{" "}
          Yes, mobile phishing (smishing) is increasingly common through SMS,
          messaging apps, and fraudulent mobile applications. Always verify
          requests and be cautious about clicking links on mobile devices.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            How effective is security training against phishing?
          </span>{" "}
          Regular, scenario-based training can reduce phishing susceptibility by
          50-75% when combined with simulated phishing exercises and continuous
          awareness programs.
        </p>
      </motion.div>

      {/* Bottom Call To Action */}
      <motion.div variants={itemVariants} className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
          Ready to Strengthen Your Phishing Defenses?
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
          Start with our security awareness training and assessment tools to
          protect yourself and your organization from phishing attacks
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors duration-200 flex items-center dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <Shield className="w-5 h-5 mr-2" />
            Try Our Phishing Simulator
          </button>
          <a
            href="https://perception-point.io/guides/phishing/how-to-prevent-phishing-attacks/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neutral-100 text-neutral-800 font-medium rounded-full hover:bg-neutral-200 transition-colors duration-200 flex items-center dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            <Info className="w-5 h-5 mr-2" />
            Learn More About Anti-Phishing Resources
          </a>
        </div>
      </motion.div>
    </div>
  );
}
