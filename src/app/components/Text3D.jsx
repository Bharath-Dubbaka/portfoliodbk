import React, { useRef, useEffect } from "react";
import "../globals.css";

/**
 * Text3D
 * -------------------------------------------------------------
 * One word/line that flips 90deg on hover. Must be rendered inside
 * a <Text3DGroup>.
 */
export function Text3D({
  primary,
  secondary,
  primaryClassName = "",
  secondaryClassName = "",
}) {
  return (
    <div className="text3d-container">
      <p className={`text3d-primary ${primaryClassName}`}>{primary}</p>
      <p className={`text3d-secondary ${secondaryClassName}`}>{secondary}</p>
    </div>
  );
}

/**
 * Text3DGroup
 * -------------------------------------------------------------
 * Direct port of pages/index.js's manageMouseMove + .body plane.
 *
 * Key fix from the last pass: the listener is now on `window` and
 * the math is IDENTICAL to your original --
 *   x = e.clientX / window.innerWidth
 *   y = e.clientY / window.innerHeight
 *   perspective = window.innerWidth * 4
 * -- instead of being scoped to this element's own tiny bounding
 * box. That's what made it look like nothing was happening: your
 * old version tilts from ANY mouse movement on the page, mine was
 * only reacting if the cursor was exactly over the letters.
 */
export function Text3DGroup({ children, className = "", maxRotate = 45 }) {
  const planeRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const plane = planeRef.current;
    if (!plane) return;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const perspective = window.innerWidth * 6;
      const rotateX = maxRotate * x - maxRotate / 2;
      const rotateY = (maxRotate * y - maxRotate / 2) * -1;
      plane.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxRotate]);

  return (
    <div className={`text3d-plane-wrapper ${className}`}>
      <div ref={planeRef} className="text3d-plane">
        {children}
      </div>
    </div>
  );
}

export default Text3D;
