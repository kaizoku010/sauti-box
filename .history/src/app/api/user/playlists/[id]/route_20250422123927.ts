import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Define the params type
type Context = {
  params: {
    id: string;
  }
};

// Get a specific playlist
export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = context.params;
    
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
    
    // Get user's playlist
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne(
      { 
        _id: new ObjectId(payload.id),
        'library.playlists.id': id
      },
      { projection: { 'library.playlists.$': 1 } }
    );
    
    if (!user || !user.library.playlists || user.library.playlists.length === 0) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }
    
    const playlist = user.library.playlists[0];
    
    // Get songs in playlist
    const songsCollection = db.collection('songs');
    const songs = await songsCollection
      .find({ _id: { $in: playlist.songs.map((id: string) => new ObjectId(id)) } })
      .toArray();
    
    // Return playlist with songs
    return NextResponse.json({
      success: true,
      playlist: {
        ...playlist,
        songs
      }
    });
    
  } catch (error) {
    console.error('Playlist error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve playlist' },
      { status: 500 }
    );
  }
}

// Update a playlist (rename or add/remove songs)
export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = context.params;
    
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
    const { name, action, songId } = body;
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    const usersCollection = db.collection('users');
    
    // Check if playlist exists
    const user = await usersCollection.findOne(
      { 
        _id: new ObjectId(payload.id),
        'library.playlists.id': id
      }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }
    
    // Update playlist based on action
    if (name) {
      // Rename playlist
      await usersCollection.updateOne(
        { 
          _id: new ObjectId(payload.id),
          'library.playlists.id': id
        },
        { $set: { 'library.playlists.$.name': name } }
      );
    }
    
    if (action && songId) {
      if (action === 'add') {
        // Add song to playlist
        await usersCollection.updateOne(
          { 
            _id: new ObjectId(payload.id),
            'library.playlists.id': id
          },
          { $addToSet: { 'library.playlists.$.songs': songId } }
        );
      } else if (action === 'remove') {
        // Remove song from playlist
        await usersCollection.updateOne(
          { 
            _id: new ObjectId(payload.id),
            'library.playlists.id': id
          },
          { $pull: { 'library.playlists.$.songs': songId } }
        );
      }
    }
    
    // Get updated playlist
    const updatedUser = await usersCollection.findOne(
      { 
        _id: new ObjectId(payload.id),
        'library.playlists.id': id
      },
      { projection: { 'library.playlists.$': 1 } }
    );
    
    const updatedPlaylist = updatedUser?.library.playlists[0];
    
    // Return success response
    return NextResponse.json({
      success: true,
      playlist: updatedPlaylist
    });
    
  } catch (error) {
    console.error('Update playlist error:', error);
    return NextResponse.json(
      { error: 'Failed to update playlist' },
      { status: 500 }
    );
  }
}

// Delete a playlist
export async function DELETE(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = context.params;
    
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
    
    // Delete playlist
    const usersCollection = db.collection('users');
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(payload.id) },
      { $pull: { 'library.playlists': { 'id': id } } }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Playlist deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete playlist error:', error);
    return NextResponse.json(
      { error: 'Failed to delete playlist' },
      { status: 500 }
    );
  }
}


