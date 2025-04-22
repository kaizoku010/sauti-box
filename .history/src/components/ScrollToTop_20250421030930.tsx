"use client";

import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled 10% down
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrolled / height) * 100;

    if (scrollPercent > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed left-6 bottom-24 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-primary-89/90 text-white flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>
    </div>
  );
};

export default ScrollToTop;
