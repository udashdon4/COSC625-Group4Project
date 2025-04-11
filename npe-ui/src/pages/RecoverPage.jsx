import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoverPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    secretWord: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, secretWord } = formData;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, secretWord }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Recovery failed");
        setSuccess(false);
      } else {
        const data = await res.json();
        setSuccess(true);
        setError("");
        console.log("Account recovery successful:", data);
        // Automatically log the user in by storing their user ID and redirect
        localStorage.setItem("userId", data.userId);
        navigate("/account"); // Redirect to account page to allow updating the password
      }
    } catch (err) {
      console.error("Error during account recovery:", err);
      setError("An error occurred during recovery.");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        Account Recovery
      </h2>

      {success ? (
        <p className="text-green-700 text-center font-medium">
          ✅ Account recovery successful! Redirecting...
        </p>
      ) : (
        <>
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md bg-[#ecece5] focus:outline-none"
                value={formData.email}
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

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
              >
                Recover Account
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default RecoverPage;
