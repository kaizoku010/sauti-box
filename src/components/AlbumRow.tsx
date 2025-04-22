import React from 'react';
import { FiPlay, FiHeart, FiMoreHorizontal } from 'react-icons/fi';

interface AlbumRowProps {
  position: number;
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  releaseDate: string;
  isLiked?: boolean;
}

const AlbumRow: React.FC<AlbumRowProps> = ({
  position,
  id,
  title,
  artist,
  coverImage,
  releaseDate,
  isLiked = false
}) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-700 rounded-md group">
      <div className="w-6 text-center text-gray-400 mr-4">{position}</div>
      <div className="relative w-12 h-12 mr-4">
        <img
          src={coverImage}
          alt={`${title} by ${artist}`}
          className="object-cover rounded-md w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity">
          <FiPlay className="text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate">{title}</h4>
        <p className="text-sm text-gray-400 truncate">{artist}</p>
      </div>
      <div className="text-sm text-gray-500 mx-4 hidden md:block">{releaseDate}</div>
      <div className="flex items-center space-x-3">
        <button className={`${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}>
          <FiHeart size={16} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <FiMoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default AlbumRow;
