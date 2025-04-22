"use client";

import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiBarChart2, FiPlay, FiHeart, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import EddyKenzo from "../../images/1.jpg";
import Sheb from "../../images/sheb.jpg"
// Mock chart data
const chartCategories = [
  { id: 'top100', name: 'Top 100' },
  { id: 'trending', name: 'Trending Now' },
  { id: 'new', name: 'New Releases' },
  { id: 'afrobeat', name: 'Afrobeat' },
  { id: 'dancehall', name: 'Dancehall' },
  { id: 'gospel', name: 'Gospel' }
];

const chartSongs = [
  {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    artistId: '1',
    coverImage: EddyKenzo.src,
    streams: 1250000,
    lastWeekPosition: 2,
    weeksOnChart: 12,
    price: 5000
  },
  {
    id: '2',
    title: 'Stamina',
    artist: 'Eddy Kenzo',
    artistId: '1',
    coverImage: EddyKenzo.src,
    streams: 980000,
    lastWeekPosition: 1,
    weeksOnChart: 15,
    price: 5000
  },
  {
    id: '3',
    title: 'Love Yo',
    artist: Sheb.src,
    artistId: '2',
    coverImage: '/images/3.jpg',
    streams: 870000,
    lastWeekPosition: 3,
    weeksOnChart: 10,
    price: 5000
  },
  {
    id: '4',
    title: 'Amasso',
    artist: 'Winnie Nwagi',
    artistId: '3',
    coverImage: '/images/7.jpg',
    streams: 750000,
    lastWeekPosition: 5,
    weeksOnChart: 8,
    price: 5000
  },
  {
    id: '5',
    title: 'ixon',
    artist: 'I ',
    artistId: '2',
    coverImage: '/images/4.jpg',
    streams: 720000,
    lastWeekPosition: 4,
    weeksOnChart: 14,
    price: 5000
  },

];

const ChartsPage = () => {
  const [activeCategory, setActiveCategory] = useState('top100');

  const getPositionChange = (current: number, last: number) => {
    if (current < last) return { type: 'up', value: last - current };
    if (current > last) return { type: 'down', value: current - last };
    return { type: 'same', value: 0 };
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <MainLayout>
      <div id='page-content' className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FiBarChart2 className="mr-3 text-primary" />
              Music Charts
            </h1>
            <p className="text-gray-400">Discover the most popular songs in Uganda</p>
          </div>
        </div>

        {/* Chart Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {chartCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? 'border border-primary text-primary'
                    : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Artist</th>
                  <th className="py-3 px-4 text-left">Streams</th>
                  <th className="py-3 px-4 text-left">Weeks on Chart</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {chartSongs.map((song, index) => {
                  const position = index + 1;
                  const change = getPositionChange(position, song.lastWeekPosition);

                  return (
                    <tr key={song.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{position}</span>
                          {change.type === 'up' && (
                            <span className="text-green-500 text-xs">▲ {change.value}</span>
                          )}
                          {change.type === 'down' && (
                            <span className="text-red-500 text-xs">▼ {change.value}</span>
                          )}
                          {change.type === 'same' && (
                            <span className="text-gray-500 text-xs">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{song.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/artists/${song.artistId}`} className="hover:text-primary">
                          {song.artist}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{formatNumber(song.streams)}</td>
                      <td className="py-3 px-4">{song.weeksOnChart}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-primary">
                            <FiPlay size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary">
                            <FiHeart size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary">
                            <FiShoppingCart size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Insights */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-6">Chart Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="font-bold mb-4">Top Artists This Week</h3>
              <ol className="space-y-4">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mr-3">1</span>
                  <span>Eddy Kenzo</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white mr-3">2</span>
                  <span>Sheebah Karungi</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white mr-3">3</span>
                  <span>Winnie Nwagi</span>
                </li>
              </ol>
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-4">Biggest Movers</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">▲ 3</span>
                    <span className="font-medium">Amasso</span>
                  </div>
                  <p className="text-sm text-gray-400">Winnie Nwagi</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">▼ 2</span>
                    <span className="font-medium">Stamina</span>
                  </div>
                  <p className="text-sm text-gray-400">Eddy Kenzo</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-4">New Entries</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">NEW</span>
                    <span className="font-medium">Kachumbali</span>
                  </div>
                  <p className="text-sm text-gray-400">Winnie Nwagi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChartsPage;
