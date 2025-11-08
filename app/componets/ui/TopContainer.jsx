'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function TopContainer({ onUsernameChange, userData, isLoading }) {
  const [inputUsername, setInputUsername] = useState('');
  const defaultImage = '/default-avatar.svg';
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputUsername(newValue);
  };

  return (
    <div className="w-[488px] h-[96px] bg-[#FFFFFF] rounded-[20px] my-[15px] mx-[15px] p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] rounded-2xl overflow-hidden bg-gray-100">
          {userData?.profile_image_url ? (
            <Image
              src={userData.profile_image_url}
              alt="Profile"
              width={70}
              height={70}
              className="object-cover w-full h-full"
              unoptimized
            />
          ) : (
            <Image
              src={defaultImage}
              alt="Default Profile"
              width={70}
              height={70}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex flex-col h-[57px] justify-center">
          <h1 className="text-[32px] font-bold text-black leading-none">
            {userData?.name || 'coffee'}
          </h1>
          <div className="relative">
            <input
              type="text"
              value={inputUsername}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputUsername) {
                  onUsernameChange(inputUsername.replace('@', ''));
                }
              }}
              onBlur={() => {
                if (inputUsername) {
                  onUsernameChange(inputUsername.replace('@', ''));
                }
              }}
              className="text-gray-500 text-xl bg-transparent outline-none border-b border-transparent hover:border-gray-200 focus:border-gray-400 transition-colors w-full"
              placeholder="@username"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 ">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}