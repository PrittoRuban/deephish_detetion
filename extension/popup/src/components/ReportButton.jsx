import React from "react";

const ReportButton = ({ onReport }) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
      onClick={onReport}
    >
      Report Threat
    </button>
  );
};

export default ReportButton;
