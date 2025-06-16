import React from "react";
import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react";
import { Playlist, Track } from "../../types/music";

interface PlaylistViewProps {
  playlist: Playlist;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  onToggleTrackLike: (track: Track) => void;
  onTogglePlaylistLike: (playlist: Playlist) => void;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onPlayPlaylist,
  onToggleTrackLike,
  onTogglePlaylistLike,
}) => {
  const totalDuration = playlist.tracks.reduce((total, track) => {
    const [minutes, seconds] = track.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 via-purple-800 to-gray-900 overflow-y-auto">
      {/* Playlist Header */}
      <div className="flex items-end space-x-6 p-8 pb-6">
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className="w-60 h-60 rounded-lg shadow-2xl object-cover"
        />
        <div className="flex-1">
          <p className="text-white text-sm font-medium mb-2">PLAYLIST</p>
          <h1 className="text-white text-6xl font-bold mb-4">
            {playlist.name}
          </h1>
          <p className="text-gray-300 text-lg mb-4">{playlist.description}</p>
          <div className="flex items-center space-x-1 text-white text-sm">
            <span className="font-medium">{playlist.createdBy}</span>
            <span>•</span>
            <span>{playlist.tracks.length} songs,</span>
            <span className="text-gray-300">
              {formatTotalDuration(totalDuration)}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-8 px-8 py-6">
        <button
          onClick={() => onPlayPlaylist(playlist)}
          className="bg-green-500 p-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          {isPlaying ? (
            <Pause size={24} className="text-black" />
          ) : (
            <Play size={24} className="text-black ml-1" />
          )}
        </button>
        <button
          onClick={() => onTogglePlaylistLike(playlist)}
          className={`transition-colors duration-200 ${
            playlist.liked ? "text-green-500" : "text-gray-400 hover:text-white"
          }`}
        >
          <Heart size={32} fill={playlist.liked ? "currentColor" : "none"} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-medium border-b border-gray-700 pb-2 mb-4">
          <div className="col-span-1">#</div>
          <div className="col-span-5">TITLE</div>
          <div className="col-span-3">ALBUM</div>
          <div className="col-span-2">DATE ADDED</div>
          <div className="col-span-1">
            <Clock size={16} />
          </div>
        </div>

        <div className="space-y-1">
          {playlist.tracks.map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-12 gap-4 py-2 px-2 rounded-md hover:bg-gray-800 group cursor-pointer"
              onClick={() => onPlayTrack(track)}
            >
              <div className="col-span-1 flex items-center text-gray-400 group-hover:text-white">
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="w-4 flex justify-center">
                    <div className="flex space-x-0.5">
                      <div className="w-0.5 h-4 bg-green-500 animate-pulse"></div>
                      <div
                        className="w-0.5 h-4 bg-green-500 animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-0.5 h-4 bg-green-500 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <span className="group-hover:hidden">{index + 1}</span>
                )}
                <Play size={16} className="hidden group-hover:block ml-0.5" />
              </div>

              <div className="col-span-5 flex items-center space-x-3">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      currentTrack?.id === track.id
                        ? "text-green-500"
                        : "text-white"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {track.artist}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTrackLike(track);
                  }}
                  className={`p-1 rounded transition-colors duration-200 ${
                    track.liked
                      ? "text-green-500"
                      : "text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={track.liked ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="col-span-3 flex items-center text-gray-400 text-sm">
                {track.album}
              </div>

              <div className="col-span-2 flex items-center text-gray-400 text-sm">
                5 days ago
              </div>

              <div className="col-span-1 flex items-center text-gray-400 text-sm">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
