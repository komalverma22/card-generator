import Image from "next/image";
import LandingPage from "../app/componets/LandingPage"
export default function Home() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/background1.png"
        alt="background-img"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    <div className="absolute">
     <LandingPage/>
    </div>
    </div>
  );
}

