"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards }) => {
   console.log("cards prop:", cards);
   const [selected, setSelected] = useState(null);
   const [lastSelected, setLastSelected] = useState(null);

   const handleClick = (card) => {
      setLastSelected(selected);
      setSelected(card);
   };

   const handleOutsideClick = () => {
      setLastSelected(selected);
      setSelected(null);
   };

   // ✅ Safety guard — avoids crash if cards is undefined
   if (!cards || !Array.isArray(cards)) {
      console.error("⚠️ cards prop is undefined or not an array:", cards);
      return null;
   }

   return (
      <div className="min-w-full h-full md:p-2 grid grid-cols-1 md:grid-cols-3 border max-w-7xl md:max-w-[90%] mx-auto gap-4 relative ">
         {cards.map((card, i) => (
            <div
               key={i}
               className={cn(card.className, "bg-blue-100 border-none")}
            >
               <motion.div
                  onClick={() => handleClick(card)}
                  className={cn(
                     card.className,
                     "relative overflow-hidden ",
                     selected?.id === card.id
                        ? "rounded-lg cursor-pointer absolute border-none inset-0 h-1/2 w-full md:w-[75%] md:h-[60%] m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                        : lastSelected?.id === card.id
                        ? "z-40 bg-white  h-full w-full  "
                        : "bg-white h-full w-full  "
                  )}
                  layoutId={`card-${card.id}`}
               >
                  {selected?.id === card.id && (
                     <SelectedCard selected={selected} />
                  )}
                  <ImageComponent card={card} />
               </motion.div>
            </div>
         ))}
         <motion.div
            onClick={handleOutsideClick}
            className={cn(
               "absolute h-full w-full left-0 top-0 opacity-0 z-10",
               selected?.id ? "pointer-events-auto" : "pointer-events-none"
            )}
            animate={{ opacity: selected?.id ? 0.3 : 0 }}
         />
      </div>
   );
};

const ImageComponent = ({ card }) => {
   return (
      <motion.img
         layoutId={`image-${card.id}-image`}
         src={card.thumbnail}
         height="500"
         width="500"
         className={cn(
            "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
         )}
         alt="thumbnail"
      />
   );
};

const SelectedCard = ({ selected }) => {
   return (
      <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
         <motion.div
            initial={{
               opacity: 0,
            }}
            animate={{
               opacity: 0.4,
            }}
            className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
         />
         <motion.div
            layoutId={`content-${selected?.id}`}
            initial={{
               opacity: 0,
               y: 100,
            }}
            animate={{
               opacity: 1,
               y: 0,
            }}
            exit={{
               opacity: 0,
               y: 100,
            }}
            transition={{
               duration: 0.3,
               ease: "easeInOut",
            }}
            className="relative px-8 pb-4 z-[70]"
         >
            {selected?.content}
         </motion.div>
      </div>
   );
};
