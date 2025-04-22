// Mock data for MusicHub Uganda app
import placeholder from "../../public/images/covers/placeholder.svg";
// Mock data for MusicHub Uganda app
// import Image1 from "../images/1.jpg";
// import Image2 from "../images/2.jpg";
import Image3 from "../images/3.jpg";
import Image4 from "../images/B.jpg";
import Image5 from "../images/F.jpg";
import Image6 from "../images/n.png";

// Using a single object for all image paths to make it easier to manage
const imagePaths = {
  image1: "/images/covers/1.jpg",
  image2: "/images/covers/2.jpg",
  image3: "/images/covers/3.jpg",
};

export const topCharts = [
  {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    coverImage: imagePaths.image1,
    type: 'song'
  },
  {
    id: '2',
    title: 'Stamina',
    artist: 'Fik Fameica',
    coverImage: imagePaths.image2,
    type: 'song'
  },
  {
    id: '3',
    title: 'Love Yo',
    artist: 'Sheebah Karungi',
    coverImage: imagePaths.image3,
    type: 'song'
  },
  {
    id: '4',
    title: 'Fire Baby',
    artist: 'Winnie Nwagi',
    coverImage: imagePaths.image1,
    type: 'song'
  },
  {
    id: '5',
    title: 'Midnight Drum',
    artist: 'Azawi',
    coverImage: imagePaths.image2,
    type: 'song'
  }
];

export const upcomingEvents = [
  {
    id: '1',
    title: 'Nyege Nyege Festival',
    date: 'Sep 15, 2025',
    location: 'Jinja, Uganda',
    image: imagePaths.image3,
    price: 'UGX 150,000'
  },
  {
    id: '2',
    title: 'Kampala Music Festival',
    date: 'Aug 5, 2025',
    location: 'Lugogo Cricket Oval',
    image: imagePaths.image1,
    price: 'UGX 80,000'
  },
  {
    id: '3',
    title: 'Blankets & Wine',
    date: 'Jul 12, 2025',
    location: 'Lugogo Cricket Oval',
    image: imagePaths.image2,
    price: 'UGX 100,000'
  }
];

export const newReleases = [
  {
    id: '6',
    title: 'Slow Down',
    artist: 'Azawi',
    coverImage: imagePaths.image3,
    type: 'song'
  },
  {
    id: '7',
    title: 'Party',
    artist: 'Vinka',
    coverImage: imagePaths.image1,
    type: 'song'
  },
  {
    id: '8',
    title: 'All Night',
    artist: 'Fik Fameica',
    coverImage: imagePaths.image2,
    type: 'song'
  },
  {
    id: '9',
    title: 'Yo Sweet',
    artist: 'Sheebah Karungi',
    coverImage: imagePaths.image3,
    type: 'song'
  },
  {
    id: '10',
    title: 'Burn',
    artist: 'John Blaq',
    coverImage: imagePaths.image1,
    type: 'song'
  }
];

export const featuredArtists = [
  {
    id: '1',
    name: 'Eddy Kenzo',
    image: imagePaths.image1,
    followers: 1200000
  },
  {
    id: '2',
    name: 'Sheebah',
    image: imagePaths.image2,
    followers: 980000
  },
  {
    id: '3',
    name: 'Azawi',
    image: imagePaths.image3,
    followers: 750000
  },
  {
    id: '4',
    name: 'Fik Fameica',
    image: imagePaths.image1,
    followers: 820000
  },
  {
    id: '5',
    name: 'Winnie Nwagi',
    image: imagePaths.image2,
    followers: 680000
  },
  {
    id: '6',
    name: 'Spice Diana',
    image: imagePaths.image3,
    followers: 720000
  }
];

export const topAlbums = [
  {
    position: 1,
    id: '1',
    title: 'Stamina',
    artist: 'Fik Fameica',
    coverImage: imagePaths.image1,
    releaseDate: '2025',
    isLiked: true
  },
  {
    position: 2,
    id: '2',
    title: 'African Music',
    artist: 'Eddy Kenzo',
    coverImage: imagePaths.image2,
    releaseDate: '2024',
    isLiked: false
  },
  {
    position: 3,
    id: '3',
    title: 'Samali',
    artist: 'Azawi',
    coverImage: imagePaths.image3,
    releaseDate: '2025',
    isLiked: true
  },
  {
    position: 4,
    id: '4',
    title: 'Fire',
    artist: 'Winnie Nwagi',
    coverImage: imagePaths.image1,
    releaseDate: '2024',
    isLiked: false
  },
  {
    position: 5,
    id: '5',
    title: 'Queen Karma',
    artist: 'Sheebah',
    coverImage: imagePaths.image2,
    releaseDate: '2025',
    isLiked: false
  },
  {
    position: 6,
    id: '6',
    title: 'Amapiano',
    artist: 'Vinka',
    coverImage: imagePaths.image3,
    releaseDate: '2024',
    isLiked: true
  }
];

export const bestPlaylists = [
  {
    id: '1',
    title: 'Ugandan Hits 2025',
    coverImage: imagePaths.image1,
    songCount: 25
  },
  {
    id: '2',
    title: 'Kampala Party Mix',
    coverImage: imagePaths.image2,
    songCount: 18
  },
  {
    id: '3',
    title: 'Ugandan Classics',
    coverImage: imagePaths.image3,
    songCount: 30
  },
  {
    id: '4',
    title: 'New Wave Uganda',
    coverImage: imagePaths.image1,
    songCount: 15
  }
];

export const liveRadioStations = [
  {
    id: '1',
    name: 'Capital FM',
    image: imagePaths.image1,
    frequency: '91.3 FM'
  },
  {
    id: '2',
    name: 'Radio City',
    image: imagePaths.image2,
    frequency: '97.3 FM'
  },
  {
    id: '3',
    name: 'Galaxy FM',
    image: imagePaths.image3,
    frequency: '100.2 FM'
  },
  {
    id: '4',
    name: 'XFM',
    image: imagePaths.image1,
    frequency: '94.8 FM'
  },
  {
    id: '5',
    name: 'Sanyu FM',
    image: imagePaths.image2,
    frequency: '88.2 FM'
  }
];

