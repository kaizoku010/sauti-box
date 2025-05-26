import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with the correct credentials
cloudinary.config({
  cloud_name: 'dkvzuexc5',
  api_key: '399597264112256',
  api_secret: 'ViPC8YtVwXtgUDuPEviUwNep3RI'
});

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

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64Data}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
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
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

  } catch (error: any) {
    console.error('Image upload error:', error);

    return NextResponse.json(
      {
        error: 'Image upload failed',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
