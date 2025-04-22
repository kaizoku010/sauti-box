"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import { FiMusic, FiPlus, FiMoreVertical, FiPlay, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
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
  songs: string[];
}

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState<'songs' | 'playlists'>('songs');
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to view your library');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/user/library', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch library');
      }

      setSongs(data.library.songs || []);
      setPlaylists(data.library.playlists || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load library');
    } finally {
      setIsLoading(false);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to create a playlist');
        return;
      }

      const response = await fetch('/api/user/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newPlaylistName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create playlist');
      }

      setPlaylists([...playlists, data.playlist]);
      setNewPlaylistName('');
      setIsCreatePlaylistModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create playlist');
    }
  };

  const deletePlaylist = async (playlistId: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to delete a playlist');
        return;
      }

      const response = await fetch(`/api/user/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete playlist');
      }

      setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete playlist');
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Library</h1>
            <p className="text-gray-400">Your purchased songs and playlists</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'songs' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
              onClick={() => setActiveTab('songs')}
            >
              Songs
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'playlists' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
              onClick={() => setActiveTab('playlists')}
            >
              Playlists
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : activeTab === 'songs' ? (
          <div>
            {songs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FiMusic className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">No songs in your library</h3>
                <p className="text-gray-400 mb-6">Purchase songs to add them to your library</p>
                <Link href="/" className="btn-primary">
                  Browse Music
                </Link>
              </div>
            ) : (
              <div className="card overflow-hidden">
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
                      {songs.map((song, index) => (
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
                            <div className="relative inline-block">
                              <button className="p-2 text-gray-400 hover:text-primary">
                                <FiMoreVertical size={18} />
                              </button>
                              {/* Dropdown menu would go here */}
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
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Playlists</h2>
              <button
                className="btn-primary flex items-center"
                onClick={() => setIsCreatePlaylistModalOpen(true)}
              >
                <FiPlus className="mr-2" />
                Create Playlist
              </button>
            </div>

            {playlists.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FiMusic className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">No playlists yet</h3>
                <p className="text-gray-400 mb-6">Create your first playlist to organize your music</p>
                <button
                  className="btn-primary flex items-center mx-auto"
                  onClick={() => setIsCreatePlaylistModalOpen(true)}
                >
                  <FiPlus className="mr-2" />
                  Create Playlist
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="card group relative">
                    <Link href={`/profile/playlists/${playlist.id}`}>
                      <div className="p-6">
                        <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center mb-4">
                          <FiMusic className="text-primary text-2xl" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
                      </div>
                    </Link>
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <button className="p-2 text-gray-400 hover:text-primary">
                          <FiMoreVertical size={18} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
                          <Link href={`/profile/playlists/${playlist.id}`} className="block px-4 py-2 hover:bg-gray-700">
                            <FiPlay className="inline mr-2" size={16} />
                            Play
                          </Link>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
                            <FiEdit2 className="inline mr-2" size={16} />
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                            onClick={() => deletePlaylist(playlist.id)}
                          >
                            <FiTrash2 className="inline mr-2" size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Playlist Modal */}
        {isCreatePlaylistModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
            <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
              <button
                onClick={() => setIsCreatePlaylistModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>

              <h2 className="text-xl font-bold mb-6">Create New Playlist</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Playlist Name</label>
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="My Awesome Playlist"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  onClick={() => setIsCreatePlaylistModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={createPlaylist}
                  disabled={!newPlaylistName.trim()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LibraryPage;
