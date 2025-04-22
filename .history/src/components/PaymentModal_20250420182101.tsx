"use client";

import React, { useState } from 'react';
import { FiX, FiCreditCard, FiSmartphone, FiCheck } from 'react-icons/fi';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  songTitle: string;
  artistName: string;
  price: number;
  coverImage: string;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  songTitle,
  artistName,
  price,
  coverImage,
  onPaymentComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card'>('mobile_money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState('mtn');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // Here we would make an API call to process the payment
      // For now, we'll just simulate a payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsComplete(true);
      
      // After showing success message, close modal and notify parent
      setTimeout(() => {
        onPaymentComplete();
        onClose();
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setCardExpiry(formattedValue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          disabled={isProcessing}
        >
          <FiX size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Purchase Song</h2>

          {isComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400">
                "{songTitle}" has been added to your library.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                  <img src={coverImage} alt={songTitle} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{songTitle}</h3>
                  <p className="text-gray-400 text-sm">{artistName}</p>
                  <p className="text-primary font-bold mt-1">UGX {price.toLocaleString()}</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <div className="flex border-b border-gray-700 mb-4">
                  <button
                    className={`flex-1 py-2 text-center ${paymentMethod === 'mobile_money' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    onClick={() => setPaymentMethod('mobile_money')}
                  >
                    <FiSmartphone className="inline mr-2" />
                    Mobile Money
                  </button>
                  <button
                    className={`flex-1 py-2 text-center ${paymentMethod === 'card' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FiCreditCard className="inline mr-2" />
                    Card
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {paymentMethod === 'mobile_money' ? (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Mobile Money Provider</label>
                        <select
                          value={provider}
                          onChange={(e) => setProvider(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="airtel">Airtel Money</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. 0772123456"
                          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVC</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            placeholder="123"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 flex items-center justify-center mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay UGX ${price.toLocaleString()}`
                    )}
                  </button>
                </form>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
