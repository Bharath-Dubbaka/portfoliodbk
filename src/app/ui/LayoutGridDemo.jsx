"use client";
import React from "react";
import { LayoutGrid } from "./layout-grid";
import Img_cvtosalary from "../../../public/assets/projectImgs/Img_cvtosalary.png";
import Img_firstbite2 from "../../../public/assets/projectImgs/Img_firstbite2.PNG";
import Img_resumeonfly2 from "../../../public/assets/projectImgs/Img_resumeonfly2.PNG";
import Img_recruitcatch from "../../../public/assets/projectImgs/Img_recruitcatch.png";
import { ExternalLink, Github } from "lucide-react";

// ──────────────────────────────────────────────────────────
// CLOSED CARD — unchanged, exactly as it was before
// ──────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────
// EXPANDED MODAL CONTENT — new rich detail view
// Only rendered for projects that have a `detail` object
// ──────────────────────────────────────────────────────────
const SectionBlock = ({ label, children, accent = "blue" }) => {
  const accentMap = {
    blue: "border-blue-500 text-blue-300",
    purple: "border-purple-500 text-purple-300",
    pink: "border-pink-500 text-pink-300",
    green: "border-green-500 text-green-300",
  };
  return (
    <div className={`border-l-4 ${accentMap[accent]} pl-4 mb-5`}>
      <p
        className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-1 ${accentMap[accent].split(" ")[1]}`}
      >
        {label}
      </p>
      <p className="text-gray-200 text-base md:text-lg leading-relaxed">
        {children}
      </p>
    </div>
  );
};

const ProjectDetail = ({ project }) => {
  const d = project.detail;

  return (
    <div className="bg-gradient-to-b max-w-3xl">
      <p className="font-bold text-3xl md:text-5xl text-start text-white mb-1">
        {project.title}
      </p>
      {d?.subtitle && (
        <p className="text-blue-400 font-semibold text-base md:text-lg mb-6">
          {d.subtitle}
        </p>
      )}

      {/* The Story */}
      {d?.story && (
        <SectionBlock label="The Story" accent="blue">
          {d.story}
        </SectionBlock>
      )}

      {/* Dynamic highlight sections (Branding, Growth, Strategy, Ranking, etc.) */}
      {d?.highlights?.map((h, idx) => (
        <SectionBlock
          key={idx}
          label={h.label}
          accent={["purple", "pink", "green", "blue"][idx % 4]}
        >
          {h.text}
        </SectionBlock>
      ))}

      {/* Dev / systems note — kept brief, present but not the headline */}
      {d?.systemNote && (
        <SectionBlock
          label={d.systemNoteLabel || "The System Behind It"}
          accent="green"
        >
          {d.systemNote}
        </SectionBlock>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6 mt-6">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600/90 text-white font-semibold rounded-full text-sm md:text-base border border-purple-500/40"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 rounded-lg text-white text-sm md:text-base font-bold transition-colors px-3 py-2 md:px-6 md:py-3"
          >
            <Github size={20} />
            Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white text-sm md:text-base font-bold transition-all"
          >
            <ExternalLink size={20} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// PROJECT DATA — closed card content untouched,
// `detail` object added only for the 4 deep-treatment projects
// ──────────────────────────────────────────────────────────
export function LayoutGridDemo() {
  const projects = [
    {
      title: "LoveatFirstBite",
      description:
        "Restaurant and cafe management application with full MERN stack implementation, with user authentication and admin panel for managing bookings/orders, dynamic menu with order processing,",
      image: "/assets/projectImgs/Img_firstbite2.PNG",
      tech: ["MERN", "Mongoose", "TailwindCSS", "JWT Auth"],
      github: "https://github.com/Bharath-Dubbaka/firstbite-node",
      live: "https://loveatfirstbyte.in/",
      detail: {
        subtitle: "Café Brand Build + Custom POS System",
        story:
          "Started as an office canteen serving home-style food. I took it from a WhatsApp ordering group to a fully branded café — owning the market research, the brand identity, the social growth, and eventually the custom POS system it still runs on every single day.",
        highlights: [
          {
            label: "Branding",
            text: "Grew from a single canteen to a branded café with 4.7★ and 70 Google reviews.",
          },
          {
            label: "Growth",
            text: "Listed across Zomato, Swiggy, EazyDiner, District, Dining Delight — full digital presence built from zero.",
          },
          {
            label: "Strategy",
            text: "Ran festival-specific content (Ugadi, Ganesh Chaturthi) targeting non-local residents craving home food — consistently outperformed regular posts.",
          },
        ],
        systemNoteLabel: "The System Behind It",
        systemNote:
          "Built the custom POS myself — live table management, kitchen display, GST-compliant billing — because the brand needed operational infrastructure, not just marketing.",
      },
    },
    {
      title: "CVtoSalary.com",
      description:
        "Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder functionality, Practice project trying to clone Tinder",
      image: "/assets/projectImgs/Img_cvtosalary.png",
      tech: ["Next.js", "Typescript", "Tailwind CSS", "Aceternity UI"],
      github: "https://github.com/Bharath-Dubbaka/CvtoSalary-aceternity",
      live: "",
      // no detail object — closed-card-only, untouched
    },
    {
      title: "RecruitCatch.com",
      description:
        "1K active users - FREE XRay Search Tool built for Recruiters to find publicly available profiles on LinkedIn (without any limitations) to match/meet their Job requirements",
      image: "/assets/projectImgs/Img_recruitcatch.png",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Google API"],
      github: "https://github.com/Bharath-Dubbaka/recruitNinja",
      live: "https://recruitcatch.netlify.app/",
      detail: {
        subtitle: "Free X-Ray Search Tool — 1,000+ Active Recruiters",
        story:
          "Recruiters spend hours manually building Boolean search strings to find candidates on LinkedIn. I built a free tool that does it in seconds — built from my own 5+ years of recruiting experience solving my own problem.",
        highlights: [
          {
            label: "Growth",
            text: "1,000+ active users, entirely organic — zero ad spend, grown through word-of-mouth in the recruiting community.",
          },
          {
            label: "Product Instinct",
            text: "Spotted a gap nobody else was solving, then built and shipped it — same instinct I bring to client growth work.",
          },
        ],
      },
    },
    {
      title: "ResumeOnFly - SaaS",
      description:
        "Built from Scratch: Built for busy job seekers — upload your master resume once, and customize it for every job in a few clicks.",
      image: "/assets/projectImgs/Img_resumeonfly2.PNG",
      tech: ["Next.js", "MERN", "Razorpay", "OpenAI", "Oauth2"],
      github: "https://github.com/Bharath-Dubbaka/ResumeMaxxing",
      live: "https://resumeonfly.netlify.app/",
      detail: {
        subtitle: "SaaS Product — AI-Tailored Resumes, Built Solo",
        story:
          "Job seekers either reuse one generic resume everywhere, or burn hours manually tailoring each one. I built a SaaS that solves this — upload your resume once, paste any job description, get an AI-tailored version in minutes.",
        highlights: [
          {
            label: "Product Thinking",
            text: "Identified a real, recurring pain point and built the end-to-end solution myself — not just the idea, the actual product.",
          },
          {
            label: "Execution",
            text: "AI-powered skill matching, three downloadable resume templates, secure auth, and a working dual-payment system (India + international) — built solo, shipped live.",
          },
          {
            label: "Why It Matters",
            text: "This is what \u201CI build what I design\u201D looks like in practice — not a mockup, a real SaaS people can use today.",
          },
        ],
      },
    },
    {
      title: "BackpackerIndia",
      description:
        "Travel agency website for booking and exploring travel packages across India destinations, and user inquiries, built using the wordpress stack and supported with SEO / SMM / Content Writing.",
      image: "/assets/projectImgs/Img_backpackerindia.png",
      tech: ["Wordpress", "Branding", "SEO", "SMM", "Content writing"],
      github: "",
      live: "https://backpackerindia.com//",
      detail: {
        subtitle: "From Page 5 to #1 on Google — Full Brand Build",
        story:
          "A travel agency invisible on Google — buried on page 5-6 for their own brand name, against 81 lakh competing search results. I took them to #1 in under a month, then built their entire digital presence from there.",
        highlights: [
          {
            label: "Ranking",
            text: "#1 Google ranking for \u201Cbackpacker india\u201D — sustained, not a fluke.",
          },
          {
            label: "Strategy",
            text: "Used Google Trends to map seasonal travel demand — built content calendars around actual booking seasons (Himachal: Nov\u2013Feb, Goa/Kerala: Feb\u2013Apr) instead of guessing.",
          },
          {
            label: "Growth",
            text: "Instagram grew to 8K followers, Facebook to 3K. Google Business rating: 4.8★ with 53 reviews.",
          },
          {
            label: "Relationship",
            text: "18 months of continuous client work, ongoing — built on results, not a one-time project.",
          },
        ],
      },
    },
    {
      title: "NetflixGPT",
      description:
        "Movie App using TMDB, YouTube to view your desired movies & GPT APIs to recommend desired content",
      image: "/assets/projectImgs/Img_NetflixGPT.png",
      tech: ["React", "Tailwind", "TMDB API", "Youtube API", "OpenAI"],
      github: "https://github.com/Bharath-Dubbaka/SwiggyClone",
      live: "https://moviesflixgpt.netlify.app",
      // no detail object — closed-card-only, untouched
    },
  ];

  // Transform projects into cards format for LayoutGrid ZigZag
  const cardsArr = projects.map((project, index) => {
    let className = "col-span-1 border-[5px] border-blue-700/80 rounded-lg";

    if (index === 0)
      className = "md:col-span-2 border-[5px] border-blue-700/80 rounded-lg"; // card 1
    if (index === 3)
      className = "md:col-span-2 border-[5px] border-blue-700/80 rounded-lg"; // card 4
    if (index === 4)
      className = "md:col-span-2 border-[5px] border-blue-700/80 rounded-lg"; // card 5

    return {
      id: index + 1,
      // closed card — exactly as before
      content: <ProjectCard project={project} />,
      // expanded modal content — rich detail if available, otherwise falls back to the same card
      expandedContent: project.detail ? (
        <ProjectDetail project={project} />
      ) : (
        <ProjectCard project={project} />
      ),
      className,
      thumbnail: project.image,
    };
  });

  return (
    <div className="min-h-screen py-10 w-full">
      <LayoutGrid cards={cardsArr} />
    </div>
  );
}
