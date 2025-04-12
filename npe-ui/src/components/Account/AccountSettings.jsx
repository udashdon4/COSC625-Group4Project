import React, { useEffect, useState } from "react";

const API_KEY = "wT7qTdbCiApVc0O9U4sDpW0AEFgcfmyB8fHNW42O";

export default function AccountSettings() {
  const currentUserId = localStorage.getItem("userId");
  const [coverImageUrl, setCoverImageUrl] = useState(
    "/images/cover-placeholder.jpg"
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secret: "",
    favoriteParkCode: "",
    profileImage: null,
  });
  const [parks, setParks] = useState([]);

  // Fetch all parks on mount
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

  // Fetch user settings once parks are loaded
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

  // Fetch park image based on selected parkCode
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
    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    let profileImageBase64 = null;
    if (formData.profileImage && typeof formData.profileImage !== "string") {
      try {
        profileImageBase64 = await getBase64(formData.profileImage);
      } catch (error) {
        console.error("Error converting image:", error);
      }
    } else if (typeof formData.profileImage === "string") {
      profileImageBase64 = formData.profileImage;
    }

    const updateData = {
      password: formData.password,
      secret: formData.secret,
      fav_park:
        parks.find((p) => p.parkCode === formData.favoriteParkCode)?.fullName ||
        "",
      profile_image: profileImageBase64,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${currentUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error updating settings:", errorData.error);
      } else {
        const data = await res.json();
        console.log("Account settings updated successfully!", data);
      }
    } catch (error) {
      console.error("Error submitting account settings:", error);
    }
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
                ? formData.profileImage instanceof File
                  ? URL.createObjectURL(formData.profileImage)
                  : formData.profileImage
                : "/images/profile-placeholder.jpg"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4">Account Settings</h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Username (disabled) */}
        <div>
          <label className="block font-medium mb-1">Username</label>{" "}
          {/* changed from Email */}
          <input
            type="text"
            value={formData.username || ""}
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
            placeholder="Leave blank to keep unchanged"
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
