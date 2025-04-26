import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secretWord: "",
    favoritePark: "",
  });
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // load parks list (optional)
  useEffect(() => {
    const fetchAllParks = async () => {
      let all = [], start = 0, limit = 50, total = 0;
      try {
        do {
          const res = await fetch(
            `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=${API_KEY}`
          );
          const data = await res.json();
          total = parseInt(data.total, 10);
          all = all.concat(data.data);
          start += limit;
        } while (all.length < total);
        setParks(all);
      } catch (err) {
        console.error("Error fetching parks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllParks();
  }, []);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      username: formData.username,
      password: formData.password,
      secret: formData.secretWord,
      fav_park: formData.favoritePark || "", // optional
    };

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        console.error("Error creating user:", response.statusText);
        return;
      }
      const data = await response.json();
      login(data.userId);
      navigate("/COSC625-Group4Project/account");
      setFormData({ username: "", password: "", secretWord: "", favoritePark: "" });
    } catch (error) {
      console.error("Error submitting signup:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Password</label>
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
          <label className="block font-medium mb-1 text-gray-700">Secret Word</label>
          <input
            type="text"
            name="secretWord"
            className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
            value={formData.secretWord}
            onChange={handleChange}
            required
          />
        </div>

        {/* Favorite Park (optional) */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Favorite National Park (optional)
          </label>
          {loading ? (
            <p>Loading parks...</p>
          ) : parks.length > 0 ? (
            <select
              name="favoritePark"
              className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
              value={formData.favoritePark}
              onChange={handleChange}
            >
              <option value="">-- No favorite park --</option>
              {parks
                .filter((p) => p && p.fullName)
                .sort((a, b) => a.fullName.localeCompare(b.fullName))
                .map((park) => (
                  <option key={park.parkCode} value={park.fullName}>
                    {park.fullName}
                  </option>
                ))}
            </select>
          ) : (
            <p className="text-sm text-gray-500">
              Couldn't load parks. You can sign up without selecting one.
            </p>
          )}
        </div>

        {/* Submit */}
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
