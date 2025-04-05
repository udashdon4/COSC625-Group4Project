import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretWord: "",
    favoritePark: "",
    profileImage: null,
  });

  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

  useEffect(() => {
    const fetchAllParks = async () => {
      let allParks = [];
      let start = 0;
      const limit = 50;
      let total = 0;

      try {
        do {
          const res = await fetch(
            `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=${apiKey}`
          );
          const data = await res.json();
          total = parseInt(data.total);
          allParks = [...allParks, ...data.data];
          start += limit;
        } while (allParks.length < total);

        setParks(allParks);
      } catch (err) {
        console.error("Error fetching parks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllParks();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Secret Word */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Secret Word
          </label>
          <input
            type="text"
            name="secretWord"
            className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
            value={formData.secretWord}
            onChange={handleChange}
            required
          />
        </div>

        {/* Favorite National Park Dropdown */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Favorite National Park
          </label>
          {loading ? (
            <p>Loading parks...</p>
          ) : (
            <select
              name="favoritePark"
              className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
              value={formData.favoritePark}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Park --</option>
              {parks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((park) => (
                  <option key={park.id} value={park.name}>
                    {park.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        {/* Profile Image Upload */}
        <div className="text-center">
          <label className="block font-medium mb-2 text-gray-700">
            Profile Image
          </label>

          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile Preview"
              className="mx-auto mb-3 w-24 h-24 object-cover rounded-full border-2 border-green-700"
            />
          ) : (
            <div className="w-24 h-24 mx-auto mb-3 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400">
              <span>📷</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mx-auto block text-sm text-gray-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
