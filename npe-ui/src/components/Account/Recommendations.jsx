import React, { useEffect, useState } from "react";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

// Use official park codes
const recommendedParks = [
  { name: "Zion National Park", code: "zion" },
  { name: "Rocky Mountain National Park", code: "romo" },
];

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const fetchedData = [];

      for (const park of recommendedParks) {
        try {
          const res = await fetch(
            `https://developer.nps.gov/api/v1/parks?parkCode=${park.code}&api_key=${API_KEY}`
          );
          const data = await res.json();
          const result = data.data[0];

          if (result) {
            fetchedData.push({
              name: result.fullName,
              image: result.images?.[0]?.url || "/images/fallback.jpg",
            });
          }
        } catch (err) {
          console.error("Error fetching park:", park.name, err);
        }
      }

      setRecommendations(fetchedData);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow border">
            <img src={rec.image} alt={rec.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{rec.name}</h3>
              <button className="mt-2 text-sm text-green-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
