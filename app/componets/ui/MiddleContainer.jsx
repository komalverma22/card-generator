export default function MiddleContainer(){
    return (
           <div className="flex mx-[7.5px]">
     <div 
       className="w-[238px] h-[98px] rounded-[20px] mx-[7.5px] flex flex-col justify-center px-5"
       style={{ backgroundColor: '#FFFFFF' }}
     >
         <span className="text-[17px] inter-font font-medium mb-1" style={{ color: 'rgba(77, 76, 76, 0.88)' }}>Speciality</span>
         <span className="text-[25px] font-semibold inter-font leading-none" style={{ color: '#000104' }}>UI/UX,Developer</span>
     </div>
     <div 
       className="w-[238px] h-[98px] rounded-[20px] mx-[6.5px] flex flex-col justify-center px-5"
       style={{ backgroundColor: '#FFFFFF' }}
     >
         <span className="inter-font text-[17px] font-medium mb-1" style={{ color: 'rgba(77, 76, 76, 0.88)' }}>Tools</span>
         <span className="text-[25px] font-semibold leading-none" style={{ color: '#000104' }}>Figma</span>
     </div>
    </div>
    )
}