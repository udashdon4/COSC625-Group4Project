import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParkCard = ({ park }) => {
  const navigate = useNavigate();

  const imageUrl = park.images?.[0]?.url || 'https://via.placeholder.com/300x200?text=No+Image';
  const description = park.description || "No description available.";

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 hover:-translate-y-1 transition-transform cursor-pointer"
      onClick={() => navigate(`/COSC625-Group4Project/parks/${park.parkCode}`)}
    >
      <img
        src={imageUrl}
        alt={park.fullName}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h4 className="font-semibold text-lg">{park.fullName}</h4>
      <p className="text-sm text-gray-600">
        <strong>{park.addresses[0]?.city}, {park.states}</strong>
      </p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
};

export default ParkCard;
