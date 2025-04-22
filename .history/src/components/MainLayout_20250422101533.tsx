"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import ScrollToTop from './ScrollToTop';
import { MusicPlayerProvider } from '../context/MusicPlayerContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white w-full overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 ${isMobile ? 'ml-0' : 'ml-16'}`}>
          <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
        </div>

        <div className={`flex-1 relative ${isMobile ? 'ml-0' : 'ml-16'}`}>
          <main className="h-screen overflow-y-auto w-full no-scrollbar pb-32 pt-0">
            {children}
          </main>
        </div>

        <ScrollToTop />
        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );

export default MainLayout;
