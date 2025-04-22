"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import "../player.css"
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
import Vinka from "../images/vn.jpg"

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, isMinimized, setIsPlaying, toggleMinimize, togglePlay: contextTogglePlay } = useMusicPlayer();
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
    id='player'
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isMinimized
          ? 'bottom-6 right-6 w-72 h-16 rounded-full scale-100 translate-y-0'
          : 'bottom-8 mx-auto h-24 rounded-[30px] left-1/2 transform -translate-x-1/2 max-w-[100%] scale-100 translate-y-0'}
        glass-effect shadow-lg overflow-hidden will-change-transform`}
      style={{
        transformOrigin: isMinimized ? 'bottom right' : 'bottom center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 87, 34, 0.15)'
      }}
    >
      {isMinimized ? (
        // Mini Player
        <div className="flex items-center h-full px-3 transition-all duration-300 ease-out opacity-100 transform translate-y-0">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 shadow-md album-art-animation">
            <img
              src={ Vinka.src}
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
              className="w-9 h-9 rounded-full border-2 border-primary-89 flex items-center justify-center text-primary-89 hover:bg-primary/10 shadow-[0_0_12px_rgba(255,87,34,0.27)]"
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </button>

            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-primary p-2 rounded-full hover:bg-gray-800/40 text-xl"
            >
              <FiMaximize size={20} />
            </button>
          </div>
        </div>
      ) : (
        // Full Player
        <div id='sleek' className="flex items-center justify-between h-full px-6 transition-all duration-300 ease-out opacity-100 transform translate-y-0">
          <div className="flex items-center w-1/4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mr-4 flex-shrink-0 shadow-md album-art-animation">
              <img
                src={ Vinka.src}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div  className="min-w-0 mr-4">
              <p className="text-white font-medium truncate">{currentSong.title}</p>
              <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <button className="text-gray-400 hover:text-primary hidden md:block">
                <FiShuffle size={16} />
              </button>

              <button className="text-gray-400 hover:text-primary">
                <FiSkipBack size={20} />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full border-2 border-primary-89 flex items-center justify-center text-primary-89 hover:bg-primary/10 shadow-[0_0_15px_rgba(255,87,34,0.27)]"
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>

              <button className="text-gray-400 hover:text-primary">
                <FiSkipForward size={20} />
              </button>

              <button className="text-gray-400 hover:text-primary hidden md:block">
                <FiRepeat size={16} />
              </button>
            </div>

            <div id='hide_me' className="flex items-center">
              <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>

              <div
                ref={progressBarRef}
                className="flex-1 h-2 bg-gray-700/50 rounded-full mx-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                
                  className="h-full bg-primary-89 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                ></div>
              </div>

              <span className="text-xs text-gray-400 w-10">{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          <div id='hide_me' className="flex items-center space-x-3 w-1/4 justify-end">
            <button
              onClick={toggleLike}
              className={`${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} hidden md:block`}
            >
              <FiHeart size={18} />
            </button>

            <button className="text-gray-400 hover:text-primary hidden md:block">
              <FiList size={18} />
            </button>

            <div className="flex items-center space-x-2 hidden md:flex">
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
                className="w-20 h-2 bg-gray-700/50 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-89"
              />
            </div>

            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-primary ml-2 p-2 rounded-full hover:bg-gray-800/40 text-xl"
            >
              <FiMinimize size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
