'use client';
import { useState } from 'react';
import TopContainer from "./TopContainer";
import MiddleContainer from "./MiddleContainer";
import BottomContainer from "./BottomContainer";
import html2canvas from 'html2canvas';

export default function CardBackground() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = async (newUsername) => {
    setUsername(newUsername);
    await fetchTwitterData(newUsername);
  };

  const fetchTwitterData = async (username) => {
    if (!username) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/twitter-user?username=${username}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch user data');
      }
      
      console.log('Received data:', result);
      setUserData(result.data);
    } catch (err) {
      console.error('Error fetching Twitter data:', err);
      setError('Could not fetch user data. Please check the username and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownload = async () => {
    const card = document.getElementById('card-container');
    if (!card) return;

    try {
      const canvas = await html2canvas(card);
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${username}-card.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div className="flex flex-col items-center">
        <div id="card-container" className="w-[522px] h-[447px] bg-[#E5E5E5] rounded-[33px] flex flex-col justify-center items-center">
          <TopContainer onUsernameChange={handleUsernameChange} userData={userData} isLoading={isLoading} />
          <MiddleContainer userData={userData} />
          <BottomContainer userData={userData} />
        </div>
        
        {/* Download button */}
        <button
          onClick={handleDownload}
          className="mt-8 px-6 py-3 bg-[#D9D9D9] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Download Card
        </button>
      </div>
    </div>
  );
}