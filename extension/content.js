// Monitor and handle suspicious link clicks
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const url = link.href;
    // Example heuristic: flag non-HTTPS links as potentially suspicious
    if (!url.startsWith("https")) {
      // Send URL for further analysis via the background script
      chrome.runtime.sendMessage(
        { type: "ANALYSIS_REQUEST", url: url },
        (response) => {
          console.log("Analysis response:", response);
          if (response.status === "threat") {
            e.preventDefault(); // Prevent navigation if threat detected
            alert("Warning: This link may be dangerous!");
            // Notify background script about detected threat
            chrome.runtime.sendMessage({
              type: "THREAT_DETECTED",
              message: "Phishing link detected: " + url,
            });
          }
        }
      );
    }
  });
});

// Monitor media elements (images and videos) for deepfake analysis
document.querySelectorAll("img, video").forEach((media) => {
  // Ensure media is loaded before analysis
  media.addEventListener("load", () => {
    analyzeMedia(media).then((isManipulated) => {
      if (isManipulated) {
        // Visually indicate a potential threat (e.g., red border)
        media.style.border = "5px solid red";
        // Notify background script about the deepfake detection
        chrome.runtime.sendMessage({
          type: "THREAT_DETECTED",
          message: "Potential deepfake detected.",
        });
      }
    });
  });
});

// Placeholder for deepfake analysis using TensorFlow.js
async function analyzeMedia(mediaElement) {
  // Simulate media analysis (replace with TensorFlow.js implementation later)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly flag 20% of media elements as manipulated
      const isManipulated = Math.random() < 0.2;
      resolve(isManipulated);
    }, 1000);
  });
}

// Listen for messages from the background script (optional re-checks, etc.)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "RECHECK") {
    // Implement re-check logic if necessary
    console.log("Rechecking for threats on the page.");
  }
});
