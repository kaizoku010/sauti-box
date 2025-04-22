"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import MusicCard from '../../../components/MusicCard';
import { FiMusic, FiUsers, FiCalendar, FiShare2, FiExternalLink } from 'react-icons/fi';
import { featuredArtists, topCharts, newReleases } from '../../../data/mockData';

interface ArtistPageProps {
  params: {
    id: string;
  };
}

const ArtistPage = ({ params }: ArtistPageProps) => {
  const [artist, setArtist] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [artistSongs, setArtistSongs] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the artist data from an API
    // For now, we'll use the mock data
    const foundArtist = featuredArtists.find(a => a.id === params.id);

    if (foundArtist) {
      setArtist(foundArtist);

      // Get songs by this artist
      const songs = [...topCharts, ...newReleases].filter(
        song => song.artist.toLowerCase() === foundArtist.name.toLowerCase()
      );

      setArtistSongs(songs);
    }
  }, [params.id]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, you would make an API call to follow/unfollow the artist
  };

  if (!artist) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Artist not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Artist Header */}
        <div className="relative mb-8">
          <div className="h-64 rounded-lg overflow-hidden">
            {artist.coverImage ? (
              <img
                src={artist.coverImage}
                alt={`${artist.name} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full bg-gradient-to-r from-gray-900 to-primary/30"></div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 transform translate-y-1/2 px-8 flex items-end">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-900">
              <img
                src={artist.profileImage || artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-6 pb-6">
              <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
              <div className="flex items-center text-gray-400 mt-1">
                <FiUsers className="mr-1" />
                <span>{artist.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 transform translate-y-1/2 px-8 flex items-center space-x-3">
            <button
              className={`px-6 py-2 rounded-full font-medium ${
                isFollowing
                  ? 'bg-gray-700 text-white'
                  : 'bg-primary text-white hover:bg-blue-600'
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>

            <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white">
              <FiShare2 size={20} />
            </button>
          </div>
        </div>

        {/* Artist Content */}
        <div className="mt-24">
          {/* Artist Bio */}
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">About {artist.name}</h2>
            <p className="text-gray-400">
              {artist.bio || `${artist.name} is a Ugandan artist known for their unique sound and captivating performances. With a growing fanbase across East Africa, ${artist.name} continues to push the boundaries of music.`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h3 className="font-medium text-gray-300 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Afrobeat</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Dancehall</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-300 mb-2">Social Media</h3>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-primary">
                    <FiExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-300 mb-2">Latest Release</h3>
                <p className="text-gray-400">
                  {artistSongs.length > 0 ? artistSongs[0].title : 'No releases yet'}
                </p>
              </div>
            </div>
          </div>

          {/* Artist Songs */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6">Songs by {artist.name}</h2>

            {artistSongs.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {artistSongs.map((song) => (
                  <MusicCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={artist.name}
                    artistId={artist.id}
                    coverImage={song.coverImage}
                    type="song"
                    price={5000} // Example price
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No songs available</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>

            <div className="card p-6">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <FiCalendar size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Kampala Music Festival</h3>
                  <p className="text-gray-400">August 15, 2025 • Lugogo Cricket Oval</p>
                  <div className="mt-2">
                    <a href="#" className="text-primary hover:underline">Get Tickets</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistPage;
