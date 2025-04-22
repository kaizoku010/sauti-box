"use client";

import React, { ReactNode, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import ScrollToTop from './ScrollToTop';
import { MusicPlayerProvider } from '../context/MusicPlayerContext';
import '../scroll-header.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!headerRef.current) return;

      // Scrolling down - hide header
      if (currentScrollY > prevScrollY.current && currentScrollY > 50) {
        headerRef.current.classList.add('header-hidden');
      }
      // Scrolling up - show header
      else if (currentScrollY < prevScrollY.current) {
        headerRef.current.classList.remove('header-hidden');
      }

      prevScrollY.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile responsiveness is now handled with Tailwind classes
  // Music player is now managed through context

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white w-full overflow-hidden relative">
        <Sidebar />

        {/* Fixed Header with high z-index - transitions based on scroll */}
        <div ref={headerRef} className="header-container fixed left-0 right-0 z-50 px-4 pt-4 ml-16">
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
