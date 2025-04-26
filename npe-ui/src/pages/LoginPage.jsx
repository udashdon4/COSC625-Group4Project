import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ NEW

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const { login } = useAuth(); // ✅ get login function from context
  const navigate = useNavigate(); // ✅ redirect after login

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Logging in:", formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // optional if using cookies
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
        console.error("Login error:", data.error);
      } else {
        setMessage("Login successful!");
        console.log("Login successful:", data);

        localStorage.setItem("userId", data.userId); // optional for refresh persistence
        login(data.userId); // ✅ set user in global context
        navigate("/COSC625-Group4Project/account"); // ✅ redirect to account page
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">Login</h2>

      {message && <p className="text-center mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Username</label>
          <input
            type="username"
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

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link to="/COSC625-Group4Project/recover" className="text-sm text-green-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
