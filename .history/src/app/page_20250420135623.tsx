import MainLayout from '../components/MainLayout';
import SectionHeader from '../components/SectionHeader';
import MusicCard from '../components/MusicCard';
import EventCard from '../components/EventCard';
import ArtistCard from '../components/ArtistCard';
import AlbumRow from '../components/AlbumRow';
import { topCharts, upcomingEvents, newReleases, featuredArtists, topAlbums, bestPlaylists, liveRadioStations } from '../data/mockData';

export default function Home() {
  return (
    <MainLayout>
      {/* Top Charts Section */}
      <section className="mb-10">
        <SectionHeader title="Top Charts" viewAllLink="/charts" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topCharts.map((item) => (
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              coverImage={item.coverImage}
              type={item.type}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-10">
        <SectionHeader title="Upcoming Events" viewAllLink="/events" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
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

      {/* New Releases Section */}
      <section className="mb-10">
        <SectionHeader title="New Releases" viewAllLink="/releases" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {newReleases.map((item) => (
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              coverImage={item.coverImage}
              type={item.type}
            />
          ))}
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="mb-10">
        <SectionHeader title="Featured Artists" viewAllLink="/artists" />
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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

      {/* Best Playlist Section */}
      <section className="mb-10">
        <SectionHeader title="Best Playlist" viewAllLink="/playlists" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestPlaylists.map((playlist) => (
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

      {/* Live Radio Section */}
      <section className="mb-10">
        <SectionHeader title="Live Radio" viewAllLink="/radio" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {liveRadioStations.map((station) => (
            <div key={station.id} className="card group relative">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={station.image}
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
