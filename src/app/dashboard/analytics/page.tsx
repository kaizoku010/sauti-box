"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import { FiDollarSign, FiUsers, FiShoppingCart, FiMusic, FiBarChart2, FiPieChart, FiCalendar } from 'react-icons/fi';

interface Analytics {
  totalEarnings: number;
  totalSales: number;
  totalSongs: number;
  followers: number;
  salesBySong: Record<string, { count: number; amount: number }>;
  salesByDate: Array<{ date: string; count: number; amount: number }>;
  paymentMethods: { mobile_money: number; card: number };
  recentPayments: Array<any>;
}

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to view analytics');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/artist/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch analytics');
      }

      setAnalytics(data.analytics);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getFilteredSalesByDate = () => {
    if (!analytics) return [];

    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return analytics.salesByDate.slice(-days);
  };

  const getTopSongs = () => {
    if (!analytics) return [];

    // Convert salesBySong object to array
    const songsArray = Object.entries(analytics.salesBySong).map(([songId, data]) => ({
      songId,
      ...data
    }));

    // Sort by count (number of sales)
    return songsArray.sort((a, b) => b.count - a.count).slice(0, 5);
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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your music performance and earnings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn-primary" onClick={fetchAnalytics}>
              Refresh Data
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {analytics && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(analytics.totalEarnings)}</h3>
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
                    <h3 className="text-2xl font-bold">{analytics.totalSales}</h3>
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
                    <p className="text-gray-400 text-sm mb-1">Total Songs</p>
                    <h3 className="text-2xl font-bold">{analytics.totalSongs}</h3>
                    <p className="text-gray-400 text-sm mt-1">Active in your catalog</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <FiMusic className="text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Followers</p>
                    <h3 className="text-2xl font-bold">{analytics.followers.toLocaleString()}</h3>
                    <p className="text-green-500 text-sm mt-1">+5.7% from last month</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center">
                    <FiUsers className="text-pink-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Sales Overview</h2>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeRange === '7d' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setTimeRange('7d')}
                  >
                    7 Days
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeRange === '30d' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setTimeRange('30d')}
                  >
                    30 Days
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeRange === '90d' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setTimeRange('90d')}
                  >
                    90 Days
                  </button>
                </div>
              </div>

              <div className="h-80 flex items-end space-x-1">
                {getFilteredSalesByDate().map((day, index) => {
                  // Calculate height percentage based on maximum value
                  const maxAmount = Math.max(...getFilteredSalesByDate().map(d => d.amount));
                  const heightPercentage = maxAmount > 0 ? (day.amount / maxAmount) * 100 : 0;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm"
                          style={{ height: `${heightPercentage}%`, minHeight: day.amount > 0 ? '4px' : '0' }}
                        ></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-8 bg-gray-800 text-white p-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                          {formatDate(day.date)}: {formatCurrency(day.amount)} ({day.count} sales)
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {timeRange === '7d' ? formatDate(day.date) : index % 5 === 0 ? formatDate(day.date) : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Selling Songs */}
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4">Top Selling Songs</h2>

                <div className="space-y-4">
                  {getTopSongs().map((song, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-700 rounded-md">
                      <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Song ID: {song.songId}</h4>
                        <div className="flex text-sm text-gray-400">
                          <span className="mr-4">{song.count} sales</span>
                          <span>{formatCurrency(song.amount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4">Payment Methods</h2>

                <div className="flex items-center justify-center h-64">
                  <div className="w-48 h-48 relative">
                    {/* Simple pie chart */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute bg-blue-500"
                        style={{
                          width: '100%',
                          height: '100%',
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * analytics.paymentMethods.mobile_money / (analytics.paymentMethods.mobile_money + analytics.paymentMethods.card))}% ${50 - 50 * Math.sin(2 * Math.PI * analytics.paymentMethods.mobile_money / (analytics.paymentMethods.mobile_money + analytics.paymentMethods.card))}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                        }}
                      ></div>
                      <div
                        className="absolute bg-purple-500"
                        style={{
                          width: '100%',
                          height: '100%',
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * analytics.paymentMethods.mobile_money / (analytics.paymentMethods.mobile_money + analytics.paymentMethods.card))}% ${50 - 50 * Math.sin(2 * Math.PI * analytics.paymentMethods.mobile_money / (analytics.paymentMethods.mobile_money + analytics.paymentMethods.card))}%, 50% 0%)`
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
                        <FiPieChart className="text-gray-400 text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <div>
                      <p className="font-medium">Mobile Money</p>
                      <p className="text-sm text-gray-400">{analytics.paymentMethods.mobile_money} sales</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                    <div>
                      <p className="font-medium">Card</p>
                      <p className="text-sm text-gray-400">{analytics.paymentMethods.card} sales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Recent Sales</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Song ID</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Payment Method</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentPayments.map((payment, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4">
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="py-3 px-4">{payment.songId}</td>
                        <td className="py-3 px-4">{formatCurrency(payment.amount)}</td>
                        <td className="py-3 px-4">
                          {payment.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Card'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'completed' ? 'bg-green-900/30 text-green-400' : payment.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
