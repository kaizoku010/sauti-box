"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiUser, FiShoppingCart, FiLogIn, FiUserPlus, FiX } from 'react-icons/fi';
import Link from 'next/link';
import LogoFull from '../images/logo_full.png';
import '../player.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the search input when it's opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="flex items-center justify-between px-8 sm:px-8 md:px-8 py-3 glass-effect text-white rounded-[40px] w-full backdrop-blur-xl" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src={LogoFull.src} alt="SautiBox" className="h-[2.6rem] object-contain" />
        </Link>
      </div>
      <div className="flex-1"></div>

      <div className="flex items-center space-x-5">
        {/* Expandable Search */}
        <div className="relative">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for artists..."
                className="w-64 px-4 py-2 pl-10 bg-gray-800/40 backdrop-blur-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary-89 border border-gray-700/50 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-89"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-800/40 text-gray-300 hover:text-primary-89 transition-colors"
            >
              <FiSearch size={20} />
            </button>
          )}
        </div>
        {/* <Link href="/subscribe" className="px-4 py-1 border border-primary text-primary rounded-full text-sm font-medium hidden sm:block hover:bg-primary/10">
          Subscribe
        </Link> */}

        {isLoggedIn ? (
          <>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-700">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 border border-primary text-primary rounded-full text-xs flex items-center justify-center">
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
              <span className="font-medium text-sm hidden md:block">K. Dixon</span>
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <button id='curved' className="px-3 py-1.5 border border-primary-89 text-white bg-transparent hover:bg-primary-89 hover:text-white rounded-full text-sm font-medium flex items-center backdrop-blur-sm transition-colors">
                <FiLogIn className="mr-1.5" size={16} />
                <span className="hidden sm:inline">Login</span>
              </button>
            </Link>

            <Link href="/register">
              <button id='curved' className="px-3 py-1.5 border border-primary-89 text-white bg-transparent hover:bg-primary-89 hover:text-white rounded-full text-sm font-medium flex items-center backdrop-blur-sm transition-colors">
                <FiUserPlus className="mr-1.5" size={16} />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
