import React from "react";

const ThreatSummary = ({ summary }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Threat Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default ThreatSummary;
