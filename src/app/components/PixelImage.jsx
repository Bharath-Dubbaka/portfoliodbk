import React, { useEffect, useRef, useState } from "react";

/**
 * PixelImage
 * -------------------------------------------------------------
 * Draws the image pixelated on a canvas, then animates the pixel
 * size down to 1 before crossfading to the real <img>.
 *
 * IMPORTANT: pass `start={false}` while anything (like a full-screen
 * Loader) is covering this component, then flip it to `true` once
 * that's gone. Otherwise the image preloads and finishes its whole
 * unpixelate animation while hidden behind the loader, and you'll
 * never actually see it happen -- which is the bug you just hit.
 *
 * The image still preloads and draws its first chunky frame
 * immediately regardless of `start`, so there's zero delay/flash
 * once `start` flips true -- it just picks up the animation from
 * that first frame.
 */
export default function PixelImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  startPixelSize = 32,
  duration = 900,
  start = true,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const imgElRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const dimsRef = useRef({ displayWidth: 0, displayHeight: 0, dpr: 1 });
  const hasAnimatedRef = useRef(false);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const drawPixelated = (pixelSize) => {
    const img = imgElRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const { displayWidth, displayHeight, dpr } = dimsRef.current;
    const ctx = canvas.getContext("2d");

    if (!tempCanvasRef.current)
      tempCanvasRef.current = document.createElement("canvas");
    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext("2d");

    const scaledW = Math.max(1, Math.floor((displayWidth * dpr) / pixelSize));
    const scaledH = Math.max(1, Math.floor((displayHeight * dpr) / pixelSize));

    tempCanvas.width = scaledW;
    tempCanvas.height = scaledH;
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      0,
      0,
      scaledW,
      scaledH,
    );

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      tempCanvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  };

  // Preload the image and draw the first chunky frame as soon as it's
  // ready -- independent of `start`, so nothing is wasted waiting.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = wrapper.clientWidth;
      const displayHeight = wrapper.clientHeight;

      dimsRef.current = { displayWidth, displayHeight, dpr };
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      imgElRef.current = img;
      drawPixelated(startPixelSize);
      setImgLoaded(true);
    };
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Only begin the actual unpixelate animation once the image is
  // loaded AND the caller says it's visible (loader is gone).
  useEffect(() => {
    if (!imgLoaded || !start || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let raf;
    const endPixelSize = 1;
    const startTime = performance.now();

    const animate = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const pixelSize = Math.max(
        endPixelSize,
        Math.round(startPixelSize * (1 - eased)),
      );
      drawPixelated(pixelSize);

      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        drawPixelated(endPixelSize);
        setTimeout(() => setShowImg(true), 150);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgLoaded, start, duration, startPixelSize]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-500 w-80 sm:w-80 md:w-[24rem] lg:w-full max-w-sm aspect-[4/5] mx-auto rounded-2xl shadow-xl ${
          showImg ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 object-cover transition-opacity duration-500 ${
          showImg ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
