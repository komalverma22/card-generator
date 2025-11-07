import Image from "next/image"
export default function TopContainer(){
    return (
        <div>
              <div className="w-[488px] h-[96px] bg-[#FFFFFF] rounded-[20px] my-[15px] mx-[15px] py-3  px-5 flex items-center justify-between ">
      <div className="flex items-center gap-4 ">
        {/* Profile picture placeholder */}
       <div className="w-[60.16px] h-[57px] bg-black rounded-[14px] flex items-center justify-center overflow-hidden relative ">
  <Image
    src="/pfp_img.png"
    alt="Profile image"
    fill
    className="object-cover"
  />
</div>

        <div className="flex flex-col inter-font ">
  <h1 className="text-[24px] font-semibold text-[#000104] leading-tight tracking-[1%]">
    coffee
  </h1>
  <p className="text-[#4D4C4C]/[0.88] text-[17px] italic tracking-[2%]">
    @coffee_0708
  </p>
</div>

      </div>
      <div className="flex flex-col gap-1.5 ">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      </div>
    </div>
        </div>
    )
}