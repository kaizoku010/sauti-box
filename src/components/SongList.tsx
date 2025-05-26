"use client";

import React from 'react';
import { FiMusic, FiPlay } from 'react-icons/fi';
import { useMusicPlayer } from '@/context/MusicPlayerContext';

interface SongListProps {
  songs: any[];
  artistName?: string;
}

const SongList: React.FC<SongListProps> = ({ songs, artistName }) => {
  const { playSong } = useMusicPlayer();
  
  return (
    <div className="space-y-4">
      {songs.map((song, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors"
          onClick={() => {
            // Play the song when clicked
            playSong({
              _id: song._id,
              title: song.title,
              artist: song.artist || artistName || 'Unknown Artist',
              artistId: song.artistId,
              coverImageUrl: song.coverImageUrl,
              cloudinaryUrl: song.cloudinaryUrl,
              duration: song.duration,
              genre: song.genre,
              price: song.price
            });
          }}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center mr-3 relative group">
              {song.coverImageUrl ? (
                <img 
                  src={song.coverImageUrl} 
                  alt={song.title} 
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <FiMusic className="text-primary" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <FiPlay className="text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">{song.title}</h4>
              <p className="text-sm text-gray-400">{song.genre} • {song.duration ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}` : 'Unknown duration'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">UGX {song.price?.toLocaleString() || '5,000'}</p>
            <div className="flex text-xs text-gray-400 mt-1">
              <span className="mr-3">{song.purchases || 0} sales</span>
              <span>{song.streams || 0} streams</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
