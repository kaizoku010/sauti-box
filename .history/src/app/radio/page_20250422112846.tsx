"use client";

import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiRadio, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import '../../player.css';
import Capital from "../../images/cap.jpg"
import RadioCity from "../../images/rad.jpg"
import Sanyu from "../../images/san.jpg"
import Gal from "../../images/gal.jpg"
import Xfm from "../../images/x.jpg"
// Mock radio stations data
const radioStations = [
  {
    id: '1',
    name: 'Capital FM',
    frequency: '91.3 FM',
    logo: Capital.src,
    description: 'Uganda\'s leading radio station for the latest hits and entertainment.',
    streamUrl: 'https://example.com/stream/capital'
  },
  {
    id: '2',
    name: 'Radio One',
    frequency: '90.0 FM',
    logo: RadioCity.src,
    description: 'The voice of Uganda with news, talk shows, and music.',
    streamUrl: 'https://example.com/stream/radio-one'
  },
  {
    id: '3',
    name: 'Sanyu FM',
    frequency: '88.2 FM',
    logo: Sa,
    description: 'Uganda\'s first private radio station playing the best music.',
    streamUrl: 'https://example.com/stream/sanyu'
  },
  {
    id: '4',
    name: 'Radio City',
    frequency: '97.3 FM',
    logo: '/images/radio/radio-city.jpg',
    description: 'Your city, your voice, your radio.',
    streamUrl: 'https://example.com/stream/radio-city'
  },
  {
    id: '5',
    name: 'XFM',
    frequency: '94.8 FM',
    logo: '/images/radio/xfm.jpg',
    description: 'Alternative rock and indie music for Uganda.',
    streamUrl: 'https://example.com/stream/xfm'
  },
  {
    id: '6',
    name: 'Galaxy FM',
    frequency: '100.2 FM',
    logo: '/images/radio/galaxy.jpg',
    description: 'Uganda\'s urban contemporary hit radio.',
    streamUrl: 'https://example.com/stream/galaxy'
  }
];

const RadioPage = () => {
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  const handlePlayStation = (stationId: string) => {
    if (currentStation === stationId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentStation(stationId);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getPlayingStation = () => {
    return radioStations.find(station => station.id === currentStation);
  };

  return (
    <MainLayout>
      <div id='page-content' className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FiRadio className="mr-3 text-primary" />
              Radio Stations
            </h1>
            <p className="text-gray-400">Listen to Uganda's top radio stations live</p>
          </div>
        </div>

        {/* Radio Player */}
        {currentStation && (
          <div className="card p-4 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 mr-6">
                <img
                  src={getPlayingStation()?.logo || '/images/radio/default.jpg'}
                  alt={getPlayingStation()?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <h2 className="text-xl font-bold">{getPlayingStation()?.name}</h2>
                <p className="text-sm text-gray-400">{getPlayingStation()?.frequency}</p>

                <div className="flex items-center mt-4">
                  <button
                    className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary mr-4 hover:bg-primary/10"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                  </button>

                  <button
                    className="text-gray-400 hover:text-white mr-4"
                    onClick={toggleMute}
                  >
                    {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                  </button>

                  <div className="flex-1 max-w-md">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Radio Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {radioStations.map((station) => (
            <div
              key={station.id}
              className={`card group cursor-pointer ${currentStation === station.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handlePlayStation(station.id)}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={station.logo || '/images/radio/default.jpg'}
                  alt={station.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10">
                    {currentStation === station.id && isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{station.name}</h3>
                  <span className="text-sm text-primary font-medium">{station.frequency}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{station.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Radio Schedule - Could be added in a future update */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-6">Popular Radio Shows</h2>

          <div className="card p-6">
            <p className="text-center text-gray-400">
              Radio show schedules will be available soon. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RadioPage;
