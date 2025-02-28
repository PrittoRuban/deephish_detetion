document.addEventListener("DOMContentLoaded", () => {
  // Display phishing detection result
  chrome.storage.local.get("phishingResult", (data) => {
    const phishingDiv = document.getElementById("phishingResult");
    if (data.phishingResult) {
      if (data.phishingResult.safe) {
        phishingDiv.textContent = "This link appears safe.";
        phishingDiv.style.color = "green";
      } else {
        phishingDiv.textContent =
          "Warning: Phishing link detected! " + data.phishingResult.reason;
        phishingDiv.style.color = "red";
      }
    } else {
      phishingDiv.textContent = "No phishing data available.";
    }
  });

  // Display deepfake detection result
  chrome.storage.local.get("deepfakeResult", (data) => {
    const deepfakeDiv = document.getElementById("deepfakeResult");
    if (data.deepfakeResult) {
      if (data.deepfakeResult.isDeepfake) {
        deepfakeDiv.textContent =
          "Deepfake detected! Confidence: " +
          data.deepfakeResult.confidence +
          "%";
        deepfakeDiv.style.color = "red";
      } else {
        deepfakeDiv.textContent = "This image appears authentic.";
        deepfakeDiv.style.color = "green";
      }
    } else {
      deepfakeDiv.textContent = "No deepfake data available.";
    }
  });
});
