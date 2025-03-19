"use client";

import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
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
} from "recharts";
import {
  Shield,
  TrendingUp,
  Zap,
  CheckCircle,
  XCircle,
  Award,
  Layers,
  AlertTriangle,
} from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("accuracy");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Model accuracy comparison data
  const accuracyData = [
    {
      name: "Phishing Detection",
      SecureOne: 98.7,
      Competitor1: 92.3,
      Competitor2: 94.1,
      Competitor3: 90.5,
    },
    {
      name: "Deepfake Image",
      SecureOne: 99.2,
      Competitor1: 95.4,
      Competitor2: 97.8,
      Competitor3: 94.2,
    },
    {
      name: "Deepfake Video",
      SecureOne: 97.8,
      Competitor1: 92.1,
      Competitor2: 94.5,
      Competitor3: 90.8,
    },
    {
      name: "Deepfake Audio",
      SecureOne: 98.5,
      Competitor1: 94.2,
      Competitor2: 95.7,
      Competitor3: 91.3,
    },
    {
      name: "Email Security",
      SecureOne: 99.1,
      Competitor1: 93.7,
      Competitor2: 96.4,
      Competitor3: 92.9,
    },
  ];

  // Feature comparison data
  const featureData = [
    {
      feature: "All-in-One Solution",
      SecureOne: true,
      Competitor1: false,
      Competitor2: true,
      Competitor3: false,
    },
    {
      feature: "AI Chatbot Support",
      SecureOne: true,
      Competitor1: false,
      Competitor2: false,
      Competitor3: false,
    },
    {
      feature: "Real-time Alerts",
      SecureOne: true,
      Competitor1: true,
      Competitor2: true,
      Competitor3: true,
    },
    {
      feature: "Educational Resources",
      SecureOne: true,
      Competitor1: false,
      Competitor2: true,
      Competitor3: false,
    },
    {
      feature: "Free Tier Available",
      SecureOne: true,
      Competitor1: true,
      Competitor2: false,
      Competitor3: true,
    },
    {
      feature: "API Integration",
      SecureOne: true,
      Competitor1: true,
      Competitor2: true,
      Competitor3: false,
    },
    {
      feature: "Multi-factor Auth",
      SecureOne: true,
      Competitor1: true,
      Competitor2: true,
      Competitor3: true,
    },
    {
      feature: "Offline Detection",
      SecureOne: true,
      Competitor1: false,
      Competitor2: false,
      Competitor3: false,
    },
  ];

  // Radar chart data for threat protection coverage
  const radarData = [
    {
      subject: "Phishing",
      SecureOne: 98,
      Competitor1: 85,
      Competitor2: 90,
      Competitor3: 80,
    },
    {
      subject: "Malware",
      SecureOne: 96,
      Competitor1: 90,
      Competitor2: 85,
      Competitor3: 82,
    },
    {
      subject: "Deepfakes",
      SecureOne: 98,
      Competitor1: 82,
      Competitor2: 88,
      Competitor3: 75,
    },
    {
      subject: "Social Engineering",
      SecureOne: 94,
      Competitor1: 80,
      Competitor2: 85,
      Competitor3: 78,
    },
    {
      subject: "Zero-day",
      SecureOne: 90,
      Competitor1: 75,
      Competitor2: 80,
      Competitor3: 70,
    },
    {
      subject: "Data Leakage",
      SecureOne: 95,
      Competitor1: 85,
      Competitor2: 82,
      Competitor3: 80,
    },
  ];

  // Key stats cards data
  const statCards = [
    {
      title: "Average Detection Accuracy",
      value: "98.6%",
      change: "+3.2%",
      trend: "up",
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Threats Neutralized",
      value: "28.5M+",
      change: "+12.4%",
      trend: "up",
      color: "from-blue-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: "Response Time",
      value: "153ms",
      change: "-24ms",
      trend: "down",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Feature Coverage",
      value: "100%",
      change: "+12.5%",
      trend: "up",
      color: "from-amber-500 to-orange-500",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
      icon: <Award className="w-6 h-6" />,
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

  const renderFeatureIcon = (value) => {
    return value ? (
      <CheckCircle className="w-5 h-5 text-emerald-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-8 text-center"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 py-1">
            Secure One Performance Dashboard
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Setting the gold standard in digital threat detection and prevention
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
                  className={`absolute inset-0 opacity-10 ${stat.gradient} filter blur-xl -z-10`}
                ></div>

                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                      stat.color
                    } flex items-center justify-center text-white shadow-md transform transition-transform duration-300 ${
                      hoveredCard === index ? "scale-110" : ""
                    }`}
                  >
                    {stat.icon}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp
                      className={`w-4 h-4 mr-1 ${
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500 transform rotate-180"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500"
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
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab("accuracy")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "accuracy"
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          Accuracy Comparison
        </button>
        <button
          onClick={() => setActiveTab("coverage")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "coverage"
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          Threat Coverage
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "features"
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          Feature Comparison
        </button>
      </div>

      {/* Dashboard content based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800"
      >
        {activeTab === "accuracy" && (
          <div className="h-96">
            <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
              Model Accuracy Comparison
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={accuracyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: "currentColor" }} />
                <YAxis
                  domain={[80, 100]}
                  tick={{ fill: "currentColor" }}
                  label={{
                    value: "Accuracy (%)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "currentColor" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="SecureOne"
                  name="Secure One"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Competitor1"
                  name="Competitor A"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Competitor2"
                  name="Competitor B"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Competitor3"
                  name="Competitor C"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "coverage" && (
          <div className="h-96">
            <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
              Threat Protection Coverage
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                outerRadius={150}
                width={600}
                height={400}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "currentColor" }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "currentColor" }}
                />
                <Radar
                  name="Secure One"
                  dataKey="SecureOne"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Competitor A"
                  dataKey="Competitor1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Competitor B"
                  dataKey="Competitor2"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Competitor C"
                  dataKey="Competitor3"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.4}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "features" && (
          <div className="overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
              Feature Comparison
            </h3>
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Secure One
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Competitor A
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Competitor B
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Competitor C
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureIcon(row.SecureOne)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureIcon(row.Competitor1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureIcon(row.Competitor2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureIcon(row.Competitor3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Highlight banner */}
      <motion.div
        variants={itemVariants}
        className="mt-10 p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-emerald-900 dark:to-blue-900 rounded-xl text-white flex flex-col md:flex-row items-center justify-between"
      >
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">
            Ready to secure your digital presence?
          </h3>
          <p className="text-neutral-300">
            Join over 5,000+ organizations using Secure One to protect their
            digital assets
          </p>
        </div>
        <button className="px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Get Started Now
        </button>
      </motion.div>
    </div>
  );
}

export default Dashboard;
