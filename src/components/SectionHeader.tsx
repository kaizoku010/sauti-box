import React from 'react';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, viewAllLink }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {viewAllLink && (
        <Link href={viewAllLink} className="flex items-center text-sm text-primary hover:underline">
          View all <FiChevronRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
