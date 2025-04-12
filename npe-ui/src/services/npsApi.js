const API_KEY = 'JBVKiTZf2hTv4biYXchKMKfmjDHMB6T8o1cO7j7k';
const BASE_URL = 'https://developer.nps.gov/api/v1';

export const fetchParksData = async (filters = {}) => {
  const { location, stateCode } = filters;
  const url = new URL(`${BASE_URL}/parks`);
  const params = {
    api_key: API_KEY,
    limit: 700,
  };
  if (location) params.q = location;
  if (stateCode) params.stateCode = stateCode;
  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch parks');
  const data = await res.json();

  return data.data.filter(p => p.designation === 'National Park');
};

export const fetchParkDetails = async (parkCode) => {
  const url = `${BASE_URL}/parks?parkCode=${parkCode}&api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch park details');
  const data = await res.json();
  return data.data[0];
};

export const fetchWebcamData = async (parkCode) => {
  const url = `${BASE_URL}/webcams?parkCode=${parkCode}&api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch webcam data');
  const data = await res.json();
  return data.data;
};
