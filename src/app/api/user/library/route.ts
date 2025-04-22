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
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Get user's library
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne(
      { _id: new ObjectId(payload.id) },
      { projection: { library: 1 } }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get songs in user's library
    const songsCollection = db.collection('songs');
    const songs = await songsCollection
      .find({ _id: { $in: user.library.songs.map((id: string) => new ObjectId(id)) } })
      .toArray();
    
    // Get playlists in user's library
    const playlists = user.library.playlists || [];
    
    // Return library data
    return NextResponse.json({
      success: true,
      library: {
        songs,
        playlists
      }
    });
    
  } catch (error) {
    console.error('Library error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve library' },
      { status: 500 }
    );
  }
}
