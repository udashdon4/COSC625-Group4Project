import React, { useState } from "react";

export default function MediaUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Media Upload</h2>
      <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="upload"
        />
        <label htmlFor="upload" className="cursor-pointer">
          📁 Click to select a photo or video
        </label>
        {selectedFile && (
          <p className="mt-4 text-green-700">Selected: {selectedFile.name}</p>
        )}
      </div>

      <button
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={!selectedFile}
      >
        Upload
      </button>
    </div>
  );
}
