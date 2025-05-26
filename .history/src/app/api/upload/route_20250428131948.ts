import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import clientPromise from '@/lib/mongodb';
import { Readable } from 'stream';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Configure Cloudinary with the correct credentials
cloudinary.config({
  cloud_name: 'dkvzuexc5',
  api_key: '399597264112256',
  api_secret: 'ViPC8YtVwXtgUDuPEviUwNep3RI'
});

// Helper function to upload to Cloudinary
async function uploadToCloudinary(buffer: Buffer, options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
    });

    readable.pipe(uploadStream);
  });
}

export async function POST(request: Request) {
  try {
    // Authentication disabled for easier testing
    console.log('Authentication disabled for music uploads');

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll('music');
    const title = formData.get('title') as string;
    const artistName = formData.get('artist') as string;
    const genre = formData.get('genre') as string;
    const price = formData.get('price') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const artistId = formData.get('artistId') as string;

    if (!artistId) {
      console.error('Missing artistId in request');
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      );
    }

    if (!files.length || !title || !genre) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    const songsCollection = db.collection('songs');
    const artistsCollection = db.collection('artists');

    // Get artist information
    const artistDoc = await artistsCollection.findOne({ _id: new ObjectId(artistId) });

    if (!artistDoc) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    // Upload files to Cloudinary and save metadata to MongoDB
    const uploadPromises = files.map(async (file: any) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(buffer, {
        resource_type: 'auto',
        folder: 'music',
        public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
        // Add audio metadata extraction
        eager: [{ audio_frequency: true, audio_duration: true }]
      });

      // Save metadata to MongoDB
      const songData = {
        title,
        artist: artistName || artistDoc.name,
        artistId: artistDoc._id.toString(),
        genre,
        price: parseInt(price) || 5000, // Default price if not provided
        fileName: file.name,
        uploadDate: new Date(),
        cloudinaryId: cloudinaryResult.public_id,
        cloudinaryUrl: cloudinaryResult.secure_url,
        coverImageUrl: coverImageUrl, // Add cover image URL
        duration: cloudinaryResult.duration || 0,
        format: cloudinaryResult.format || 'mp3',
        status: 'active',
        purchases: 0,
        streams: 0
      };

      const result = await songsCollection.insertOne(songData);

      // Update artist's songs array
      try {
        await artistsCollection.updateOne(
          { _id: new ObjectId(artistId) },
          { $addToSet: { songs: result.insertedId.toString() } }
        );
        console.log('Added song to artist collection:', result.insertedId.toString());
      } catch (updateError) {
        console.error('Error updating artist document:', updateError);
      }

      return {
        _id: result.insertedId,
        ...songData
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      files: uploadedFiles
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error.message || 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}
