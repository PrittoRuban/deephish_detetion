"use client";
import React, { useState } from "react";
import { Upload, AudioWaveform as Waveform } from "lucide-react";

export default function DeepAudio() {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    if (file?.type.startsWith("audio/")) {
      setAudio(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("audio/")) {
      setAudio(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audio) {
      alert("Please upload an audio file first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("audio", audio);

    try {
      const response = await fetch("/api/detectDeepAudio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.prediction || "No result.");
      } else {
        setResult(data.error || "Failed to detect audio deepfake.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult("Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Detect Audio DeepFakes
        </h1>
        <p className="text-gray-700 dark:text-gray-400 mb-12">
          Upload your audio file and our AI will analyze it for potential
          manipulation.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className={`relative rounded-2xl p-8 border-2 border-dashed ${
              isDragging
                ? "bg-blue-500/20 border-blue-400"
                : "bg-gray-50 dark:bg-white/5 border-gray-300 dark:border-white/10"
            } transition-all duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              {preview ? (
                <Waveform className="w-16 h-16 mx-auto text-blue-400 animate-pulse" />
              ) : (
                <Upload className="w-16 h-16 mx-auto text-blue-400" />
              )}
              <p className="text-lg mt-4 text-gray-800 dark:text-gray-200">
                {audio ? audio.name : "Drag & drop your audio file here or "}
                <label className="text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300">
                  {" Browse"}
                  <input
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
            </div>
          </div>

          {preview && (
            <audio controls className="mt-6 mx-auto">
              <source src={preview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 px-8 py-3 rounded-full text-lg font-medium text-white ${
              loading
                ? "bg-blue-500/50 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-all duration-200 hover:scale-105`}
          >
            {loading ? "Analyzing..." : "Detect DeepFake"}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-white/10 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Result: {result}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
