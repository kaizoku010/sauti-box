import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, userType } = body;

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Get the appropriate collection based on user type
    const collection = userType === 'artist' ? db.collection('artists') : db.collection('users');
    
    // Find user by email
    const user = await collection.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(
      user._id.toString(),
      user.email,
      userType === 'artist' ? 'artist' : 'user'
    );

    // Return success response with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
