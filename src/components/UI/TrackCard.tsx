import React from "react";
import { Play, Pause, Heart } from "lucide-react";
import { Track } from "../../types/music";

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  onToggleLike?: (track: Track) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isPlaying,
  onPlay,
  onToggleLike,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 group cursor-pointer">
      <div className="relative mb-4">
        <img
          src={track.imageUrl}
          alt={track.title}
          className="w-full aspect-square rounded-md object-cover"
        />
        <button
          onClick={() => onPlay(track)}
          className="absolute bottom-2 right-2 bg-green-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
        >
          {isPlaying ? (
            <Pause size={20} className="text-black" />
          ) : (
            <Play size={20} className="text-black ml-0.5" />
          )}
        </button>
        {onToggleLike && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(track);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
              track.liked
                ? "text-green-500 opacity-100"
                : "text-white opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart size={16} fill={track.liked ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1 truncate">{track.title}</h3>
        <p className="text-gray-400 text-sm truncate">{track.artist}</p>
      </div>
    </div>
  );
};

export default TrackCard;
