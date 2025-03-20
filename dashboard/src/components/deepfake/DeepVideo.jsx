"use client";
import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  Video,
  AlertCircle,
  CheckCircle2,
  Loader2,
  BarChart2,
} from "lucide-react";

const DeepVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleVideoFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileSelect = useCallback((e) => {
    handleVideoFile(e.target.files?.[0]);
  }, []);

  const handleVideoFile = (file) => {
    setError(null);
    setResult(null);

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file (MP4, MOV, AVI, etc.)");
      return;
    }

    // Size validation (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit");
      return;
    }

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDetect = useCallback(async () => {
    if (!selectedFile) {
      setError("Please select a video first");
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch("/api/detectDeepVideo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Transform the response format to match our UI needs
        const isReal = data.prediction.label === "REAL";
        const confidence = data.prediction.confidence / 100;

        setResult({
          label: isReal ? "real" : "fake",
          confidences: [
            {
              label: "real",
              confidence: isReal
                ? confidence.toString()
                : (1 - confidence).toString(),
            },
            {
              label: "fake",
              confidence: isReal
                ? (1 - confidence).toString()
                : confidence.toString(),
            },
          ],
        });
      } else {
        setError(data.error || "Failed to process video.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error processing request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile]);

  // Helper to format confidence percentages
  const formatConfidence = (value) => {
    return (parseFloat(value) * 100).toFixed(1) + "%";
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 px-6 pb-20 mb-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-1">
            DeepFake Video Detector
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Upload your video and our AI will analyze it for signs of
            manipulation
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* File upload area */}
            <div
              className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group ${
                isDragging
                  ? "bg-blue-500/10 border-blue-500"
                  : error
                  ? "bg-red-500/5 border-red-300 dark:border-red-500/40"
                  : selectedFile
                  ? "bg-emerald-500/5 border-emerald-300 dark:border-emerald-500/40"
                  : "bg-gray-50 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/30"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-8 text-center">
                {isProcessing ? (
                  <Loader2 className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
                ) : previewURL ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-36 mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <video
                        src={previewURL}
                        className="w-full h-full object-cover"
                        onError={() => setError("Error loading video preview")}
                        controls
                      />
                    </div>
                  </div>
                ) : error ? (
                  <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
                ) : (
                  <Video className="w-16 h-16 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
                )}

                <p className="text-lg mt-4 font-medium">
                  {selectedFile ? (
                    <span className="truncate max-w-full block">
                      {selectedFile.name}
                    </span>
                  ) : error ? (
                    <span className="text-red-500">{error}</span>
                  ) : (
                    <span>
                      Drag & drop your video here or{" "}
                      <span className="text-blue-500 dark:text-blue-400 font-semibold">
                        Browse
                      </span>
                    </span>
                  )}
                </p>

                {selectedFile && (
                  <p className="text-sm text-gray-500 mt-2">
                    {formatFileSize(selectedFile.size)}
                  </p>
                )}

                {!selectedFile && !error && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Supported formats: MP4, MOV, AVI, WEBM (Max 100MB)
                  </p>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleDetect}
                disabled={isProcessing || !selectedFile}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  !selectedFile
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
                  "Analyze Video"
                )}
              </button>

              {selectedFile && (
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
                result.label === "real"
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center mb-4">
                {result.label === "real" ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-xl font-bold capitalize">
                    {result.label === "real"
                      ? "Authentic Video"
                      : "Manipulated Video Detected"}
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      result.label === "real"
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    Our AI suggests this video is{" "}
                    {result.label === "real"
                      ? "likely authentic"
                      : "possibly manipulated"}
                  </p>
                </div>
              </div>

              {/* Confidence scores */}
              <div className="mt-5">
                <div className="flex items-center mb-2">
                  <BarChart2 className="w-5 h-5 mr-2 text-gray-500" />
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Confidence Scores
                  </h3>
                </div>

                <div className="space-y-3 mt-3">
                  {result.confidences &&
                    result.confidences.map((item, index) => {
                      const confidence = parseFloat(item.confidence);
                      const percentage = confidence * 100;

                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium capitalize">
                              {item.label}
                            </span>
                            <span>{formatConfidence(confidence)}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.label === "real"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="italic">
                  {result.label === "real"
                    ? "Based on our analysis, this video appears to be authentic."
                    : "Our AI has detected patterns consistent with AI-generated or manipulated videos."}
                </p>
              </div>
            </div>
          )}

          {error && !isDragging && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool uses AI to detect potential video manipulation. Results
            are not guaranteed to be 100% accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeepVideo;
