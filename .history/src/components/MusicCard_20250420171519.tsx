import React from 'react';
import { FiPlay, FiHeart } from 'react-icons/fi';
import KKD from ""

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  type?: 'song' | 'album' | 'playlist';
}

const MusicCard: React.FC<MusicCardProps> = ({ id, title, artist, coverImage, type = 'song' }) => {
  return (
    <div className="card group relative">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={coverImage}
          alt={`${title} by ${artist}`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
            <FiPlay size={24} />
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400 truncate">{artist}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 capitalize">{type}</span>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <FiHeart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
