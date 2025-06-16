import React from "react";
import { mockTracks, mockPlaylists } from "../../data/mockData";
import { Track, Playlist } from "../../types/music";
import TrackCard from "../UI/TrackCard";
import PlaylistCard from "../UI/PlaylistCard";

interface HomeProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  onToggleTrackLike: (track: Track) => void;
  onTogglePlaylistLike: (playlist: Playlist) => void;
}

const Home: React.FC<HomeProps> = ({
  currentTrack,
  isPlaying,
  onPlayTrack,
  onPlayPlaylist,
  onPlaylistClick,
  onToggleTrackLike,
  onTogglePlaylistLike,
}) => {
  const recentlyPlayed = mockPlaylists.slice(0, 6);
  const madeForYou = mockPlaylists;
  const topTracks = mockTracks;

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Good evening</h1>

      {/* Recently Played */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyPlayed.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-700 bg-opacity-50 rounded-md flex items-center hover:bg-gray-600 transition-colors duration-300 cursor-pointer group"
              onClick={() => onPlaylistClick(playlist)}
            >
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-20 h-20 rounded-l-md object-cover"
              />
              <div className="flex-1 px-4">
                <h3 className="text-white font-medium">{playlist.name}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPlaylist(playlist);
                }}
                className="p-3 mr-4 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Made for you */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {madeForYou.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              isPlaying={false}
              onPlay={onPlayPlaylist}
              onClick={onPlaylistClick}
              onToggleLike={onTogglePlaylistLike}
            />
          ))}
        </div>
      </section>

      {/* Top tracks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular this week</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              onPlay={onPlayTrack}
              onToggleLike={onToggleTrackLike}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
