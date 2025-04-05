import React, { useState } from "react";

const RecoverPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    secretWord: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Placeholder "mock database" for demo purposes
  const mockUser = {
    email: "evelyn@example.com",
    secretWord: "wildflower",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, secretWord } = formData;

    // Simulate login verification with mock data
    if (
      email.trim().toLowerCase() === mockUser.email &&
      secretWord.trim().toLowerCase() === mockUser.secretWord
    ) {
      setSuccess(true);
      setError("");
      console.log("User logged in (mock):", email);
    } else {
      setError("Incorrect email or secret word.");
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
          ✅ Login successful! (mock)
        </p>
      ) : (
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

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

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
      )}
    </div>
  );
};

export default RecoverPage;
