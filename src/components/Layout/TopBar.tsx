import React from "react";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";

interface TopBarProps {
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  currentView,
  searchQuery,
  onSearchChange,
}) => {
  const getTitle = () => {
    switch (currentView) {
      case "home":
        return "Good evening";
      case "search":
        return "Search";
      case "library":
        return "Your Library";
      default:
        if (currentView.startsWith("playlist-")) {
          return "Playlist";
        }
        return "Spotify";
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 px-8 py-4 flex items-center justify-between">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200">
          <ChevronLeft size={20} />
        </button>
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200">
          <ChevronRight size={20} />
        </button>
        {currentView === "search" && (
          <div className="relative ml-8">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-white rounded-full py-3 pl-12 pr-6 w-96 text-black text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-70 transition-all duration-200">
          Upgrade
        </button>
        <button className="bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition-all duration-200">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
