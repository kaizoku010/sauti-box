import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with the correct credentials from .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload to Cloudinary using buffer
async function uploadToCloudinary(buffer: Buffer, options: any): Promise<any> {
  try {
    // Convert buffer to base64
    const base64Data = buffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Data}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, options);
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
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

  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      {
        error: 'Image upload failed',
        message: error.message || 'Unknown error',
        details: error.http_code ? `HTTP Code: ${error.http_code}` : undefined
      },
      { status: 500 }
    );
  }
}
