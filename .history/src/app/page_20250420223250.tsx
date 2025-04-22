"use client";

import MainLayout from '../components/MainLayout';
import SectionHeader from '../components/SectionHeader';
import MusicCard from '../components/MusicCard';
import EventCard from '../components/EventCard';
import ArtistCard from '../components/ArtistCard';
import AlbumRow from '../components/AlbumRow';

import HeroSection from '../components/HeroSection';
import { topCharts, upcomingEvents, newReleases, featuredArtists, topAlbums, bestPlaylists, liveRadioStations } from '../data/mockData';
import { artistPlaceholders } from './api/placeholders';

// Mock data for carousels
const mostStreamedMusic = [
  {
    id: 'ms1',
    title: 'Stamina',
    artist: 'Eddy Kenzo',
    coverImage: '/images/5.jpg',
    streams: 1250000,
    type: 'song' as const
  },
  {
    id: 'ms2',
    title: 'Love Yo',
    artist: 'Sheebah Karungi',
    coverImage: '/images/3.jpg',
    streams: 980000,
    type: 'song' as const
  },
  {
    id: 'ms3',
    title: 'Amasso',
    artist: 'Winnie Nwagi',
    coverImage: '/images/7.jpg',
    streams: 870000,
    type: 'song' as const
  },
  {
    id: 'ms4',
    title: 'Nkwatako',
    artist: 'Sheebah Karungi',
    coverImage: '/images/4.jpg',
    streams: 750000,
    type: 'song' as const
  },
  {
    id: 'ms5',
    title: 'Kyoyooyo',
    artist: 'Eddy Kenzo',
    coverImage: '/images/2.jpg',
    streams: 720000,
    type: 'song' as const
  },
  {
    id: 'ms6',
    title: 'Jangu',
    artist: 'Winnie Nwagi',
    coverImage: '/images/6.jpg',
    streams: 680000,
    type: 'song' as const
  },
  {
    id: 'ms7',
    title: 'Mujje',
    artist: 'Spice Diana',
    coverImage: '/images/8.jpg',
    streams: 650000,
    type: 'song' as const
  }
];

const mostPurchasedMusic = [
  {
    id: 'mp1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    coverImage: '/images/1.jpg',
    sales: 15000,
    type: 'song' as const
  },
  {
    id: 'mp2',
    title: 'Bango',
    artist: 'Spice Diana',
    coverImage: '/images/9.jpg',
    sales: 12000,
    type: 'song' as const
  },
  {
    id: 'mp3',
    title: 'Kachumbali',
    artist: 'Winnie Nwagi',
    coverImage: '/images/10.jpg',
    sales: 10000,
    type: 'song' as const
  },
  {
    id: 'mp4',
    title: 'Amasso',
    artist: 'Winnie Nwagi',
    coverImage: '/images/7.jpg',
    sales: 9500,
    type: 'song' as const
  },
  {
    id: 'mp5',
    title: 'Stamina',
    artist: 'Eddy Kenzo',
    coverImage: '/images/5.jpg',
    sales: 9000,
    type: 'song' as const
  },
  {
    id: 'mp6',
    title: 'Love Yo',
    artist: 'Sheebah Karungi',
    coverImage: '/images/3.jpg',
    sales: 8500,
    type: 'song' as const
  },
  {
    id: 'mp7',
    title: 'Nkwatako',
    artist: 'Sheebah Karungi',
    coverImage: '/images/4.jpg',
    sales: 8000,
    type: 'song' as const
  }
];

const newArtists = [
  {
    id: 'na1',
    name: 'Azawi',
    image: artistPlaceholders.azawi,
    followers: 25000
  },
  {
    id: 'na2',
    name: 'Vinka',
    image: artistPlaceholders.vinka,
    followers: 22000
  },
  {
    id: 'na3',
    name: 'Fik Fameica',
    image: artistPlaceholders.fik,
    followers: 20000
  },
  {
    id: 'na4',
    name: 'Lydia Jazmine',
    image: artistPlaceholders.lydia,
    followers: 18000
  },
  {
    id: 'na5',
    name: 'John Blaq',
    image: artistPlaceholders.john,
    followers: 15000
  },
  {
    id: 'na6',
    name: 'Karole Kasita',
    image: artistPlaceholders.karole,
    followers: 12000
  }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      {/* Most Streamed Music - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Most Streamed Music" viewAllLink="/charts" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full">
          {mostStreamedMusic.slice(0, 10).map((item) => (
            <div key={item.id}>
              <MusicCard
                id={item.id}
                title={item.title}
                artist={item.artist}
                coverImage={item.coverImage}
                type={item.type}
              />
              <div className="mt-2 text-sm text-gray-400">
                <span className="text-primary font-medium">{(item.streams / 1000000).toFixed(1)}M</span> streams
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Most Purchased Music - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Most Purchased Music" viewAllLink="/charts" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full">
          {mostPurchasedMusic.slice(0, 10).map((item) => (
            <div key={item.id}>
              <MusicCard
                id={item.id}
                title={item.title}
                artist={item.artist}
                coverImage={item.coverImage}
                type={item.type}
              />
              <div className="mt-2 text-sm text-gray-400">
                <span className="text-primary font-medium">{(item.sales / 1000).toFixed(1)}K</span> sales
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Artists - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="New Artists" viewAllLink="/artists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 w-full">
          {newArtists.slice(0, 12).map((artist) => (
            <div key={artist.id}>
              <ArtistCard
                id={artist.id}
                name={artist.name}
                image={artist.image}
                followers={artist.followers}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Top Charts Section - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Top Charts" viewAllLink="/charts" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full">
          {topCharts.slice(0, 10).map((item) => (
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              coverImage={item.coverImage}
              type={'song' as const}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Upcoming Events" viewAllLink="/events" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full">
          {upcomingEvents.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              price={event.price}
            />
          ))}
        </div>
      </section>

      {/* New Releases Section - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="New Releases" viewAllLink="/releases" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full">
          {newReleases.slice(0, 10).map((item) => (
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              coverImage={item.coverImage}
              type={'song' as const}
            />
          ))}
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="mb-10">
        <SectionHeader title="Featured Artists" viewAllLink="/artists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
          {featuredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              image={artist.image}
              followers={artist.followers}
            />
          ))}
        </div>
      </section>

      {/* Top Albums Section */}
      <section className="mb-10">
        <SectionHeader title="Top Albums" viewAllLink="/albums" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {topAlbums.map((album) => (
            <AlbumRow
              key={album.id}
              position={album.position}
              id={album.id}
              title={album.title}
              artist={album.artist}
              coverImage={album.coverImage}
              releaseDate={album.releaseDate}
              isLiked={album.isLiked}
            />
          ))}
        </div>
      </section>

      {/* Best Playlist Section - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Best Playlist" viewAllLink="/playlists" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 w-full">
          {bestPlaylists.slice(0, 4).map((playlist) => (
            <div key={playlist.id} className="card group relative">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{playlist.title}</h3>
                    <p className="text-sm text-gray-200">{playlist.songCount} songs</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Radio Section - Grid Layout */}
      <section className="mb-10">
        <SectionHeader title="Live Radio" viewAllLink="/radio" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full">
          {liveRadioStations.slice(0, 10).map((station) => (
            <div key={station.id} className="card group relative">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={typeof station.coverImage === 'string' ? station.coverImage : '/images/placeholder.jpg'}
                  alt={station.title || station.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{station.title || station.name}</h3>
                    <p className="text-sm text-gray-200">{station.frequency}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 mt-10">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">MusicHub Uganda</h3>
          <p className="text-gray-400">Your Music, Your Rights, Your Revenue</p>
        </div>
        <div className="mb-4">
          <a href="mailto:info@listenapp.com" className="text-primary hover:underline">info@listenapp.com</a>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Google Play</button>
          <button className="btn-primary">App Store</button>
        </div>
      </footer>
    </MainLayout>
  );
}
