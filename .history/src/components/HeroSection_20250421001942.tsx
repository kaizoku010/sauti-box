"use client";

import React, { useState, useEffect } from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import Kenzo from "../images/1.jpg";
import Wn from "../images/wn.jpg";
import Sheebah from "../images/sheb.jpg";
import TestVideo from "../images/test.mp4";

interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt: {
    type: 'image' | 'video';
    src: string;
  };
  releaseDate: string;
  description: string;
}

const featuredAlbums: Album[] = [
  {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    coverArt: {
      type: 'image',
      src: Kenzo.src
    },
    releaseDate: '2020',
    description: 'The groundbreaking album that put Ugandan music on the global map with its infectious rhythms and dance moves.'
  },
  {
    id: '2',
    title: 'Queen Karma',
    artist: 'Sheebah Karungi',
    coverArt: {
      type: 'video',
      src: TestVideo.src
    },
    releaseDate: '2023',
    description: 'A powerful collection showcasing Sheebah\'s evolution as an artist with bold beats and empowering lyrics.'
  },
  {
    id: '3',
    title: 'Fire Dancer',
    artist: 'Winnie Nwagi',
    coverArt: {
      type: 'image',
      src: Wn.src
    },
    releaseDate: '2022',
    description: 'An explosive mix of afrobeats and dancehall that celebrates freedom and self-expression.'
  }
];

const HeroSection: React.FC = () => {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { togglePlay } = useMusicPlayer();

  const currentAlbum = featuredAlbums[currentAlbumIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentAlbumIndex((prev) => (prev + 1) % featuredAlbums.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const renderCoverArt = (album: Album) => {
    if (album.coverArt.type === 'video') {
      return (
        <video
          src={album.coverArt.src}
          autoPlay
          muted
          loop
          playsInline
          className="relative z-10 w-full h-auto rounded-lg shadow-2xl transition-transform duration-500 object-cover"
        />
      );
    }

    return (
      <img
        src={album.coverArt.src}
        alt={album.title}
        id='hero-album-art'
        className="relative z-10 w-full h-auto rounded-lg shadow-2xl transition-transform duration-500 object-cover"
        style={{ objectFit: 'cover' }}
      />
    );
  };

  return (
    <section className="relative h-[70vh] mb-16 overflow-hidden w-full max-w-full">
      {/* Background Image/Video with Parallax Effect */}
      <div
        className="absolute inset-0 transition-transform duration-[8s]"
      >
        {currentAlbum.coverArt.type === 'video' ? (
          <video
            src={currentAlbum.coverArt.src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'blur(4px)',
              transform: isTransitioning ? 'scale(110%)' : 'scale(105%)',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${currentAlbum.coverArt.src})`,
              filter: 'blur(4px)',
              transform: isTransitioning ? 'scale(110%)' : 'scale(105%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Animated Particles removed to fix hydration issues */}

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Album Info */}
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}>
            <div className="text-sm font-medium text-primary mb-2">Featured Album</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{currentAlbum.title}</h1>
            <p className="text-xl text-gray-300 mb-2">{currentAlbum.artist}</p>
            <p id='desc' className="text-gray-400 mb-8 max-w-md">{currentAlbum.description}</p>

            <div className="flex space-x-4">
              <button
                onClick={togglePlay}
                className="px-6 py-3 bg-primary/10 border border-primary text-primary rounded-full flex items-center hover:bg-primary/20 transition-colors"
              >
                <FiPlay className="mr-2" />
                Play Now
              </button>

              <button className="px-6 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-full flex items-center hover:bg-gray-700/50 transition-colors">
                <FiInfo className="mr-2" />
                More Info
              </button>
            </div>
          </div>

          {/* Album Cover */}
          <div className="hidden md:block">
            <div
              className={`relative transition-all duration-500 ${
                isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
              }`}
            >
              {renderCoverArt(currentAlbum)}

              {/* Album Details Floating */}
              <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg z-20 transition-transform duration-500">
                <p className="text-xs text-gray-400">Release Date</p>
                <p className="text-white font-bold">{currentAlbum.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>

              {/* Album Navigation Dots */}

      <div className="absolute px-6 bottom-8 left-0 right-0 flex justify-left space-x-2">
        {featuredAlbums.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentAlbumIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentAlbumIndex === index
                ? 'bg-primary w-8'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`View album ${index + 1}`}
          />
        ))}
      </div>
      </div>


    </section>
  );
};

export default HeroSection;

