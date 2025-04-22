"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CarouselProps {
  title: string;
  viewAllLink?: string;
  direction?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  viewAllLink,
  direction = 'left',
  children,
  className = ''
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [autoScrollDirection, setAutoScrollDirection] = useState(direction);

  const checkScrollability = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = 400; // Adjust as needed
    const currentScroll = carouselRef.current.scrollLeft;

    carouselRef.current.scrollTo({
      left: direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-scroll effect - disabled for now to prevent breaking layout
  useEffect(() => {
    // Auto-scrolling disabled to fix layout issues
    return;

    /*
    if (!isAutoScrolling || !carouselRef.current) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // If we've reached the end, change direction
      if (autoScrollDirection === 'right' && scrollLeft >= scrollWidth - clientWidth - 10) {
        setAutoScrollDirection('left');
      } else if (autoScrollDirection === 'left' && scrollLeft <= 10) {
        setAutoScrollDirection('right');
      }

      scroll(autoScrollDirection);
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
    */
  }, [isAutoScrolling, autoScrollDirection]);

  // Add scroll event listener to check scrollability
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    checkScrollability();
    carousel.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      carousel.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-gray-700 ${
              canScrollLeft ? 'text-primary hover:border-primary' : 'text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-gray-700 ${
              canScrollRight ? 'text-primary hover:border-primary' : 'text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <FiChevronRight size={20} />
          </button>

          {viewAllLink && (
            <a
              href={viewAllLink}
              className="ml-2 text-sm text-primary hover:underline"
            >
              View All
            </a>
          )}
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 pb-4 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
