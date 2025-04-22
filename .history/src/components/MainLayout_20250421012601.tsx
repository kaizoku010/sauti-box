"use client";

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
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

        <div className="flex-1 ml-16 relative">
          <div className="sticky top-0 z-30">
            <Header />
          </div>

          <main className="p-2 sm:p-4 md:p-6 h-[calc(100vh-80px)] mt-2 overflow-y-auto w-full no-scrollbar pb-32">
            {children}
          </main>
        </div>

        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );
};

export default MainLayout;
