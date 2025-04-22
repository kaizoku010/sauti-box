"use client";

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import ScrollToTop from './ScrollToTop';
import { MusicPlayerProvider } from '../context/MusicPlayerContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Mobile responsiveness is now handled with Tailwind classes

  // Music player is now managed through context

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white w-full overflow-hidden relative">
        <Sidebar />

        {/* Fixed Header with high z-index */}
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 ml-16">
          <Header />
        </div>

        <div className="flex-1 ml-16 relative">
          <main className="h-screen overflow-y-auto w-full no-scrollbar pb-32 pt-0">
            {children}
          </main>
        </div>

        <MusicPlayer />
        <ScrollToTop />
      </div>
    </MusicPlayerProvider>
  );
};

export default MainLayout;
