import React from "react";
import { mockTracks, mockPlaylists } from "../../data/mockData";
import { Track, Playlist } from "../../types/music";
import TrackCard from "../UI/TrackCard";
import PlaylistCard from "../UI/PlaylistCard";

interface SearchProps {
  searchQuery: string;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  onToggleTrackLike: (track: Track) => void;
  onTogglePlaylistLike: (playlist: Playlist) => void;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onPlayPlaylist,
  onPlaylistClick,
  onToggleTrackLike,
  onTogglePlaylistLike,
}) => {
  const genres = [
    {
      name: "Pop",
      color: "bg-pink-500",
      image:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Hip-Hop",
      color: "bg-orange-500",
      image:
        "https://images.pexels.com/photos/1644819/pexels-photo-1644819.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Rock",
      color: "bg-red-500",
      image:
        "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Electronic",
      color: "bg-purple-500",
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Jazz",
      color: "bg-blue-500",
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Classical",
      color: "bg-green-500",
      image:
        "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = mockPlaylists.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!searchQuery) {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Browse all</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className={`${genre.color} rounded-lg p-4 h-32 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-white text-xl font-bold mb-2">
                {genre.name}
              </h3>
              <img
                src={genre.image}
                alt={genre.name}
                className="absolute -bottom-2 -right-2 w-20 h-20 object-cover rounded-lg transform rotate-12"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-8">
        Search results for "{searchQuery}"
      </h1>

      {filteredTracks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTracks.map((track) => (
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
      )}

      {filteredPlaylists.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPlaylists.map((playlist) => (
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
      )}

      {filteredTracks.length === 0 && filteredPlaylists.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-white text-xl font-medium mb-2">
            No results found
          </h3>
          <p className="text-gray-400">Try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default Search;
