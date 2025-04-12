import React from 'react';

const images = [
  "https://www.nps.gov/common/uploads/structured_data/3C7FBF1F-1DD8-B71B-0B9125A1004AB2D5.jpg",
  "https://www.nps.gov/common/uploads/structured_data/B841835F-9E6C-AB24-2A2DCCD0200F302B.jpg",
  "https://www.nps.gov/common/uploads/structured_data/3C87A368-1DD8-B71B-0BD44B189D0D9368.jpg",
  "https://www.nps.gov/common/uploads/structured_data/C4E8415A-08E5-5976-833F494FFCA3FFE6.jpg",
  "https://www.nps.gov/common/uploads/structured_data/3C7B143E-1DD8-B71B-0BD4A1EF96847292.jpg",
  "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg"
];

const Carousel = () => {
  return (
    <div className="overflow-x-auto flex space-x-4 px-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Park ${idx + 1}`}
          className="h-52 rounded-lg flex-shrink-0 object-cover"
        />
      ))}
    </div>
  );
};

export default Carousel;
