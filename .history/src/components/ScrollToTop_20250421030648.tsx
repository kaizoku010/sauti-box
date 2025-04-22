"use client";

import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 10%
  const toggleVisibility = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate scroll percentage
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    if (scrollPercentage > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll to top
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
        className="w-12 h-12 rounded-full bg-primary-89/90 text-white flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>
    </div>
  );
};

export default ScrollToTop;
