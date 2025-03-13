"use client";
import { useState } from "react";

export default function DeepImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/detectDeepImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.prediction);
      } else {
        setResult("Failed to detect deepfake.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult("Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render result based on its type
  const renderResult = () => {
    if (!result) return null;

    if (typeof result === "string") {
      return <h2>Result: {result}</h2>;
    }

    if (typeof result === "object") {
      return (
        <div>
          <h2>Result: {result.label}</h2>
          {result.confidences && (
            <div>
              <h3>Confidence Scores:</h3>
              <ul>
                {Object.entries(result.confidences).map(([key, value]) => (
                  <li key={key}>
                    {key}: {(value * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    return <h2>Result: {String(result)}</h2>;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Deepfake Image Detector</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />
        {preview && <img src={preview} alt="Preview" width="300" />}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Detect Deepfake"}
        </button>
      </form>

      {result && renderResult()}
    </div>
  );
}
