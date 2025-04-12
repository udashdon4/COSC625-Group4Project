import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Tabs from '../components/Tabs';
import { fetchParkDetails, fetchWebcamData } from '../services/npsApi';

const ParkDetails = () => {
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [webcams, setWebcams] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const parkData = await fetchParkDetails(parkCode);
        const webcamData = await fetchWebcamData(parkCode);
        setPark(parkData);
        setWebcams(webcamData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [parkCode]);

  if (!park) return <div className="p-6">Loading...</div>;

  const { fullName, description, weatherInfo, directionsInfo, directionsUrl, images, addresses, contacts } = park;
  const address = addresses?.[0] || {};
  const phone = contacts?.phoneNumbers?.[0]?.phoneNumber || 'N/A';
  const email = contacts?.emailAddresses?.[0]?.emailAddress || 'N/A';

  const webcamContent = webcams.length > 0 ? (
    webcams.map((webcam) => (
      <div key={webcam.id} className="border rounded-lg p-4 bg-gray-100 mt-4">
        <h4 className="text-lg font-semibold">{webcam.title}</h4>
        <p>{webcam.description}</p>
        {webcam.url && (
          <a
            href={webcam.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline block mt-2"
          >
            View Live Webcam
          </a>
        )}
      </div>
    ))
  ) : (
    <p className="mt-2">No webcams available for this park.</p>
  );

  return (
    <div>
      <HeroSection title={fullName} backButton />

      <main className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-xl shadow-lg -mt-20 relative z-10">
        <p className="font-semibold mb-2">
          {address.line1}, {address.city}, {address.stateCode} &nbsp;|&nbsp;
          Phone: {phone} &nbsp;|&nbsp; Email: {email}
        </p>

        <div className="flex flex-wrap gap-4 my-4">
          {images?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.altText}
              className="h-48 rounded-lg object-cover"
            />
          ))}
        </div>

        <Tabs
          tabs={{
            Overview: <p>{description}</p>,
            Weather: <p>{weatherInfo}</p>,
            Webcam: <div>{webcamContent}</div>,
            "Visitor Count": <p>Visitor data not available.</p>,
            Map: (
              <div>
                <p>{directionsInfo}</p>
                <p>
                  <a
                    href={directionsUrl}
                    className="text-green-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Plan Your Visit
                  </a>
                </p>
              </div>
            ),
          }}
        />
      </main>

      <footer className="text-center py-4 bg-gray-100 text-sm mt-8">
        &copy; 2025 National Park Explorer
      </footer>
    </div>
  );
};

export default ParkDetails;
