import { useState, useRef, useEffect } from "react";
import { Track, AudioState } from "../types/music";

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    isLoading: false,
    isMuted: false,
  });

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off");

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = audioState.volume;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setAudioState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState((prev) => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
      }));
    };

    const handleLoadStart = () => {
      setAudioState((prev) => ({
        ...prev,
        isLoading: true,
      }));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      }
    };

    const handleCanPlay = () => {
      setAudioState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [repeat]);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    } else {
      setCurrentTrack(track);
      audioRef.current.src = track.audioUrl;
      setAudioState((prev) => ({ ...prev, isLoading: true }));

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setAudioState((prev) => ({
        ...prev,
        volume,
        isMuted: volume === 0,
      }));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioState.isMuted) {
        audioRef.current.volume = audioState.volume;
        setAudioState((prev) => ({ ...prev, isMuted: false }));
      } else {
        audioRef.current.volume = 0;
        setAudioState((prev) => ({ ...prev, isMuted: true }));
      }
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
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
  };
};
