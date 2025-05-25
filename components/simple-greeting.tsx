"use client";

import { useState, useEffect } from "react";

export function SimpleGreeting() {
  const [greeting, setGreeting] = useState("Loading greeting...");

  useEffect(() => {
    // Fetch the greeting from our API
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }]
      }),
    })
      .then(response => {
        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let accumulatedGreeting = "";

        // Function to read the stream
        function readStream() {
          reader.read().then(({ done, value }) => {
            if (done) {
              return;
            }
            
            // Decode the chunk and extract content
            const chunk = decoder.decode(value);
            const textMatch = chunk.match(/0:"(.*?)"/);
            if (textMatch && textMatch[1]) {
              accumulatedGreeting += textMatch[1];
              setGreeting(accumulatedGreeting);
            }

            // Continue reading
            readStream();
          });
        }

        readStream();
      })
      .catch(error => {
        setGreeting("Error loading greeting: " + error.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="p-8 rounded-lg bg-card shadow-sm max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Simple Greeting App</h1>
        <div className="text-xl mb-4">{greeting}</div>
      </div>
    </div>
  );
}