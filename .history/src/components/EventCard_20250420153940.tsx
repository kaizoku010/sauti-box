import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price?: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, date, location, image, price }) => {
  return (
    <div className="card group relative">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        {price && (
          <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white text-lg">{title}</h3>
        <div className="flex items-center mt-2 text-gray-400">
          <FiCalendar className="mr-2" size={14} />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center mt-1 text-gray-400">
          <FiMapPin className="mr-2" size={14} />
          <span className="text-sm">{location}</span>
        </div>
        <button className="w-full mt-4 btn-primary">Get Tickets</button>
      </div>
    </div>
  );
};

export default EventCard;
