import Image from "next/image"
export default function BottomConatiner(){
    
    return(
          <div className="w-[488px] h-[189px] relative mx-[15px] my-[15px]">
  <Image 
    src="/bottom-img.png"
    alt="Bottom image"
    fill
    className="object-cover rounded-[10px]" 
  />
</div>
    )
}