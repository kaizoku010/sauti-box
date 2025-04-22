import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword, generateToken } from '@/lib/auth';
import { User } from '@/types/user';
import { Artist } from '@/types/artist';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, userType } = body;

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Check if user already exists
    const collection = userType === 'artist' ? db.collection('artists') : db.collection('users');
    const existingUser = await collection.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user or artist document
    let newUser;
    
    if (userType === 'artist') {
      const artist: Partial<Artist> = {
        name,
        email,
        password: hashedPassword,
        bio: body.bio || '',
        genres: body.genres || [],
        followers: 0,
        totalSales: 0,
        totalStreams: 0,
        songs: [],
        albums: [],
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(artist);
      newUser = { ...artist, _id: result.insertedId };
    } else {
      const user: Partial<User> = {
        name,
        email,
        password: hashedPassword,
        library: {
          songs: [],
          playlists: []
        },
        following: [],
        purchaseHistory: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(user);
      newUser = { ...user, _id: result.insertedId };
    }

    // Generate JWT token
    const token = generateToken(
      newUser._id!.toString(),
      newUser.email!,
      userType === 'artist' ? 'artist' : 'user'
    );

    // Return success response with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
