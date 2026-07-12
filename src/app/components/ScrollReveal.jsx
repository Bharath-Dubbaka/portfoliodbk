import React from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal
 * -------------------------------------------------------------
 * Word-by-word (or char-by-char) scroll reveal, inspired by the
 * WhileInView "wipe" example, but extended with:
 *   - staggered word/char animation instead of a single mask block
 *   - blur-in + rise for a softer, more "designed" reveal
 *   - a real easing curve instead of the framer default
 *   - once: false -> text re-plays every time it re-enters view,
 *     and reverses (vanishes) when it leaves, just like your
 *     onViewportEnter / onViewportLeave example
 *
 * Usage:
 *   <ScrollReveal as="p" className="text-lg font-medium">
 *     SEO • Marketing • Content • Branding
 *   </ScrollReveal>
 *
 *   <ScrollReveal splitBy="char" stagger={0.02}>
 *     BHARATH
 *   </ScrollReveal>
 */

// Custom cubic-bezier easing (a soft "expo-out" feel)
const EASE = [0.16, 1, 0.3, 1];

export function ScrollReveal({
  children,
  as = "div",
  className = "",
  splitBy = "word", // "word" | "char" | "line"
  stagger = 0.06,
  duration = 0.6,
  y = 24,
  blur = 6,
  once = false, // false = re-animate every time it enters/leaves viewport
  amount = 0.6, // how much of the element must be visible to trigger
  margin = "0px 0px -10% 0px", // shift the trigger line up slightly
  delay = 0,
}) {
  const Tag = motion[as] || motion.div;
  const text = typeof children === "string" ? children : "";

  const pieces =
    splitBy === "char"
      ? text.split("")
      : splitBy === "line"
        ? text.split("\n")
        : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y,
      filter: `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: EASE },
    },
  };

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once, amount, margin }}
      variants={container}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{
            display: "inline-block",
            whiteSpace: piece === "" ? "pre" : "normal",
            willChange: "transform, filter, opacity",
          }}
        >
          {piece}
          {splitBy === "word" && i !== pieces.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * ScrollWipe
 * -------------------------------------------------------------
 * Closer to your original WhileInView snippet: a mask/overlay
 * that wipes across the text on enter, and re-wipes on exit.
 * Good for headings where you want a single clean sweep rather
 * than per-word stagger.
 */
export function ScrollWipe({
  children,
  as = "div",
  className = "",
  overlayClassName = "bg-blue-500",
  direction = "left-to-right", // or "right-to-left"
  duration = 0.7,
  once = false,
  amount = "all",
}) {
  const Tag = motion[as] || motion.div;

  return (
    <Tag className={`relative inline-block overflow-hidden ${className}`}>
      {children}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once, amount }}
        transition={{ duration, ease: EASE }}
        style={{
          originX: direction === "left-to-right" ? 0 : 1,
        }}
        className={`absolute inset-0 z-10 ${overlayClassName}`}
      />
    </Tag>
  );
}

export default ScrollReveal;
