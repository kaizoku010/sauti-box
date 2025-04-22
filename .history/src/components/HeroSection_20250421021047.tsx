"use client";

import React, { useState, useEffect } from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import Kenzo from "../images/1.jpg"
import Wn from "../images/wn.jpg"
import Sheebah from "../images/sheb.jpg"

interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  releaseDate: string;
  description: string;
  stats: {
    purchases: number;
    streams: number;
  };
}

const featuredAlbums: Album[] = [
  {
    id: '1',
    title: 'ROOTS',
    artist: 'Eddy Kenzo',
    coverImage: Kenzo.src,
    releaseDate: '2020',
    description: 'The groundbreaking album that put Ugandan music on the global map with its infectious rhythms and dance moves.',
    stats: {
      purchases: 50000,
      streams: 1000000
    }
  },
  {
    id: '2',
    title: 'Queen Karma',
    artist: 'Sheebah Karungi',
    coverImage: Sheebah.src,
    releaseDate: '2023',
    description: 'A powerful collection showcasing Sheebah\'s evolution as an artist with bold beats and empowering lyrics.',
    stats: {
      purchases: 75000,
      streams: 2000000
    }
  },
  {
    id: '3',
    title: 'Fire Dancer',
    artist: 'Winnie Nwagi',
    coverImage: Wn.src,
    releaseDate: '2022',
    description: 'An explosive mix of afrobeats and dancehall that celebrates freedom and self-expression.',
    stats: {
      purchases: 60000,
      streams: 1500000
    }
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

  return (
    <section id='hero' className="relative h-screen overflow-hidden w-full max-w-full">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 transition-transform duration-[8s]"
        style={{
          backgroundImage: `url(${currentAlbum.coverImage})`,
          filter: 'blur(4px)',
          transform: isTransitioning ? 'scale(110%)' : 'scale(105%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />

      {/* Animated Particles removed to fix hydration issues */}

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Album Info */}
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}>
            <div className="text-sm font-weight-800 font-heavy text-primary mb-2">Featured Album</div>
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
              <img
                src={currentAlbum.coverImage}
                alt={currentAlbum.title}
                id='hero-album-art'
                className="relative z-10 w-full h-auto rounded-lg shadow-2xl transition-transform duration-500 object-cover"
                style={{ objectFit: 'cover' }}
              />

              {/* Album Stats Floating Cards */}
              <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg z-20 space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Release Date</p>
                  <p className="text-white font-bold">{currentAlbum.releaseDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Purchases</p>
                  <p className="text-white font-bold">{currentAlbum.stats.purchases.toLocaleString()}</p>
                </div>
                <div>
                  <p  className="text-xs text-gray-400">Streams</p>
                  <p className="text-white font-bold">{currentAlbum.stats.streams.toLocaleString()}</p>
                </div>
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


