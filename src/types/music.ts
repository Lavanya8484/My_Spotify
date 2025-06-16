export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  liked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  createdBy: string;
  isPublic: boolean;
  liked?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  isVerified: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  imageUrl: string;
  tracks: Track[];
}

export interface AudioState {
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  isMuted: boolean;
}
