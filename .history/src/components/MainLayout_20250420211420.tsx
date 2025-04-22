"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import { MusicPlayerProvider } from '../context/MusicPlayerContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Music player is now managed through context

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white">
        <Sidebar />

        <div className={`flex-1 ${!isMobile ? 'ml-16' : 'ml-0'}`}>
          <Header />

          <main className="p-6 h-[calc(100vh-64px)]">
            {children}
          </main>

          <MusicPlayer />
        </div>
      </div>
    </MusicPlayerProvider>
  );
};

export default MainLayout;
