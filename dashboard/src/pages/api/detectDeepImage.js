import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { Client } from "@gradio/client";

export const config = {
  api: {
    bodyParser: false, // Needed for file uploads
  },
};

export default async function handler(req, res) {
  console.log("Received request:", req.method); // Log request method

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error processing form data." });
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file || !file.filepath) {
      console.error("No image uploaded.");
      return res.status(400).json({ error: "Image is required." });
    }

    try {
      console.log("Reading image from:", file.filepath);
      const imageBuffer = await fs.readFile(file.filepath);
      const blob = new Blob([imageBuffer], { type: file.mimetype });

      // Ensure token is available
      if (!process.env.HF_IMAGE_TOKEN) {
        console.error("Hugging Face token missing.");
        return res
          .status(500)
          .json({ error: "Hugging Face token is not set." });
      }

      // Connect to Hugging Face Space
      const client = await Client.connect("Prasanna-ETH/Deepfake", {
        hfToken: process.env.HF_IMAGE_TOKEN,
      });

      console.log("Sending image to model for prediction...");
      const result = await client.predict("/predict", {
        input_image: blob,
      });

      console.log("Model prediction:", result.data);

      res.status(200).json({ prediction: result.data[0] });
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({ error: "Failed to process image." });
    }
  });
}
