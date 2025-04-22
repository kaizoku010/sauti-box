"use client";

import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiHeart, FiShoppingCart, FiTrash2, FiPlay } from 'react-icons/fi';
import Link from 'next/link';
import MusicCard from '../../components/MusicCard';
import Eddy from "../../images/1.jpg";
import Sheebah from "../../"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    artistId: '1',
    coverImage: Eddy.src,
    price: 5000
  },
  {
    id: '3',
    title: 'Love Yo',
    artist: 'Sheebah Karungi',
    artistId: '2',
    coverImage: '/images/3.jpg',
    price: 5000
  },
  {
    id: '5',
    title: 'Stamina',
    artist: 'Eddy Kenzo',
    artistId: '1',
    coverImage: '/images/5.jpg',
    price: 5000
  },
  {
    id: '7',
    title: 'Amasso',
    artist: 'Winnie Nwagi',
    artistId: '3',
    coverImage: '/images/7.jpg',
    price: 5000
  }
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FiHeart className="mr-3 text-primary" />
              My Wishlist
            </h1>
            <p className="text-gray-400">Songs you've saved for later</p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'grid' ? 'border border-primary text-primary' : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'list' ? 'border border-primary text-primary' : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <FiHeart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save songs to your wishlist to find them here later.</p>
            <Link href="/" className="btn-primary">
              Browse Music
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {wishlistItems.map((item) => (
              <MusicCard
                key={item.id}
                id={item.id}
                title={item.title}
                artist={item.artist}
                artistId={item.artistId}
                coverImage={item.coverImage}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Artist</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/artists/${item.artistId}`} className="hover:text-primary">
                          {item.artist}
                        </Link>
                      </td>
                      <td className="py-3 px-4">UGX {item.price.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-primary">
                            <FiPlay size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary">
                            <FiShoppingCart size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-500"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WishlistPage;
