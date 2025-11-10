import Image from "next/image"

export default function BottomContainer({ userData }) {
  return (
    <div className="w-[488px] h-[189px] relative mx-[15px] my-[15px] rounded-[20px] overflow-hidden">
      {/* Wave background */}
      <div className="absolute inset-0 opacity-100">
        <Image
          src="/bottom-img.png"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 px-5 py-3 flex flex-col h-full">
        {/* Followers count */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-[25px] courier-prime-font font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Followers</p>
            <div className="text-[56px] inter-font font-semibold leading-none tracking-[-5%]" style={{ color: '#FFFFFF' }}>
              {userData?.public_metrics?.followers_count?.toLocaleString() || '0'}+
            </div>
          </div>
          <div>
            <p className="text-[25px] courier-prime-font font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Following</p>
            <div className="text-[56px] inter-font font-semibold leading-none tracking-[-50%]" style={{ color: '#FFFFFF' }}>
              {userData?.public_metrics?.following_count?.toLocaleString() || '0'}+
            </div>
          </div>
        </div>

        {/* Open for work button */}
        <button 
          className="flex items-center gap-4 backdrop-blur-md rounded-full py-[5px] px-6 w-fit transition-colors border-b shadow-[-10px_0_15px_rgba(255,255,255,0.1)]"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <div 
            className="w-2.5 h-2.5 rounded-full border shadow-[0_0_6px_rgba(0,255,0,0.5)]"
            style={{ 
              backgroundColor: '#10B981',
              borderColor: 'rgba(255, 255, 255, 0.4)'
            }}
          ></div>
          <div className="font-normal text-[14px] inter-font tracking-[0.05em]" style={{ color: '#FFFFFF' }}>
            Open for work
          </div>
        </button>

      </div>
    </div>
  )
}