"use client";
import React, { useState, useCallback } from "react";
import { Upload } from "lucide-react";

const DeepImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }, []);

  const handleDetect = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/detectDeepImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.prediction);
      } else {
        setResult({ error: data.error || "Failed to process image." });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Error processing request." });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Deepfake Image Detector
        </h1>

        {/* Drag and drop or upload area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all 
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900"
                : "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
            }`}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg">
            Drag & drop your image here or{" "}
            <label className="text-blue-500 cursor-pointer hover:underline">
              select a file
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Supported formats: PNG, JPG, JPEG, GIF
          </p>
        </div>

        {/* Image Preview */}
        {previewURL && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <img
              src={previewURL}
              alt="Selected preview"
              className="w-48 h-48 mx-auto object-cover rounded-lg border border-gray-300 dark:border-gray-700"
            />
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
              Selected file: <strong>{selectedFile.name}</strong>
            </p>
          </div>
        )}

        {/* Detect button */}
        <div className="mt-6">
          <button
            onClick={handleDetect}
            disabled={!selectedFile || isProcessing}
            className={`px-6 py-3 rounded-2xl font-medium text-white transition-colors 
              ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed dark:bg-gray-700"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
          >
            {isProcessing ? "Processing..." : "Detect Deepfake"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-md">
            {result.error ? (
              <p className="text-red-500 font-medium text-lg capitalize">
                Error: {result.error}
              </p>
            ) : (
              <div>
                <p className="text-xl font-semibold capitalize text-blue-600 dark:text-blue-400">
                  Prediction: {result.label}
                </p>
                <div className="mt-3 text-md text-gray-700 dark:text-gray-300">
                  <p className="font-medium">Confidence Scores:</p>
                  <ul className="list-disc list-inside mt-2">
                    {Array.isArray(result.confidences)
                      ? result.confidences.map((item, index) => (
                          <li key={index} className="capitalize text-lg">
                            {item.label}:{" "}
                            {(parseFloat(item.confidence) * 100).toFixed(2)}%
                          </li>
                        ))
                      : Object.entries(result.confidences || {}).map(
                          ([key, value]) => (
                            <li key={key} className="capitalize text-lg">
                              {key}: {(parseFloat(value) * 100).toFixed(2)}%
                            </li>
                          )
                        )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepImage;
