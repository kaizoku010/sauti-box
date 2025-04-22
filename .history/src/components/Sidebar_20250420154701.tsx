"use client";

import React from 'react';
import Link from 'next/link';
import { FiHome, FiMusic, FiRadio, FiCalendar, FiHeart, FiSettings, FiUser, FiUpload, FiShield, FiBarChart2 } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-center h-16 w-full">
        <Link href="/">
          <div className="sidebar-icon">
            <img src="/logo.svg" alt="MusicHub Uganda Logo" className="w-6 h-6" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center flex-1">
        <Link href="/">
          <div className="sidebar-icon group">
            <FiHome size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Home</span>
          </div>
        </Link>

        <Link href="/dashboard">
          <div className="sidebar-icon group">
            <FiBarChart2 size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Dashboard</span>
          </div>
        </Link>

        <Link href="/charts">
          <div className="sidebar-icon group">
            <FiMusic size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Charts</span>
          </div>
        </Link>

        <Link href="/radio">
          <div className="sidebar-icon group">
            <FiRadio size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Radio</span>
          </div>
        </Link>

        <Link href="/events">
          <div className="sidebar-icon group">
            <FiCalendar size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Events</span>
          </div>
        </Link>

        <Link href="/copyright">
          <div className="sidebar-icon group">
            <FiShield size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Copyright</span>
          </div>
        </Link>

        <Link href="/upload">
          <div className="sidebar-icon group">
            <FiUpload size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Upload</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center mb-4">
        <Link href="/favorites">
          <div className="sidebar-icon group">
            <FiHeart size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Favorites</span>
          </div>
        </Link>

        <Link href="/settings">
          <div className="sidebar-icon group">
            <FiSettings size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Settings</span>
          </div>
        </Link>

        <Link href="/profile">
          <div className="sidebar-icon group">
            <FiUser size="20" />
            <span className="sidebar-tooltip group-hover:scale-100">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
