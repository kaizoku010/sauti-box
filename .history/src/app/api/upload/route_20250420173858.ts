import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('music');
    const title = formData.get('title');
    const artist = formData.get('artist');
    const genre = formData.get('genre');

    // Save files to storage (you might want to use cloud storage in production)
    const uploadPromises = files.map(async (file: any) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate safe filename
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', safeName);
      
      await writeFile(filePath, buffer);
      return safeName;
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // Here you would typically:
    // 1. Save metadata to database
    // 2. Process audio files (generate waveforms, extract metadata)
    // 3. Move files to permanent storage (e.g., S3)

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