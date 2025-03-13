// /pages/api/detectAudio.js
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { Client } from "@gradio/client";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  console.log("Received request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error processing audio." });
    }

    const file = Array.isArray(files.audio) ? files.audio[0] : files.audio;

    if (!file || !file.filepath) {
      console.error("No audio uploaded.");
      return res.status(400).json({ error: "Audio file is required." });
    }

    try {
      console.log("Reading audio file from:", file.filepath);
      const audioBuffer = await fs.readFile(file.filepath);
      const blob = new Blob([audioBuffer], { type: file.mimetype });

      if (!process.env.HF_AUDIO_TOKEN) {
        console.error("Hugging Face audio token missing.");
        return res
          .status(500)
          .json({ error: "Hugging Face token is not set." });
      }

      // Connect to Hugging Face "Gaudio" Space
      const client = await Client.connect("Prasanna-ETH/Gaudio", {
        hfToken: process.env.HF_AUDIO_TOKEN,
      });

      console.log("Sending audio to model for prediction...");
      const result = await client.predict("/predict", {
        audio_file: blob,
      });

      console.log("Model prediction:", result.data);

      res.status(200).json({ prediction: result.data[0] });
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({ error: "Failed to process audio." });
    }
  });
}
