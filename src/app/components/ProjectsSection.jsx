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

   // const projects = [
   //    {
   //       title: "CVtoSalary.com",
   //       description:
   //          "Practice project trying to clone Tinder functionality , Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder",
   //       image: "/assets/projectImgs/Img_cvtosalary.png",
   //       tech: ["Next.js", "Typescript", "Tailwind CSS", "AceternityUI"],
   //       github: "https://github.com/Bharath-Dubbaka/CvtoSalary-aceternity",
   //       live: "https://cvtosalary.com/",
   //    },
   //    {
   //       title: "LoveatFirstBite",
   //       description: "Restaurant and cafe",
   //       image: "/assets/projectImgs/Img_firstbite.png",
   //       tech: ["MERN", "Mongoose", "TailwindCSS"],
   //       github: "https://github.com/Bharath-Dubbaka/firstbite-node",
   //       live: "http://16-171-150-110.nip.io/",
   //    },
   //    {
   //       title: "ResumeOnFly - SaaS",
   //       description:
   //          "Built from Scratch: Built for busy job seekers — upload your master resume once, and customize it for every job in a few clicks.",
   //       image: "/assets/projectImgs/Img_resumeonflyTwo.png",
   //       tech: ["Next.js", "MERN", "Razorpay", "OpenAI", "Oauth2"],
   //       github: "https://github.com/Bharath-Dubbaka/ResumeMaxxing",
   //       live: "https://resumeonfly.com/",
   //    },
   //    {
   //       title: "RecruitCatch - 1K active users ",
   //       description:
   //          "FREE XRay Search Tool built for Recruiters to find publicly available profile on Linkedin(without any limitations) to match/meet there Job requirements",
   //       image: "/assets/projectImgs/Img_recruitcatch.png",
   //       tech: ["Next.js", "React.js", "Tailwind CSS", "Google API"],
   //       github: "https://github.com/Bharath-Dubbaka/recruitNinja",
   //       live: "https://recruitcatch.com/",
   //    },
   //    // {
   //    //    title: "Swiggy Demo - Real-time data fetched from Swiggy APIs",
   //    //    description:
   //    //       "Practice Project - Food Delivery App inspired by Swiggy using Real-time production data fetched from Swiggy APIs.",
   //    //    image: "/assets/projectImgs/Img_SwiggyClone.png",
   //    //    tech: [
   //    //       "React.js",
   //    //       "TailwindCSS",
   //    //       "Real-time data",
   //    //       "Swiggy APIs",
   //    //       "Live Location",
   //    //    ],
   //    //    github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
   //    //    live: "https://swigclone.netlify.app/",
   //    // },
   //    {
   //       title: "NetflixGPT",
   //       description:
   //          "Movie App using TMDB, YouTube to view your desired movies & GPT APIs to recommend desired content",
   //       image: "/assets/projectImgs/Img_NetflixGPT.png",
   //       tech: ["React", "Tailwind", "TMDB API", "Youtube API", "OpenAI"],
   //       github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
   //       live: "https://moviesflixgpt.netlify.app",
   //    },
   // ];

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
         </div>
      </section>
   );
}
