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

      <div className="w-full h-full md:p-2 grid grid-cols-1 md:grid-cols-3 border max-w-7xl lg:max-w-[85%] mx-auto gap-5 md:gap-3 relative">
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
  const project = card?.content?.props?.project;
  const techPreview = project?.tech?.slice(0, 3) || [];
  const extraCount = (project?.tech?.length || 0) - techPreview.length;

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
        className={`absolute inset-0 transition-all duration-300 flex flex-col justify-end ${
          isHovered
            ? "bg-gradient-to-t from-black/95 via-black/70 to-black/20"
            : "bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black/40 md:via-transparent md:to-transparent"
        }`}
      >
        <div className="p-4 md:p-6">
          {/*Title and Description — only visible on hover (desktop) or always (mobile) */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={
              isHovered
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.25 }}
            className="text-gray-200 text-sm md:text-[15px] leading-relaxed mb-3 overflow-hidden hidden md:block"
          >
            <div className="text-white text-xl md:text-3xl font-bold mb-1.5">
              {project?.title}
            </div>
            {project?.description}
            {/* Tech chips */}
            {/* {techPreview.length > 0 && (
              <div
                className={`flex flex-wrap gap-1.5 mb-3 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
                }`}
              >
                {techPreview.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full bg-white/15 text-white border border-white/20"
                  >
                    {t}
                  </span>
                ))}
                {extraCount > 0 && (
                  <span className="text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/15">
                    +{extraCount} more
                  </span>
                )}
              </div>
            )} */}
          </motion.p>
          {/* Mobile always-visible description (no hover state on touch) */}
          <p className="text-gray-200 text-sm leading-relaxed mb-3 md:hidden line-clamp-2">
            {project?.description}
          </p>

          {/* CTA — desktop: fades/slides in on hover */}
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            View Project Case Study
          </motion.button>
          {/* CTA — mobile: always visible, no hover state on touch devices */}
          <button className="md:hidden inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm">
            View Project Case Study
          </button>
        </div>
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
      {/* {(selected?.githubLink || selected?.liveLink) && (
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
              Live Link
            </a>
          )}
        </div>
      )} */}
    </div>
  );
};
