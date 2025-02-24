import React, { useState, useEffect } from "react";
import AlertBanner from "./components/AlertBanner";
import ThreatSummary from "./components/ThreatSummary";
import ReportButton from "./components/ReportButton";

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [threatSummary, setThreatSummary] = useState("");

  useEffect(() => {
    // Simulate receiving a message from the background script
    // In a real extension, use chrome.runtime.onMessage to update state
    setTimeout(() => {
      setAlertMessage("Warning: Potential phishing threat detected!");
      setThreatSummary(
        "A suspicious URL has been detected that resembles known phishing patterns. Please proceed with caution."
      );
    }, 2000);
  }, []);

  const handleReport = () => {
    alert("Threat reported. Thank you for your feedback!");
    // Add actual reporting logic here (e.g., message to background script)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <AlertBanner message={alertMessage} />
      <div className="mt-4 w-full max-w-md">
        <ThreatSummary summary={threatSummary} />
      </div>
      <div className="mt-4">
        <ReportButton onReport={handleReport} />
      </div>
    </div>
  );
}

export default App;
