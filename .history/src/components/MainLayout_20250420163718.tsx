"use client";

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import Kenzo from "../images/kenzo.jpg"

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Mock current song data
  const currentSong = {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    coverImage: kw,
    duration: 240, // 4 minutes
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 ml-16">
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
