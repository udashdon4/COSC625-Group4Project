import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import Carousel from '../components/Carousel';
import ParkCard from '../components/ParkCard';
import { fetchParksData } from '../services/npsApi';

const US_STATES = [
  { name: 'All States', code: '' },
  { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' }, { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' }, { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' }, { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' }, { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' }, { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' }, { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' }, { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' }, { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' }, { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' }, { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' }, { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' },
];

const ParkSearch = () => {
  const [parks, setParks] = useState([]);
  const [location, setLocation] = useState('');
  const [stateCode, setStateCode] = useState('');

  const loadParks = async () => {
    try {
      const data = await fetchParksData({ location, stateCode });
      setParks(data);
    } catch (error) {
      console.error('Error loading parks:', error);
    }
  };

  useEffect(() => {
    loadParks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadParks();
  };

  return (
    <div>
      <HeroSection
        title="National Park Explorer"
        subtitle="Explore Our Beautiful Parks and Nature Trails."
      />

      <section className="bg-white py-4">
        <Carousel />
      </section>

      <main className="flex flex-col lg:flex-row gap-6 p-6">
        <aside className="bg-gray-200 p-6 rounded-xl w-full lg:w-80">
          <h3 className="text-lg font-semibold mb-4">Filter Parks</h3>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium">Name:</label>
            <input
              type="text"
              placeholder="Ex. Shenandoah"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mb-4 p-2 rounded-md border"
            />
            <label className="block mb-2 font-medium">State:</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full mb-4 p-2 rounded-md border"
            >
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-900 text-white font-bold py-2 rounded-full"
            >
              Apply Filters
            </button>
          </form>
        </aside>

        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parks.length === 0 ? (
            <p>No parks found.</p>
          ) : (
            parks.map((park) => <ParkCard key={park.id} park={park} />)
          )}
        </section>
      </main>

      <footer className="text-center py-4 bg-gray-100 text-sm mt-8">
        &copy; 2025 National Park Explorer
      </footer>
    </div>
  );
};

export default ParkSearch;
