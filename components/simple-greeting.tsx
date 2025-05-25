"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";

export function SimpleGreeting() {
  const { messages, append, isLoading } = useChat();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Request a greeting from the API when the component mounts
    if (messages.length === 0) {
      append({
        id: "request-id",
        content: "Hello",
        role: "user",
      });
    }

    // Extract and combine the content from assistant messages
    const assistantMessages = messages.filter(msg => msg.role === "assistant");
    if (assistantMessages.length > 0) {
      const combinedGreeting = assistantMessages
        .map(msg => msg.content)
        .join(" ");
      setGreeting(combinedGreeting);
    }
  }, [messages, append]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="p-8 rounded-lg bg-card shadow-sm max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Simple Greeting App</h1>
        <div className="text-xl mb-4">
          {isLoading ? (
            <div className="text-muted-foreground">Loading greeting...</div>
          ) : (
            <div>{greeting || "Waiting for greeting..."}</div>
          )}
        </div>
      </div>
    </div>
  );
}