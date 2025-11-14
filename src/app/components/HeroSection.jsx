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
         className="min-h-screen bg-gray-100 flex items-center justify-center px-6 pt-2"
      >
         <div className="max-w-[85%] w-full grid lg:grid-cols-2 gap-4 items-center">
            {/* Left Content - Name and Taglines */}
            <div className="space-y-8">
               {/* Main Name with Gradient Effect */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl leading-tight"
               >
                  <h1 className=" text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tight">
                     <span className="font-sans block bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                        BHARATH
                     </span>
                     <span className="font-sans block bg-gradient-to-r from-gray-800  to-gray-600 bg-clip-text text-transparent">
                        DUBBAKA
                     </span>
                  </h1>

                  {/* Hover me text */}
                  {/* <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1, duration: 0.5 }}
                     className="absolute -bottom-2 left-0 text-sm text-gray-400 font-light italic"
                  >
                     Hover me ↗
                  </motion.p> */}
               </motion.div>

               {/* Taglines */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4 text-gray-950 font-medium text-lg md:text-xl uppercase tracking-wide leading-relaxed font-sans"
               >
                  <p className="border-l-4 border-blue-500 pl-4">
                     Full Stack Developer [MERN]
                  </p>
                  <p className="border-l-4 border-gray-500 pl-4">
                     Self Taught with Entrepreneurial Spirit
                  </p>
                  <p className="border-l-4 border-blue-400 pl-4">
                     Branding • SEO • Marketing • Content
                  </p>
               </motion.div>
            </div>

            {/* Right Content - About Me Section */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="bg-white rounded-2xl shadow-xl p-8 md:pt-2 md:px-12 space-y-6 border border-blue-100 shadow-blue-100 hover:shadow-blue-200 transition-shadow duration-300 ease-in-out"
            >
               <PixelatedCanvasDemo />
               {/* Contact Info */}

               {/* Social Links */}
               <div className="pt-2">
                  <div className="flex gap-4 justify-start text-align-center items-center">
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
                           className={`w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 transition-all ${social.color}`}
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <social.icon className="w-5 h-5" />
                        </motion.a>
                     ))}
                     {/* Contact Info */}
                     <div className="space-y-2">
                        {/* <a
                           href="mailto:bharathdubbaka@gmail.com"
                           className="text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium block"
                        >
                           bharathdubbaka@gmail.com
                        </a> */}
                        <p className="text-blue-600 font-semibold text-lg cursor-pointer hover:text-blue-700">
                           View My Portfolio
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Navigation Dots */}
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
