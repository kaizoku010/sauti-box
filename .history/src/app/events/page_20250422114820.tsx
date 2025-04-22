"use client";

import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiCalendar, FiMapPin, FiClock, FiTag, FiShare2, FiHeart, FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import KF from "../../images/events/F.jpg";
import EddyK from "../../images/1.jpg"
import Roast from "../../images/"


// Mock events data
const events = [
  {
    id: '1',
    title: 'Kampala Music Festival',
    date: '2025-08-15',
    time: '12:00 PM - 11:00 PM',
    location: 'Lugogo Cricket Oval, Kampala',
    image: '/images/events/festival.jpg',
    description: 'The biggest music festival in Uganda featuring top local and international artists.',
    artists: ['Eddy Kenzo', 'Sheebah Karungi', 'Winnie Nwagi', 'Spice Diana'],
    ticketPrice: 50000,
    ticketUrl: '#'
  },
  {
    id: '2',
    title: 'Eddy Kenzo Live Concert',
    date: '2025-07-20',
    time: '7:00 PM - 11:00 PM',
    location: 'Serena Hotel, Kampala',
    image: '/images/events/concert.jpg',
    description: 'Eddy Kenzo performs live with his full band for an unforgettable night of music.',
    artists: ['Eddy Kenzo'],
    ticketPrice: 100000,
    ticketUrl: '#'
  },
  {
    id: '3',
    title: 'Blankets & Wine',
    date: '2025-06-12',
    time: '2:00 PM - 8:00 PM',
    location: 'Lugogo Cricket Oval, Kampala',
    image: '/images/events/blankets.jpg',
    description: 'A picnic-style music festival featuring the best of Ugandan and East African music.',
    artists: ['Sheebah Karungi', 'Winnie Nwagi', 'Sauti Sol'],
    ticketPrice: 80000,
    ticketUrl: '#'
  },
  {
    id: '4',
    title: 'Nyege Nyege Festival',
    date: '2025-09-05',
    time: 'All Day',
    location: 'Itanda Falls, Jinja',
    image: '/images/events/nyege.jpg',
    description: 'A four-day international music festival celebrating underground electronic music from Africa.',
    artists: ['Various Artists'],
    ticketPrice: 150000,
    ticketUrl: '#'
  },
  {
    id: '5',
    title: 'Jazz Safari',
    date: '2025-07-05',
    time: '6:00 PM - 10:00 PM',
    location: 'Serena Hotel, Kampala',
    image: '/images/events/jazz.jpg',
    description: 'An evening of smooth jazz and soul music featuring local and international jazz artists.',
    artists: ['Maurice Kirya', 'Isaiah Katumwa'],
    ticketPrice: 120000,
    ticketUrl: '#'
  },
  {
    id: '6',
    title: 'Roast and Rhyme',
    date: '2025-06-28',
    time: '12:00 PM - 8:00 PM',
    location: 'Jahazi Pier, Munyonyo',
    image: '/images/events/roast.jpg',
    description: 'A family-friendly event combining barbecue, drinks, and live music by the lakeside.',
    artists: ['Lillian Mbabazi', 'Kenneth Mugabi'],
    ticketPrice: 70000,
    ticketUrl: '#'
  }
];

const EventsPage = () => {
  const [filter, setFilter] = useState('all');
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const toggleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEvents = filter === 'all'
    ? events
    : filter === 'saved'
      ? events.filter(event => savedEvents.includes(event.id))
      : events.filter(event => new Date(event.date) > new Date());

  return (
    <MainLayout>
      <div id='page-content' className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FiCalendar className="mr-3 text-primary" />
              Events
            </h1>
            <p className="text-gray-400">Discover upcoming music events in Uganda</p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'border border-primary text-primary' : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}`}
                onClick={() => setFilter('all')}
              >
                All Events
              </button>
              <button
                className={`px-4 py-2 rounded-md ${filter === 'upcoming' ? 'border border-primary text-primary' : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`px-4 py-2 rounded-md ${filter === 'saved' ? 'border border-primary text-primary' : 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}`}
                onClick={() => setFilter('saved')}
              >
                Saved
              </button>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <FiCalendar size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No events found</h2>
            <p className="text-gray-400 mb-6">
              {filter === 'saved'
                ? 'You haven\'t saved any events yet.'
                : 'There are no events matching your criteria.'}
            </p>
            {filter !== 'all' && (
              <button
                className="btn-primary"
                onClick={() => setFilter('all')}
              >
                View All Events
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card group overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={event.image || '/images/events/default.jpg'}
                    alt={event.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 bg-black text-primary px-3 py-1 m-3 rounded-md">
                    {formatDate(event.date).split(',')[0]}
                  </div>
                  <button
                    className={`absolute top-0 right-0 p-2 m-2 rounded-full ${
                      savedEvents.includes(event.id)
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}
                    onClick={() => toggleSaveEvent(event.id)}
                  >
                    <FiHeart size={18} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <FiCalendar className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-start">
                      <FiClock className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{event.time}</span>
                    </div>

                    <div className="flex items-start">
                      <FiMapPin className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-primary">UGX {event.ticketPrice.toLocaleString()}</span>

                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary">
                        <FiShare2 size={18} />
                      </button>
                      <Link
                        href={event.ticketUrl}
                        className="flex items-center px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary/10"
                      >
                        <FiTag className="mr-1" size={16} />
                        <span>Tickets</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Event */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-6">Featured Event</h2>

          <div className="card overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="/images/events/festival.jpg"
                  alt="Kampala Music Festival"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">Kampala Music Festival 2025</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <FiCalendar className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">August 15-17, 2025</span>
                  </div>

                  <div className="flex items-start">
                    <FiMapPin className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Lugogo Cricket Oval, Kampala</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  The biggest music festival in Uganda returns for its 5th edition! Join us for three days of
                  non-stop music featuring over 50 artists across 3 stages. Early bird tickets available now.
                </p>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Featured Artists</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Eddy Kenzo</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Sheebah Karungi</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Winnie Nwagi</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Spice Diana</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">+46 more</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-gray-400">Early Bird Tickets</span>
                    <span className="font-bold text-primary text-xl">UGX 150,000</span>
                  </div>

                  <Link
                    href="#"
                    className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 flex items-center"
                  >
                    <FiTag className="mr-2" />
                    Get Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
