"use client";

import React, { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SectionHeader from './SectionHeader';

interface MultiCarouselProps {
  title: string;
  viewAllLink?: string;
  children: ReactNode;
  className?: string;
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({
  title,
  viewAllLink,
  children,
  className = ''
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 2
    }
  };

  return (
    <div className={`mb-10 ${className}`}>
      <SectionHeader title={title} viewAllLink={viewAllLink} />

      <Carousel
        responsive={responsive}
        infinite={false}
        draggable={true}
        swipeable={true}
        centerMode={false}
        keyBoardControl={true}
        containerClass="carousel-container py-2"
        removeArrowOnDeviceType={["mobile"]}
        itemClass="carousel-item px-2"
        autoPlay={false}
        autoPlaySpeed={5000}
        customTransition="transform 500ms ease-in-out"
        arrows={true}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        showDots={false}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
