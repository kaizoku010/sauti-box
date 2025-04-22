"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiMusic, FiUser, FiUpload, FiShield, FiBarChart2, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-800 text-white shadow-lg"
        >
          {isOpen ? <FiX size="24" /> : <FiMenu size="24" />}
        </button>
      )}

      <div className={`fixed left-0 top-0 h-screen ${isMobile ? (isOpen ? 'w-64' : 'w-0') : 'w-16'} flex flex-col bg-gray-900 text-white shadow-lg transition-all duration-300 z-40 ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="flex items-center justify-center h-16 w-full">
          <Link href="/">
            <div className="sidebar-icon">
              <img src="/logo.svg" alt="MusicHub Uganda Logo" className="w-6 h-6" />
            </div>
          </Link>
        </div>

      <div className={`flex flex-col ${isMobile && isOpen ? 'items-start px-4' : 'items-center'} flex-1`}>
        <Link href="/">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiHome size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Home</span>
          </div>
        </Link>

        <Link href="/dashboard">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiBarChart2 size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Dashboard</span>
          </div>
        </Link>

        <Link href="/cart">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiShoppingCart size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Cart</span>
          </div>
        </Link>

        <Link href="/copyright">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiShield size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Copyright</span>
          </div>
        </Link>

        <Link href="/upload">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiUpload size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Upload</span>
          </div>
        </Link>
      </div>

      <div className={`flex flex-col ${isMobile && isOpen ? 'items-start px-4' : 'items-center'} mb-4`}>
        <Link href="/profile">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiUser size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Profile</span>
          </div>
        </Link>

        <Link href="/profile/library">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-800 rounded-md w-full' : 'sidebar-icon'} group`}>
            <FiMusic size="20" />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Library</span>
          </div>
        </Link>
      </div>
    </div>

      {/* Overlay to close sidebar on mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
