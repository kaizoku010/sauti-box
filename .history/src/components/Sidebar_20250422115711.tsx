"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiMusic, FiRadio, FiCalendar, FiHeart, FiUser, FiUpload, FiShield, FiBarChart2, FiMenu, FiX, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

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

      <div id='drawer' className={`fixed left-0 top-0 h-screen ${isMobile ? (isOpen ? 'w-64' : 'w-0') : 'w-16'} flex flex-col bg-background text-white shadow-lg transition-all duration-300 z-40 ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} overflow-hidden`}>
        <div className="flex items-center justify-center h-16 w-full">
          <Link href="/">
            <div className="sidebar-icon">
              <img src="/logo.svg" alt="SautiBox Logo" className="w-6 h-6" />
            </div>
          </Link>
        </div>

      <div className={`flex flex-col ${isMobile && isOpen ? 'items-start px-4' : 'items-center'} flex-1`}>
        <Link href="/">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/' ? 'active' : ''} group`}>
            <FiHome size="18" className={pathname === '/' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Home</span>
          </div>
        </Link>

        <Link href="/dashboard">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/dashboard' ? 'active' : ''} group`}>
            <FiBarChart2 size="18" className={pathname === '/dashboard' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Dashboard</span>
          </div>
        </Link>

        <Link href="/charts">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/charts' ? 'active' : ''} group`}>
            <FiMusic size="18" className={pathname === '/charts' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Charts</span>
          </div>
        </Link>

        <Link href="/radio">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/radio' ? 'active' : ''} group`}>
            <FiRadio size="18" className={pathname === '/radio' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Radio</span>
          </div>
        </Link>

        <Link href="/events">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/events' ? 'active' : ''} group`}>
            <FiCalendar size="18" className={pathname === '/events' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Events</span>
          </div>
        </Link>

        <Link href="/copyright">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/copyright' ? 'active' : ''} group`}>
            <FiShield size="18" className={pathname === '/copyright' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Copyright</span>
          </div>
        </Link>

        {/* <Link href="/upload">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/upload' ? 'active' : ''} group`}>
            <FiUpload size="18" className={pathname === '/upload' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Upload</span>
          </div>
        </Link> */}
      </div>

      <div className={`flex flex-col ${isMobile && isOpen ? 'items-start px-4' : 'items-center'} mb-4`}>
        <Link href="/wishlist">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/wishlist' ? 'active' : ''} group`}>
            <FiHeart size="18" className={pathname === '/wishlist' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Wishlist</span>
          </div>
        </Link>

        <Link href="/cart">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/cart' ? 'active' : ''} group`}>
            <FiShoppingCart size="18" className={pathname === '/cart' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Cart</span>
          </div>
        </Link>

        <Link href="/subscribe">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/subscribe' ? 'active' : ''} group`}>
            <FiDollarSign size="18" className={pathname === '/subscribe' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Subscribe</span>
          </div>
        </Link>

        <Link href="/profile">
          <div className={`${isMobile && isOpen ? 'flex items-center py-3 px-2 hover:bg-gray-900 hover:text-primary rounded-md w-full' : 'sidebar-icon'} ${pathname === '/profile' ? 'active' : ''} group`}>
            <FiUser size="18" className={pathname === '/profile' ? 'text-primary' : ''} />
            <span className={`${isMobile && isOpen ? 'ml-3' : 'sidebar-tooltip group-hover:scale-100'}`}>Profile</span>
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
