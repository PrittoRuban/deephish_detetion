// Log extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("CyberSec Extension installed.");
});

// Message listener to handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background received message:", request);

  if (request.type === "THREAT_DETECTED") {
    // Update badge to alert user
    chrome.action.setBadgeText({ text: "!" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });

    // Create a notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Threat Detected",
      message:
        request.message || "A potential threat has been detected on this page.",
    });

    sendResponse({ status: "notified" });
  } else if (request.type === "ANALYSIS_REQUEST") {
    // Example: Forward URL to backend phishing analysis API
    fetch("http://localhost:5000/check-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: request.url }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ status: data.status });
      })
      .catch((error) => {
        console.error("Error checking URL:", error);
        sendResponse({ status: "error" });
      });

    // Return true to indicate asynchronous response
    return true;
  }
});

// Example: Scheduled check to re-scan active tabs every minute
setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "RECHECK" });
    }
  });
}, 60000);
