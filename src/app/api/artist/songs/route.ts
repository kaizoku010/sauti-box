import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    // Authentication disabled for easier testing
    console.log('Authentication disabled for fetching artist songs');

    // Get artistId from URL
    const url = new URL(request.url);
    const artistId = url.searchParams.get('artistId');

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching songs for artist:', artistId);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');

    // Get artist data
    const artistsCollection = db.collection('artists');
    const artist = await artistsCollection.findOne(
      { _id: new ObjectId(artistId) },
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
      .find({ artistId: artistId })
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
