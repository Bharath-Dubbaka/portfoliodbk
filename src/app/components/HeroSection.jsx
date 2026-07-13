import React, { useEffect, useRef } from "react";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";
import { PixelatedCanvasDemo } from "../ui/PixelatedCanvasDemo";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Text3D, Text3DGroup } from "./Text3D";
import PixelImage from "./PixelImage";

// `revealImages`: pass false while your full-screen Loader is up, then
// true once it's gone -- see the App integration note below. Defaults
// to true so this still works fine if you're not using a loader.
export default function HeroSection({ revealImages = true }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // offset: ["start end", "end start"],
    offset: ["start 25%", "end start"],
  });
  const isInView = useInView(targetRef, {
    amount: 0.4, // 40% visible
    once: false,
  });
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "20deg"]);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.3, once: true });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-max md:min-h-screen bg-gray-100 flex items-center justify-center px-4 md:px-4 pt-20 pb-28 md:pt-2 md:pb-10"
    >
      <div className="max-w-full md:max-w-[98%] lg:max-w-[90%] w-full grid lg:grid-cols-2 gap-6 md:gap-4 items-center">
        {/* Left Content - Name and Taglines */}
        <div className="space-y-6 md:space-y-8 min-w-0 relative z-20">
          {/* Main Name with Gradient Effect + flip-on-hover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 4.0, delay: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl leading-tight"
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-9xl font-black text-center leading-none tracking-tight whitespace-normal w-auto lg:whitespace-nowrap lg:w-max rotate-3 md:rotate-0">
              <Text3DGroup>
                <Text3D
                  primary="BHARATH"
                  secondary="BHARATH"
                  primaryClassName="font-sans block bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent"
                  secondaryClassName="font-sans block text-gray-900"
                />
                <Text3D
                  primary="DUBBAKA"
                  secondary="DUBBAKA"
                  primaryClassName="font-sans block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                  secondaryClassName="font-sans block text-blue-600"
                />
              </Text3DGroup>
            </h1>
          </motion.div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2.4, delay: 0.2 }}
            className="pt-8 space-y-3 md:space-y-4 text-gray-950 font-medium text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide leading-relaxed font-sans"
          >
            <p className="border-l-4 border-blue-500 pl-3 md:pl-4">
              Growth Strategist || Brand Builder
            </p>
            <p className="border-l-4 border-gray-500 pl-3 md:pl-4">
              SEO || Marketing || Content || Branding
            </p>
            <p className="border-l-4 border-blue-400 pl-3 md:pl-4">
              + Full-Stack Developer — I Build What I Design
            </p>
          </motion.div>
        </div>

        {/* Right Content - About Me Section */}
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            className="bg-white rounded-2xl flex flex-col shadow-2xl px-4 pt-2 md:p-8 sm:pt-8 md:px-2 lg:px-6 space-y-4 md:space-y-6 border border-blue-100 shadow-blue-100 hover:shadow-blue-200 transition-shadow duration-300 ease-in-out max-w-full"
            ref={targetRef}
            style={{ rotate }}
            animate={{
              opacity: heroInView && isInView ? 1 : 0,
              x: heroInView && isInView ? 0 : 50,
            }}
            transition={{ duration: 6.0, delay: 0.5 }}
          >
            {/* Image Wrapper Container to enforce perfect alignment */}
            <div className="w-full overflow-hidden rounded-xl bg-gray-100">
              <img
                src="/assets/dbk2.jpg"
                alt="Bharath Dubbaka"
                className=" object-center block w-60 sm:w-80 md:w-[36rem] lg:w-[40rem] max-w-sm rounded-2xl shadow-xl object-cover border-2 border-blue-900"
              />
            </div>
            {/* <PixelatedCanvasDemo /> */}
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
