import React from 'react';
import MainLayout from '../../components/MainLayout';
import { FiUpload, FiInfo, FiCheckCircle } from 'react-icons/fi';

const CopyrightPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Copyright Registration</h1>
        <p className="text-gray-400 mb-8">Protect your music with blockchain-powered copyright certificates</p>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiInfo className="mr-2 text-primary" />
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <FiUpload className="text-primary text-2xl" />
              </div>
              <h3 className="font-medium mb-2">1. Upload Your Music</h3>
              <p className="text-sm text-gray-400">Upload your original song or album</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <svg className="text-primary w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">2. Blockchain Registration</h3>
              <p className="text-sm text-gray-400">We create a unique hash and timestamp</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-primary text-2xl" />
              </div>
              <h3 className="font-medium mb-2">3. Get Your Certificate</h3>
              <p className="text-sm text-gray-400">Download your digital copyright certificate</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Register Your Music</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Song/Album Title *</label>
              <input 
                type="text" 
                placeholder="Enter the title of your song or album" 
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Artist Name(s) *</label>
              <input 
                type="text" 
                placeholder="Enter artist name(s), separate with commas for multiple artists" 
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Single Song</option>
                <option>Album</option>
                <option>EP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Genre *</label>
              <select className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Afrobeat</option>
                <option>Dancehall</option>
                <option>Hip Hop</option>
                <option>R&B</option>
                <option>Gospel</option>
                <option>Traditional</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Composition Date *</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Upload Music File(s) *</label>
              <div className="border-2 border-dashed border-gray-600 rounded-md p-8 text-center">
                <FiUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your music files here</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: MP3, WAV, FLAC (Max 50MB per file)</p>
                <button type="button" className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Additional Contributors (Optional)</label>
              <textarea 
                placeholder="List producers, songwriters, and other contributors" 
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 mr-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I confirm that I am the original creator or have the rights to register this music, and all information provided is accurate.
              </label>
            </div>
            
            <button type="submit" className="w-full btn-primary py-3">
              Register Copyright
            </button>
          </form>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Your Registered Works</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Registration Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Certificate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Sitya Loss</td>
                  <td className="py-3 px-4">Apr 15, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">Verified</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline">Download</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">African Music (Album)</td>
                  <td className="py-3 px-4">Mar 22, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">Verified</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">New Track</td>
                  <td className="py-3 px-4">Apr 20, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs">Processing</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-500 cursor-not-allowed">Pending</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CopyrightPage;
