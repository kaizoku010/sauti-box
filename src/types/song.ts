export interface Song {
  _id?: string;
  title: string;
  artist: string;
  genre: string;
  fileName: string;
  uploadDate: Date;
  cloudinaryId: string;
  cloudinaryUrl: string;
  duration: number;
  format: string;
  status: 'active' | 'inactive' | 'processing';
}