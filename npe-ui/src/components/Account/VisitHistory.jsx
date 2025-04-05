import React from "react";

export default function VisitHistory() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Visit History</h2>
      <ul className="space-y-4">
        {[
          { park: "Zion National Park", date: "March 10, 2025" },
          { park: "Yellowstone National Park", date: "February 18, 2025" },
        ].map((entry, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{entry.park}</h3>
            <p className="text-sm text-gray-500">Visited on {entry.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
