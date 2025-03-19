import { Client } from "@gradio/client";

// Load environment variables
const HF_EMAIL_TOKEN = process.env.HF_EMAIL_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Email content is required." });
  }

  try {
    // Connect to Hugging Face API
    const client = await Client.connect("Prasanna-ETH/newprincephishing", {
      headers: {
        Authorization: `Bearer ${HF_EMAIL_TOKEN}`,
      },
    });

    // Send the email content to the /predict endpoint
    const result = await client.predict("/predict", {
      text: text,
    });

    // Return prediction result
    res.status(200).json({ prediction: result.data });
  } catch (error) {
    console.error("Error analyzing email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
