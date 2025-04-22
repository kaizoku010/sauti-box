import React from 'react';
import MainLayout from '../../components/MainLayout';
import { FiCheck, FiX } from 'react-icons/fi';

const SubscribePage = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Subscribe to MusicHub Uganda</h1>
        <p className="text-gray-400 text-center mb-10">Choose the plan that works best for you</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="card p-6 border border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Free Plan</h2>
              <p className="text-gray-400 mb-4">Basic features for artists getting started</p>
              <div className="text-3xl font-bold">UGX 0<span className="text-sm font-normal text-gray-400">/month</span></div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Basic copyright registration</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Upload up to 5 songs</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <FiX className="text-red-500 mr-2" />
                <span className="text-gray-500">Distribution to streaming platforms</span>
              </li>
              <li className="flex items-center">
                <FiX className="text-red-500 mr-2" />
                <span className="text-gray-500">Royalty collection</span>
              </li>
              <li className="flex items-center">
                <FiX className="text-red-500 mr-2" />
                <span className="text-gray-500">Legal support</span>
              </li>
            </ul>
            
            <button className="w-full py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Premium Plan */}
          <div className="card p-6 border border-primary relative">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              Popular
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Premium Plan</h2>
              <p className="text-gray-400 mb-4">Everything you need to grow your music career</p>
              <div className="text-3xl font-bold">UGX 50,000<span className="text-sm font-normal text-gray-400">/month</span></div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced copyright registration</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Unlimited song uploads</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Distribution to all major platforms</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Royalty collection & tracking</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Basic legal support</span>
              </li>
            </ul>
            
            <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors">
              Subscribe Now
            </button>
          </div>
          
          {/* Pro Plan */}
          <div className="card p-6 border border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Pro Plan</h2>
              <p className="text-gray-400 mb-4">For established artists and labels</p>
              <div className="text-3xl font-bold">UGX 150,000<span className="text-sm font-normal text-gray-400">/month</span></div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Priority royalty collection</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Full legal support</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Content ID system</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Marketing support</span>
              </li>
            </ul>
            
            <button className="w-full py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Payment Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mobile Money */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Mobile Money</h3>
              <p className="text-gray-400 mb-6">Pay using your mobile money account</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 0772123456" 
                    className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Provider</label>
                  <select className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                  </select>
                </div>
                
                <button className="w-full btn-primary">
                  Pay with Mobile Money
                </button>
              </form>
            </div>
            
            {/* Credit/Debit Card */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Credit/Debit Card</h3>
              <p className="text-gray-400 mb-6">Pay using your card</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <button className="w-full btn-primary">
                  Pay with Card
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscribePage;
