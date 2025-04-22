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
  // State to track header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Throttle function to limit how often the scroll handler fires
  const throttle = (callback: Function, delay: number) => {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  // Handle scroll event to show/hide header
  const controlHeader = throttle(() => {
    const currentScrollY = window.scrollY;

    // Show header when scrolling up, hide when scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & past threshold - hide header
      setIsHeaderVisible(false);
    } else {
      // Scrolling up or at top - show header
      setIsHeaderVisible(true);
    }

    // Update last scroll position
    setLastScrollY(currentScrollY);
  }, 200); // Throttle to 200ms

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', controlHeader);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  // Mobile responsiveness is now handled with Tailwind classes
  // Music player is now managed through context

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white w-full overflow-hidden relative">
        <Sidebar />

        {/* Fixed Header with high z-index - transitions based on scroll */}
        <div className={`fixed left-0 right-0 z-50 px-4 pt-4 ml-16 transition-all duration-300 ease-in-out transform ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <Header />
        </div>

        <div className="flex-1 ml-16 relative">
          <main className="h-screen overflow-y-auto w-full no-scrollbar pb-32 pt-20">
            {children}
          </main>
        </div>

        <ScrollToTop />
        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );
};

export default MainLayout;
