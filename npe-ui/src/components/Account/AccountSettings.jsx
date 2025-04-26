import React, { useEffect, useState } from "react";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";
const BACKEND = "https://cosc625-group4project.onrender.com"; // e.g. http://localhost:5000

export default function AccountSettings() {
  const currentUserId = localStorage.getItem("userId");  // still keep userId in localStorage for session
  const [coverImageUrl, setCoverImageUrl] = useState("/images/cover-placeholder.jpg");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secret: "",
    favoriteParkCode: "",
    profileImage: null, // File OR URL string
  });

  const [previewUrl, setPreviewUrl] = useState("/images/profile-placeholder.jpg");  // Default fallback
  const [parks, setParks] = useState([]);
  // Fetch parks list
  useEffect(() => {
    const fetchParks = async () => {
      let allParks = [];
      let start = 0;
      const limit = 50; // use 50 to stay safe with rate limits
      let total = 0;

      try {
        do {
          const res = await fetch(
            `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=${API_KEY}`
          );
          const data = await res.json();

          if (!total) total = parseInt(data.total);
          allParks = [...allParks, ...data.data];
          start += limit;
        } while (allParks.length < total);

        setParks(allParks);
        localStorage.setItem("allParks", JSON.stringify(allParks));
      } catch (err) {
        console.error("Error loading parks:", err);
      }
    };
    fetchParks();
  }, []);

  // Fetch user settings
  useEffect(() => {
    if (!currentUserId || parks.length === 0) return;

    const fetchUserSettings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${currentUserId}`
        );
        if (res.ok) {
          const data = await res.json();

          const matchedPark = parks.find(p => p.fullName === data.fav_park || p.name === data.fav_park);
          const matchedParkCode = matchedPark ? matchedPark.parkCode : "";

          setFormData({
            username: data.username || "",
            password: "",
            secret: data.secret || "",
            favoriteParkCode: matchedParkCode,
            profileImage: data.profile_image || null,
          });
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchUserSettings();
  }, [parks, currentUserId]);

  useEffect(() => {
    const fetchParkImage = async () => {
      if (!formData.favoriteParkCode) return;
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

    fetchParkImage();
  }, [formData.favoriteParkCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profileImage: file }));
    setPreviewUrl(URL.createObjectURL(file)); // Instant preview
  };

  // Upload file to S3, return its URL
  const uploadProfileImage = async () => {
    if (!formData.profileImage || typeof formData.profileImage === "string")
      return formData.profileImage; // already a URL

    const body = new FormData();
    body.append("file", formData.profileImage);
    body.append("userId", currentUserId);
    body.append("folder", "profile");

    try {
      const res = await fetch(`${BACKEND}/api/upload`, { method: "POST", body });
      if (!res.ok) throw new Error("upload failed");
      const { url } = await res.json();
      return url;
    } catch (err) {
      console.error("S3 upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ upload if we have a new file
    const uploadedUrl = await uploadProfileImage();

    // Only proceed if we have a new uploaded URL
    if (uploadedUrl) {
      setPreviewUrl(uploadedUrl); // Update the preview with the new image
      setFormData((f) => ({ ...f, profileImage: uploadedUrl })); // Update form data with the new URL
    }

    // 2️⃣ update DB
    const updateData = {
      password: formData.password,
      secret: formData.secret,
      fav_park:
        parks.find((p) => p.parkCode === formData.favoriteParkCode)?.fullName ||
        "",
      profile_image: uploadedUrl, // Send the uploaded URL to be saved in the database
    };

    try {
      const res = await fetch(`${BACKEND}/users/${currentUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "update failed");
      }
      alert("Account settings saved!");
    } catch (err) {
      console.error("Error updating settings:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* banner + avatar */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={coverImageUrl}
          alt="Park Banner"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="-mt-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={previewUrl} // The URL is now set directly from the backend
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4">Account Settings</h2>
      </div>

      {/* form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            disabled
            className="w-full border rounded p-2 bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded p-2"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep unchanged"
          />
        </div>

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

        <div>
          <label className="block font-medium mb-1">
            Favorite National Park
          </label>
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

        <div>
          <label className="block font-medium mb-1">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-600"
          />
        </div>

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
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
