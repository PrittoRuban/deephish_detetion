"use client";

import React, { useEffect } from "react";

export default function VoiceflowChatWidget() {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    // Define the onload function
    script.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: "67db0ced596b9c72833f61e3" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
      });

      // Add custom styling after widget loads to adjust its position
      setTimeout(() => {
        const styleEl = document.createElement("style");
        styleEl.innerHTML = `
          .vfrc-launcher-button {
            position: fixed !important; /* Make it fixed */
            bottom: 80px !important; /* Move up to avoid theme switcher */
          }
        `;
        document.head.appendChild(styleEl);
      }, 1000); // Delay to ensure the widget has loaded
    };

    // Set the script source
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    // Append script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
      // Remove the custom style if it exists
      const styleEl = document.querySelector("style[data-vf-position]");
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  return null;
}
