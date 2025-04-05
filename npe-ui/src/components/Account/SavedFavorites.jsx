import React, { useEffect, useState } from "react";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

// Favorite parks with official park codes
const favoriteParks = [
  { name: "Yellowstone National Park", code: "yell" },
  { name: "Grand Canyon National Park", code: "grca" },
];

export default function SavedFavorites() {
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const results = [];

      for (const park of favoriteParks) {
        try {
          const res = await fetch(
            `https://developer.nps.gov/api/v1/parks?parkCode=${park.code}&api_key=${API_KEY}`
          );
          const data = await res.json();
          const result = data.data[0];

          if (result) {
            results.push({
              name: result.fullName,
              state: result.states,
              image: result.images?.[0]?.url || "/images/fallback.jpg",
            });
          }
        } catch (err) {
          console.error("Error fetching favorite park:", park.name, err);
        }
      }

      setFavoriteData(results);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Saved Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favoriteData.map((park, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow border">
            <img src={park.image} alt={park.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{park.name}</h3>
              <p className="text-sm text-gray-500">{park.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
