import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

export default function AboutSection() {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   // Parallax transforms
   const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

   // Intersection observer for triggering animations
   const [titleRef, titleInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
   });

   const [contentRef, contentInView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
   });

   const skills = [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "AWS", level: 65 },
   ];

   return (
      <section
         ref={ref}
         id="about"
         className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-10 md:pb-20 pt-16 md:pt-40"
      >
         <div className="container mx-auto px-6 ">
            {/* Section title with parallax */}
            <motion.div
               ref={titleRef}
               style={{ y }}
               className="text-center mb-16"
            >
               <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
               >
                  About Me
               </motion.h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
               {/* Left side - Text content */}
               <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, x: -50 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
               >
                  <h3 className="text-3xl font-bold mb-6 text-white">
                     Passionate Developer & Problem Solver
                  </h3>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                     I'm a full-stack developer with a passion for creating
                     beautiful, functional web experiences. I love turning
                     complex problems into simple, elegant solutions that users
                     actually enjoy using.
                  </p>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                     When I'm not coding, you'll find me exploring new
                     technologies, contributing to open source projects, or
                     experimenting with creative coding and generative art.
                  </p>

                  <motion.button
                     className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Download Resume
                  </motion.button>
               </motion.div>

               {/* Right side - Skills */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
               >
                  <h3 className="text-2xl font-bold mb-8 text-white">
                     Skills & Technologies
                  </h3>
                  <div className="space-y-6">
                     {skills.map((skill, index) => (
                        <motion.div
                           key={skill.name}
                           initial={{ opacity: 0, y: 20 }}
                           animate={contentInView ? { opacity: 1, y: 0 } : {}}
                           transition={{
                              duration: 0.6,
                              delay: 0.6 + index * 0.1,
                           }}
                        >
                           <div className="flex justify-between mb-2">
                              <span className="text-white font-medium">
                                 {skill.name}
                              </span>
                              <span className="text-purple-400">
                                 {skill.level}%
                              </span>
                           </div>
                           <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                 className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                 initial={{ width: 0 }}
                                 animate={
                                    contentInView
                                       ? { width: `${skill.level}%` }
                                       : {}
                                 }
                                 transition={{
                                    duration: 1,
                                    delay: 0.8 + index * 0.1,
                                 }}
                              />
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
}
