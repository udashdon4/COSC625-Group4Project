import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ title, subtitle, backButton }) => {
  const navigate = useNavigate();

  return (
    <header className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://www.nps.gov/common/uploads/structured_data/3C7FA7B7-1DD8-B71B-0B7B45B73D1C90C3.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-lg mb-4">{subtitle}</p>}
        {backButton && (
          <button
            onClick={() => navigate(-1)}
            className="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-full"
          >
            ← Back
          </button>
        )}
      </div>
    </header>
  );
};

export default HeroSection;
