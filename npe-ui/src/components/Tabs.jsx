import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === key
                ? 'bg-green-700 text-white'
                : 'bg-gray-300 text-black hover:bg-green-700 hover:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab]}</div>
    </div>
  );
};

export default Tabs;
