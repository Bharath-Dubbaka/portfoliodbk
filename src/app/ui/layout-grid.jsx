"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  // Lock background body scroll when a card is expanded
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  if (!cards || !Array.isArray(cards)) {
    console.error("⚠️ cards prop is undefined or not an array:", cards);
    return null;
  }

  return (
    <>
      {/* Full-screen overlay backdrop */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-all",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="w-full h-full md:p-2 grid grid-cols-1 md:grid-cols-3 border max-w-7xl lg:max-w-[85%] mx-auto gap-5 md:gap-3 relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className={cn(
              card.className,
              "bg-transparent border-none rounded-xl min-h-[21rem] sm:min-h-[20rem] relative",
            )}
          >
            <motion.div
              onClick={() => selected?.id !== card.id && handleClick(card)}
              className={cn(
                "relative overflow-hidden rounded-xl h-full w-full",
                selected?.id === card.id
                  ? "fixed inset-4 md:inset-x-[15%] md:inset-y-[8%] z-50 block overflow-hidden bg-[#0c0c12] border border-neutral-800/80 shadow-2xl rounded-2xl"
                  : lastSelected?.id === card.id
                    ? "z-40 bg-white"
                    : "bg-white cursor-pointer",
              )}
              layoutId={`card-${card.id}`}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              {selected?.id === card.id ? (
                <SelectedCard
                  selected={selected}
                  onClose={handleOutsideClick}
                />
              ) : (
                <ImageComponent card={card} />
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
};

const ImageComponent = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-full h-full relative"
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
        className={cn(
          "absolute inset-0 transition-all duration-300 flex flex-col items-end justify-around p-4",
          isHovered
            ? "opacity-100 bg-black/45 backdrop-blur-xs"
            : "opacity-100 md:opacity-0 bg-black/10",
        )}
      >
        <motion.h3
          initial={{ y: -50, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: -50, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r to-gray-500/60 from-gray-600/80 md:bg-transparent px-4 py-2 self-start text-start rounded-e-2xl"
        >
          {card?.content?.props?.project?.title}
        </motion.h3>
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 50, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-6 py-2 md:py-4 mr-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors md:bg-blue-600 self-end"
        >
          View More
        </motion.button>
      </div>
    </div>
  );
};

const SelectedCard = ({ selected, onClose }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking on content
      className="absolute inset-0 bg-[#0c0c12] flex flex-col rounded-2xl shadow-2xl z-[60] overflow-hidden"
    >
      {/* Floating Close Button */}
      <div className="absolute top-4 right-4 z-[80]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="bg-neutral-800/90 hover:bg-red-600 text-white hover:text-white rounded-full p-2.5 transition-all shadow-lg hover:scale-105 active:scale-95 border border-neutral-700/50"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable Container */}
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-[70] flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-12 md:py-16 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto">
          {selected?.expandedContent ?? selected?.content}
        </div>
      </motion.div>
    </div>
  );
};
