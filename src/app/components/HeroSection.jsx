import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
   Github,
   Mail,
   MessageCircle,
   Lock,
   Users,
   Send,
   X,
   TwitterIcon,
   Linkedin,
} from "lucide-react";

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
         className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
      >
         {/* Background with parallax - moves slower than scroll */}
         <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
         </motion.div>

         {/* Floating particles background with shadow */}
         <div className="absolute inset-0 z-10">
            {[...Array(50)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute w-1 h-2 bg-pink-400 rounded-full opacity-30 shadow-lg shadow-pink-400/50"
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

         <motion.div
            // style={{ y: textY }}
            className="relative z-20 w-full max-w-7xl mx-auto"
         >
            <div className="grid lg:grid-cols-3 gap-12 items-start">
               {/* Left Content - Main Text */}
               <div className="lg:col-span-2 space-y-8">
                  {/* Name */}
                  <motion.h1
                     className="text-5xl md:text-7xl font-extrabold mb-4 text-shadow-lg"
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                     Bharath Dubbaka
                  </motion.h1>

                  {/* Role */}
                  <motion.p
                     className="text-xl md:text-2xl text-purple-300 tracking-wide font-medium mb-6 uppercase underline text-shadow-2xs"
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.4 }}
                     style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                     Self-Taught, Full Stack Developer
                  </motion.p>

                  {/* Underline */}
                  <motion.div
                     className="w-16 h-1 bg-purple-400 mb-8"
                     initial={{ width: 0 }}
                     animate={{ width: 64 }}
                     transition={{ duration: 1, delay: 0.6 }}
                  />

                  {/* Main Description */}
                  <motion.div
                     className="space-y-6"
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.8 }}
                  >
                     <p
                        className="text-lg md:text-xl text-gray-200 leading-relaxed"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                     >
                        Driven by a genuine passion for not just programming,
                        but for building and solving real-world problems. That
                        entrepreneurial spirit, combined with your practical
                        success in freelancing using your diverse skills, makes
                        you incredibly unique.
                     </p>

                     <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                     >
                        I craft modern full-stack web applications with{" "}
                        <strong className="text-purple-400">
                           React/Next.js and the MERN stack (Mongo, Express,
                           Node).
                        </strong>
                        <br />
                        My unique journey as a self-taught developer is fueled
                        by an entrepreneurial spirit, you can see it in action
                        with my{" "}
                        <strong className="text-purple-400">
                           Mini-SaaS/Products like{" "}
                           <a
                              href="https://resumeonfly.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-pink-400 transition-colors"
                           >
                              ResumeOnFly.com
                           </a>
                           ,{" "}
                           <a
                              href="https://cvtosalary.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-pink-400 transition-colors"
                           >
                              CVtoSalary.com
                           </a>
                           , and real-time tools like{" "}
                           <a
                              href="https://recruitcatch.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-pink-400 transition-colors"
                           >
                              RecruitCatch.com
                           </a>
                           .
                        </strong>
                     </p>

                     <p
                        className="text-base md:text-lg text-gray-300 font-medium leading-relaxed"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                     >
                        My previous background as an IT Recruiter provides keen
                        market insight, complementing{" "}
                        <strong className="text-purple-400">
                           my diverse skills in Digital Marketing, SEO, Content
                           writing, and Design,{" "}
                        </strong>
                        through which I've also successfully freelanced for
                        clients.
                     </p>
                  </motion.div>
               </div>

               {/* Right Content - Service Box */}
               <div className="lg:col-span-1 space-y-8">
                  <motion.div
                     className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20"
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1, delay: 1 }}
                  >
                     <div className="space-y-6">
                        <div>
                           <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">
                              SERVICE
                           </p>
                           <h3 className="text-xl font-bold text-white mb-4">
                              Ready to Build or Hire?
                           </h3>
                           <div className="w-12 h-1 bg-purple-400 mb-4" />
                        </div>

                        <p className="text-gray-300 leading-relaxed text-sm">
                           Whether you're hiring for a role or need someone to
                           prototype and ship quickly — I can deliver.
                           <br />I build fast, customized and responsive landing
                           pages at prices that won't break the bank.
                        </p>

                        {/* <motion.button
                           className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           Get started
                        </motion.button> */}
                        {/* Social Links */}
                        <motion.div
                           className=" rounded-lg p-4 md:p-6 shadow-xl bg-gradient-to-r from-purple-500 to-pink-500"
                           initial={{ opacity: 0, x: 50 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 1, delay: 1.2 }}
                        >
                           <div className="grid grid-cols-4 gap-4">
                              {[
                                 {
                                    icon: TwitterIcon,
                                    label: "Twitter",
                                    color: "text-blue-500",
                                    href: "https://x.com/reach__Bharath",
                                 },
                                 {
                                    icon: Mail,
                                    label: "Email",
                                    color: "text-red-500",
                                    href: "mailto:you@example.com",
                                 },
                                 {
                                    icon: Linkedin,
                                    label: "LinkedIn",
                                    color: "text-red-500",
                                    href: "https://www.linkedin.com/in/bharath-kumar-4bb399208/",
                                 },
                                 {
                                    icon: Github,
                                    label: "GitHub",
                                    color: "text-gray-800",
                                    href: "https://github.com/Bharath-Dubbaka",
                                 },
                              ].map((social, index) => (
                                 <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                       duration: 0.5,
                                       delay: 1.4 + index * 0.1,
                                    }}
                                 >
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center">
                                       <social.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-white">
                                       {social.label}
                                    </span>
                                 </motion.a>
                              ))}
                           </div>
                        </motion.div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </motion.div>

         {/* Add some additional shadow overlay for better text readability */}
         <div className="absolute inset-0 bg-black/20 z-5"></div>
      </section>
   );
}
