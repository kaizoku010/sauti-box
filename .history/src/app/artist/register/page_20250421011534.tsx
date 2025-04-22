"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiLock, FiMail, FiMusic, FiUpload } from 'react-icons/fi';

const ArtistRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    genres: [] as string[],
    profileImage: null as File | null,
    coverImage: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedGenres = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, genres: selectedGenres }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (type === 'profile') {
        setFormData(prev => ({ ...prev, profileImage: file }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setProfileImagePreview(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, coverImage: file }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setCoverImagePreview(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.profileImage) {
      setError('Profile image is required');
      return;
    }

    if (!formData.coverImage) {
      setError('Cover image is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Upload profile image
      const profileImageFormData = new FormData();
      profileImageFormData.append('image', formData.profileImage);

      const profileImageResponse = await fetch('/api/upload/image', {
        method: 'POST',
        body: profileImageFormData
      });

      if (!profileImageResponse.ok) {
        throw new Error('Failed to upload profile image');
      }

      const profileImageData = await profileImageResponse.json();

      // Upload cover image
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

      // Register artist
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: 'artist',
          bio: formData.bio,
          genres: formData.genres,
          profileImage: profileImageData.imageUrl,
          coverImage: coverImageData.imageUrl
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      const data = await response.json();

      // Save token to localStorage
      localStorage.setItem('token', data.token);

      // Redirect to artist dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <FiMusic className="text-primary text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">Artist Registration</h1>
          <p className="text-gray-400 mt-2">Create your SautiBox artist account and start selling your music</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Artist/Band Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your artist or band name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
              placeholder="Tell us about yourself as an artist..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Music Genres *</label>
            <select
              multiple
              name="genres"
              value={formData.genres}
              onChange={handleGenreChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
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
            <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple genres</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image *</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiUser size={32} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
                    <FiUpload className="mr-2" />
                    Upload Profile
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'profile')}
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 500x500px JPG or PNG</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image *</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 rounded overflow-hidden bg-gray-700 flex items-center justify-center">
                  {coverImagePreview ? (
                    <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiMusic size={24} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
                    <FiUpload className="mr-2" />
                    Upload Cover
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'cover')}
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 1200x300px JPG or PNG</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Artist Account'
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/artist/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegisterPage;
