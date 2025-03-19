"use client";
import React, { useState, useCallback } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  BarChart2,
  Mail,
} from "lucide-react";

const PhishEmail = () => {
  const [emailText, setEmailText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setEmailText(e.target.value);
      if (error) setError(null);
      if (result) setResult(null);
    },
    [error, result]
  );

  const resetForm = () => {
    setEmailText("");
    setResult(null);
    setError(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!emailText.trim()) {
      setError("Please enter email content to analyze");
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/detectPhishEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: emailText }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.prediction?.[0] || data.prediction);
      } else {
        setError(data.error || "Failed to analyze email.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error processing request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [emailText]);

  // Helper to format confidence percentages
  const formatConfidence = (value) => {
    return (parseFloat(value) * 100).toFixed(1) + "%";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-1">
            Phishing Email Detector
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Paste your email content and our AI will analyze it for signs of
            phishing
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Email input area */}
            <div
              className={`relative rounded-xl border-2 transition-all duration-200 ${
                error
                  ? "bg-red-500/5 border-red-300 dark:border-red-500/40"
                  : emailText && !isProcessing
                  ? "bg-blue-500/5 border-blue-300 dark:border-blue-500/40"
                  : "bg-gray-50 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Mail className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="font-medium">Email Content</h3>
                </div>

                <textarea
                  rows="8"
                  value={emailText}
                  onChange={handleChange}
                  placeholder="Paste the email content here..."
                  disabled={isProcessing}
                  className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all outline-none disabled:opacity-70"
                ></textarea>

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
                onClick={handleAnalyze}
                disabled={isProcessing || !emailText.trim()}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  !emailText.trim()
                    ? "bg-blue-400 cursor-not-allowed opacity-60"
                    : isProcessing
                    ? "bg-blue-500 cursor-wait"
                    : "bg-blue-500 hover:bg-blue-600 hover:shadow-md"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Email"
                )}
              </button>

              {emailText.trim() && (
                <button
                  onClick={resetForm}
                  disabled={isProcessing}
                  className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results display */}
          {result && (
            <div
              className={`mt-8 p-6 rounded-xl border ${
                result.label?.toLowerCase().includes("not phishing") ||
                result.label?.toLowerCase().includes("legitimate")
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center mb-4">
                {result.label?.toLowerCase().includes("not phishing") ||
                result.label?.toLowerCase().includes("legitimate") ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-xl font-bold capitalize">
                    {result.label?.toLowerCase().includes("not phishing") ||
                    result.label?.toLowerCase().includes("legitimate")
                      ? "Legitimate Email"
                      : "Phishing Email Detected"}
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      result.label?.toLowerCase().includes("not phishing") ||
                      result.label?.toLowerCase().includes("legitimate")
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    Our AI suggests this email is{" "}
                    {result.label?.toLowerCase().includes("not phishing") ||
                    result.label?.toLowerCase().includes("legitimate")
                      ? "likely safe"
                      : "potentially malicious"}
                  </p>
                </div>
              </div>

              {/* Confidence scores */}
              {result.confidences && (
                <div className="mt-5">
                  <div className="flex items-center mb-2">
                    <BarChart2 className="w-5 h-5 mr-2 text-gray-500" />
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      Confidence Scores
                    </h3>
                  </div>

                  <div className="space-y-3 mt-3">
                    {Object.entries(result.confidences).map(
                      ([label, confidence], index) => {
                        const percentage = parseFloat(confidence) * 100;
                        const isPhishing = label
                          .toLowerCase()
                          .includes("phish");

                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium capitalize">
                                {label}
                              </span>
                              <span>{formatConfidence(confidence)}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isPhishing ? "bg-red-500" : "bg-green-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="italic">
                  {result.label?.toLowerCase().includes("not phishing") ||
                  result.label?.toLowerCase().includes("legitimate")
                    ? "Based on our analysis, this email appears to be legitimate."
                    : "Our AI has detected patterns consistent with phishing attempts in this email."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool uses AI to detect potential phishing attempts. Results are
            not guaranteed to be 100% accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhishEmail;
