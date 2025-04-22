"use client";

import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiShoppingCart, FiTrash2, FiCreditCard, FiSmartphone } from 'react-icons/fi';
import Link from 'next/link';
import Eddy from "../../images/1.jpg"
import Sheba from "../../images"

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    title: 'Sitya Loss',
    artist: 'Eddy Kenzo',
    artistId: '1',
    coverImage: Eddy.src,
    price: 5000
  },
  {
    id: '3',
    title: 'Love Yo',
    artist: 'Sheebah Karungi',
    artistId: '2',
    coverImage: '/images/3.jpg',
    price: 5000
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card'>('mobile_money');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div id='page-content' className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FiShoppingCart className="mr-3" />
          Your Cart
        </h1>
        <p className="text-gray-400 mb-8">Review your items and complete your purchase</p>

        {cartItems.length === 0 && !isComplete ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <FiShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any songs to your cart yet.</p>
            <Link href="/" className="btn-primary">
              Browse Music
            </Link>
          </div>
        ) : isComplete ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase. Your songs have been added to your library.
            </p>
            <Link href="/profile/library" className="btn-primary">
              Go to My Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="card overflow-hidden">
                <div className="p-4 bg-gray-700 border-b border-gray-600">
                  <h2 className="font-bold">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center p-4 border-b border-gray-700 last:border-0">
                      <div className="w-16 h-16 rounded overflow-hidden mr-4">
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <Link href={`/artists/${item.artistId}`} className="text-sm text-gray-400 hover:text-primary">
                          {item.artist}
                        </Link>
                      </div>
                      
                      <div className="text-right mr-4">
                        <p className="font-medium">UGX {item.price.toLocaleString()}</p>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="card p-6 sticky top-4">
                <h2 className="font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>UGX {getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction Fee</span>
                    <span>UGX 0</span>
                  </div>
                  <div className="border-t border-gray-700 my-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>UGX {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <form onSubmit={handleCheckout}>
                  <div className="mb-4">
                    <div className="flex border-b border-gray-700 mb-4">
                      <button
                        type="button"
                        className={`flex-1 py-2 text-center ${paymentMethod === 'mobile_money' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                        onClick={() => setPaymentMethod('mobile_money')}
                      >
                        <FiSmartphone className="inline mr-2" />
                        Mobile Money
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 text-center ${paymentMethod === 'card' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <FiCreditCard className="inline mr-2" />
                        Card
                      </button>
                    </div>
                    
                    {paymentMethod === 'mobile_money' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Mobile Money Provider</label>
                          <select
                            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          >
                            <option value="mtn">MTN Mobile Money</option>
                            <option value="airtel">Airtel Money</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="e.g. 0772123456"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary py-3 flex items-center justify-center"
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
                      `Pay UGX ${getTotalPrice().toLocaleString()}`
                    )}
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
