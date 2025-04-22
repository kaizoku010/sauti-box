"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import {
  FiSkipBack,
  FiSkipForward,
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
  FiHeart,
  FiRepeat,
  FiShuffle,
  FiMaximize,
  FiMinimize,
  FiList
} from 'react-icons/fi';

const MusicPlayer: React.FC = () => {

  const { currentSong, isPlaying, isMinimized, setIsPlaying, toggleMinimize, togglePlay: contextTogglePlay } = useMusicPlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current && currentSong?.audioUrl) {
      audioRef.current = new Audio(currentSong.audioUrl);

      // Set up event listeners
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [currentSong]);

  useEffect(() => {
    // Update volume when it changes
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Here you could implement logic to play the next song
  };

  if (!currentSong) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      contextTogglePlay();
    } else {
      contextTogglePlay();
    }
  };

  const toggleLike = () => setIsLiked(!isLiked);

  const toggleMute = () => setIsMuted(!isMuted);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current && currentSong) {
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * currentSong.duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out
        ${isMinimized
          ? 'bottom-4 right-4 w-64 h-16 rounded-full'
          : 'bottom-6 mx-auto h-24 rounded-xl left-1/2 transform -translate-x-1/2'}
        glass-effect shadow-lg overflow-hidden ${!isMinimized ? 'w-[calc(100%-5rem)]' : ''}`}
      style={{
        maxWidth: isMinimized ? '16rem' : 'calc(100% - 5rem)',
        marginLeft: isMinimized ? '0' : '1rem'
      }}
    >
      {isMinimized ? (
        // Mini Player
        <div className="flex items-center h-full px-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 mr-2">
            <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
            <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10 shadow-[0_0_8px_rgba(255,87,34,0.2)]"
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </button>

            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-primary"
            >
              <FiMaximize size={16} />
            </button>
          </div>
        </div>
      ) : (
        // Full Player
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center w-1/4">
            <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
              <img
                src={currentSong.coverImage}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 mr-4">
              <p className="text-white font-medium truncate">{currentSong.title}</p>
              <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <button className="text-gray-400 hover:text-primary">
                <FiShuffle size={16} />
              </button>

              <button className="text-gray-400 hover:text-primary">
                <FiSkipBack size={20} />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(255,87,34,0.2)]"
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>

              <button className="text-gray-400 hover:text-primary">
                <FiSkipForward size={20} />
              </button>

              <button className="text-gray-400 hover:text-primary">
                <FiRepeat size={16} />
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>

              <div
                ref={progressBarRef}
                className="flex-1 h-1 bg-gray-700 rounded-full mx-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                ></div>
              </div>

              <span className="text-xs text-gray-400 w-10">{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-1/4 justify-end">
            <button
              onClick={toggleLike}
              className={`${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <FiHeart size={18} />
            </button>

            <button className="text-gray-400 hover:text-primary">
              <FiList size={18} />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-primary"
              >
                {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>

            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-primary ml-2"
            >
              <FiMinimize size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
