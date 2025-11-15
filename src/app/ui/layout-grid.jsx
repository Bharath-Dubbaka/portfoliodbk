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
      <>
         {/* Full-screen overlay backdrop - FIXED: Now covers entire viewport */}
         <motion.div
            onClick={handleOutsideClick}
            className={cn(
               "fixed inset-0 bg-black z-40",
               selected?.id ? "pointer-events-auto" : "pointer-events-none"
            )}
            animate={{ opacity: selected?.id ? 0.5 : 0 }}
         />

         <div className="w-full h-full md:p-2 grid grid-cols-1 md:grid-cols-3 border max-w-7xl lg:max-w-[85%] mx-auto gap-5 md:gap-3 relative">
            {cards.map((card, i) => (
               <div
                  key={i}
                  className={cn(
                     card.className,
                     "bg-blue-100 border-none hover:shadow-lg shadow-blue-200 min-h-[21rem] sm:min-h-[20rem]"
                  )}
               >
                  <motion.div
                     onClick={() => handleClick(card)}
                     className={cn(
                        card.className,
                        "relative overflow-hidden ",
                        selected?.id === card.id
                           ? "rounded-lg cursor-pointer fixed border-none top-[5%] left-[2.5%] md:top-[10%] md:left-[12.5%] w-[95%] h-[90%] md:w-[75%] md:h-[80%] z-50 flex justify-center items-center flex-wrap flex-col overflow-y-auto"
                           : lastSelected?.id === card.id
                           ? "z-40 bg-white h-full w-full"
                           : "bg-white h-full w-full"
                     )}
                     layoutId={`card-${card.id}`}
                  >
                     {selected?.id === card.id && (
                        <SelectedCard
                           selected={selected}
                           onClose={handleOutsideClick}
                        />
                     )}
                     <ImageComponent card={card} />
                  </motion.div>
               </div>
            ))}
         </div>
      </>
   );
};

const ImageComponent = ({ card }) => {
   const [isHovered, setIsHovered] = useState(false);
   console.log(card, "Card from imgCompoenent");
   return (
      <div
         className="w-full h-full"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            height="500"
            width="500"
            className="object-cover object-top absolute inset-0 h-full w-full"
            alt="thumbnail"
         />

         {/* Overlay for hover and mobile */}
         <div
            className={`absolute inset-0 transition-opacity duration-300 flex flex-col items-end justify-around ${
               isHovered
                  ? "opacity-100 md:opacity-100 bg-black/20 backdrop-blur-xs"
                  : "opacity-100 md:opacity-0 bg-black/10"
            }`}
         >
            <motion.h3
               initial={{ y: -50, opacity: 0 }}
               animate={
                  isHovered ? { y: 0, opacity: 1 } : { y: -50, opacity: 1 }
               }
               transition={{ duration: 0.3 }}
               className="text-white text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r to-gray-500/60 from-gray-600/80 md:bg-transparent px-4 py-2 self-start text-start rounded-e-2xl"
            >
               {card?.content?.props?.project?.title}
            </motion.h3>
            <motion.button
               initial={{ y: 50, opacity: 0 }}
               animate={
                  isHovered ? { y: 0, opacity: 1 } : { y: 50, opacity: 1 }
               }
               transition={{ duration: 0.3, delay: 0.1 }}
               className="px-6 py-2 md:py-4 mr-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors md:bg-blue-600  self-end"
            >
               View More
            </motion.button>
         </div>
      </div>
   );
};

const SelectedCard = ({ selected, onClose }) => {
   return (
      <div className="bg-black/10 backdrop-blur-xs h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
         {/* Close button (X) - FIXED: Added for mobile and desktop */}
         <button
            onClick={(e) => {
               e.stopPropagation();
               onClose();
            }}
            className="absolute top-4 right-4 z-[80] bg-white/80 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
            aria-label="Close"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6 text-gray-800"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
               />
            </svg>
         </button>

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
            className="relative px-4 md:px-8 pb-4 z-[70]"
         >
            {selected?.content}
         </motion.div>
      </div>
   );
};
