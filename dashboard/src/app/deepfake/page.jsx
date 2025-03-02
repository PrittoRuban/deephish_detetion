"use client";
import { useEffect, useState } from "react";

export default function Deepfake() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch("/api/hello");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMessage();
  }, []);

  return <div>{error ? <p>Error: {error}</p> : <p>{message}</p>}</div>;
}
