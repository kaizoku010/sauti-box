import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const payload = verifyToken(token);
    
    if (!payload || payload.type !== 'artist') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Get artist data
    const artistsCollection = db.collection('artists');
    const artist = await artistsCollection.findOne(
      { _id: new ObjectId(payload.id) },
      { projection: { password: 0 } }
    );
    
    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }
    
    // Get artist's songs
    const songsCollection = db.collection('songs');
    const songs = await songsCollection
      .find({ artist: artist.name })
      .toArray();
    
    // Get payment data for the artist
    const paymentsCollection = db.collection('payments');
    const payments = await paymentsCollection
      .find({ artistId: payload.id })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Calculate analytics
    const totalEarnings = payments.reduce((total, payment) => total + payment.amount, 0);
    
    // Sales by song
    const salesBySong = {};
    payments.forEach(payment => {
      if (!salesBySong[payment.songId]) {
        salesBySong[payment.songId] = {
          count: 0,
          amount: 0
        };
      }
      salesBySong[payment.songId].count += 1;
      salesBySong[payment.songId].amount += payment.amount;
    });
    
    // Sales by date (for chart)
    const salesByDate = {};
    payments.forEach(payment => {
      const date = new Date(payment.createdAt).toISOString().split('T')[0];
      if (!salesByDate[date]) {
        salesByDate[date] = {
          count: 0,
          amount: 0
        };
      }
      salesByDate[date].count += 1;
      salesByDate[date].amount += payment.amount;
    });
    
    // Format sales by date for chart
    const last30Days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      last30Days.push({
        date: dateString,
        count: salesByDate[dateString]?.count || 0,
        amount: salesByDate[dateString]?.amount || 0
      });
    }
    
    // Payment methods breakdown
    const paymentMethods = {
      mobile_money: 0,
      card: 0
    };
    payments.forEach(payment => {
      paymentMethods[payment.paymentMethod] += 1;
    });
    
    // Return analytics data
    return NextResponse.json({
      success: true,
      analytics: {
        totalEarnings,
        totalSales: payments.length,
        totalSongs: songs.length,
        followers: artist.followers,
        salesBySong,
        salesByDate: last30Days,
        paymentMethods,
        recentPayments: payments.slice(0, 10) // Last 10 payments
      }
    });
    
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
