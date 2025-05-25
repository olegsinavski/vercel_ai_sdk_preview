"use client";

import { useState, useEffect } from "react";

export function SimpleGreeting() {
  const [greetings, setGreetings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the greetings from our API
    fetch("/api/greetings")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch greetings");
        }
        return response.json();
      })
      .then(data => {
        setGreetings(data.greetings);
        setLoading(false);
      })
      .catch(error => {
        setError("Error loading greetings: " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="p-8 rounded-lg bg-card shadow-sm max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Simple Greeting App</h1>
        
        {loading && <div className="text-xl mb-4">Loading greetings...</div>}
        
        {error && <div className="text-xl mb-4 text-red-500">{error}</div>}
        
        {!loading && !error && (
          <ul className="text-xl space-y-2 list-none">
            {greetings.map((greeting, index) => (
              <li key={index} className="p-2 rounded hover:bg-slate-100">
                {greeting}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}