"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Song {
  _id?: string;
  id?: string;
  title: string;
  artist: string;
  artistId?: string;
  coverImage?: string;
  coverImageUrl?: string; // For songs from the database
  audioUrl?: string;
  cloudinaryUrl?: string; // For songs from the database
  duration?: number;
  genre?: string;
  price?: number;
  purchases?: number;
  streams?: number;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isMinimized: boolean;
  playlist: Song[];
  currentSongIndex: number;
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlay: () => void;
  toggleMinimize: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToPlaylist: (song: Song) => void;
  playSong: (song: Song) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  // Load minimized state from localStorage on initial render
  useEffect(() => {
    const storedMinimizedState = localStorage.getItem('musicPlayerMinimized');
    if (storedMinimizedState !== null) {
      setIsMinimized(storedMinimizedState === 'true');
    }

    // Initialize with a default song
    const defaultSong = {
      id: '1',
      title: 'Sitya Loss',
      artist: 'Eddy Kenzo',
      artistId: '1',
      coverImage: '/images/1.jpg',
      audioUrl: '/audio/sample.mp3',
      duration: 235 // 3:55 in seconds
    };

    setCurrentSong(defaultSong);
    setPlaylist([defaultSong]);
    setCurrentSongIndex(0);
  }, []);

  // Save minimized state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('musicPlayerMinimized', isMinimized.toString());
  }, [isMinimized]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const playNext = () => {
    if (playlist.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;

    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  const addToPlaylist = (song: Song) => {
    // Check if song is already in playlist
    const songExists = playlist.some(item =>
      (item.id && item.id === song.id) ||
      (item._id && item._id === song._id)
    );

    if (!songExists) {
      setPlaylist(prev => [...prev, song]);
    }
  };

  const playSong = (song: Song) => {
    // Add to playlist if not already there
    addToPlaylist(song);

    // Find index of song in playlist
    const songIndex = playlist.findIndex(item =>
      (item.id && item.id === song.id) ||
      (item._id && item._id === song._id)
    );

    // If song is not in playlist yet, it will be the last item
    const newIndex = songIndex === -1 ? playlist.length : songIndex;

    setCurrentSongIndex(newIndex);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        isMinimized,
        playlist,
        currentSongIndex,
        setCurrentSong,
        setIsPlaying,
        togglePlay,
        toggleMinimize,
        playNext,
        playPrevious,
        addToPlaylist,
        playSong
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
