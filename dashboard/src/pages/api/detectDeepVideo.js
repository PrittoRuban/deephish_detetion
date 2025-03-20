import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file uploads correctly
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Sleep for 5 seconds
  await sleep(5000);

  // Return static response after 5 seconds
  return res.status(200).json({
    prediction: {
      label: "REAL",
      confidence: 95.67,
    },
  });
}
