import React, { useState, useCallback } from "react";
import Sidebar from "./components/Layout/Sidebar";
import TopBar from "./components/Layout/TopBar";
import Player from "./components/Layout/Player";
import Home from "./components/Views/Home";
import Search from "./components/Views/Search";
import Library from "./components/Views/Library";
import PlaylistView from "./components/Views/PlaylistView";
import { Track, Playlist } from "./types/music";
import { mockTracks, mockPlaylists } from "./data/mockData";
import { useAudio } from "./hooks/useAudio";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);

  const {
    currentTrack,
    isPlaying,
    audioState,
    shuffle,
    repeat,
    playTrack,
    pauseTrack,
    seekTo,
    setVolume,
    toggleMute,
    setShuffle,
    setRepeat,
    formatTime,
  } = useAudio();

  const handlePlayTrack = useCallback(
    (track: Track) => {
      playTrack(track);
    },
    [playTrack]
  );

  const handlePlayPlaylist = useCallback(
    (playlist: Playlist) => {
      if (playlist.tracks.length > 0) {
        setCurrentPlaylist(playlist);
        playTrack(playlist.tracks[0]);
      }
    },
    [playTrack]
  );

  const handlePlaylistClick = useCallback((playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentView(`playlist-${playlist.id}`);
  }, []);

  const handleNext = useCallback(() => {
    if (currentPlaylist && currentTrack) {
      const currentIndex = currentPlaylist.tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      let nextIndex;

      if (shuffle) {
        nextIndex = Math.floor(Math.random() * currentPlaylist.tracks.length);
      } else {
        nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
      }

      playTrack(currentPlaylist.tracks[nextIndex]);
    }
  }, [currentPlaylist, currentTrack, shuffle, playTrack]);

  const handlePrevious = useCallback(() => {
    if (currentPlaylist && currentTrack) {
      const currentIndex = currentPlaylist.tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      let prevIndex;

      if (shuffle) {
        prevIndex = Math.floor(Math.random() * currentPlaylist.tracks.length);
      } else {
        prevIndex =
          currentIndex === 0
            ? currentPlaylist.tracks.length - 1
            : currentIndex - 1;
      }

      playTrack(currentPlaylist.tracks[prevIndex]);
    }
  }, [currentPlaylist, currentTrack, shuffle, playTrack]);

  const handleToggleTrackLike = useCallback((track: Track) => {
    setTracks((prevTracks) =>
      prevTracks.map((t) => (t.id === track.id ? { ...t, liked: !t.liked } : t))
    );

    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => ({
        ...playlist,
        tracks: playlist.tracks.map((t) =>
          t.id === track.id ? { ...t, liked: !t.liked } : t
        ),
      }))
    );
  }, []);

  const handleTogglePlaylistLike = useCallback((playlist: Playlist) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((p) =>
        p.id === playlist.id ? { ...p, liked: !p.liked } : p
      )
    );
  }, []);

  const handleToggleCurrentTrackLike = useCallback(() => {
    if (currentTrack) {
      handleToggleTrackLike(currentTrack);
    }
  }, [currentTrack, handleToggleTrackLike]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else if (currentTrack) {
      playTrack(currentTrack);
    }
  }, [isPlaying, currentTrack, pauseTrack, playTrack]);

  const handleToggleShuffle = useCallback(() => {
    setShuffle(!shuffle);
  }, [shuffle, setShuffle]);

  const handleToggleRepeat = useCallback(() => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  }, [repeat, setRepeat]);

  const handleViewChange = useCallback((view: string) => {
    setCurrentView(view);
    if (view === "search") {
      setSearchQuery("");
    }
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <Home
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onPlayPlaylist={handlePlayPlaylist}
            onPlaylistClick={handlePlaylistClick}
            onToggleTrackLike={handleToggleTrackLike}
            onTogglePlaylistLike={handleTogglePlaylistLike}
          />
        );
      case "search":
        return (
          <Search
            searchQuery={searchQuery}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onPlayPlaylist={handlePlayPlaylist}
            onPlaylistClick={handlePlaylistClick}
            onToggleTrackLike={handleToggleTrackLike}
            onTogglePlaylistLike={handleTogglePlaylistLike}
          />
        );
      case "library":
        return <Library onPlaylistClick={handlePlaylistClick} />;
      default:
        if (currentView.startsWith("playlist-") && currentPlaylist) {
          return (
            <PlaylistView
              playlist={currentPlaylist}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onPlayPlaylist={handlePlayPlaylist}
              onToggleTrackLike={handleToggleTrackLike}
              onTogglePlaylistLike={handleTogglePlaylistLike}
            />
          );
        }
        return (
          <Home
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onPlayPlaylist={handlePlayPlaylist}
            onPlaylistClick={handlePlaylistClick}
            onToggleTrackLike={handleToggleTrackLike}
            onTogglePlaylistLike={handleTogglePlaylistLike}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
        <div className="flex flex-col flex-1">
          <TopBar
            currentView={currentView}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {renderCurrentView()}
        </div>
      </div>
      {currentTrack && (
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          audioState={audioState}
          shuffle={shuffle}
          repeat={repeat}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={seekTo}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
          onToggleShuffle={handleToggleShuffle}
          onToggleRepeat={handleToggleRepeat}
          onToggleLike={handleToggleCurrentTrackLike}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}

export default App;
