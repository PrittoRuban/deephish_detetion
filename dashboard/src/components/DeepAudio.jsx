"use client";
import { useState } from "react";

export default function DeepAudio() {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
        setResult(data.prediction);
      } else {
        setResult("Failed to detect audio deepfake.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult("Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Deepfake Audio Detector</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          style={{ marginBottom: "10px" }}
        />
        {preview && (
          <audio controls>
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Detect Deepfake"}
        </button>
      </form>

      {result && <h2>Result: {result}</h2>}
    </div>
  );
}
