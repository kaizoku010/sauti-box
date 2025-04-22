export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string; // Not returned in API responses
  profileImage?: string;
  library: {
    songs: string[]; // Array of purchased song IDs
    playlists: {
      id: string;
      name: string;
      songs: string[];
    }[];
  };
  following: string[]; // Array of artist IDs
  paymentMethods?: {
    type: 'mobile_money' | 'card';
    details: {
      provider?: string; // For mobile money
      phoneNumber?: string; // For mobile money
      last4?: string; // For card
      cardType?: string; // For card
    };
  }[];
  purchaseHistory: {
    songId: string;
    artistId: string;
    amount: number;
    date: Date;
    paymentMethod: 'mobile_money' | 'card';
  }[];
  createdAt: Date;
  updatedAt: Date;
}
