"use client";
import { PixelatedCanvas } from "./pixelated-canvas";
import Img_firstbite from "../../../public/assets/projectImgs/Img_firstbite.png";

export function PixelatedCanvasDemo() {
   return (
      <div className="mx-auto mt-8 overflow-x-auto">
         <PixelatedCanvas
            src="/assets/dbk.jpeg"
            width={600}
            height={400}
            cellSize={1}
            dotScale={0.9}
            shape="square"
            backgroundColor="#1a1a1a"
            dropoutStrength={0.2}
            interactive={false}
            className="rounded-xl border border-neutral-800 shadow-lg"
         />
      </div>
   );
}
