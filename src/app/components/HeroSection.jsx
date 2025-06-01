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
      <section
         ref={ref}
         id="hero"
         className="relative h-screen flex items-center justify-center overflow-hidden"
      >
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

         {/* Main content with parallax */}
         <motion.div
            style={{ y: textY }}
            className="relative z-20 text-center px-6 max-w-4xl"
         >
            <motion.h1
               className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
            >
               Bharath Dubbaka
            </motion.h1>

            <motion.p
               className="text-xl md:text-2xl text-gray-300 mb-8"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
            >
               Full Stack Developer & Creative Coder
            </motion.p>

            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.8 }}
            >
               <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  View My Work
               </button>
            </motion.div>
         </motion.div>

         {/* Scroll indicator */}
         <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
         >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
               <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
         </motion.div>
      </section>
   );
}
