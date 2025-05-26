import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
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
      .find({ artistId: payload.id })
      .sort({ uploadDate: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      songs
    });
    
  } catch (error: any) {
    console.error('Error fetching artist songs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch songs',
        message: error.message || 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}
