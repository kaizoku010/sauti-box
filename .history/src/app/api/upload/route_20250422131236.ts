import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import clientPromise from '@/lib/mongodb';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Cloudinary result type
interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  duration?: number;
  format?: string;
  [key: string]: any; // For other properties that might be returned
}

// Helper function to upload to Cloudinary
async function uploadToCloudinary(buffer: Buffer, options: Record<string, unknown>): Promise<CloudinaryResult> {
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
    const formData = await request.formData();
    const files = formData.getAll('music');
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const genre = formData.get('genre') as string;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    const songsCollection = db.collection('songs');

    // Define a type for the file
    interface MusicFile extends File {
      name: string;
      arrayBuffer(): Promise<ArrayBuffer>;
    }

    // Upload files to Cloudinary and save metadata to MongoDB
    const uploadPromises = files.map(async (file: MusicFile) => {
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
        artist,
        genre,
        fileName: file.name,
        uploadDate: new Date(),
        cloudinaryId: cloudinaryResult.public_id,
        cloudinaryUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
        format: cloudinaryResult.format,
        status: 'active'
      };

      const result = await songsCollection.insertOne(songData);

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

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
