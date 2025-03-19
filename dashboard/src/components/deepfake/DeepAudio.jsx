"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  AudioWaveform,
  AlertCircle,
  CheckCircle2,
  FileAudio,
  Loader2,
} from "lucide-react";

export default function DeepAudio() {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleAudioFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleAudioFile(file);
  };

  const handleAudioFile = (file) => {
    setError(null);
    setResult(null);

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      setError("Please upload an audio file (MP3, WAV, etc.)");
      return;
    }

    // Size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setAudio(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setAudio(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audio) {
      setError("Please upload an audio file first!");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("audio", audio);

    try {
      const response = await fetch("/api/detectDeepAudio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Handle the simplified "real" or "fake" response
        const prediction = data.prediction?.toLowerCase() || "";
        setResult({
          isReal: prediction === "real",
          message: prediction,
        });
      } else {
        setError(data.error || "Failed to detect audio deepfake.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error processing request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-1">
            Audio DeepFake Detector
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Upload your audio file and our AI will analyze it for potential
            manipulation
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File upload area */}
            <div
              className={`relative rounded-xl p-8 border-2 border-dashed transition-all duration-200 cursor-pointer group ${
                isDragging
                  ? "bg-blue-500/10 border-blue-500"
                  : error
                  ? "bg-red-500/5 border-red-300 dark:border-red-500/40"
                  : audio
                  ? "bg-emerald-500/5 border-emerald-300 dark:border-emerald-500/40"
                  : "bg-gray-50 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/30"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                {loading ? (
                  <Loader2 className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
                ) : preview ? (
                  <AudioWaveform className="w-16 h-16 mx-auto text-blue-500" />
                ) : error ? (
                  <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
                ) : (
                  <Upload className="w-16 h-16 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
                )}

                <p className="text-lg mt-4 font-medium">
                  {audio ? (
                    <span className="flex items-center justify-center gap-2">
                      <FileAudio className="w-5 h-5" />
                      {audio.name}
                    </span>
                  ) : error ? (
                    <span className="text-red-500">{error}</span>
                  ) : (
                    <span>
                      Drag & drop your audio file here or{" "}
                      <span className="text-blue-500 dark:text-blue-400 font-semibold">
                        Browse
                      </span>
                    </span>
                  )}
                </p>

                {audio && (
                  <p className="text-sm text-gray-500 mt-2">
                    {(audio.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Audio preview */}
            {preview && (
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <audio
                  ref={audioRef}
                  controls
                  className="w-full"
                  onError={() => setError("Error loading audio preview")}
                >
                  <source src={preview} type={audio?.type || "audio/mpeg"} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={loading || !audio}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  !audio
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
                  "Analyze Audio"
                )}
              </button>

              {audio && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Results display - Updated for "real" or "fake" responses */}
          {result && (
            <div
              className={`mt-8 p-6 rounded-xl border ${
                result.isReal
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center">
                {result.isReal ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-xl font-bold capitalize">
                    {result.isReal ? "Real Audio" : "Fake Audio Detected"}
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      result.isReal
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    Analysis result:{" "}
                    <span className="font-semibold capitalize">
                      {result.message}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="italic">
                  {result.isReal
                    ? "Our analysis suggests this audio file is authentic."
                    : "Our AI has detected patterns consistent with synthetic or manipulated audio."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool uses AI to detect potential audio manipulation. Results
            are not guaranteed to be 100% accurate.
          </p>
        </div>
      </div>
    </div>
  );
}
