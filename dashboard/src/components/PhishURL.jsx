"use client";
import React, { useState } from "react";
import { AlertCircle, Link, Loader2, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function UrlAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setUrl(e.target.value);
    if (error) setError(null);
    if (result) setResult(null);
  };

  // Reset form
  const resetForm = () => {
    setUrl("");
    setResult(null);
    setError(null);
  };

  // Analyze the URL
  const analyzeUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/detectPhishURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze URL.");
      }

      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      } else {
        throw new Error("Error analyzing URL.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error analyzing the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to properly parse and format AI summary
  const formatAISummary = (summary) => {
    if (!summary) return "";

    // Remove backticks that might be surrounding the entire summary
    const cleanSummary = summary.replace(/^```|```$/g, "").trim();

    return cleanSummary;
  };

  // Extract gambling and phishing information
  const extractSafetyInfo = (summary) => {
    if (!summary) return { isGambling: false, phishingScore: "N/A" };

    const gamblingMatch = summary.match(/Gambling Website:\s*(Yes|No)/i);
    const phishingMatch = summary.match(/Phishing Website Score:\s*(\d+)/i);

    return {
      isGambling: gamblingMatch
        ? gamblingMatch[1].toLowerCase() === "yes"
        : false,
      phishingScore: phishingMatch ? phishingMatch[1] : "N/A",
    };
  };

  const safetyInfo = result ? extractSafetyInfo(result.aiSummary) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-1">
            URL Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Enter a URL and our system will analyze it for potential threats
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* URL input area */}
            <div
              className={`relative rounded-xl border-2 transition-all duration-200 ${
                error
                  ? "bg-red-500/5 border-red-300 dark:border-red-500/40"
                  : url && !loading
                  ? "bg-blue-500/5 border-blue-300 dark:border-blue-500/40"
                  : "bg-gray-50 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Link className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="font-medium">URL Input</h3>
                </div>

                <input
                  type="text"
                  value={url}
                  onChange={handleChange}
                  placeholder="Enter a valid URL (e.g., https://example.com)"
                  disabled={loading}
                  className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none disabled:opacity-70"
                />

                {error && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={analyzeUrl}
                disabled={loading || !url.trim()}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  !url.trim()
                    ? "bg-blue-400 cursor-not-allowed opacity-60"
                    : loading
                    ? "bg-blue-500 cursor-wait"
                    : "bg-blue-500 hover:bg-blue-600 hover:shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze URL"
                )}
              </button>

              {url.trim() && (
                <button
                  onClick={resetForm}
                  disabled={loading}
                  className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results display */}
          {result && (
            <div className="mt-8 p-6 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-500 mr-3 flex-shrink-0" />
                <h2 className="text-xl font-bold">Analysis Result</h2>
              </div>

              <div className="space-y-4 mt-4">
                {/* Redirect Chain */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">🔗</span> Redirect Chain:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {result.redirectChain}
                    </pre>
                  </div>
                </div>

                {/* Final URL */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">🌐</span> Final URL:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm">
                    <a
                      href={result.finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline break-all"
                    >
                      {result.finalUrl}
                    </a>
                  </div>
                </div>

                {/* Page Title */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">📄</span> Page Title:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm">
                    {result.pageTitle}
                  </div>
                </div>

                {/* Form Details */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">📝</span> Form Details:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {result.formDetails}
                    </pre>
                  </div>
                </div>

                {/* Headings */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">📚</span> Headings:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{result.headings}</pre>
                  </div>
                </div>

                {/* Meta Description */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">📝</span> Meta Description:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm">
                    {result.metaDescription}
                  </div>
                </div>

                {/* Screenshot */}
                {result.screenshot?.url && (
                  <div className="space-y-1">
                    <p className="font-semibold flex items-center">
                      <span className="mr-2">📸</span> Screenshot:
                    </p>
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <img
                        src={result.screenshot.url}
                        alt="Website Screenshot"
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* AI Summary */}
                <div className="space-y-1">
                  <p className="font-semibold flex items-center">
                    <span className="mr-2">💡</span> AI Summary:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-sm overflow-x-auto prose prose-sm dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatAISummary(result.aiSummary)
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n\n/g, "<br/><br/>"),
                      }}
                    />
                  </div>
                </div>

                {/* Rating Indicators */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gambling Website */}
                  <div
                    className={`p-4 rounded-lg border ${
                      !safetyInfo?.isGambling
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    }`}
                  >
                    <p className="font-semibold flex items-center mb-2">
                      <span className="mr-2">🎰</span> Gambling Website:
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        !safetyInfo?.isGambling
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {safetyInfo?.isGambling ? "Yes" : "No"}
                    </p>
                  </div>

                  {/* Phishing Score */}
                  <div
                    className={`p-4 rounded-lg border ${
                      safetyInfo?.phishingScore === "0"
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    }`}
                  >
                    <p className="font-semibold flex items-center mb-2">
                      <span className="mr-2">⚠️</span> Phishing Website Score:
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        safetyInfo?.phishingScore === "0"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {safetyInfo?.phishingScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool uses AI to analyze URLs for potential threats. Results are
            not guaranteed to be 100% accurate.
          </p>
        </div>
      </div>
    </div>
  );
}
