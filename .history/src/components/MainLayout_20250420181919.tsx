"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import Kenzo from "../images/1.jpg"

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

  // Mock current song data
  const currentSong = {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    coverImage: Kenzo.src,
    duration: 240, // 4 minutes
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <div className={`flex-1 ${!isMobile ? 'ml-16' : 'ml-0'}`}>
        <Header />

        <main className="p-6 pb-24 overflow-y-auto h-[calc(100vh-64px-72px)]">
          {children}
        </main>

        <MusicPlayer currentSong={currentSong} />
      </div>
    </div>
  );
};

export default MainLayout;
