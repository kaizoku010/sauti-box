"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '../../../../components/MainLayout';
import { FiMusic, FiPlay, FiPlus, FiTrash2, FiEdit2, FiX, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

interface Song {
  _id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: number;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

interface PlaylistPageProps {
  params: {
    id: string;
  };
}

const PlaylistPage = ({ params }: PlaylistPageProps) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [availableSongs, setAvailableSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchPlaylist();
  }, [params.id]);

  const fetchPlaylist = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to view this playlist');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/user/playlists/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch playlist');
      }

      setPlaylist(data.playlist);
      setEditedName(data.playlist.name);

      // Fetch available songs (songs in library but not in playlist)
      const libraryResponse = await fetch('/api/user/library', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const libraryData = await libraryResponse.json();

      if (!libraryResponse.ok) {
        throw new Error(libraryData.error || 'Failed to fetch library');
      }

      // Filter out songs that are already in the playlist
      const playlistSongIds = data.playlist.songs.map((song: Song) => song._id);
      const availableSongs = libraryData.library.songs.filter(
        (song: Song) => !playlistSongIds.includes(song._id)
      );

      setAvailableSongs(availableSongs);
    } catch (err: any) {
      setError(err.message || 'Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlaylistName = async () => {
    if (!editedName.trim() || editedName === playlist?.name) {
      setIsEditing(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to update this playlist');
        return;
      }

      const response = await fetch(`/api/user/playlists/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editedName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update playlist');
      }

      setPlaylist({ ...playlist!, name: editedName });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update playlist');
    }
  };

  const addSongToPlaylist = async (songId: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to update this playlist');
        return;
      }

      const response = await fetch(`/api/user/playlists/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'add', songId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add song to playlist');
      }

      // Refresh playlist
      fetchPlaylist();
      setIsAddSongModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to add song to playlist');
    }
  };

  const removeSongFromPlaylist = async (songId: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to update this playlist');
        return;
      }

      const response = await fetch(`/api/user/playlists/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'remove', songId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove song from playlist');
      }

      // Update local state
      setPlaylist({
        ...playlist!,
        songs: playlist!.songs.filter(song => song._id !== songId)
      });
    } catch (err: any) {
      setError(err.message || 'Failed to remove song from playlist');
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!playlist) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <FiMusic className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Playlist not found</h3>
            <p className="text-gray-400 mb-6">The playlist you're looking for doesn't exist or you don't have access to it</p>
            <Link href="/profile/library" className="btn-primary">
              Back to Library
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/profile/library" className="text-gray-400 hover:text-white mr-4">
            ← Back to Library
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
              <FiMusic className="text-primary text-6xl" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center mb-4">
              <p className="text-sm text-gray-400 uppercase font-medium">Playlist</p>
            </div>

            {isEditing ? (
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-3xl font-bold bg-gray-700 rounded px-3 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <button
                  className="p-2 text-green-500 hover:text-green-400"
                  onClick={updatePlaylistName}
                >
                  <FiCheck size={20} />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-white"
                  onClick={() => {
                    setEditedName(playlist.name);
                    setIsEditing(false);
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold mr-2">{playlist.name}</h1>
                <button
                  className="p-2 text-gray-400 hover:text-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 size={18} />
                </button>
              </div>
            )}

            <p className="text-gray-400 mb-6">{playlist.songs.length} songs</p>

            <div className="flex space-x-3">
              <button className="btn-primary flex items-center">
                <FiPlay className="mr-2" />
                Play All
              </button>
              <button
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-primary hover:text-primary flex items-center"
                onClick={() => setIsAddSongModalOpen(true)}
              >
                <FiPlus className="mr-2" />
                Add Songs
              </button>
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          {playlist.songs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <FiMusic className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">No songs in this playlist</h3>
              <p className="text-gray-400 mb-6">Add songs to get started</p>
              <button
                className="btn-primary flex items-center mx-auto"
                onClick={() => setIsAddSongModalOpen(true)}
              >
                <FiPlus className="mr-2" />
                Add Songs
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Artist</th>
                    <th className="py-3 px-4 text-left">Duration</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.songs.map((song, index) => (
                    <tr key={song._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{song.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{song.artist}</td>
                      <td className="py-3 px-4">{formatDuration(song.duration)}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-primary">
                          <FiPlay size={18} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-500"
                          onClick={() => removeSongFromPlaylist(song._id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Songs Modal */}
        {isAddSongModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
            <div className="relative w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-6">
              <button
                onClick={() => setIsAddSongModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>

              <h2 className="text-xl font-bold mb-6">Add Songs to Playlist</h2>

              {availableSongs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No songs available to add. Purchase more songs to add them to your playlists.</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-96">
                  <table className="w-full">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="py-3 px-4 text-left">Title</th>
                        <th className="py-3 px-4 text-left">Artist</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableSongs.map((song) => (
                        <tr key={song._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium">{song.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{song.artist}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              className="px-3 py-1 border border-primary text-primary rounded hover:bg-primary/10"
                              onClick={() => addSongToPlaylist(song._id)}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-primary hover:text-primary"
                  onClick={() => setIsAddSongModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PlaylistPage;
