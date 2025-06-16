import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  Maximize2,
} from "lucide-react";
import { Track, AudioState } from "../../types/music";

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  audioState: AudioState;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleLike: () => void;
  formatTime: (time: number) => string;
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  isPlaying,
  audioState,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  formatTime,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  if (!currentTrack) return null;

  const progressPercentage =
    audioState.duration > 0
      ? (audioState.currentTime / audioState.duration) * 100
      : 0;

  const volumePercentage = audioState.isMuted ? 0 : audioState.volume * 100;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * audioState.duration;
    onSeek(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    onVolumeChange(percentage);
  };

  const getRepeatIcon = () => {
    if (repeat === "one") {
      return (
        <Repeat size={20} className="relative">
          <span className="absolute -top-1 -right-1 text-xs">1</span>
        </Repeat>
      );
    }
    return <Repeat size={20} />;
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Current Track Info */}
      <div className="flex items-center space-x-4 min-w-0 w-1/4">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-white text-sm font-medium truncate">
            {currentTrack.title}
          </h4>
          <p className="text-gray-400 text-xs truncate">
            {currentTrack.artist}
          </p>
        </div>
        <button
          onClick={onToggleLike}
          className={`p-2 rounded-full transition-colors duration-200 ${
            currentTrack.liked
              ? "text-green-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Heart
            size={16}
            fill={currentTrack.liked ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
        <div className="flex items-center space-x-6">
          <button
            onClick={onToggleShuffle}
            className={`transition-colors duration-200 ${
              shuffle ? "text-green-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <Shuffle size={20} />
          </button>

          <button
            onClick={onPrevious}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={onPlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform duration-200 disabled:opacity-50"
            disabled={audioState.isLoading}
          >
            {audioState.isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={onToggleRepeat}
            className={`transition-colors duration-200 ${
              repeat !== "off"
                ? "text-green-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {getRepeatIcon()}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-3 w-full">
          <span className="text-xs text-gray-400 min-w-[40px]">
            {formatTime(audioState.currentTime)}
          </span>
          <div
            className="flex-1 bg-gray-600 rounded-full h-1 relative cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="bg-white rounded-full h-1 relative transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 min-w-[40px]">
            {formatTime(audioState.duration)}
          </span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center space-x-4 justify-end w-1/4">
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <Maximize2 size={16} />
        </button>
        <button
          onClick={onToggleMute}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          {audioState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className="flex items-center space-x-2 w-24">
          <div
            className="flex-1 bg-gray-600 rounded-full h-1 relative cursor-pointer group"
            onClick={handleVolumeClick}
          >
            <div
              className="bg-white rounded-full h-1 relative transition-all duration-150"
              style={{ width: `${volumePercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
