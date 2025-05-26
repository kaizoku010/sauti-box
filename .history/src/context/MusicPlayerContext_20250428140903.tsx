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

  // Load minimized state from localStorage on initial render
  useEffect(() => {
    const storedMinimizedState = localStorage.getItem('musicPlayerMinimized');
    if (storedMinimizedState !== null) {
      setIsMinimized(storedMinimizedState === 'true');
    }

    // Initialize with a default song
    setCurrentSong({
      id: '1',
      title: 'Sitya Loss',
      artist: 'Eddy Kenzo',
      artistId: '1',
      coverImage: '/images/1.jpg',
      audioUrl: '/audio/sample.mp3',
      duration: 235 // 3:55 in seconds
    });
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

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        isMinimized,
        setCurrentSong,
        setIsPlaying,
        togglePlay,
        toggleMinimize
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
