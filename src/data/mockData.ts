import { Track, Playlist, Artist, Album } from "../types/music";

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    imageUrl:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: false,
  },
  {
    id: "2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    imageUrl:
      "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: true,
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    imageUrl:
      "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: false,
  },
  {
    id: "4",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    imageUrl:
      "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: true,
  },
  {
    id: "5",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3",
    duration: "2:21",
    imageUrl:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: false,
  },
  {
    id: "6",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    imageUrl:
      "https://images.pexels.com/photos/1644819/pexels-photo-1644819.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: true,
  },
  {
    id: "7",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: "3:58",
    imageUrl:
      "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: false,
  },
  {
    id: "8",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    imageUrl:
      "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    liked: true,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Today's Top Hits",
    description: "The most played songs right now",
    imageUrl:
      "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(0, 5),
    createdBy: "Spotify",
    isPublic: true,
    liked: false,
  },
  {
    id: "2",
    name: "Chill Vibes",
    description: "Relax and unwind with these chill tracks",
    imageUrl:
      "https://images.pexels.com/photos/1644819/pexels-photo-1644819.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(2, 6),
    createdBy: "Spotify",
    isPublic: true,
    liked: true,
  },
  {
    id: "3",
    name: "My Liked Songs",
    description: "Your favorite tracks all in one place",
    imageUrl:
      "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.filter((track) => track.liked),
    createdBy: "You",
    isPublic: false,
    liked: true,
  },
  {
    id: "4",
    name: "Pop Hits 2024",
    description: "The biggest pop songs of the year",
    imageUrl:
      "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(1, 7),
    createdBy: "Spotify",
    isPublic: true,
    liked: false,
  },
  {
    id: "5",
    name: "Workout Mix",
    description: "High energy tracks to power your workout",
    imageUrl:
      "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300",
    tracks: mockTracks.slice(0, 4),
    createdBy: "Spotify",
    isPublic: true,
    liked: true,
  },
];

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "The Weeknd",
    imageUrl:
      "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300",
    followers: 45000000,
    isVerified: true,
  },
  {
    id: "2",
    name: "Harry Styles",
    imageUrl:
      "https://images.pexels.com/photos/1644819/pexels-photo-1644819.jpeg?auto=compress&cs=tinysrgb&w=300",
    followers: 32000000,
    isVerified: true,
  },
  {
    id: "3",
    name: "Dua Lipa",
    imageUrl:
      "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=300",
    followers: 28000000,
    isVerified: true,
  },
];
