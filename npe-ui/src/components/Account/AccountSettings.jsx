import React, { useEffect, useState } from "react";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

// Example user data
const user = {
  email: "evelyn@example.com",
  username: "Evelyn Sage",
  handle: "@wildwanderer",
  location: "Seattle, WA",
  favoriteParkCode: "yose",
  profileImage: "/images/profile-placeholder.jpg",
};

export default function AccountSettings() {
  const [coverImageUrl, setCoverImageUrl] = useState("/images/cover-placeholder.jpg");
  const [formData, setFormData] = useState({
    password: "",
    secret: "",
    favoriteParkCode: user.favoriteParkCode,
    profileImage: null,
  });
  const [parks, setParks] = useState([]);

  // Fetch parks list for dropdown
  useEffect(() => {
    const fetchParks = async () => {
      try {
        const res = await fetch(
          `https://developer.nps.gov/api/v1/parks?limit=100&api_key=${API_KEY}`
        );
        const data = await res.json();
        setParks(data.data || []);
      } catch (err) {
        console.error("Error loading parks:", err);
      }
    };
    fetchParks();
  }, []);

  // Fetch cover image based on selected park code
  useEffect(() => {
    const fetchParkImage = async () => {
      try {
        const res = await fetch(
          `https://developer.nps.gov/api/v1/parks?parkCode=${formData.favoriteParkCode}&api_key=${API_KEY}`
        );
        const data = await res.json();
        const images = data?.data?.[0]?.images;
        if (images && images.length > 0) {
          setCoverImageUrl(images[0].url);
        }
      } catch (err) {
        console.error("Error fetching park image:", err);
      }
    };

    if (formData.favoriteParkCode) fetchParkImage();
  }, [formData.favoriteParkCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Implement actual form submission here
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <img
          src={coverImageUrl}
          alt="Park Banner"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="-mt-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={
              formData.profileImage
                ? URL.createObjectURL(formData.profileImage)
                : user.profileImage
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4">
          {user.username} <span className="text-green-600">●</span>
        </h2>
        <p className="text-gray-500">{user.handle}</p>
      </div>

      <h3 className="text-2xl font-bold mb-6">Account Settings</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email (disabled) */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded p-2 bg-gray-100 text-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded p-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Secret Word */}
        <div>
          <label className="block font-medium mb-1">Secret Word</label>
          <input
            type="text"
            name="secret"
            className="w-full border rounded p-2"
            value={formData.secret}
            onChange={handleChange}
          />
        </div>

        {/* Favorite National Park */}
        <div>
          <label className="block font-medium mb-1">Favorite National Park</label>
          <select
            name="favoriteParkCode"
            className="w-full border rounded p-2"
            value={formData.favoriteParkCode}
            onChange={handleChange}
          >
            <option value="">-- Select a Park --</option>
            {parks.map((park) => (
              <option key={park.id} value={park.parkCode}>
                {park.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-600"
          />
        </div>

        {/* Submit */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
