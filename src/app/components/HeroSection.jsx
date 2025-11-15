import { motion } from "framer-motion";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";
import { PixelatedCanvasDemo } from "../ui/PixelatedCanvasDemo";

export default function HeroSection() {
   const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section
         id="hero"
         className="min-h-screen bg-gray-100 flex items-center justify-center px-4 md:px-4 pt-20 md:pt-2 pb-12 md:pb-10"
      >
         <div className="max-w-full md:max-w-[98%] lg:max-w-[85%] w-full grid lg:grid-cols-2 gap-6 md:gap-4 items-center">
            {/* Left Content - Name and Taglines */}
            <div className="space-y-6 md:space-y-8">
               {/* Main Name with Gradient Effect */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl leading-tight"
               >
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl font-black leading-none tracking-tight">
                     <span className="font-sans block bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                        BHARATH
                     </span>
                     <span className="font-sans block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        DUBBAKA
                     </span>
                  </h1>
               </motion.div>

               {/* Taglines */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-3 md:space-y-4 text-gray-950 font-medium text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide leading-relaxed font-sans"
               >
                  <p className="border-l-4 border-blue-500 pl-3 md:pl-4">
                     Full Stack Developer [MERN]
                  </p>
                  <p className="border-l-4 border-gray-500 pl-3 md:pl-4">
                     Self Taught with Entrepreneurial Spirit
                  </p>
                  <p className="border-l-4 border-blue-400 pl-3 md:pl-4">
                     Branding • SEO • Marketing • Content
                  </p>
               </motion.div>
            </div>

            {/* Right Content - About Me Section */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="bg-white rounded-2xl shadow-xl px-4 pt-2 md:p-8 sm:pt-8 md:px-2 lg:px-6 space-y-4 md:space-y-6 border border-blue-100 shadow-blue-100 hover:shadow-blue-200 transition-shadow duration-300 ease-in-out max-w-full"
            >
               <PixelatedCanvasDemo />
               {/* Contact Info */}

               {/* Social Links */}
               <div className="pt-2">
                  <div className="pt-2 pb-6 md:pt-4 md:pb-4 flex flex-wrap gap-3 md:gap-4 justify-start items-center">
                     {[
                        {
                           icon: Github,
                           label: "GitHub",
                           href: "https://github.com/Bharath-Dubbaka",
                           color: "hover:bg-gray-800 hover:text-white",
                        },
                        {
                           icon: Linkedin,
                           label: "LinkedIn",
                           href: "https://www.linkedin.com/in/bharath-kumar-4bb399208/",
                           color: "hover:bg-blue-600 hover:text-white",
                        },
                        {
                           icon: Twitter,
                           label: "Twitter",
                           href: "https://x.com/reach__Bharath",
                           color: "hover:bg-blue-400 hover:text-white",
                        },
                        {
                           icon: Mail,
                           label: "Email",
                           onClick: () => scrollToSection("contact"),
                           color: "hover:bg-red-500 hover:text-white",
                        },
                     ].map((social) => (
                        <motion.a
                           key={social.label}
                           href={social.href}
                           onClick={social.onClick}
                           target={social.href ? "_blank" : undefined}
                           rel={social.href ? "noopener noreferrer" : undefined}
                           aria-label={social.label}
                           className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 transition-all ${social.color}`}
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.a>
                     ))}
                     {/* Contact Info */}
                     <div className="space-y-2 w-full md:w-auto mt-0">
                        <p className="text-blue-600 font-semibold text-base md:text-lg cursor-pointer hover:text-blue-700">
                           View My Portfolio
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Navigation Dots - Hidden on mobile/tablet */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
         >
            {[...Array(5)].map((_, i) => (
               <div
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                     i === 0
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 hover:border-blue-400"
                  }`}
               ></div>
            ))}
         </motion.div>
      </section>
   );
}
