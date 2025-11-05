import { motion } from "framer-motion";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";

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
         className=" min-h-screen bg-gray-100 flex items-center justify-center px-6 pt-2"
      >
         <div className="max-w-[80%] w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Name and Taglines */}
            <div className="space-y-8">
               {/* Main Name with Gradient Effect */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative pb-10 overflow-visible"
               >
                  <h1 className=" text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                     <span className="block bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                        BHARATH
                     </span>
                     <span className="block bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
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
                  className="space-y-4 text-gray-950 font-medium text-lg md:text-xl uppercase tracking-wide"
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
               className="bg-white rounded-2xl shadow-blue-50 shadow-2xl p-8 md:p-12 space-y-6 border border-blue-100"
            >
               {/* Contact Info */}
               <div className="space-y-2">
                  <p className="text-blue-600 font-semibold text-lg cursor-pointer hover:text-blue-700">
                     Who the heck am i ?
                  </p>
               </div>

               {/* Divider */}
               <div className="border-t border-gray-200 my-6"></div>

               {/* About Content */}
               <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p className="text-xl">
                     Driven by a genuine passion for building and solving
                     real-world problems. My entrepreneurial spirit, combined
                     with practical success in freelancing, makes my approach
                     incredibly unique.
                  </p>

                  {/* <p className="text-xl">
                     I craft modern{" "}
                     <span className="font-semibold text-gray-800">
                        full-stack web applications
                     </span>{" "}
                     with React/Next.js and the MERN stack. My journey as a
                     self-taught developer is showcased through Mini-SaaS
                     products like{" "}
                     <a
                        href="https://resumeonfly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                     >
                        ResumeOnFly
                     </a>
                     ,{" "}
                     <a
                        href="https://cvtosalary.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                     >
                        CVtoSalary
                     </a>
                     , and{" "}
                     <a
                        href="https://recruitcatch.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                     >
                        RecruitCatch
                     </a>
                     .
                  </p> */}

                  {/* <p className="text-base">
                     My background as an{" "}
                     <span className="font-semibold text-gray-800">
                        IT Recruiter
                     </span>{" "}
                     provides keen market insight, complementing my diverse
                     skills in{" "}
                     <span className="font-semibold text-gray-800">
                        Digital Marketing, SEO, Content Writing, and Design
                     </span>
                     —through which I've successfully freelanced for clients
                     worldwide.
                  </p> */}

                  {/* <div className="pt-4">
                     <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                        Ready to Build or Hire?
                     </p>
                     <p className="text-base text-gray-700">
                        Whether you're hiring or need someone to prototype and
                        ship quickly—I can deliver. I build fast, customized,
                        and responsive solutions at competitive prices.
                     </p>
                  </div> */}
               </div>

               {/* Social Links */}
               <div className="pt-6">
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
