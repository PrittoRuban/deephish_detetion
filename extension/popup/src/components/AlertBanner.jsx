import React from "react";

const AlertBanner = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
      <p className="font-semibold">{message}</p>
    </div>
  );
};

export default AlertBanner;
