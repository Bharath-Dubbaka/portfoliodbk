"use client";
import React from "react";

export const PixelatedCanvas = ({
   src,
   width = 400,
   height = 500,
   cellSize = 3,
   dotScale = 0.9,
   shape = "square",
   backgroundColor = "#1a1a1a",
   grayscale = false,
   className,
   responsive = false,
   dropoutStrength = 0.4,
   interactive = true,
   distortionStrength = 3,
   distortionRadius = 80,
   distortionMode = "swirl",
   followSpeed = 0.2,
   sampleAverage = true,
   tintColor = "#FFFFFF",
   tintStrength = 0.2,
   maxFps = 60,
   objectFit = "cover",
   jitterStrength = 4,
   jitterSpeed = 4,
   fadeOnLeave = true,
   fadeSpeed = 0.1,
}) => {
   const canvasRef = React.useRef(null);
   const samplesRef = React.useRef([]);
   const dimsRef = React.useRef(null);
   const targetMouseRef = React.useRef({
      x: -9999,
      y: -9999,
   });
   const animMouseRef = React.useRef({
      x: -9999,
      y: -9999,
   });
   const rafRef = React.useRef(null);
   const lastFrameRef = React.useRef(0);
   const pointerInsideRef = React.useRef(false);
   const activityRef = React.useRef(0);
   const activityTargetRef = React.useRef(0);

   React.useEffect(() => {
      let isCancelled = false;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;

      const compute = () => {
         if (!canvas) return;
         const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

         const displayWidth = width ?? img.naturalWidth;
         const displayHeight = height ?? img.naturalHeight;

         canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
         canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
         canvas.style.width = `${displayWidth}px`;
         canvas.style.height = `${displayHeight}px`;

         const ctx = canvas.getContext("2d");
         if (!ctx) return;
         ctx.resetTransform();
         ctx.scale(dpr, dpr);

         if (backgroundColor) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, displayWidth, displayHeight);
         } else {
            ctx.clearRect(0, 0, displayWidth, displayHeight);
         }

         const offscreen = document.createElement("canvas");
         offscreen.width = Math.max(1, Math.floor(displayWidth));
         offscreen.height = Math.max(1, Math.floor(displayHeight));
         const off = offscreen.getContext("2d");
         if (!off) return;

         const iw = img.naturalWidth || displayWidth;
         const ih = img.naturalHeight || displayHeight;
         let dw = displayWidth;
         let dh = displayHeight;
         let dx = 0;
         let dy = 0;
         if (objectFit === "cover") {
            const scale = Math.max(displayWidth / iw, displayHeight / ih);
            dw = Math.ceil(iw * scale);
            dh = Math.ceil(ih * scale);
            dx = Math.floor((displayWidth - dw) / 2);
            dy = Math.floor((displayHeight - dh) / 2);
         } else if (objectFit === "contain") {
            const scale = Math.min(displayWidth / iw, displayHeight / ih);
            dw = Math.ceil(iw * scale);
            dh = Math.ceil(ih * scale);
            dx = Math.floor((displayWidth - dw) / 2);
            dy = Math.floor((displayHeight - dh) / 2);
         } else if (objectFit === "fill") {
            dw = displayWidth;
            dh = displayHeight;
         } else {
            dw = iw;
            dh = ih;
            dx = Math.floor((displayWidth - dw) / 2);
            dy = Math.floor((displayHeight - dh) / 2);
         }
         off.drawImage(img, dx, dy, dw, dh);

         let imageData;
         try {
            imageData = off.getImageData(
               0,
               0,
               offscreen.width,
               offscreen.height
            );
         } catch {
            ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
            return;
         }

         const data = imageData.data;
         const stride = offscreen.width * 4;
         const effectiveDotSize = Math.max(1, Math.floor(cellSize * dotScale));
         dimsRef.current = {
            width: displayWidth,
            height: displayHeight,
            dot: effectiveDotSize,
         };

         const luminanceAt = (px, py) => {
            const ix = Math.max(0, Math.min(offscreen.width - 1, px));
            const iy = Math.max(0, Math.min(offscreen.height - 1, py));
            const i = iy * stride + ix * 4;
            const rr = data[i];
            const gg = data[i + 1];
            const bb = data[i + 2];
            return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
         };

         const hash2D = (ix, iy) => {
            const s = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123;
            return s - Math.floor(s);
         };

         const samples = [];

         let tintRGB = null;
         if (tintColor && tintStrength > 0) {
            const parse = (c) => {
               if (c.startsWith("#")) {
                  const hex = c.slice(1);
                  if (hex.length === 3) {
                     const r = parseInt(hex[0] + hex[0], 16);
                     const g = parseInt(hex[1] + hex[1], 16);
                     const b = parseInt(hex[2] + hex[2], 16);
                     return [r, g, b];
                  }
                  const r = parseInt(hex.slice(0, 2), 16);
                  const g = parseInt(hex.slice(2, 4), 16);
                  const b = parseInt(hex.slice(4, 6), 16);
                  return [r, g, b];
               }
               const m = c.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
               if (m)
                  return [
                     parseInt(m[1], 10),
                     parseInt(m[2], 10),
                     parseInt(m[3], 10),
                  ];
               return null;
            };
            tintRGB = parse(tintColor);
         }

         for (let y = 0; y < offscreen.height; y += cellSize) {
            const cy = Math.min(
               offscreen.height - 1,
               y + Math.floor(cellSize / 2)
            );
            for (let x = 0; x < offscreen.width; x += cellSize) {
               const cx = Math.min(
                  offscreen.width - 1,
                  x + Math.floor(cellSize / 2)
               );
               let r = 0;
               let g = 0;
               let b = 0;
               let a = 0;
               if (!sampleAverage) {
                  const idx = cy * stride + cx * 4;
                  r = data[idx];
                  g = data[idx + 1];
                  b = data[idx + 2];
                  a = data[idx + 3] / 255;
               } else {
                  let count = 0;
                  for (let oy = -1; oy <= 1; oy++) {
                     for (let ox = -1; ox <= 1; ox++) {
                        const sx = Math.max(
                           0,
                           Math.min(offscreen.width - 1, cx + ox)
                        );
                        const sy = Math.max(
                           0,
                           Math.min(offscreen.height - 1, cy + oy)
                        );
                        const sIdx = sy * stride + sx * 4;
                        r += data[sIdx];
                        g += data[sIdx + 1];
                        b += data[sIdx + 2];
                        a += data[sIdx + 3] / 255;
                        count++;
                     }
                  }
                  r = Math.round(r / count);
                  g = Math.round(g / count);
                  b = Math.round(b / count);
                  a = a / count;
               }

               if (grayscale) {
                  const L = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
                  r = L;
                  g = L;
                  b = L;
               } else if (tintRGB && tintStrength > 0) {
                  const k = Math.max(0, Math.min(1, tintStrength));
                  r = Math.round(r * (1 - k) + tintRGB[0] * k);
                  g = Math.round(g * (1 - k) + tintRGB[1] * k);
                  b = Math.round(b * (1 - k) + tintRGB[2] * k);
               }

               const Lc = luminanceAt(cx, cy);
               const Lx1 = luminanceAt(cx - 1, cy);
               const Lx2 = luminanceAt(cx + 1, cy);
               const Ly1 = luminanceAt(cx, cy - 1);
               const Ly2 = luminanceAt(cx, cy + 1);
               const grad =
                  Math.abs(Lx2 - Lx1) +
                  Math.abs(Ly2 - Ly1) +
                  Math.abs(Lc - (Lx1 + Lx2 + Ly1 + Ly2) / 4);
               const gradientNorm = Math.max(0, Math.min(1, grad / 255));
               const dropoutProb = Math.max(
                  0,
                  Math.min(1, (1 - gradientNorm) * dropoutStrength)
               );
               const drop = hash2D(cx, cy) < dropoutProb;
               const seed = hash2D(cx, cy);

               samples.push({ x, y, r, g, b, a, drop, seed });
            }
         }

         samplesRef.current = samples;
      };

      img.onload = () => {
         if (isCancelled) return;
         compute();
         const canvasEl = canvasRef.current;
         const ctx = canvasEl?.getContext("2d");
         if (!ctx) return;

         const {
            width: displayWidth,
            height: displayHeight,
            dot,
         } = dimsRef.current;
         const samples = samplesRef.current;

         // 1️⃣ Fill background first
         if (backgroundColor) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, displayWidth, displayHeight);
         } else {
            ctx.clearRect(0, 0, displayWidth, displayHeight);
         }

         // 2️⃣ Draw pixelated samples
         for (const s of samples) {
            if (s.drop) continue;
            ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${s.a})`;

            if (shape === "circle") {
               ctx.beginPath();
               ctx.arc(s.x, s.y, dot / 2, 0, Math.PI * 2);
               ctx.fill();
            } else {
               ctx.fillRect(s.x, s.y, dot, dot);
            }
         }
      };

      img.onerror = () => {
         console.error("Failed to load image for PixelatedCanvas:", src);
      };

      if (responsive) {
         const onResize = () => {
            if (img.complete && img.naturalWidth) {
               compute();
            }
         };
         window.addEventListener("resize", onResize);
         return () => {
            isCancelled = true;
            window.removeEventListener("resize", onResize);
            if (img._cleanup) img._cleanup();
         };
      }

      return () => {
         isCancelled = true;
         if (img._cleanup) img._cleanup();
      };
   }, [
      src,
      width,
      height,
      cellSize,
      dotScale,
      shape,
      backgroundColor,
      grayscale,
      responsive,
      dropoutStrength,
      interactive,
      distortionStrength,
      distortionRadius,
      distortionMode,
      followSpeed,
      sampleAverage,
      tintColor,
      tintStrength,
      maxFps,
      objectFit,
      jitterStrength,
      jitterSpeed,
      fadeOnLeave,
      fadeSpeed,
   ]);

   return (
      <canvas
         ref={canvasRef}
         className={className}
         aria-label="Pixelated rendering of source image"
         role="img"
      />
   );
};
