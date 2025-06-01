import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
   const ref = useRef(null);

   // Framer Motion's useScroll hook - tracks scroll progress
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"], // When to start/end tracking
   });

   // Transform scroll progress into movement values
   // These create the parallax effect by moving elements at different speeds
   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

   return (
      <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-6 py-20">
         {/* Background with parallax - moves slower than scroll */}
         <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
         </motion.div>

         {/* Floating particles background */}
         <div className="absolute inset-0 z-10">
            {[...Array(50)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute w-1 h-2 bg-pink-400 rounded-full opacity-30"
                  style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                     y: [-20, 20],
                     opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                     duration: 3 + Math.random() * 2,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: Math.random() * 2,
                  }}
               />
            ))}
         </div>
         <motion.div style={{ y: textY }} className="relative z-20">
            <div className="max-w-5xl w-full text-center">
               {/* Name */}
               <motion.h1
                  className="text-5xl md:text-7xl font-extrabold mb-4"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
               >
                  Bharath Dubbaka
               </motion.h1>

               {/* Role */}
               <motion.p
                  className="text-xl md:text-2xl text-purple-300 tracking-wide font-medium mb-2 uppercase"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
               >
                  Full Stack Developer & Problem Solver
               </motion.p>

               {/* Main Intro */}
               <motion.p
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
               >
                  I design and develop modern web applications — from quick
                  landing pages to full-stack platforms. Whether you're starting
                  from scratch or enhancing an existing system, I help bring
                  your ideas to life with clean, scalable code.
               </motion.p>

               {/* Specialization */}
               <motion.p
                  className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
               >
                  My expertise lies in React, Next.js, Firebase, and Tailwind —
                  delivering full-stack solutions that perform beautifully
                  across devices.
               </motion.p>

               {/* CTA Button */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
               >
                  <button className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105">
                     Let’s Build Something
                  </button>
               </motion.div>
            </div>
         </motion.div>
      </section>
   );
}
