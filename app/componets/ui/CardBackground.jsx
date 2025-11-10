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
  const [isDownloading, setIsDownloading] = useState(false);
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

    setIsDownloading(true);
    
    try {
     const canvas = await html2canvas(card, {
  scale: 2,
  useCORS: true,
  allowTaint: false,
  backgroundColor: '#E5E5E5',
  logging: false,
  windowWidth: card.scrollWidth,
  windowHeight: card.scrollHeight,
  scrollX: 0,
  scrollY: -window.scrollY,
});

      
      const url = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${username || 'twitter'}-card.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download card:', err);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div className="flex flex-col items-center">
        <div 
          id="card-container" 
          className="w-[522px] h-[447px] rounded-[33px] flex flex-col justify-center items-center"
          style={{ backgroundColor: '#E5E5E5' }}
        >
          <TopContainer onUsernameChange={handleUsernameChange} userData={userData} isLoading={isLoading} />
          <MiddleContainer userData={userData} />
          <BottomContainer userData={userData} />
        </div>
        
        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading || !userData}
          className="mt-8 px-6 py-3 text-[#000104] inter-font rounded-lg transition-colors disabled:opacity-100 font-medium disabled:cursor-not-allowed"
          style={{ backgroundColor: '#E5E5E5' }}
          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#E5E5E5')}
          onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#E5E5E5')}
        >
          {isDownloading ? 'Downloading...' : 'Download Card'}
        </button>
      </div>
    </div>
  );
}