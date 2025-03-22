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
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Shield,
  TrendingUp,
  Zap,
  AlertTriangle,
  Users,
  Globe,
  Lock,
  Clock,
  Activity,
  ArrowRight,
  Star,
  Layers,
  MessageSquare,
  CheckCircle,
  XCircle,
  Check,
  FileText,
  BarChart as BarChartIcon,
  Heart,
  DollarSign,
  ExternalLink,
  Award,
  LifeBuoy,
  ThumbsUp,
  Hash,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("impact");
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

  // Historical impact data
  const impactData = [
    {
      year: "2019",
      lossesInBillions: 3.5,
      phishingAttacks: 1.5,
      deepfakeIncidents: 0.5,
    },
    {
      year: "2020",
      lossesInBillions: 4.2,
      phishingAttacks: 1.8,
      deepfakeIncidents: 0.9,
    },
    {
      year: "2021",
      lossesInBillions: 6.9,
      phishingAttacks: 2.4,
      deepfakeIncidents: 1.6,
    },
    {
      year: "2022",
      lossesInBillions: 8.8,
      phishingAttacks: 3.1,
      deepfakeIncidents: 2.7,
    },
    {
      year: "2023",
      lossesInBillions: 10.3,
      phishingAttacks: 3.8,
      deepfakeIncidents: 4.2,
    },
    {
      year: "2024",
      lossesInBillions: 12.7,
      phishingAttacks: 4.5,
      deepfakeIncidents: 5.8,
    },
  ];

  // Detection accuracy data
  const accuracyData = [
    {
      name: "Phishing URLs",
      accuracy: 98.7,
    },
    {
      name: "Phishing Emails",
      accuracy: 97.9,
    },
    {
      name: "Deepfake Images",
      accuracy: 99.2,
    },
    {
      name: "Deepfake Videos",
      accuracy: 97.8,
    },
    {
      name: "Deepfake Audio",
      accuracy: 98.5,
    },
    {
      name: "Malicious Messages",
      accuracy: 96.4,
    },
  ];

  // Notable incidents data
  const notableIncidents = [
    {
      year: "2019",
      incident: "Fake CEO audio deepfake scam",
      cost: "$243,000",
      organization: "UK-based energy firm",
      type: "Audio Deepfake",
    },
    {
      year: "2020",
      incident: "Government official deepfake video",
      cost: "Political instability",
      organization: "Government agency",
      type: "Video Deepfake",
    },
    {
      year: "2021",
      incident: "Banking phishing campaign",
      cost: "$7.8 million",
      organization: "Multiple financial institutions",
      type: "Phishing",
    },
    {
      year: "2022",
      incident: "Healthcare data breach via phishing",
      cost: "$4.2 million + patient data",
      organization: "Regional hospital system",
      type: "Phishing",
    },
    {
      year: "2023",
      incident: "Military communication deepfake",
      cost: "National security risk",
      organization: "Defense department",
      type: "Audio/Video Deepfake",
    },
    {
      year: "2024",
      incident: "Election disinformation campaign",
      cost: "Electoral integrity compromised",
      organization: "Election systems",
      type: "Multimodal Deepfakes",
    },
  ];

  // Sector vulnerability data
  const sectorVulnerability = [
    { name: "Government", value: 35 },
    { name: "Finance", value: 25 },
    { name: "Healthcare", value: 15 },
    { name: "Energy", value: 12 },
    { name: "Education", value: 8 },
    { name: "Other", value: 5 },
  ];

  const SECTOR_COLORS = [
    "#10b981", // Government - emerald
    "#3b82f6", // Finance - blue
    "#8b5cf6", // Healthcare - violet
    "#f59e0b", // Energy - amber
    "#ec4899", // Education - pink
    "#6b7280", // Other - gray
  ];

  // Solution benefits
  const solutionBenefits = [
    {
      title: "Detection Accuracy",
      value: "98.2%",
      change: "Industry-leading",
      trend: "up",
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
      icon: <Shield className="w-6 h-6" />,
      description: "Average across all detection types",
    },
    {
      title: "Response Time",
      value: "84ms",
      change: "Real-time protection",
      trend: "down",
      color: "from-blue-600 to-indigo-600",
      gradient: "bg-gradient-to-br from-blue-600/20 to-indigo-600/20",
      icon: <Zap className="w-6 h-6" />,
      description: "Immediate threat mitigation",
    },
    {
      title: "Risk Reduction",
      value: "94%",
      change: "Estimated reduction",
      trend: "up",
      color: "from-violet-600 to-purple-700",
      gradient: "bg-gradient-to-br from-violet-600/20 to-purple-700/20",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Based on pilot simulations",
    },
    {
      title: "Cost Savings",
      value: "$3.4M",
      change: "Per organization (avg)",
      trend: "up",
      color: "from-amber-500 to-orange-600",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Annual estimated savings",
    },
  ];

  // Solution features
  const solutionFeatures = [
    {
      feature: "Phishing URL Detection Engine",
      description: "ML-powered analysis of suspicious URLs with 98.7% accuracy",
    },
    {
      feature: "Email Security Analysis",
      description: "Deep inspection of email headers, content and attachments",
    },
    {
      feature: "Deepfake Image Recognition",
      description: "Advanced computer vision to detect manipulated images",
    },
    {
      feature: "Deepfake Video Detection",
      description: "Frame-by-frame analysis for inconsistencies and artifacts",
    },
    {
      feature: "Deepfake Audio Recognition",
      description: "Frequency analysis to identify synthetic voice patterns",
    },
    {
      feature: "Interactive Security Chatbot",
      description: "24/7 AI assistant for queries and reporting",
    },
    {
      feature: "Real-time Threat Intelligence",
      description: "Constantly updated database of emerging threats",
    },
    {
      feature: "Incident Reporting System",
      description: "Streamlined process for reporting cybersecurity incidents",
    },
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
                <span className="font-medium">
                  {entry.name || entry.dataKey}:
                </span>
                <span className="ml-2">
                  {typeof entry.value === "number" &&
                  entry.dataKey === "lossesInBillions"
                    ? `$${entry.value}B`
                    : entry.value}
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
            CyberShield Intelligence Center
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
            Advanced AI-powered solution to combat phishing and deepfake threats
            in government and enterprise environments
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <Shield className="w-5 h-5 mr-2" />
              <span>Anti-Phishing</span>
            </div>
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>Deepfake Detection</span>
            </div>
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Interactive Chatbot</span>
            </div>
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <Globe className="w-5 h-5 mr-2" />
              <span>Government-Grade Security</span>
            </div>
          </div>

          {/* Hackathon badge */}
          <div className="mt-8 inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-6 py-3 rounded-full text-md font-medium text-neutral-800 dark:text-neutral-200 border border-emerald-100 dark:border-blue-900">
            <Award className="w-5 h-5 mr-2 text-emerald-500" />
            <span>Cybersecurity Innovation Hackathon 2025</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Solution Benefits Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showAnimation ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12"
      >
        {solutionBenefits.map((stat, index) => (
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
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
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

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center mb-8 gap-3 p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl my-8">
        <button
          onClick={() => setActiveTab("impact")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "impact"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Threat Impact
        </button>
        <button
          onClick={() => setActiveTab("incidents")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "incidents"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Notable Incidents
        </button>
        <button
          onClick={() => setActiveTab("solution")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "solution"
              ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Our Solution
        </button>
        <button
          onClick={() => setActiveTab("chatbot")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "chatbot"
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
              : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          Interactive Chatbot
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
          {activeTab === "impact" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-emerald-500" />
                  Financial Impact of Cyber Attacks
                </h3>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Increasing Threat Level
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={impactData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorLosses"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      opacity={0.1}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "currentColor" }}
                      axisLine={{ stroke: "#d1d5db" }}
                      tickLine={{ stroke: "#d1d5db" }}
                    />
                    <YAxis
                      tick={{ fill: "currentColor" }}
                      axisLine={{ stroke: "#d1d5db" }}
                      tickLine={{ stroke: "#d1d5db" }}
                      label={{
                        value: "Losses (Billions $)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fill: "currentColor" },
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="lossesInBillions"
                      name="Financial Losses"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorLosses)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="h-60">
                  <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-500" />
                    Attack Volume Trends
                  </h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={impactData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: "currentColor" }}
                        axisLine={{ stroke: "#d1d5db" }}
                      />
                      <YAxis
                        tick={{ fill: "currentColor" }}
                        axisLine={{ stroke: "#d1d5db" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="phishingAttacks"
                        name="Phishing Attacks (Millions)"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="deepfakeIncidents"
                        name="Deepfake Incidents (Millions)"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-60">
                  <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-violet-500" />
                    Vulnerable Sectors
                  </h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorVulnerability}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {sectorVulnerability.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={SECTOR_COLORS[index % SECTOR_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-emerald-500" />
                  Detection Accuracy
                </h4>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={accuracyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "currentColor" }}
                        axisLine={{ stroke: "#d1d5db" }}
                      />
                      <YAxis
                        tick={{ fill: "currentColor" }}
                        axisLine={{ stroke: "#d1d5db" }}
                        domain={[90, 100]}
                        label={{
                          value: "Accuracy (%)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fill: "currentColor" },
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="accuracy"
                        name="Detection Accuracy"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "incidents" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-blue-500" />
                  Notable Cybersecurity Incidents
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                      >
                        Year
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                      >
                        Incident
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                      >
                        Impact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                      >
                        Organization Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                      >
                        Attack Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {notableIncidents.map((incident, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? ""
                            : "bg-neutral-50 dark:bg-neutral-800/20"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {incident.year}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                          {incident.incident}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                          {incident.cost}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                          {incident.organization}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              incident.type.includes("Phishing")
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                            }`}
                          >
                            {incident.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                  How Our Solution Would Have Prevented These Incidents
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          Fake CEO Audio Deepfake Scam (2019)
                        </h5>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Our deepfake audio detection would have identified
                          synthetic voice patterns and frequency anomalies,
                          flagging the communication as fraudulent before any
                          transfer could be initiated.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          Banking Phishing Campaign (2021)
                        </h5>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Our phishing detection engine would have analyzed the
                          suspicious URLs and email content, identifying
                          malicious patterns and preventing access to fraudulent
                          banking portals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          Election Disinformation Campaign (2024)
                        </h5>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Our multimodal deepfake detection would have
                          identified manipulated videos, images, and audio of
                          candidates, allowing prompt response and preventing
                          the spread of disinformation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-violet-500" />
                  CyberShield Integrated Solution
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200 dark:border-emerald-800/30"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                      Phishing Detection
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      ML-powered analysis of suspicious URLs, emails, and
                      content to prevent phishing attacks with 98.7% accuracy.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        URL Analysis & Verification
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        Email Header Inspection
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        Content & Attachment Scanning
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white mb-4">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                      Deepfake Detection
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Advanced AI algorithms to detect manipulated media content
                      across images, videos, and audio.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-blue-500 mr-2" />
                        Image Manipulation Recognition
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-blue-500 mr-2" />
                        Video Frame Analysis
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-blue-500 mr-2" />
                        Audio Frequency Pattern Detection
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/10 border border-violet-200 dark:border-violet-800/30"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-violet-500 flex items-center justify-center text-white mb-4">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                      Security Chatbot Assistant
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Intelligent assistance for reporting cybercrimes,
                      understanding cyber laws, and receiving security guidance.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-violet-500 mr-2" />
                        Incident Reporting Guidance
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-violet-500 mr-2" />
                        Cyber Law Consultation
                      </li>
                      <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-violet-500 mr-2" />
                        24/7 Security Assistance
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-6 mt-8">
                <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-neutral-800 dark:text-neutral-200" />
                  Comprehensive Feature Set
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {solutionFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {feature.feature}
                        </h5>
                        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                  <LifeBuoy className="w-5 h-5 mr-2 text-amber-500" />
                  Integrated Workflow
                </h4>
                <div className="relative">
                  {/* Workflow diagram */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 -translate-y-1/2 hidden md:block"></div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                        <AlertTriangle className="w-7 h-7 text-emerald-500" />
                      </div>
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Threat Detection
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-[200px] mt-1">
                        Identifies phishing and deepfake attempts in real-time
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-neutral-400 hidden md:block" />

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                        <Shield className="w-7 h-7 text-blue-500" />
                      </div>
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Prevention
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-[200px] mt-1">
                        Blocks malicious content before damage occurs
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-neutral-400 hidden md:block" />

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-2">
                        <MessageSquare className="w-7 h-7 text-violet-500" />
                      </div>
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Assistance
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-[200px] mt-1">
                        Provides guidance and cybersecurity education
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-neutral-400 hidden md:block" />

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                        <FileText className="w-7 h-7 text-amber-500" />
                      </div>
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        Reporting
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-[200px] mt-1">
                        Generates detailed incident reports for authorities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "chatbot" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-amber-500" />
                  Interactive Security Chatbot
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-6 h-full">
                    <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-500" />
                      Cybercrime Reporting Assistant
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Our AI chatbot helps individuals and organizations report
                      cybercrimes easily and efficiently, guiding them through
                      the reporting process.
                    </p>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Step-by-step guidance for reporting incidents
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Collects relevant details for complete reports
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Provides immediate guidance to secure accounts
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Generates structured reports for law enforcement
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                        Sample Interaction
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                              <Users className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                            </div>
                          </div>
                          <div className="ml-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 text-sm text-neutral-700 dark:text-neutral-300">
                            I think my account was hacked. What should I do?
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          </div>
                          <div className="ml-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-sm text-neutral-700 dark:text-neutral-300">
                            I'm sorry to hear that. Let's secure your account
                            and report this incident. First, change your
                            password on any unaffected accounts. Have you
                            noticed any unauthorized transactions or changes to
                            your account?
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-6 h-full">
                    <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Cyber Laws Assistant
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Our AI assistant helps individuals and law enforcement
                      understand cyber laws, providing clear explanations and
                      guidance on legal procedures.
                    </p>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Simplified explanations of cyber laws
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Legal rights guidance for cybercrime victims
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Quick access to relevant legal sections
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            Information on legal procedures and reporting
                            formats
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                        Sample Interaction
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                              <Users className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                            </div>
                          </div>
                          <div className="ml-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 text-sm text-neutral-700 dark:text-neutral-300">
                            What is the legal procedure for reporting a
                            cybercrime?
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-500" />
                            </div>
                          </div>
                          <div className="ml-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-neutral-700 dark:text-neutral-300">
                            Reporting a cybercrime involves collecting evidence,
                            filing a report with the authorities, and seeking
                            legal advice. Would you like more information on
                            this process?
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
