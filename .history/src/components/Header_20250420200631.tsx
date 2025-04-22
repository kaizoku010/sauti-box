"use client";

import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiShoppingCart, FiLogIn, FiUserPlus, FiMusic } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for artists, songs, albums..."
            className="w-full max-w-md px-4 py-2 pl-10 bg-gray-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-700"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/subscribe" className="px-4 py-1 border-2 border-primary text-primary rounded-full text-sm font-medium hidden sm:block hover:bg-primary/10">
          Subscribe
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-700">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 border-2 border-primary text-primary rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
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
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-end">
              <button className="px-3 py-1.5 border-2 border-gray-700 text-gray-300 hover:border-primary hover:text-primary rounded-md text-sm font-medium flex items-center">
                <FiLogIn className="mr-1.5" size={16} />
                <span className="hidden sm:inline">Login</span>
              </button>
              <div className="dropdown-content hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-700">
                  <FiUser className="inline mr-2" size={16} />
                  User Login
                </Link>
                <Link href="/artist/login" className="block px-4 py-2 hover:bg-gray-700">
                  <FiMusic className="inline mr-2" size={16} />
                  Artist Login
                </Link>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <button className="px-3 py-1.5 border-2 border-primary text-primary hover:bg-primary/10 rounded-md text-sm font-medium flex items-center">
                <FiUserPlus className="mr-1.5" size={16} />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
              <div className="dropdown-content hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-700">
                  <FiUser className="inline mr-2" size={16} />
                  User Sign Up
                </Link>
                <Link href="/artist/register" className="block px-4 py-2 hover:bg-gray-700">
                  <FiMusic className="inline mr-2" size={16} />
                  Artist Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
