"use client";
import React, { useState, useCallback } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  BarChart2,
  MessageSquare,
} from "lucide-react";

const PhishMsg = () => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setMessage(e.target.value);
      if (error) setError(null);
      if (result) setResult(null);
    },
    [error, result]
  );

  const resetForm = () => {
    setMessage("");
    setResult(null);
    setError(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!message.trim()) {
      setError("Please enter a message to analyze");
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/detectPhishMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();
      if (response.ok) {
        // Process the result
        if (Array.isArray(data.prediction) && data.prediction.length > 0) {
          const prediction = data.prediction[0];
          const isSafe = prediction.label === "LABEL_0";
          const confidence = parseFloat(prediction.score) * 100;

          setResult({
            label: isSafe ? "Safe / Legitimate" : "Fraud / Suspicious",
            isSafe: isSafe,
            confidence: isNaN(confidence) ? 0 : confidence,
            explanation: isSafe
              ? "This message appears to be legitimate and not fraudulent."
              : "This message shows characteristics of potential fraud or suspicious intent.",
          });
        } else {
          setError("Invalid response format from the model.");
        }
      } else {
        setError(data.error || "Failed to analyze message.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error processing request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-1">
            Fraud Detection System
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Enter your message and our AI will analyze it for signs of fraud
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Message input area */}
            <div
              className={`relative rounded-xl border-2 transition-all duration-200 ${
                error
                  ? "bg-red-500/5 border-red-300 dark:border-red-500/40"
                  : message && !isProcessing
                  ? "bg-blue-500/5 border-blue-300 dark:border-blue-500/40"
                  : "bg-gray-50 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="font-medium">Message Content</h3>
                </div>

                <textarea
                  rows="8"
                  value={message}
                  onChange={handleChange}
                  placeholder="Enter message content here..."
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
                disabled={isProcessing || !message.trim()}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  !message.trim()
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
                  "Analyze Message"
                )}
              </button>

              {message.trim() && (
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
                result.isSafe
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center mb-4">
                {result.isSafe ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-xl font-bold">{result.label}</h2>
                  <p
                    className={`text-sm mt-1 ${
                      result.isSafe
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    Confidence: {result.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Confidence visualization */}
              <div className="mt-5">
                <div className="flex items-center mb-2">
                  <BarChart2 className="w-5 h-5 mr-2 text-gray-500" />
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Confidence Score
                  </h3>
                </div>

                <div className="space-y-3 mt-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{result.label}</span>
                      <span>{result.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          result.isSafe ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="italic">{result.explanation}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool uses AI to detect potential fraud in messages. Results are
            not guaranteed to be 100% accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhishMsg;
