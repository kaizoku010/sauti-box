"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/MainLayout';
import { FiMusic, FiDollarSign, FiRadio, FiUsers, FiBarChart2, FiTrendingUp, FiMap, FiShoppingCart, FiUpload, FiCheck } from 'react-icons/fi';
import SongList from '@/components/SongList';

// Type definitions
interface TopSong {
  _id: string;
  title: string;
  artist: string;
  streams: number;
}

interface StreamStats {
  totalStreams: number;
  percentChange: number;
  topSongs: TopSong[];
}

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [streamStats, setStreamStats] = useState<any>({
    totalStreams: 0,
    percentChange: 0,
    topSongs: []
  });

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Not authenticated. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to verify authentication');
        }

        const data = await response.json();
        setUser(data.user);
        console.log('User data:', data.user);

        // Fetch artist's songs using artistId
        if (data.user && data.user._id) {
          try {
            const artistId = data.user._id.toString();
            console.log('Fetching songs for artist ID:', artistId);

            // Fetch songs
            const songsResponse = await fetch(`/api/artist/songs?artistId=${artistId}`);

            if (songsResponse.ok) {
              const songsData = await songsResponse.json();
              console.log('Songs data:', songsData);
              setSongs(songsData.songs || []);
            } else {
              const errorData = await songsResponse.json();
              console.error('Failed to fetch songs:', errorData);
            }

            // Fetch stream analytics
            try {
              const streamsResponse = await fetch(`/api/streams?artistId=${artistId}&period=month`);

              if (streamsResponse.ok) {
                const streamsData = await streamsResponse.json();
                console.log('Streams data:', streamsData);
                setStreamStats(streamsData);
              } else {
                console.error('Failed to fetch stream analytics');
              }
            } catch (streamErr) {
              console.error('Error fetching stream analytics:', streamErr);
            }
          } catch (songErr) {
            console.error('Error fetching songs:', songErr);
          }
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md">
            <p>{error}</p>
            <p className="mt-2">
              <Link href="/artist/login" className="text-primary hover:underline">
                Click here to log in
              </Link>
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div id='page-content' className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name || 'Artist'}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/upload" className="btn-primary mr-3 inline-block">
              Upload Music
            </Link>
            <Link href="/dashboard/analytics" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors inline-block mr-3">
              View Analytics
            </Link>
            <Link href={`/artists/${user?._id}`} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors inline-block">
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                <h3 className="text-2xl font-bold">UGX 2,450,000</h3>
                <p className="text-green-500 text-sm mt-1">+12.5% from last month</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                <FiDollarSign className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Sales</p>
                <h3 className="text-2xl font-bold">487</h3>
                <p className="text-green-500 text-sm mt-1">+8.3% from last month</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                <FiShoppingCart className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Streams</p>
                <h3 className="text-2xl font-bold">
                  {streamStats.totalStreams >= 1000000
                    ? `${(streamStats.totalStreams / 1000000).toFixed(1)}M`
                    : streamStats.totalStreams >= 1000
                    ? `${(streamStats.totalStreams / 1000).toFixed(1)}K`
                    : streamStats.totalStreams}
                </h3>
                <p className={`text-sm mt-1 ${streamStats.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {streamStats.percentChange >= 0 ? '+' : ''}{streamStats.percentChange}% from last month
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                <FiMusic className="text-purple-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Radio Plays</p>
                <h3 className="text-2xl font-bold">342</h3>
                <p className="text-green-500 text-sm mt-1">+15.2% from last month</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                <FiRadio className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">New Followers</p>
                <h3 className="text-2xl font-bold">5,280</h3>
                <p className="text-green-500 text-sm mt-1">+22.8% from last month</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center">
                <FiUsers className="text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Revenue Overview</h2>
            <select className="bg-gray-700 px-3 py-1 rounded-md text-sm">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-80 flex items-end space-x-2">
            {/* Simulated chart bars */}
            {[40, 65, 45, 50, 55, 70, 60, 65, 80, 75, 90, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{index + 1}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-sm text-gray-400">
            <div>Apr 1</div>
            <div>Apr 30</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Songs */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Top Performing Songs</h2>

            <div className="space-y-4">
              {streamStats.topSongs && streamStats.topSongs.length > 0 ? (
                streamStats.topSongs.map((song, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-700 rounded-md">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{song.title}</h4>
                      <div className="flex text-sm text-gray-400">
                        <span className="mr-4">
                          {song.streams >= 1000000
                            ? `${(song.streams / 1000000).toFixed(1)}M`
                            : song.streams >= 1000
                            ? `${(song.streams / 1000).toFixed(1)}K`
                            : song.streams} streams
                        </span>
                        <span>UGX {(song.streams * 2).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-green-500 flex items-center">
                      <FiTrendingUp className="mr-1" />
                      +{Math.floor(Math.random() * 10) + 1}%
                    </div>
                  </div>
                ))
              ) : (
                [
                  { title: 'Sitya Loss', streams: '450K', earnings: 'UGX 900,000', change: '+12%' },
                  { title: 'Stamina', streams: '320K', earnings: 'UGX 640,000', change: '+8%' },
                  { title: 'Jambole', streams: '280K', earnings: 'UGX 560,000', change: '+5%' },
                  { title: 'Tweyagale', streams: '150K', earnings: 'UGX 300,000', change: '+3%' },
                ].map((song, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-700 rounded-md">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{song.title}</h4>
                      <div className="flex text-sm text-gray-400">
                        <span className="mr-4">{song.streams} streams</span>
                        <span>{song.earnings}</span>
                      </div>
                    </div>
                    <div className="text-green-500 flex items-center">
                      <FiTrendingUp className="mr-1" />
                      {song.change}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className="w-full text-center text-primary mt-4 hover:underline">
              View All Songs
            </button>
          </div>

          {/* Revenue Sources */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Revenue Sources</h2>

            <div className="space-y-4">
              {[
                { source: 'Streaming Platforms', amount: 'UGX 1,200,000', percentage: 48 },
                { source: 'Radio Airplay', amount: 'UGX 650,000', percentage: 26 },
                { source: 'Live Performances', amount: 'UGX 350,000', percentage: 14 },
                { source: 'Licensing & Sync', amount: 'UGX 250,000', percentage: 10 },
              ].map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{source.source}</span>
                    <span>{source.amount}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-400">{source.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Sales Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <FiShoppingCart className="mr-2 text-primary" />
                Recent Sales
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Sitya Loss', buyer: 'John Doe', amount: 5000, date: 'Today, 10:23 AM' },
                  { title: 'African Music', buyer: 'Sarah Smith', amount: 15000, date: 'Yesterday, 3:45 PM' },
                  { title: 'Sitya Loss', buyer: 'Michael Brown', amount: 5000, date: 'Apr 19, 2025' },
                  { title: 'Love Yo', buyer: 'Emily Johnson', amount: 5000, date: 'Apr 18, 2025' },
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div>
                      <h4 className="font-medium">{sale.title}</h4>
                      <p className="text-sm text-gray-400">Purchased by {sale.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">UGX {sale.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <FiBarChart2 className="mr-2 text-primary" />
                Top Selling Songs
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Sitya Loss', sales: 187, amount: 935000 },
                  { title: 'African Music (Album)', sales: 92, amount: 1380000 },
                  { title: 'Love Yo', sales: 76, amount: 380000 },
                  { title: 'Stamina', sales: 54, amount: 270000 },
                ].map((song, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center mr-3">
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{song.title}</h4>
                        <p className="text-sm text-gray-400">{song.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">UGX {song.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Audience Demographics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age Distribution */}
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <FiBarChart2 className="mr-2 text-primary" />
                Age Distribution
              </h3>

              <div className="space-y-3">
                {[
                  { age: '18-24', percentage: 35 },
                  { age: '25-34', percentage: 45 },
                  { age: '35-44', percentage: 15 },
                  { age: '45+', percentage: 5 },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.age}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <FiMap className="mr-2 text-primary" />
                Geographic Distribution
              </h3>

              <div className="space-y-3">
                {[
                  { location: 'Uganda', percentage: 60 },
                  { location: 'Kenya', percentage: 15 },
                  { location: 'Tanzania', percentage: 10 },
                  { location: 'Nigeria', percentage: 8 },
                  { location: 'Other', percentage: 7 },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.location}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Music */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Music</h2>
            <Link href="/dashboard/upload" className="text-primary hover:underline flex items-center">
              <FiUpload className="mr-1" size={16} />
              Upload New Music
            </Link>
          </div>

          {songs.length > 0 ? (
            <SongList songs={songs} artistName={user?.name} />
          ) : (
            <div className="text-center py-8">
              <FiMusic className="mx-auto text-3xl text-gray-500 mb-4" />
              <p className="text-gray-400 mb-4">You haven't uploaded any music yet</p>
              <Link href="/dashboard/upload" className="btn-primary inline-block">
                Upload Your First Track
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {[
              {
                type: 'Royalty Payment',
                description: 'Received royalty payment from UPRS',
                amount: 'UGX 350,000',
                date: 'Apr 18, 2025'
              },
              {
                type: 'New Copyright',
                description: 'Copyright registered for "New Track"',
                amount: '',
                date: 'Apr 15, 2025'
              },
              {
                type: 'Radio Play',
                description: 'Your song "Sitya Loss" was played on Capital FM',
                amount: '',
                date: 'Apr 12, 2025'
              },
              {
                type: 'Distribution',
                description: 'Your music is now available on Boomplay',
                amount: '',
                date: 'Apr 10, 2025'
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start p-3 hover:bg-gray-700 rounded-md">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  {activity.type === 'Royalty Payment' && <FiDollarSign />}
                  {activity.type === 'New Copyright' && <FiMusic />}
                  {activity.type === 'Radio Play' && <FiRadio />}
                  {activity.type === 'Distribution' && <FiBarChart2 />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.type}</h4>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  {activity.amount && <p className="text-green-500 mt-1">{activity.amount}</p>}
                </div>
                <div className="text-sm text-gray-500">
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};



export default DashboardPage;
