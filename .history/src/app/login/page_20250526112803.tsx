"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiUser, FiLock, FiMusic } from 'react-icons/fi';
// Import login page specific styles
import './login.css';
// We'll use a direct path to the video file
// No need to import, we'll use a string path

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here we would make an API call to authenticate the user
      // For now, we'll just simulate a login
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to home page
      window.location.href = '/';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent the default layout with header and ensure video plays
  useEffect(() => {
    // Add a class to the body to hide the header for this page
    document.body.classList.add('no-header');

    // Ensure video plays - with a slight delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      if (videoRef.current) {
        // Try to load the video first
        videoRef.current.load();

        // Then play it
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing video:', error);
            // Try again with user interaction
            const handleUserInteraction = () => {
              if (videoRef.current) {
                videoRef.current.play().catch(e => console.error('Still cannot play:', e));
              }
              document.removeEventListener('click', handleUserInteraction);
            };
            document.addEventListener('click', handleUserInteraction);
          });
        }
      }
    }, 500);

    return () => {
      // Clean up when component unmounts
      document.body.classList.remove('no-header');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Video */}
      <div className="hidden md:block md:w-1/2 video-container">
        <video
          ref={videoRef}
          className="login-video"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
        >
          <source src="https://res.cloudinary.com/dnko3bvt0/video/upload/v1745195725/vid_dcxwhr.mov" type="video/quicktime" />
          <source src="https://res.cloudinary.com/dnko3bvt0/video/upload/v1745195725/vid_dcxwhr.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src="/logo.png" alt="SautiBox Logo" className="w-16 h-16 object-contain" style={{ width: '4rem', height: '4rem' }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to access your SautiBox music library</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-2 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </form>

        <div className="c text-center">
          <p className="text-gray-400 mb-4">Are you an artist?</p>
          <Link href="/artist/login" className="flex items-center justify-center space-x-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors mx-auto w-fit">
            <FiMusic size={16} />
            <span>Artist Login</span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
