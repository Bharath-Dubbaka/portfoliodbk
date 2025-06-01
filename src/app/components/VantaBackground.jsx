// components/VantaBackground.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const VantaBackground = () => {
   const vantaRef = useRef(null);
   const [vantaEffect, setVantaEffect] = useState(null);

   useEffect(() => {
      if (!vantaEffect && typeof window !== "undefined") {
         setVantaEffect(
            NET({
               el: vantaRef.current,
               THREE,
               color: 0xff3f81, // ✅ YOUR CUSTOM COLOR
               backgroundColor: 0x23153c, // ✅ YOUR BACKGROUND COLOR
               points: 15.0,
               maxDistance: 25.0,
               spacing: 18.0,
            })
         );
      }
      return () => {
         if (vantaEffect) vantaEffect.destroy();
      };
   }, [vantaEffect]);

   return <div ref={vantaRef} className="w-full h-screen" />;
};

export default VantaBackground;
