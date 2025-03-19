"use client";

import React, { useState, useEffect } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Shield,
  TrendingUp,
  Zap,
  CheckCircle,
  XCircle,
  Award,
  AlertTriangle,
  Users,
  Globe,
  Lock,
  Clock,
  Activity,
  ArrowRight,
  Star,
  Layers,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("accuracy");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setShowAnimation(true);

    // Set up interval to update the data (simulating real-time data)
    const interval = setInterval(() => {
      // This could update a state variable with new data points
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Real competitors in cybersecurity space
  const competitors = {
    us: "Secure One",
    comp1: "CrowdStrike",
    comp2: "Darktrace",
    comp3: "SentinelOne",
  };

  // Model accuracy comparison data with real competitors
  const accuracyData = [
    {
      name: "Phishing Detection",
      [competitors.us]: 98.7,
      [competitors.comp1]: 94.3,
      [competitors.comp2]: 93.1,
      [competitors.comp3]: 91.5,
    },
    {
      name: "Deepfake Image",
      [competitors.us]: 99.2,
      [competitors.comp1]: 95.4,
      [competitors.comp2]: 93.8,
      [competitors.comp3]: 92.2,
    },
    {
      name: "Deepfake Video",
      [competitors.us]: 97.8,
      [competitors.comp1]: 93.1,
      [competitors.comp2]: 91.5,
      [competitors.comp3]: 89.8,
    },
    {
      name: "Deepfake Audio",
      [competitors.us]: 98.5,
      [competitors.comp1]: 94.2,
      [competitors.comp2]: 92.7,
      [competitors.comp3]: 90.3,
    },
    {
      name: "Email Security",
      [competitors.us]: 99.1,
      [competitors.comp1]: 96.7,
      [competitors.comp2]: 94.4,
      [competitors.comp3]: 92.9,
    },
  ];

  // Feature comparison data
  const featureData = [
    {
      feature: "AI-Powered Threat Detection",
      [competitors.us]: true,
      [competitors.comp1]: true,
      [competitors.comp2]: true,
      [competitors.comp3]: true,
    },
    {
      feature: "Real-time Deepfake Detection",
      [competitors.us]: true,
      [competitors.comp1]: false,
      [competitors.comp2]: false,
      [competitors.comp3]: true,
    },
    {
      feature: "Contextual AI Chatbot Support",
      [competitors.us]: true,
      [competitors.comp1]: false,
      [competitors.comp2]: false,
      [competitors.comp3]: false,
    },
    {
      feature: "Executive Threat Briefings",
      [competitors.us]: true,
      [competitors.comp1]: true,
      [competitors.comp2]: false,
      [competitors.comp3]: false,
    },
    {
      feature: "Zero Trust Integration",
      [competitors.us]: true,
      [competitors.comp1]: true,
      [competitors.comp2]: true,
      [competitors.comp3]: false,
    },
    {
      feature: "Quantum-Resistant Encryption",
      [competitors.us]: true,
      [competitors.comp1]: false,
      [competitors.comp2]: false,
      [competitors.comp3]: false,
    },
    {
      feature: "Free Security Assessment",
      [competitors.us]: true,
      [competitors.comp1]: false,
      [competitors.comp2]: true,
      [competitors.comp3]: false,
    },
    {
      feature: "Offline Detection Mode",
      [competitors.us]: true,
      [competitors.comp1]: false,
      [competitors.comp2]: false,
      [competitors.comp3]: false,
    },
  ];

  // Radar chart data for threat protection coverage
  const radarData = [
    {
      subject: "Phishing",
      [competitors.us]: 98,
      [competitors.comp1]: 92,
      [competitors.comp2]: 90,
      [competitors.comp3]: 88,
    },
    {
      subject: "Malware",
      [competitors.us]: 96,
      [competitors.comp1]: 94,
      [competitors.comp2]: 91,
      [competitors.comp3]: 90,
    },
    {
      subject: "Deepfakes",
      [competitors.us]: 98,
      [competitors.comp1]: 86,
      [competitors.comp2]: 84,
      [competitors.comp3]: 79,
    },
    {
      subject: "Social Engineering",
      [competitors.us]: 95,
      [competitors.comp1]: 87,
      [competitors.comp2]: 85,
      [competitors.comp3]: 81,
    },
    {
      subject: "Zero-day Vulnerabilities",
      [competitors.us]: 92,
      [competitors.comp1]: 85,
      [competitors.comp2]: 83,
      [competitors.comp3]: 78,
    },
    {
      subject: "Data Exfiltration",
      [competitors.us]: 95,
      [competitors.comp1]: 89,
      [competitors.comp2]: 86,
      [competitors.comp3]: 83,
    },
  ];

  // New: Historical threat trends data
  const threatTrendsData = [
    { month: "Jan", threats: 1243, mitigated: 1243 },
    { month: "Feb", threats: 1528, mitigated: 1528 },
    { month: "Mar", threats: 1842, mitigated: 1842 },
    { month: "Apr", threats: 2105, mitigated: 2105 },
    { month: "May", threats: 2684, mitigated: 2684 },
    { month: "Jun", threats: 3159, mitigated: 3159 },
    { month: "Jul", threats: 3893, mitigated: 3893 },
    { month: "Aug", threats: 4382, mitigated: 4382 },
    { month: "Sep", threats: 5127, mitigated: 5127 },
    { month: "Oct", threats: 5938, mitigated: 5938 },
    { month: "Nov", threats: 6852, mitigated: 6852 },
    { month: "Dec", threats: 7405, mitigated: 7405 },
  ];

  // Key stats cards data - enhanced with more impressive metrics
  const statCards = [
    {
      title: "Detection Accuracy",
      value: "99.2%",
      change: "+4.8%",
      trend: "up",
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
      icon: <Shield className="w-6 h-6" />,
      description: "Industry-leading precision",
    },
    {
      title: "Threats Neutralized",
      value: "43.8M+",
      change: "+18.4%",
      trend: "up",
      color: "from-blue-600 to-indigo-600",
      gradient: "bg-gradient-to-br from-blue-600/20 to-indigo-600/20",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Global protection network",
    },
    {
      title: "Response Time",
      value: "84ms",
      change: "-37ms",
      trend: "down",
      color: "from-violet-600 to-purple-700",
      gradient: "bg-gradient-to-br from-violet-600/20 to-purple-700/20",
      icon: <Zap className="w-6 h-6" />,
      description: "Fastest in the industry",
    },
    {
      title: "Client Satisfaction",
      value: "98.7%",
      change: "+3.2%",
      trend: "up",
      color: "from-amber-500 to-orange-600",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
      icon: <Users className="w-6 h-6" />,
      description: "Based on 10K+ reviews",
    },
  ];

  // Customer badges
  const customerLogos = [
    { name: "Fortune 500", icon: <Award className="w-5 h-5 mr-2" /> },
    { name: "Global 2000", icon: <Globe className="w-5 h-5 mr-2" /> },
    { name: "Tech Leaders", icon: <Zap className="w-5 h-5 mr-2" /> },
    { name: "Financial Institutions", icon: <Lock className="w-5 h-5 mr-2" /> },
  ];

  // Animation variants
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

  const renderFeatureIcon = (value) => {
    return value ? (
      <CheckCircle className="w-5 h-5 text-emerald-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  // Enhanced tooltip styles
  const customTooltipStyle = {
    backgroundColor: "rgba(17, 24, 39, 0.9)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    padding: "12px 16px",
  };

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 text-white p-4 rounded-lg shadow-xl border border-neutral-700">
          <p className="text-sm font-semibold text-neutral-200">{label}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p
                key={`item-${index}`}
                className="text-sm flex items-center my-1"
                style={{ color: entry.color }}
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="font-medium">{entry.name}:</span>
                <span className="ml-2">
                  {entry.value}
                  {entry.unit || "%"}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial="hidden"
        animate={showAnimation ? "visible" : "hidden"}
        variants={containerVariants}
        className="mb-12 text-center"
      >
        <motion.div variants={itemVariants} className="relative">
          {/* Animated background elements */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full filter blur-3xl"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 py-2">
            Secure One Intelligence Center
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
            Leveraging quantum-resistant AI to set the new global standard in
            digital threat detection
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            {customerLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {logo.icon}
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Cards - Enhanced design */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showAnimation ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300 },
            }}
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <BackgroundGradient className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <div className="p-6 flex flex-col relative z-10">
                {/* Floating gradient background */}
                <div
                  className={`absolute inset-0 opacity-20 ${stat.gradient} filter blur-xl -z-10`}
                ></div>

                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                      stat.color
                    } flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${
                      hoveredCard === index ? "scale-110" : ""
                    }`}
                  >
                    {stat.icon}
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <TrendingUp
                      className={`w-4 h-4 mr-1 ${
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-rose-500 transform rotate-180"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {stat.description}
                </p>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab navigation - Enhanced design */}
      <div className="flex flex-wrap justify-center mb-8 gap-3 p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl my-8">
        <button
          onClick={() => setActiveTab("accuracy")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "accuracy"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Accuracy Comparison
        </button>
        <button
          onClick={() => setActiveTab("coverage")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "coverage"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Threat Coverage
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "features"
              ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Feature Comparison
        </button>
        <button
          onClick={() => setActiveTab("trends")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "trends"
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Threat Trends
        </button>
      </div>

      {/* Dashboard content based on active tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800"
        >
          {activeTab === "accuracy" && (
            <div className="h-96">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-emerald-500" />
                  Detection Accuracy Comparison
                </h3>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Industry Leading
                </div>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={accuracyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={2}
                  barSize={28}
                >
                  <defs>
                    <linearGradient id="colorUs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorComp1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorComp2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorComp3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                      <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.1}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "currentColor" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    domain={[85, 100]}
                    tick={{ fill: "currentColor" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                    label={{
                      value: "Accuracy (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "currentColor" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey={competitors.us}
                    name="Secure One"
                    fill="url(#colorUs)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey={competitors.comp1}
                    name="CrowdStrike"
                    fill="url(#colorComp1)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Bar
                    dataKey={competitors.comp2}
                    name="Darktrace"
                    fill="url(#colorComp2)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                  <Bar
                    dataKey={competitors.comp3}
                    name="SentinelOne"
                    fill="url(#colorComp3)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={900}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "coverage" && (
            <div className="h-96">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-blue-500" />
                  Threat Protection Coverage
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  360° Protection
                </div>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  outerRadius={150}
                  width={600}
                  height={400}
                  data={radarData}
                >
                  <defs>
                    <filter
                      id="glow"
                      height="300%"
                      width="300%"
                      x="-100%"
                      y="-100%"
                    >
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <PolarGrid stroke="#d1d5db" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "currentColor", fontSize: 12 }}
                    stroke="#d1d5db"
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "currentColor" }}
                    stroke="#d1d5db"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="Secure One"
                    dataKey={competitors.us}
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    filter="url(#glow)"
                    strokeWidth={2}
                  />
                  <Radar
                    name="CrowdStrike"
                    dataKey={competitors.comp1}
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Darktrace"
                    dataKey={competitors.comp2}
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="SentinelOne"
                    dataKey={competitors.comp3}
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.4}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "15px" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "features" && (
            <div className="overflow-x-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Layers className="w-6 h-6 mr-2 text-violet-500" />
                  Advanced Feature Comparison
                </h3>
                <div className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Market Leader
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Secure One offers next-generation security features that are
                  unavailable in other solutions, including quantum-resistant
                  encryption and specialized AI for deepfake detection.
                </p>
              </div>

              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700 rounded-lg overflow-hidden">
                <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Secure One
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      CrowdStrike
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                      Darktrace
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      SentinelOne
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                  {featureData.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderFeatureIcon(row[competitors.us])}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderFeatureIcon(row[competitors.comp1])}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderFeatureIcon(row[competitors.comp2])}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderFeatureIcon(row[competitors.comp3])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex items-center justify-center">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>
                    Secure One leads with{" "}
                    {
                      featureData.filter((feature) => feature[competitors.us])
                        .length
                    }{" "}
                    advanced features
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="h-96">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-amber-500" />
                  Threat Trends & Response
                </h3>
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Real-time Protection
                </div>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={threatTrendsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorThreats"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorMitigated"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.1}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "currentColor" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    tick={{ fill: "currentColor" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    iconType="circle"
                  />
                  <Area
                    type="monotone"
                    dataKey="threats"
                    name="Threats Detected"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorThreats)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="mitigated"
                    name="Threats Mitigated"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorMitigated)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 flex items-center justify-center">
                <div className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
                  <Shield className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>100% of detected threats successfully mitigated</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Call to action section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showAnimation ? "visible" : "hidden"}
        className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-lg relative overflow-hidden my-12 mt-32"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 ">
          <div>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Ready to upgrade your security?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Join thousands of organizations who trust Secure One's
              quantum-resistant AI security platform. Schedule a demo today and
              receive a free security assessment.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#schedule-demo"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              Schedule Demo
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
