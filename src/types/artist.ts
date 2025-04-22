export interface Artist {
  _id?: string;
  name: string;
  email: string;
  password?: string; // Not returned in API responses
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  genres?: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
  };
  followers: number;
  totalSales: number;
  totalStreams: number;
  songs: string[]; // Array of song IDs
  albums: string[]; // Array of album IDs
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
