"use client";

import React, { ReactNode, useEffect } from 'react';
import './artist-login.css';

interface LoginLayoutProps {
  children: ReactNode;
}

const ArtistLoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Ensure the body has the no-header class
    document.body.classList.add('no-header');

    return () => {
      document.body.classList.remove('no-header');
    };
  }, []);

  return (
    <div className="login-layout">
      {children}
    </div>
  );
};

export default ArtistLoginLayout;
