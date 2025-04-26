// src/components/Account/MediaUpload.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function MediaUpload() {
  const { userId } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchGallery = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${apiUrl}/api/gallery?userId=${userId}`);
      if (!res.ok) throw new Error("Couldn’t load gallery");
      setGallery(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPreviewUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) return;
    const fd = new FormData();
    fd.append("file", selectedFile);
    fd.append("userId", userId);
    fd.append("folder", "gallery");  // ensure this upload goes into userId/gallery/

    setUploading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPreviewUrl(data.url);
      fetchGallery();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!userId) {
    return <p className="text-center text-red-600">Log in to see and upload your media.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Media Gallery</h2>

      <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
        <input
          type="file"
          id="upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="upload" className="cursor-pointer">
          Select a photo or video
        </label>
        {selectedFile && (
          <p className="mt-4 text-green-700">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {previewUrl && (
        <div className="mt-6 text-center">
          <p className="mb-4 font-medium">Just uploaded:</p>
          <img
            src={previewUrl}
            alt="Uploaded media"
            className="inline-block max-w-full rounded shadow"
          />
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((url) => (
          <div key={url} className="border rounded overflow-hidden">
            <img
              src={url}
              alt="User upload"
              className="object-cover w-full h-40"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
