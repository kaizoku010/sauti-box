"use client";

import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for artists, songs, albums..."
            className="w-full max-w-md px-4 py-2 pl-10 bg-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/subscribe" className="px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-sm font-medium">
          Subscribe
        </Link>

        <button className="relative p-2 rounded-full hover:bg-gray-700">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link href="/profile" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <FiUser size={16} />
          </div>
          <span className="font-medium text-sm hidden md:block">John Doe</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
