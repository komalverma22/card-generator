import Image from "next/image"

export default function BottomContainer() {
  return (
    <div className="w-[488px] h-[189px] relative mx-[15px] my-[15px]  rounded-[20px] overflow-hidden">
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
            <p className="text-white/80 text-[25px] courier-prime-font font-medium mb-2">Followers</p>
            <div className="text-white text-[56px] inter-font font-semibold leading-none tracking-[-5%]">1124+</div>
          </div>
          <div>
            <p className="text-white/80 text-[25px] courier-prime-font font-medium mb-2">Following</p>
            <div className="text-white text-[56px] inter-font font-semibold leading-none tracking-[-50%]">775+</div>
          </div>
        </div>

        {/* Open for work button */}
      <button className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full py-[5px] px-6 w-fit hover:bg-white/20 transition-colors border-b border-white/20 shadow-[-10px_0_15px_rgba(255,255,255,0.1)]
">
  <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white/40 shadow-[0_0_6px_rgba(0,255,0,0.5)]"></div>
  <div className="text-white font-normal text-[14px] inter-font tracking-[0.05em]">
    Open for work
  </div>
</button>

      </div>
    </div>
  )
}