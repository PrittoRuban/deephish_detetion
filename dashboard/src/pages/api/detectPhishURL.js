import { Client } from "@gradio/client";

// Load environment variables
const HF_URL_TOKEN = process.env.HF_URL_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Website URL is required." });
  }

  try {
    // ✅ Connect to Hugging Face API for URL Detection
    const client = await Client.connect("Prasanna-ETH/Urldetetctionnew", {
      headers: {
        Authorization: `Bearer ${HF_URL_TOKEN}`,
      },
    });

    // ✅ Send URL to the /predict endpoint
    const result = await client.predict("/predict", {
      url: url,
    });

    // ✅ Check if result is valid
    if (!result || !Array.isArray(result.data) || result.data.length !== 8) {
      throw new Error("Invalid API response.");
    }

    // ✅ Structure and return the formatted result
    const formattedResult = {
      redirectChain: result.data[0] || "N/A",
      finalUrl: result.data[1] || "N/A",
      pageTitle: result.data[2] || "N/A",
      formDetails: result.data[3] || "N/A",
      headings: result.data[4] || "N/A",
      metaDescription: result.data[5] || "N/A",
      screenshot: result.data[6] || "N/A",
      aiSummary: result.data[7] || "N/A",
    };

    res.status(200).json({ success: true, result: formattedResult });
  } catch (error) {
    console.error("Error analyzing URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
