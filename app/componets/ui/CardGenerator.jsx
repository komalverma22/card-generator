'use client';

import { useState } from 'react';
import TopContainer from './TopContainer';
import MiddleContainer from './MiddleContainer';
import BottomContainer from './BottomContainer';

export default function CardGenerator() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Remove @ if user included it
      const cleanUsername = username.replace('@', '').trim();
      
      console.log('Fetching data for:', cleanUsername);
      
      const response = await fetch(`/api/twitter-user?username=${cleanUsername}`);
      const result = await response.json();

      console.log('API Response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch user data');
      }

      if (!result.data) {
        throw new Error('No data received from API');
      }

      setUserData(result.data);
      setError('');
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch user data. Please try again.');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Twitter Card Generator
          </h1>
          <p className="text-gray-600 mb-6">
            Enter a Twitter/X username to generate a card
          </p>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Enter username (e.g., elonmusk)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
              disabled={loading}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !username.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">Error:</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Fetching user data...</p>
            </div>
          )}
        </div>

        {/* Card Preview */}
        {userData && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <TopContainer userData={userData} />
            <MiddleContainer userData={userData} />
            <BottomContainer userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
}