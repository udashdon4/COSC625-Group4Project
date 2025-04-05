// src/pages/AccountPage.jsx
import React, { useState } from "react";
import AccountSettings from "../components/Account/AccountSettings";
import SavedFavorites from "../components/Account/SavedFavorites";
import VisitHistory from "../components/Account/VisitHistory";
import Recommendations from "../components/Account/Recommendations";
import MediaUpload from "../components/Account/MediaUpload";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("AccountSettings");

  const renderSection = () => {
    switch (activeTab) {
      case "SavedFavorites":
        return <SavedFavorites />;
      case "VisitHistory":
        return <VisitHistory />;
      case "Recommendations":
        return <Recommendations />;
      case "MediaUpload":
        return <MediaUpload />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div>
      <div className="flex min-h-screen">
        <aside className="w-1/4 p-4 border-r bg-gray-100">
          <ul className="space-y-3 font-medium">
            <li onClick={() => setActiveTab("AccountSettings")} className="cursor-pointer hover:text-green-700">Account Settings</li>
            <li onClick={() => setActiveTab("SavedFavorites")} className="cursor-pointer hover:text-green-700">Saved Favorites</li>
            <li onClick={() => setActiveTab("VisitHistory")} className="cursor-pointer hover:text-green-700">Visit History</li>
            <li onClick={() => setActiveTab("Recommendations")} className="cursor-pointer hover:text-green-700">Recommendations</li>
            <li onClick={() => setActiveTab("MediaUpload")} className="cursor-pointer hover:text-green-700">Media Upload</li>
          </ul>
        </aside>
        <main className="w-3/4 p-6">{renderSection()}</main>
      </div>
    </div>
  );
}
