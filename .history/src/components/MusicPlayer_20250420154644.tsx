"use client";

import React, { useState } from 'react';

import { FiSkipBack, FiSkipForward, FiPause, FiPlay, FiVolume2, FiHeart, FiRepeat, FiShuffle } from 'react-icons/fi';

interface MusicPlayerProps {
  currentSong?: {
    id: string;
    title: string;
    artist: string;
    coverImage: string;
    duration: number;
  };
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);

  if (!currentSong) return null;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setIsLiked(!isLiked);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex items-center">
        {/* Song Info */}
        <div className="flex items-center w-1/4">
          <div className="relative w-12 h-12 mr-3">
            <img
              src={currentSong.coverImage}
              alt={`${currentSong.title} by ${currentSong.artist}`}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-white truncate">{currentSong.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            className={`ml-4 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            onClick={toggleLike}
          >
            <FiHeart size={16} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <FiShuffle size={16} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <FiSkipBack size={20} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-200"
              onClick={togglePlay}
            >
              {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <FiSkipForward size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <FiRepeat size={16} />
            </button>
          </div>

          <div className="w-full flex items-center mt-2">
            <span className="text-xs text-gray-500 w-10 text-right">{formatTime(progress)}</span>
            <div className="flex-1 mx-3 h-1 bg-gray-700 rounded-full">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(progress / currentSong.duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 w-10">{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="w-1/4 flex items-center justify-end">
          <FiVolume2 size={18} className="text-gray-400 mr-2" />
          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gray-400 rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
