"use client";
import React from "react";
import { LayoutGrid } from "./layout-grid";
import Img_cvtosalary from "../../../public/assets/projectImgs/Img_cvtosalary.png";
import Img_firstbite from "../../../public/assets/projectImgs/Img_firstbite.png";
import Img_resumeonflyTwo from "../../../public/assets/projectImgs/Img_resumeonflyTwo.png";
import Img_recruitcatch from "../../../public/assets/projectImgs/Img_recruitcatch.png";
import { ExternalLink, Github } from "lucide-react";

// Dynamic Project Card Content Component
const ProjectCard = ({ project }) => {
   return (
      <div className="bg-gradient-to-b ">
         <p className="font-bold text-4xl md:text-5xl text-start text-white mb-2">
            {project.title}
         </p>
         <p className="font-normal text-xl my-4 max-w-lg text-white text-start">
            {project.description}
         </p>

         {/* Tech Stack */}
         <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, idx) => (
               <span
                  key={idx}
                  className="px-2 py-2 md:px-4 md:py-3 bg-blue-600 text-white font-bold rounded-full text-base border border-purple-500/40"
               >
                  {tech}
               </span>
            ))}
         </div>

         {/* Project Links */}
         <div className="flex gap-3 mt-4">
            <a
               href={project.github}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 rounded-lg text-white text-base font-bold transition-colors px-2 py-2 md:px-8 md:py-4 md:text-lg"
            >
               <Github size={24} />
               Code
            </a>
            <a
               href={project.live}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white text-lg font-bold transition-all "
            >
               <ExternalLink size={24} />
               Live Demo
            </a>
         </div>
      </div>
   );
};

export function LayoutGridDemo() {
   const projects = [
      {
         title: "LoveatFirstBite",
         description:
            "Restaurant and cafe management application with full MERN stack implementation",
         image: "/assets/projectImgs/Img_firstbite.png",
         tech: ["MERN", "Mongoose", "TailwindCSS"],
         github: "https://github.com/Bharath-Dubbaka/firstbite-node",
         live: "http://16-171-150-110.nip.io/",
      },
      {
         title: "CVtoSalary.com",
         description:
            "Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder",
         image: "/assets/projectImgs/Img_cvtosalary.png",
         tech: ["Next.js", "Typescript", "Tailwind CSS", "AceternityUI"],
         github: "https://github.com/Bharath-Dubbaka/CvtoSalary-aceternity",
         live: "https://cvtosalary.com/",
      },

      {
         title: "RecruitCatch.com",
         description:
            "1K active users - FREE XRay Search Tool built for Recruiters to find publicly available profiles on LinkedIn (without any limitations) to match/meet their Job requirements",
         image: "/assets/projectImgs/Img_recruitcatch.png",
         tech: ["Next.js", "React.js", "Tailwind CSS", "Google API"],
         github: "https://github.com/Bharath-Dubbaka/recruitNinja",
         live: "https://recruitcatch.com/",
      },
      {
         title: "ResumeOnFly - SaaS",
         description:
            "Built from Scratch: Built for busy job seekers — upload your master resume once, and customize it for every job in a few clicks.",
         image: "/assets/projectImgs/Img_resumeonflyTwo.png",
         tech: ["Next.js", "MERN", "Razorpay", "OpenAI", "Oauth2"],
         github: "https://github.com/Bharath-Dubbaka/ResumeMaxxing",
         live: "https://resumeonfly.com/",
      },
      //   {
      //      title: "NetflixGPT",
      //      description:
      //         "Movie App using TMDB, YouTube to view your desired movies & GPT APIs to recommend desired content",
      //      image: "/assets/projectImgs/Img_NetflixGPT.png",
      //      tech: ["React", "Tailwind", "TMDB API", "Youtube API", "OpenAI"],
      //      github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
      //      live: "https://moviesflixgpt.netlify.app",
      //   },
   ];

   // Transform projects into cards format for LayoutGrid
   const cardsArr = projects.map((project, index) => ({
      id: index + 1,
      content: <ProjectCard project={project} />,
      className:
         index === 0 || index === 3
            ? "md:col-span-2 border-5 border-blue-700/80 rounded-lg"
            : "col-span-1 border-5 border-blue-700/80 rounded-lg",
      thumbnail: project.image,
   }));

   return (
      <div className="min-h-screen py-10 w-full">
         <LayoutGrid cards={cardsArr} />
      </div>
   );
}
