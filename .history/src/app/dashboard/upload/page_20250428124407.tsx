"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../../../components/MainLayout';
import { FiMusic, FiUpload, FiX, FiCheck, FiImage } from 'react-icons/fi';

const MusicUploadPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    price: '5000', // Default price in UGX
    files: [] as File[],
    coverImage: null as File | null,
  });

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Not authenticated. Please log in.');
          return;
        }

        // Log token for debugging (remove in production)
        console.log('Token from localStorage:', token);

        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Auth verification failed:', errorData);
          throw new Error(errorData.error || 'Failed to verify authentication');
        }

        const data = await response.json();
        console.log('User data:', data);
        setUser(data.user);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: selectedFiles }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, coverImage: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.files.length === 0) {
      setError('Please select at least one music file to upload');
      return;
    }

    if (!formData.coverImage) {
      setError('Please upload a cover image for your music');
      return;
    }

    setIsLoading(true);
    setUploadStatus('uploading');
    setError('');
    setUploadProgress(0);

    try {
      // First upload the cover image
      const coverImageFormData = new FormData();
      coverImageFormData.append('image', formData.coverImage);

      const coverImageResponse = await fetch('/api/upload/image', {
        method: 'POST',
        body: coverImageFormData
      });

      if (!coverImageResponse.ok) {
        throw new Error('Failed to upload cover image');
      }

      const coverImageData = await coverImageResponse.json();
      const coverImageUrl = coverImageData.imageUrl;

      // Now create form data for music upload
      const uploadFormData = new FormData();
      uploadFormData.append('title', formData.title);
      uploadFormData.append('genre', formData.genre);
      uploadFormData.append('price', formData.price);
      uploadFormData.append('coverImageUrl', coverImageUrl);

      // Add artist information
      uploadFormData.append('artist', user.name);
      uploadFormData.append('artistId', user._id);

      // Add all music files
      formData.files.forEach(file => {
        uploadFormData.append('music', file);
      });

      // Set upload progress (cover image uploaded)
      setUploadProgress(20);

      // Upload music to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: uploadFormData
      });

      // Set upload progress (music uploading)
      setUploadProgress(80);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setUploadedFiles(data.files);
      setUploadStatus('success');
      setUploadProgress(100);

      // Reset form after successful upload
      setFormData({
        title: '',
        genre: '',
        price: '5000',
        files: [],
        coverImage: null
      });
      setCoverImagePreview(null);

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload music');
      setUploadStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (error && error.includes('Not authenticated')) {
    return (
      <MainLayout>
        <div id='page-content' className="max-w-4xl mx-auto mt-8">
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md">
            <p>{error}</p>
            <p className="mt-2">
              <Link href="/artist/login" className="text-primary hover:underline">
                Click here to log in
              </Link>
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div id='page-content' className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Upload Music</h1>
            <p className="text-gray-400">Share your music with the world</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-md mb-6 flex items-center">
            <FiCheck className="mr-2" />
            <span>Your music has been uploaded successfully!</span>
          </div>
        )}

        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Song/Album Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter song or album title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Genre *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a genre</option>
                <option value="afrobeat">Afrobeat</option>
                <option value="dancehall">Dancehall</option>
                <option value="hiphop">Hip Hop</option>
                <option value="rnb">R&B</option>
                <option value="gospel">Gospel</option>
                <option value="traditional">Traditional</option>
                <option value="pop">Pop</option>
                <option value="reggae">Reggae</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (UGX) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter price in UGX"
                min="0"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Set the price for your music in Ugandan Shillings</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image *</label>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-full md:w-1/3">
                  <div className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center">
                    {coverImagePreview ? (
                      <div className="relative">
                        <Image
                          src={coverImagePreview}
                          alt="Cover preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-md object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, coverImage: null }));
                            setCoverImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FiImage className="mx-auto text-3xl text-gray-400 mb-4" />
                        <p className="text-gray-400 mb-2">Upload cover image</p>
                      </>
                    )}
                    <label className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer inline-block mt-2">
                      {coverImagePreview ? 'Change Image' : 'Select Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"sum
                        required={!coverImagePreview}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-sm text-gray-400 mb-2">Upload a square image for best results</p>
                  <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                    <li>Recommended size: 1000 x 1000 pixels</li>
                    <li>Maximum file size: 2MB</li>
                    <li>Supported formats: JPG, PNG</li>
                    <li>This image will be displayed on music players and stores</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Music File(s) *</label>
              <div className="border-2 border-dashed border-gray-600 rounded-md p-8 text-center">
                <FiUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your music files here</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: MP3, WAV, FLAC (Max 50MB per file)</p>
                <label className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
                  Browse Files
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    required
                  />
                </label>
              </div>
              {formData.files.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Files:</p>
                  <ul className="space-y-2">
                    {Array.from(formData.files).map((file, index) => (
                      <li key={index} className="flex items-center bg-gray-700 p-2 rounded-md">
                        <FiMusic className="mr-2 text-primary" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-400 ml-2">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {uploadStatus === 'uploading' && (
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-400 mt-1 text-center">Uploading... {uploadProgress}%</p>
              </div>
            )}

            <div className="flex items-center justify-end space-x-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload Music'}
              </button>
            </div>
          </form>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Uploaded Music</h2>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center mr-3">
                      <FiMusic className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{file.title}</h4>
                      <p className="text-sm text-gray-400">{file.fileName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">UGX {parseInt(formData.price).toLocaleString()}</p>
                    <p className="text-xs text-green-500">Uploaded successfully</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MusicUploadPage;
