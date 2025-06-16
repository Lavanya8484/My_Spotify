import React from "react";
import { Home, Search, Library, Plus, Heart, Download } from "lucide-react";
import { mockPlaylists } from "../../data/mockData";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Your Library", icon: Library },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-md text-left transition-colors duration-200 ${
                currentView === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={24} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Playlist Section */}
      <div className="px-2 py-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-4 px-4 py-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200">
          <Plus size={24} />
          <span className="font-medium">Create Playlist</span>
        </button>

        <button className="w-full flex items-center space-x-4 px-4 py-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200">
          <Heart size={24} />
          <span className="font-medium">Liked Songs</span>
        </button>

        <button className="w-full flex items-center space-x-4 px-4 py-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200">
          <Download size={24} />
          <span className="font-medium">Downloaded</span>
        </button>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-2 py-2 overflow-y-auto">
        <div className="border-t border-gray-800 pt-4">
          {mockPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onViewChange(`playlist-${playlist.id}`)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                currentView === `playlist-${playlist.id}`
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="truncate font-medium">{playlist.name}</div>
              <div className="text-xs text-gray-500 truncate">
                {playlist.createdBy} • {playlist.tracks.length} songs
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
          <Download size={20} />
          <span className="text-sm font-medium">Install App</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
