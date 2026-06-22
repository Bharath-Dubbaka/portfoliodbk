"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid } from "./layout-grid";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Star,
  Target,
  Users,
  Lightbulb,
  Wrench,
  Award,
  Handshake,
  Sparkles,
  Search,
  PenTool,
  Megaphone,
  BarChart3,
  ListChecks,
  CalendarRange,
  MousePointerClick,
  Briefcase,
  LineChart,
  UtensilsCrossed,
  Code2,
} from "lucide-react";

// NOTE: project images are referenced as plain string paths (e.g. "/assets/projectImgs/...")
// in the `projects` array below, NOT as JS imports. Next.js serves anything in `public/`
// directly by URL path — importing files from `public/` as modules is unsupported under
// Turbopack (Next.js 16+) and will break the build with "Unknown module type".

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
          Live Link
        </a>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// EXPANDED MODAL CONTENT — new rich detail view
// Only rendered for projects that have a `detail` object
// ──────────────────────────────────────────────────────────

// Maps a highlight's label to an icon + color. Falls back gracefully for
// labels not explicitly listed.
const ICON_MAP = {
  // technical / product
  branding: { icon: Star, color: "text-purple-300", bg: "bg-purple-500/15" },
  growth: { icon: TrendingUp, color: "text-pink-300", bg: "bg-pink-500/15" },
  strategy: { icon: Target, color: "text-green-300", bg: "bg-green-500/15" },
  ranking: { icon: Award, color: "text-yellow-300", bg: "bg-yellow-500/15" },
  relationship: {
    icon: Handshake,
    color: "text-blue-300",
    bg: "bg-blue-500/15",
  },
  "product thinking": {
    icon: Lightbulb,
    color: "text-purple-300",
    bg: "bg-purple-500/15",
  },
  "product instinct": {
    icon: Lightbulb,
    color: "text-purple-300",
    bg: "bg-purple-500/15",
  },
  execution: { icon: Wrench, color: "text-green-300", bg: "bg-green-500/15" },
  "why it matters": {
    icon: Sparkles,
    color: "text-blue-300",
    bg: "bg-blue-500/15",
  },
  // marketing / strategy
  "market research & feasibility analysis": {
    icon: Search,
    color: "text-cyan-300",
    bg: "bg-cyan-500/15",
  },
  "brand strategy & identity development": {
    icon: Star,
    color: "text-purple-300",
    bg: "bg-purple-500/15",
  },
  "social media management (smm)": {
    icon: Megaphone,
    color: "text-pink-300",
    bg: "bg-pink-500/15",
  },
  "content creation & graphic design": {
    icon: PenTool,
    color: "text-orange-300",
    bg: "bg-orange-500/15",
  },
  "on-page & technical seo": {
    icon: Search,
    color: "text-green-300",
    bg: "bg-green-500/15",
  },
  "search engine optimization (seo) — technical & on-page": {
    icon: Search,
    color: "text-green-300",
    bg: "bg-green-500/15",
  },
  "analytics & performance tracking": {
    icon: BarChart3,
    color: "text-cyan-300",
    bg: "bg-cyan-500/15",
  },
  "online reputation management & listings management": {
    icon: ListChecks,
    color: "text-blue-300",
    bg: "bg-blue-500/15",
  },
  "influencer marketing & brand partnerships": {
    icon: Megaphone,
    color: "text-pink-300",
    bg: "bg-pink-500/15",
  },
  "influencer marketing & paid social": {
    icon: Megaphone,
    color: "text-pink-300",
    bg: "bg-pink-500/15",
  },
  "paid social advertising (meta ads)": {
    icon: Target,
    color: "text-red-300",
    bg: "bg-red-500/15",
  },
  "demand-led content strategy / occasion-based marketing": {
    icon: CalendarRange,
    color: "text-yellow-300",
    bg: "bg-yellow-500/15",
  },
  "seasonal menu & demand forecasting": {
    icon: UtensilsCrossed,
    color: "text-orange-300",
    bg: "bg-orange-500/15",
  },
  "seasonal demand forecasting (search trend analysis)": {
    icon: LineChart,
    color: "text-yellow-300",
    bg: "bg-yellow-500/15",
  },
  "business development advisory": {
    icon: Briefcase,
    color: "text-blue-300",
    bg: "bg-blue-500/15",
  },
  "keyword strategy & serp ranking": {
    icon: Award,
    color: "text-yellow-300",
    bg: "bg-yellow-500/15",
  },
  "content strategy & editorial calendar": {
    icon: PenTool,
    color: "text-orange-300",
    bg: "bg-orange-500/15",
  },
  "conversion rate optimization (cro) elements": {
    icon: MousePointerClick,
    color: "text-green-300",
    bg: "bg-green-500/15",
  },
  "client relationship management": {
    icon: Handshake,
    color: "text-blue-300",
    bg: "bg-blue-500/15",
  },
};
const DEFAULT_ICON = {
  icon: Users,
  color: "text-blue-300",
  bg: "bg-blue-500/15",
};

const SectionBlock = ({ label, children, index = 0 }) => {
  const match = ICON_MAP[label.toLowerCase()] || DEFAULT_ICON;
  const Icon = match.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.4),
        ease: "easeOut",
      }}
      className="w-full text-left bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-200 rounded-xl p-4 md:p-5 border border-white/10 hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${match.bg}`}
        >
          <Icon size={16} className={match.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-1.5 ${match.color}`}
          >
            {label}
          </p>
          <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed text-left">
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Stat cards row — pulls out the biggest, punchiest numbers up top so a reader
// gets the "wow" in 3 seconds before reading any prose.
const StatsGrid = ({ stats }) => {
  if (!stats || stats.length === 0) return null;
  return (
    <div
      className={`grid gap-3 mb-6 ${stats.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
    >
      {stats.map((s, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.07, ease: "easeOut" }}
          className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-xl p-3 md:p-4 text-center"
        >
          <p className="text-xl md:text-3xl font-extrabold text-white leading-tight">
            {s.value}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide mt-1 font-medium">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// Tab switcher — toggles between "Strategy & Marketing" and "What I Built" (technical)
const TabSwitcher = ({ active, onChange, hasMarketing, hasTechnical }) => {
  if (!hasMarketing || !hasTechnical) return null; // only show tabs if both exist
  const tabs = [
    { key: "marketing", label: "Strategy & Marketing", icon: Megaphone },
    { key: "technical", label: "What I Built", icon: Code2 },
  ];
  return (
    <div className="flex gap-1 mb-5 bg-white/[0.04] border border-white/10 rounded-xl p-1 w-fit">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors duration-200 ${
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 bg-blue-600 rounded-lg"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <Icon size={14} className="relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const ProjectDetail = ({ project }) => {
  const d = project.detail;
  const hasMarketing = d?.marketingHighlights?.length > 0;
  const hasTechnical = d?.highlights?.length > 0;
  const [activeTab, setActiveTab] = useState(
    hasMarketing ? "marketing" : "technical",
  );

  const activeHighlights =
    activeTab === "marketing" ? d?.marketingHighlights : d?.highlights;

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="font-bold text-3xl md:text-4xl text-left text-white mb-1">
            {project.title}
          </p>
          {d?.subtitle && (
            <p className="text-blue-400 font-semibold text-sm md:text-base text-left flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
              {d.subtitle.toUpperCase()}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 flex gap-2 items-end">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-gray-700/80 hover:bg-gray-600 rounded-lg text-white text-xs md:text-sm font-bold transition-colors px-3 py-2"
            >
              <Github size={16} />
              <span className="hidden sm:inline">Source Code</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs md:text-sm font-bold transition-all"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* STATS — the "wow" numbers, front and center */}
      <StatsGrid stats={d?.stats} />

      {/* OVERVIEW — short one-liner, distinct card */}
      {d?.overview && (
        <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/10 rounded-lg p-4 mb-4">
          <Code2 size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">
              Overview
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {d.overview}
            </p>
          </div>
        </div>
      )}

      {/* THE STORY — left accent border, reads like an intro paragraph */}
      {d?.story && (
        <div className="border-l-2 border-blue-500 pl-4 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2">
            The Story
          </p>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
            {d.story}
          </p>
        </div>
      )}

      {/* TAB SWITCHER — only shows if both highlight sets exist */}
      <TabSwitcher
        active={activeTab}
        onChange={setActiveTab}
        hasMarketing={hasMarketing}
        hasTechnical={hasTechnical}
      />

      {/* Eyebrow label above the grid */}
      {activeHighlights?.length > 0 && (
        <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-3">
          {activeTab === "marketing"
            ? "Key Work Highlights"
            : "Technical Highlights"}
        </p>
      )}

      {/* HIGHLIGHTS — 2-column grid, icon-led cards, animated on tab switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid md:grid-cols-2 gap-3 mb-3"
        >
          {activeHighlights?.map((h, idx) => (
            <SectionBlock
              key={`${activeTab}-${idx}`}
              label={h.label}
              index={idx}
            >
              {h.text}
            </SectionBlock>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Results strip — full width, shown under whichever tab is active if present */}
      {activeTab === "marketing" && d?.marketingResults && (
        <div className="mt-2 mb-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-green-300 mb-1.5">
            Results
          </p>
          <p className="text-gray-200 text-sm md:text-[15px] leading-relaxed">
            {d.marketingResults}
          </p>
        </div>
      )}

      {/* Dev / systems note — full width, kept brief, only on technical tab */}
      {activeTab === "technical" && d?.systemNote && (
        <div className="mt-2">
          <SectionBlock label={d.systemNoteLabel || "The System Behind It"}>
            {d.systemNote}
          </SectionBlock>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-2 mt-6 pt-5 border-t border-white/10">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-blue-600/90 text-white font-semibold rounded-full text-xs md:text-sm border border-purple-500/40"
          >
            {tech}
          </span>
        ))}
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
        overview:
          "Restaurant and café management application with full MERN stack implementation, user authentication, and an admin panel for managing bookings, orders, and a dynamic menu with order processing.",
        stats: [
          { value: "4.7★", label: "Google Rating" },
          { value: "70", label: "Reviews" },
          { value: "5+", label: "Platforms Listed" },
        ],
        story:
          "Started as an office canteen serving home-style food. I took it from a WhatsApp ordering group to a fully branded café — owning the market research, the brand identity, the social growth, and eventually the custom POS system it still runs on every single day.",
        marketingHighlights: [
          {
            label: "Market Research & Feasibility Analysis",
            text: "Competitive analysis, footfall potential assessment, market sizing, and risk/opportunity evaluation prior to the café's physical launch.",
          },
          {
            label: "Brand Strategy & Identity Development",
            text: "Took the business from an unbranded canteen to a fully positioned café brand — name, visual identity, and market positioning.",
          },
          {
            label: "Social Media Management (SMM)",
            text: "Built Instagram and Facebook from zero to an engaged, locally-recognized following — organic growth, no paid follower acquisition.",
          },
          {
            label: "Content Creation & Graphic Design",
            text: "Designed all social media creatives and visual brand assets in-house.",
          },
          {
            label: "On-Page & Technical SEO",
            text: "Website SEO implementation including sitemap configuration, robots.txt setup, and OpenGraph metadata for improved search visibility and social link previews.",
          },
          {
            label: "Analytics & Performance Tracking",
            text: "Integrated Google Analytics for traffic and behavior tracking; implemented Google AdSense (ads.txt and script-level setup) for monetization infrastructure.",
          },
          {
            label: "Online Reputation Management & Listings Management",
            text: "Onboarded and optimized business listings across Zomato, Swiggy, EazyDiner, District, and Dining Delight.",
          },
          {
            label: "Influencer Marketing & Brand Partnerships",
            text: "Sourced and managed ongoing influencer tie-ups and paid promotional collaborations to extend brand reach.",
          },
          {
            label: "Paid Social Advertising (Meta Ads)",
            text: "Planned and executed paid campaigns on Meta to boost reach during high-engagement festive periods.",
          },
          {
            label: "Demand-Led Content Strategy / Occasion-Based Marketing",
            text: "Identified high-intent cultural moments (Ugadi, Ganesh Chaturthi) and engineered targeted content around regional nostalgia for non-local residents — outperformed standard festival-greeting content.",
          },
          {
            label: "Seasonal Menu & Demand Forecasting",
            text: "Applied search-trend and seasonal-demand analysis to menu planning itself — introducing rare, occasion-specific dishes timed to seasonal cravings and regional festive patterns.",
          },
          {
            label: "Business Development Advisory",
            text: "Provided informal consulting on vendor sourcing and physical setup logistics during the café's launch phase.",
          },
        ],
        marketingResults:
          "4.7★ Google rating across 70 reviews · Listed and discoverable across 5+ major food delivery and discovery platforms · Built and sustained an engaged local social media following entirely through organic strategy — zero paid follower acquisition.",
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
      title: "RecruitCatch.com",
      description:
        "1K active users - FREE XRay Search Tool built for Recruiters to find publicly available profiles on LinkedIn (without any limitations) to match/meet their Job requirements",
      image: "/assets/projectImgs/Img_recruitcatch.png",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Google API"],
      github: "https://github.com/Bharath-Dubbaka/recruitNinja",
      live: "https://recruitcatch.netlify.app/",
      detail: {
        subtitle: "Free X-Ray Search Tool — 1,000+ Active Recruiters",
        overview:
          "1K active users - FREE X-Ray Search Tool built for recruiters to find publicly available profiles on LinkedIn (without any limitations) to match their job requirements.",
        stats: [
          { value: "1,000+", label: "Active Users" },
          { value: "$0", label: "Ad Spend" },
        ],
        story:
          "Recruiters spend hours manually building Boolean search strings to find candidates on LinkedIn. I built a free tool that does it in seconds — built from my own 5+ years of recruiting experience solving my own problem.",
        marketingHighlights: [
          {
            label: "Product Thinking",
            text: "Built a tool directly from a personally-experienced pain point within the recruiting industry — validated demand by solving your own workflow problem first.",
          },
          {
            label: "Growth",
            text: "Scaled to 1,000+ active users with zero paid acquisition spend, driven entirely through word-of-mouth within the recruiting community.",
          },
          {
            label: "On-Page & Technical SEO",
            text: "Implemented sitemap, robots.txt, and OpenGraph metadata for search visibility and social sharing.",
          },
          {
            label: "Client Relationship Management",
            text: "Open-sourced the project in collaboration with industry colleagues, fostering community contribution and trust.",
          },
        ],
        marketingResults:
          "1,000+ active users acquired with zero ad spend — entirely organic, word-of-mouth growth within the recruiting community.",
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
      title: "CVtoSalary.com",
      description:
        "A salary-negotiation tool that estimates fair compensation ranges from a resume, built to practice Aceternity UI and TypeScript patterns in a real, deployed app.",
      image: "/assets/projectImgs/Img_cvtosalary.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Aceternity UI"],
      github: "https://github.com/Bharath-Dubbaka/CvtoSalary-aceternity",
      live: "",
      detail: {
        subtitle: "Practice Build — Salary Estimation Tool",
        overview:
          "A focused practice project: upload or paste a resume, get an estimated fair salary range based on role, experience, and skills — built specifically to get hands-on with TypeScript and Aceternity UI's animation-heavy component patterns.",
        story:
          "Not every project needs to be a client deliverable to be worth building. This one was about deliberately stretching into TypeScript and a new component library (Aceternity UI) outside of a client deadline — the kind of practice that compounds into the bigger builds.",
        highlights: [
          {
            label: "Execution",
            text: "Built end-to-end with strict TypeScript typing and Aceternity UI's motion-based components — a deliberate skill-stretch outside familiar JavaScript/Tailwind territory.",
          },
          {
            label: "Why It Matters",
            text: "Practice projects like this are where new tools get tested safely before they show up in client or product work.",
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
        overview:
          "Built from scratch: built for busy job seekers — upload your master resume once, and customize it for every job in a few clicks.",
        // stats: [
        //   { value: "3", label: "Resume Templates" },
        //   { value: "2", label: "Payment Gateways" },
        //   { value: "Solo", label: "Built & Shipped" },
        // ],
        story:
          "Job seekers either reuse one generic resume everywhere, or burn hours manually tailoring each one. I built a SaaS that solves this — upload your resume once, paste any job description, get an AI-tailored version in minutes.",
        marketingHighlights: [
          {
            label: "Product Thinking",
            text: "Identified a real, recurring pain point and built the end-to-end solution myself — not just the idea, the actual product.",
          },
          {
            label: "Why It Matters",
            text: "This is what \u201CI build what I design\u201D looks like in practice — not a mockup, a real SaaS people can use today.",
          },
          {
            label: "Business Development Advisory",
            text: "Developed launch strategy thinking, including Product Hunt positioning, and a tiered freemium-to-premium pricing model with localized pricing for international markets.",
          },
          {
            label: "Content Creation & Graphic Design",
            text: "Wrote all onboarding, in-app guidance, and product messaging — full UX writing and product copywriting.",
          },
        ],
        marketingResults:
          "Designed and shipped a complete monetization model — tiered freemium-to-premium quotas with India + international pricing — built and launched entirely solo, no team.",
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
        overview:
          "Travel agency website for booking and exploring travel packages across India destinations, supported with end-to-end SEO, SMM, and content strategy.",
        stats: [
          { value: "#1", label: "Google Ranking" },
          { value: "8K", label: "Instagram Followers" },
          { value: "4.8★", label: "Google Rating" },
        ],
        story:
          "A travel agency invisible on Google — buried on page 5-6 for their own brand name, against 81 lakh competing search results. I took them to #1 in under a month, then built their entire digital presence from there.",
        marketingHighlights: [
          {
            label: "Search Engine Optimization (SEO) — Technical & On-Page",
            text: "Full SEO audit and remediation; resolved technical SEO issues and rewrote on-page content to improve rankings.",
          },
          {
            label: "Keyword Strategy & SERP Ranking",
            text: "Took the brand from page 5–6 to the #1 organic position for a highly competitive branded keyword (81 lakh+ competing results) within 30 days.",
          },
          {
            label: "Content Strategy & Editorial Calendar",
            text: "Authored ongoing SEO-driven blog content (1–2 posts weekly) to sustain organic growth and topical authority.",
          },
          {
            label: "Seasonal Demand Forecasting (Search Trend Analysis)",
            text: "Used Google Trends and Keywords Everywhere to map seasonal search demand by destination, building a data-informed content calendar (Himachal: Nov–Feb; Goa/Kerala/Karnataka: Feb–Apr) rather than a reactive posting schedule.",
          },
          {
            label: "Social Media Management (SMM)",
            text: "Built and scaled Instagram and Facebook presence from the ground up through organic content strategy alone — no paid follower acquisition.",
          },
          {
            label: "Influencer Marketing & Paid Social",
            text: "Managed influencer partnerships and Meta ad campaigns to extend brand reach.",
          },
          {
            label: "Conversion Rate Optimization (CRO) Elements",
            text: "Implemented website forms and promotional offers to support lead capture and conversion.",
          },
          {
            label: "Client Relationship Management",
            text: "Sustained an 18-month, ongoing retainer-style engagement built on measurable results.",
          },
        ],
        marketingResults:
          "#1 Google ranking for \u201Cbackpacker india\u201D — sustained, not a one-time spike · Instagram grown to 8K followers, Facebook to 3K — both organic · 4.8★ Google rating across 53 reviews · 18 months of continuous, results-driven client retention.",
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
      title: "Other",
      description:
        "Smaller-scope freelance work across social media management, web design, and à la carte SEO/SMM services for staffing firms, photographers, and local businesses.",
      image: "/assets/projectImgs/Img_NetflixGPT.png",
      tech: ["Social Media Mgmt", "Web Design", "SEO", "SMM"],
      github: "",
      live: "",
      detail: {
        subtitle: "Independent Freelance Engagements (Smaller Scope)",
        overview:
          "A collection of scoped, shorter-term freelance engagements — social media management for staffing firms, landing pages for local businesses, and à la carte SEO/SMM services — alongside the larger client relationships above.",
        story:
          "Not every engagement is an 18-month retainer. Some clients just need one thing done well — a content calendar, a landing page, a focused SEO push. These smaller projects rounded out the freelance work and kept the pipeline of real, paying client work going between the bigger builds.",
        marketingHighlights: [
          {
            label: "Social Media Management (SMM)",
            text: "Managed LinkedIn, Facebook, and X content calendars (3 posts/week) for multiple staffing firm clients over engagements up to 6 months; grew one client's LinkedIn following from 100 to 2,000 organically.",
          },
          {
            label: "Web Design & Development",
            text: "Delivered landing pages and portfolio websites for photography clients, a co-working space, and an army training camp.",
          },
          {
            label: "À La Carte SEO & SMM Services",
            text: "Provided scoped, single-service engagements (SEO-only or SMM-only) for smaller clients based on specific business needs.",
          },
        ],
        marketingResults:
          "Grew one staffing client's LinkedIn following from 100 to 2,000 organically · Delivered 5+ standalone landing page and SMM engagements across recruiting, photography, co-working, and training-camp clients.",
      },
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
      // used by the sticky footer in layout-grid.jsx
      githubLink: project.github,
      liveLink: project.live,
    };
  });

  return (
    <div className="min-h-screen py-10 w-full">
      <LayoutGrid cards={cardsArr} />
    </div>
  );
}
