import { motion } from "framer-motion";

export default function Navigation({ activeSection, setActiveSection }) {
   const sections = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
   ];

   const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
         // Lenis smooth scroll (initialized in main page)
         element.scrollIntoView({ behavior: "smooth" });
         setActiveSection(sectionId);
      }
   };

   return (
      <motion.nav
         className="fixed top-8 right-8 z-50 bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/10"
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8, delay: 1 }}
      >
         <div className="flex flex-col gap-2">
            {sections.map((section) => (
               <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group ${
                     activeSection === section.id
                        ? "bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white"
                        : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={section.label}
               >
                  {/* Dot indicator */}
                  <div
                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSection === section.id ? "bg-white" : "bg-current"
                     }`}
                  />

                  {/* Tooltip */}
                  <span className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     {section.label}
                  </span>
               </motion.button>
            ))}
         </div>
      </motion.nav>
   );
}
