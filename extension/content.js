// Listen for mouseover events on links
document.addEventListener("mouseover", function (event) {
  const link = event.target.closest("a");
  if (link && link.href) {
    // Send URL to background for phishing check
    chrome.runtime.sendMessage({
      type: "CHECK_PHISHING",
      url: link.href,
    });
  }
});
