"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import Lenis from "@studio-freight/lenis";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Navigation from "./components/Navigation";

export default function Home() {
   const [activeSection, setActiveSection] = useState("hero");
   // Using useRef to hold the Lenis instance so it persists across renders
   // and can be accessed within scrollToSection and cleanup.
   const lenisRef = useRef(null);

   // Define scrollToSection here, inside the Home component, before the return statement.
   const scrollToSection = (sectionId) => {
      console.log("scrollToSection called for:", sectionId); // ADD THIS
      const element = document.getElementById(sectionId);
      console.log("Element found:", element); // ADD THIS
      console.log("Lenis ref current:", lenisRef.current); // ADD THIS

      if (element && lenisRef.current) {
         lenisRef.current.scrollTo(element, { offset: 0 });
         setActiveSection(sectionId);
         console.log("Lenis scroll initiated to:", sectionId); // ADD THIS
      } else if (element) {
         // Fallback to native smooth scroll if Lenis isn't ready
         element.scrollIntoView({ behavior: "smooth" });
         setActiveSection(sectionId);
         console.log("Native scroll initiated to:", sectionId); // ADD THIS
      } else {
         console.warn(
            `Element with ID "${sectionId}" not found for scrolling.`
         ); // ADD THIS
      }
   };
   // Initialize Lenis for smooth scrolling
   useEffect(() => {
      const lenis = new Lenis({
         duration: 1.2, // How long scroll takes (1.2 seconds)
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
         smoothWheel: true, // Smooth wheel scrolling
         smoothTouch: false, // Don't smooth touch (better for mobile)
      });

      // Animation frame loop for Lenis
      function raf(time) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      const handleScroll = () => {
         const heroElement = document.getElementById("hero");
         const projectsElement = document.getElementById("projects");
         const contactElement = document.getElementById("contact");

         const scrollPosition = window.scrollY;
         const offset = window.innerHeight * 0.3;

         // Log the elements found for active section tracking
         // console.log('Scroll:', scrollPosition, 'Hero top:', heroElement?.offsetTop, 'Projects top:', projectsElement?.offsetTop, 'Contact top:', contactElement?.offsetTop);

         if (
            contactElement &&
            scrollPosition + offset >= contactElement.offsetTop
         ) {
            setActiveSection("contact");
         } else if (
            projectsElement &&
            scrollPosition + offset >= projectsElement.offsetTop
         ) {
            setActiveSection("projects");
         } else if (
            heroElement &&
            scrollPosition + offset >= heroElement.offsetTop
         ) {
            setActiveSection("hero");
         } else {
            setActiveSection("hero");
         }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once on mount

      return () => {
         window.removeEventListener("scroll", handleScroll);
         if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
            console.log("Lenis destroyed."); // ADD THIS
         }
      };
   }, []);

   return (
      <div className="bg-gray-900 text-white">
         <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollToSection={scrollToSection}
         />
         <HeroSection scrollToSection={scrollToSection} />
         <ProjectsSection />
         <AboutSection />
         <ContactSection />
      </div>
   );
}
