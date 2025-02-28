// Create context menu for deepfake detection on images
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkDeepfake",
    title: "Check if this image is a deepfake",
    contexts: ["image"],
  });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_PHISHING") {
    // Call phishing detection API
    fetch("https://your-backend-api.com/api/check-phishing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: message.url }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Store result locally for popup display
        chrome.storage.local.set({ phishingResult: data });
      })
      .catch((error) => {
        console.error("Phishing API error:", error);
      });
    return true; // Indicates asynchronous response
  }
});

// Handle context menu click for deepfake detection
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "checkDeepfake") {
    // info.srcUrl contains the image URL
    fetch("https://your-backend-api.com/api/check-deepfake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: info.srcUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Store deepfake result for popup display
        chrome.storage.local.set({ deepfakeResult: data });
        // Optionally, open the popup to show the result
        chrome.action.openPopup();
      })
      .catch((error) => {
        console.error("Deepfake API error:", error);
      });
  }
});
