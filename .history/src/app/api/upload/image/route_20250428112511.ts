import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
// Use CLOUDINARY_URL from environment variables if available
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.error('Cloudinary configuration missing');
}

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
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(buffer, {
      resource_type: 'image',
      folder: 'artist_images',
      public_id: `artist_${Date.now()}`,
      transformation: [
        { width: 500, height: 500, crop: 'fill' },
        { quality: 'auto' }
      ]
    });

    // Return the image URL
    return NextResponse.json({
      success: true,
      imageUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Image upload failed' },
      { status: 500 }
    );
  }
}
