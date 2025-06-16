import React from "react";
import { Grid, List, Search } from "lucide-react";
import { mockPlaylists } from "../../data/mockData";
import { Playlist } from "../../types/music";

interface LibraryProps {
  onPlaylistClick: (playlist: Playlist) => void;
}

const Library: React.FC<LibraryProps> = ({ onPlaylistClick }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <Search size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <List size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <Grid size={20} />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-8">
        <button className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors duration-200">
          Playlists
        </button>
        <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors duration-200">
          Artists
        </button>
        <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors duration-200">
          Albums
        </button>
      </div>

      <div className="space-y-4">
        {mockPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => onPlaylistClick(playlist)}
          >
            <img
              src={playlist.imageUrl}
              alt={playlist.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">
                {playlist.name}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                Playlist • {playlist.createdBy} • {playlist.tracks.length} songs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
