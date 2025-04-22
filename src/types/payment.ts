export interface Payment {
  _id?: string;
  userId: string;
  songId: string;
  artistId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'mobile_money' | 'card';
  paymentDetails: {
    provider?: string; // For mobile money
    phoneNumber?: string; // For mobile money
    transactionId?: string;
    last4?: string; // For card
    cardType?: string; // For card
  };
  createdAt: Date;
  updatedAt: Date;
}
