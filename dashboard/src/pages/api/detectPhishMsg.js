import { Client } from "@gradio/client";

// Load environment variables
const HF_MESSAGE_TOKEN = process.env.HF_MESSAGE_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message content is required." });
  }

  try {
    // Connect to Hugging Face API
    const client = await Client.connect("Prasanna-ETH/newprinceTextphishing", {
      headers: {
        Authorization: `Bearer ${HF_MESSAGE_TOKEN}`,
      },
    });

    // Send the message content to the /predict endpoint
    const result = await client.predict("/predict", {
      text: text,
    });

    // ✅ Fix: Wrap prediction in an array to handle multiple predictions
    res
      .status(200)
      .json({
        prediction: Array.isArray(result.data) ? result.data : [result.data],
      });
  } catch (error) {
    console.error("Error analyzing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
