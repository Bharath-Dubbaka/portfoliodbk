"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards }) => {
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

  // Lock background page scroll while modal is open — without this, mouse wheel
  // events over the modal scroll the page behind it instead of the modal content.
  useEffect(() => {
    if (selected?.id) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [selected]);

  // ✅ Safety guard — avoids crash if cards is undefined
  if (!cards || !Array.isArray(cards)) {
    console.error("⚠️ cards prop is undefined or not an array:", cards);
    return null;
  }

  return (
    <>
      {/* Full-screen overlay backdrop - covers entire viewport */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-black z-40",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.5 : 0 }}
      />

      <div className="w-full h-full md:p-2 grid grid-cols-1 md:grid-cols-3 border max-w-7xl lg:max-w-[90%] mx-auto gap-5 md:gap-3 relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className={cn(
              card.className,
              "bg-blue-100 border-none hover:shadow-lg shadow-blue-200 min-h-[21rem] sm:min-h-[20rem]",
            )}
          >
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                card.className,
                "relative overflow-hidden ",
                selected?.id === card.id
                  ? "rounded-lg cursor-pointer fixed border-none top-[5%] left-[2.5%] md:top-[5%] md:left-[20%] w-[95%] h-[90%] md:w-[60%] md:h-[90%] z-50"
                  : lastSelected?.id === card.id
                    ? "z-40 bg-white h-full w-full"
                    : "bg-white h-full w-full",
              )}
              layoutId={`card-${card.id}`}
            >
              {selected?.id === card.id && (
                // Plain div, NOT motion — guarantees a fully resolved box with real
                // pixel height (100% of its fixed-size, non-animated parent above),
                // so the overflow-y-auto child inside SelectedCard has something
                // concrete to scroll against instead of an in-progress transform.
                <div className="absolute inset-0 w-full h-full">
                  <SelectedCard
                    selected={selected}
                    onClose={handleOutsideClick}
                  />
                </div>
              )}
              {/* Closed grid view — hidden while this card is expanded, so it can't bleed through behind SelectedCard */}
              {selected?.id !== card.id && <ImageComponent card={card} />}
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
    <div className="absolute inset-0 h-full w-full rounded-lg shadow-2xl z-[60] overflow-hidden flex flex-col bg-[#0d0d12]">
      {/* Close button (X) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-[80] bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors shadow-lg"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
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

      {/* IMAGE HEADER — fixed height banner, does not scroll */}
      <div className="relative w-full h-[220px] md:h-[280px] flex-shrink-0 overflow-hidden">
        <img
          src={selected?.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#0d0d12]" />
      </div>

      {/* SCROLLABLE BODY — solid dark background, this is the part that scrolls.
          `relative` is required here: any layoutId-animated child (e.g. the tab
          pill in TabSwitcher) needs its nearest scrollable ancestor to be
          explicitly positioned, or Framer Motion can't reliably compute scroll
          offset for the shared-layout animation. */}
      <div
        className="relative flex-1 min-h-0 overflow-y-auto px-5 md:px-10 py-6 bg-[#0d0d12]"
        onWheel={(e) => e.stopPropagation()}
      >
        {selected?.expandedContent ?? selected?.content}
      </div>

      {/* STICKY FOOTER — action buttons pinned at the bottom, always visible */}
      {(selected?.githubLink || selected?.liveLink) && (
        <div className="flex-shrink-0 flex justify-end gap-3 px-5 md:px-10 py-4 bg-[#0d0d12] border-t border-white/10">
          {selected?.githubLink && (
            <a
              href={selected.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 rounded-lg text-white text-sm font-bold transition-colors px-4 py-2.5"
            >
              <Github size={18} />
              Source Code
            </a>
          )}
          {selected?.liveLink && (
            <a
              href={selected.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-bold transition-all"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
};
