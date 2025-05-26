import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { songId, userId = null, artistId, source = 'player' } = body;

    if (!songId) {
      return NextResponse.json(
        { error: 'Song ID is required' },
        { status: 400 }
      );
    }

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Get collections
    const streamsCollection = db.collection('streams');
    const songsCollection = db.collection('songs');
    const artistsCollection = db.collection('artists');
    
    // Create stream record
    const streamData = {
      songId: typeof songId === 'string' ? songId : songId.toString(),
      userId: userId ? (typeof userId === 'string' ? userId : userId.toString()) : null,
      artistId: typeof artistId === 'string' ? artistId : artistId.toString(),
      source,
      timestamp: new Date(),
      // Add additional data like IP, country, device, etc. if needed
    };
    
    // Insert stream record
    await streamsCollection.insertOne(streamData);
    
    // Update song stream count
    await songsCollection.updateOne(
      { _id: new ObjectId(songId) },
      { $inc: { streams: 1 } }
    );
    
    // Update artist total streams
    await artistsCollection.updateOne(
      { _id: new ObjectId(artistId) },
      { $inc: { totalStreams: 1 } }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Stream recorded successfully'
    });
    
  } catch (error: any) {
    console.error('Error recording stream:', error);
    return NextResponse.json(
      { error: 'Failed to record stream', message: error.message },
      { status: 500 }
    );
  }
}

// Get stream analytics
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const artistId = url.searchParams.get('artistId');
    const songId = url.searchParams.get('songId');
    const period = url.searchParams.get('period') || 'month'; // day, week, month, year, all
    
    if (!artistId && !songId) {
      return NextResponse.json(
        { error: 'Either artistId or songId is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    const streamsCollection = db.collection('streams');
    
    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        startDate = new Date(0); // Beginning of time
        break;
    }
    
    // Build query
    const query: any = {
      timestamp: { $gte: startDate, $lte: now }
    };
    
    if (artistId) {
      query.artistId = artistId;
    }
    
    if (songId) {
      query.songId = songId;
    }
    
    // Get stream count
    const totalStreams = await streamsCollection.countDocuments(query);
    
    // Get previous period for comparison
    let prevStartDate = new Date(startDate);
    let prevEndDate = new Date(now);
    
    switch (period) {
      case 'day':
        prevStartDate.setDate(prevStartDate.getDate() - 1);
        prevEndDate.setDate(prevEndDate.getDate() - 1);
        break;
      case 'week':
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        prevEndDate.setDate(prevEndDate.getDate() - 7);
        break;
      case 'month':
        prevStartDate.setMonth(prevStartDate.getMonth() - 1);
        prevEndDate.setMonth(prevEndDate.getMonth() - 1);
        break;
      case 'year':
        prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
        prevEndDate.setFullYear(prevEndDate.getFullYear() - 1);
        break;
    }
    
    const prevQuery = { ...query };
    prevQuery.timestamp = { $gte: prevStartDate, $lte: prevEndDate };
    
    const prevTotalStreams = period === 'all' ? 0 : await streamsCollection.countDocuments(prevQuery);
    
    // Calculate percentage change
    let percentChange = 0;
    if (prevTotalStreams > 0) {
      percentChange = ((totalStreams - prevTotalStreams) / prevTotalStreams) * 100;
    }
    
    // Get top songs if artistId is provided
    let topSongs = [];
    if (artistId && !songId) {
      const pipeline = [
        { $match: query },
        { $group: { _id: '$songId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ];
      
      const songCounts = await streamsCollection.aggregate(pipeline).toArray();
      
      // Get song details
      const songsCollection = db.collection('songs');
      topSongs = await Promise.all(
        songCounts.map(async (item) => {
          const song = await songsCollection.findOne({ _id: new ObjectId(item._id) });
          return {
            _id: item._id,
            title: song?.title || 'Unknown',
            artist: song?.artist || 'Unknown',
            streams: item.count
          };
        })
      );
    }
    
    return NextResponse.json({
      success: true,
      totalStreams,
      percentChange: parseFloat(percentChange.toFixed(1)),
      period,
      topSongs
    });
    
  } catch (error: any) {
    console.error('Error getting stream analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get stream analytics', message: error.message },
      { status: 500 }
    );
  }
}
