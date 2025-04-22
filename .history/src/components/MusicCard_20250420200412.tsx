"use client";

import React, { useState } from 'react';
import { FiPlay, FiHeart, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import PaymentModal from './PaymentModal';

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  coverImage: string;
  type?: 'song' | 'album' | 'playlist';
  price?: number;
}

const MusicCard: React.FC<MusicCardProps> = ({
  id,
  title,
  artist,
  artistId = '1', // Default to first artist if not provided
  coverImage,
  type = 'song',
  price = 5000 // Default price in UGX if not provided
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    // Here you would update the user's library
    console.log(`Song ${id} purchased successfully`);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="card group relative">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={coverImage}
            alt={`${title} by ${artist}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary/10">
              <FiPlay size={24} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-white truncate">{title}</h3>
          <Link href={`/artists/${artistId}`} className="block">
            <p className="text-sm text-gray-400 truncate hover:text-primary">{artist}</p>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="text-xs text-gray-500 capitalize mr-2">{type}</span>
              {price > 0 && (
                <span className="text-xs font-medium text-primary">UGX {price.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLike}
                className={`${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
              >
                <FiHeart size={16} />
              </button>
              {type === 'song' && price > 0 && (
                <button
                  onClick={handleBuyClick}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Buy song"
                >
                  <FiShoppingCart size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          songId={id}
          artistId={artistId}
          songTitle={title}
          artistName={artist}
          price={price}
          coverImage={coverImage}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
};

export default MusicCard;
