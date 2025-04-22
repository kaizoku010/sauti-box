import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Get all playlists for a user
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
    
    // Get user's playlists
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne(
      { _id: new ObjectId(payload.id) },
      { projection: { 'library.playlists': 1 } }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return playlists
    return NextResponse.json({
      success: true,
      playlists: user.library.playlists || []
    });
    
  } catch (error) {
    console.error('Playlists error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve playlists' },
      { status: 500 }
    );
  }
}

// Create a new playlist
export async function POST(request: Request) {
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
    
    // Parse request body
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Playlist name is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Create new playlist
    const playlistId = new ObjectId().toString();
    const playlist = {
      id: playlistId,
      name,
      songs: []
    };
    
    // Add playlist to user's library
    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { _id: new ObjectId(payload.id) },
      { $push: { 'library.playlists': playlist } }
    );
    
    // Return success response
    return NextResponse.json({
      success: true,
      playlist
    });
    
  } catch (error) {
    console.error('Create playlist error:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
}
