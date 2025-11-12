import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { LayoutGrid } from "../ui/layout-grid";
import { LayoutGridDemo } from "../ui/LayoutGridDemo";

export default function ProjectsSection() {
   const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
   });

   // const ref = useRef(null);
   // const { scrollYProgress } = useScroll({
   //    target: ref,
   //    offset: ["start end", "end start"],
   // });

   // const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

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
         title: "CVtoSalary.com",
         description:
            "Practice project trying to clone Tinder functionality , Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder",
         image: "/assets/projectImgs/Img_cvtosalary.png",
         tech: ["Next.js", "Typescript", "Tailwind CSS", "AceternityUI"],
         github: "https://github.com/Bharath-Dubbaka/CvtoSalary-aceternity",
         live: "https://cvtosalary.com/",
      },
      {
         title: "LoveatFirstBite - Demo",
         description: "Restaurant and cafe",
         image: "/assets/projectImgs/Img_firstbite.png",
         tech: ["MERN", "Mongoose", "TailwindCSS"],
         github: "https://github.com/Bharath-Dubbaka/firstbite-node",
         live: "http://16-171-150-110.nip.io/",
      },
      {
         title: "ResumeOnFly.com - SaaS",
         description:
            "Built from Scratch: Built for busy job seekers — upload your master resume once, and customize it for every job in a few clicks.",
         image: "/assets/projectImgs/Img_resumeonflyTwo.png",
         tech: ["Next.js", "MERN", "Razorpay", "OpenAI", "Oauth2"],
         github: "https://github.com/Bharath-Dubbaka/ResumeMaxxing",
         live: "https://resumeonfly.com/",
      },
      {
         title: "RecruitCatch.com - 1K active users ",
         description:
            "FREE XRay Search Tool built for Recruiters to find publicly available profile on Linkedin(without any limitations) to match/meet there Job requirements",
         image: "/assets/projectImgs/Img_recruitcatch.png",
         tech: ["Next.js", "React.js", "Tailwind CSS", "Google API"],
         github: "https://github.com/Bharath-Dubbaka/recruitNinja",
         live: "https://recruitcatch.com/",
      },
      // {
      //    title: "Swiggy Demo - Real-time data fetched from Swiggy APIs",
      //    description:
      //       "Practice Project - Food Delivery App inspired by Swiggy using Real-time production data fetched from Swiggy APIs.",
      //    image: "/assets/projectImgs/Img_SwiggyClone.png",
      //    tech: [
      //       "React.js",
      //       "TailwindCSS",
      //       "Real-time data",
      //       "Swiggy APIs",
      //       "Live Location",
      //    ],
      //    github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
      //    live: "https://swigclone.netlify.app/",
      // },
      {
         title: "NetflixGPT",
         description:
            "Movie App using TMDB, YouTube to view your desired movies & GPT APIs to recommend desired content",
         image: "/assets/projectImgs/Img_NetflixGPT.png",
         tech: ["React", "Tailwind", "TMDB API", "Youtube API", "OpenAI"],
         github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
         live: "https://moviesflixgpt.netlify.app",
      },
   ];

   return (
      <section
         ref={ref}
         id="projects"
         // className="min-h-screen bg-gradient-to-b from-gray-800 to-black pb-20 pt-16 md:pt-40"

         className="min-h-screen bg-gray-100 "
      >
         {/* PROJECTS */}
         <div className="container mx-auto px-6">
            {/* Section title */}
            <motion.div
               ref={ref}
               initial={{ opacity: 0, y: 50 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6 }}
               className="text-center"
            >
               <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
               >
                  <span className="text-blue-600/90">MY WORK</span>
               </motion.h2>
               <motion.p
                  className="text-xl md:text-xl lg:text-xl font-black leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
               >
                  <span className="text-xl font-semibold text-gray-600 leading-relaxed">
                     Here are some of my recent projects that showcase my skills
                     and passion for development
                  </span>
               </motion.p>
            </motion.div>

            {/* Projects grid NEW*/}
            <motion.div
               ref={ref}
               initial={{ opacity: 0, y: 50 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6 }}
               className="text-center"
            >
               <LayoutGridDemo />
            </motion.div>

            {/* Projects grid OLD*/}
            {/* <div
               ref={cardsRef}
               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {projects.map((project, index) => (
                  <motion.div
                     key={project.title}
                     className={`group relative p-6 rounded-2xl border transition-all duration-300
         ${
            index < 2
               ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-gray-500/40 shadow-purple-500/20 shadow-xl scale-[1.02]"
               : "bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
         } hover:border-purple-500/50`}
                     initial={{ opacity: 0, y: 50 }}
                     animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.3, delay: index * 0.2 }}
                     whileHover={{ y: -10, scale: 1.02 }}
                  >
                     {index < 2 && (
                        <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full animate-pulse z-10 shadow-md">
                           Featured
                        </span>
                     )}
                     <div className="overflow-hidden rounded-xl mb-4 border border-slate-600">
                        <img
                           src={project.image}
                           alt={project.title}
                           className="w-full h-52 object-cover duration-300"
                        />
                     </div>

                     <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                     </h3>

                     <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                     </p>

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

                     <div className="flex gap-4">
                        <motion.a
                           href={project.github}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <Github size={16} />
                           Code
                        </motion.a>
                        <motion.a
                           href={project.live}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-all"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <ExternalLink size={16} />
                           Live Demo
                        </motion.a>
                     </div>

                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
               ))}
            </div> */}
         </div>

         {/* ABOUT */}
         {/* <div className="container mx-auto px-6 w-full h-full md:p-2 md:max-w-[80%]">
            <div className="space-y-2">
               <p className="text-blue-600 font-semibold text-lg cursor-pointer hover:text-blue-700">
                  Who the heck am i ?
               </p>
            </div>

            <div className="border-t border-gray-200 my-6"></div>


            <div className="space-y-4 text-gray-600 leading-relaxed">
               <p className="text-xl">
                  Driven by a genuine passion for building and solving
                  real-world problems. My entrepreneurial spirit, combined with
                  practical success in freelancing, makes my approach incredibly
                  unique.
               </p> */}

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

         {/* <p className="text-xl">
                  My background as an{" "}
                  <span
                  // className="font-semibold text-gray-800"
                  >
                     IT Recruiter
                  </span>{" "}
                  provides keen market insight, complementing my diverse skills
                  in{" "}
                  <span
                  // className="font-semibold text-gray-800"
                  >
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
         {/* </div> */}
         {/* </div> */}
      </section>
   );
}
