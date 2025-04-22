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
  // Mobile responsiveness is now handled with Tailwind classes

  // Music player is now managed through context

  return (
    <MusicPlayerProvider>
      <div className="flex h-screen bg-background text-white overflow-x-hidden">
        <Sidebar />

        <div className="flex-1 ml-16 md:ml-16 sm:ml-16">
          <Header />

          <main className="p-2 sm:p-4 md:p-6 h-[calc(100vh-64px)] overflow-x-hidden">
            {children}
          </main>

          <MusicPlayer />
        </div>
      </div>
    </MusicPlayerProvider>
  );
};

export default MainLayout;
