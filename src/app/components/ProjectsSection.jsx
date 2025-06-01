import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

   const [titleRef, titleInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
   });

   const [cardsRef, cardsInView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
   });

   const projects = [
      {
         title: "E-Commerce Platform",
         description:
            "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, shopping cart, and admin dashboard.",
         image: "🛒",
         tech: ["React", "Node.js", "MongoDB", "Stripe"],
         github: "#",
         live: "#",
      },
      {
         title: "Social Media Dashboard",
         description:
            "Real-time social media analytics dashboard with beautiful charts and insights. Built with Next.js and integrated with multiple APIs.",
         image: "📊",
         tech: ["Next.js", "Chart.js", "Tailwind CSS", "API Integration"],
         github: "#",
         live: "#",
      },
      {
         title: "AI Chat Application",
         description:
            "Modern chat application with AI integration using OpenAI API. Features real-time messaging, file sharing, and smart responses.",
         image: "🤖",
         tech: ["React", "Socket.io", "OpenAI API", "Express"],
         github: "#",
         live: "#",
      },
   ];

   return (
      <section
         ref={ref}
         id="projects"
         className="min-h-screen bg-gradient-to-b from-gray-800 to-black py-20"
      >
         <div className="container mx-auto px-6">
            {/* Section title */}
            <motion.div
               ref={titleRef}
               style={{ y }}
               className="text-center mb-16  pt-20"
            >
               <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
               >
                  My Projects
               </motion.h2>
               <motion.p
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
               >
                  Here are some of my recent projects that showcase my skills
                  and passion for development
               </motion.p>
            </motion.div>

            {/* Projects grid */}
            <div
               ref={cardsRef}
               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {projects.map((project, index) => (
                  <motion.div
                     key={project.title}
                     className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                     initial={{ opacity: 0, y: 50 }}
                     animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.6, delay: index * 0.2 }}
                     whileHover={{ y: -10, scale: 1.02 }}
                  >
                     {/* Project image/icon */}
                     <div className="text-6xl mb-6 text-center">
                        {project.image}
                     </div>

                     {/* Project content */}
                     <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                     </h3>

                     <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                     </p>

                     {/* Tech stack */}
                     <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                           <span
                              key={tech}
                              className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                           >
                              {tech}
                           </span>
                        ))}
                     </div>

                     {/* Project links */}
                     <div className="flex gap-4">
                        <motion.a
                           href={project.github}
                           className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <Github size={16} />
                           Code
                        </motion.a>
                        <motion.a
                           href={project.live}
                           className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-all"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <ExternalLink size={16} />
                           Live Demo
                        </motion.a>
                     </div>

                     {/* Hover effect overlay */}
                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}
