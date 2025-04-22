import React from 'react';
import Link from 'next/link';

interface ArtistCardProps {
  id: string;
  name: string;
  image: string;
  followers?: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, name, image, followers }) => {
  return (
    <Link href={`/artists/${id}`}>
      <div className="flex flex-col items-center group">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <h3 className="font-medium text-white text-center">{name}</h3>
        {followers !== undefined && (
          <p className="text-xs text-gray-400 text-center mt-1">
            {followers.toLocaleString()} followers
          </p>
        )}
      </div>
    </Link>
  );
};

export default ArtistCard;
