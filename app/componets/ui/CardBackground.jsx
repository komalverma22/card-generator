import Image from "next/image"
import TopContainer from "./TopConatiner"
import MiddleContainer from "./MiddleContainer"
import BottomContainer from "./BottomContainer"
export default function CardBackground(){
    return (
        <div className="flex justify-center items-center h-screen w-screen">
  <div className="w-[522px] h-[447px] bg-[#E5E5E5] rounded-[33px]  justify-center  ">
    {/* top container */}
  <TopContainer/>
    {/* middle container */}
   <MiddleContainer/>
    {/* bottom container */}
 
   <BottomContainer/>
  </div>
</div>

    )
}