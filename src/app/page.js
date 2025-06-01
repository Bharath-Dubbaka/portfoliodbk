'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import Navigation from './components/Navigation';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,        // How long scroll takes (1.2 seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      smoothWheel: true,    // Smooth wheel scrolling
      smoothTouch: false,   // Don't smooth touch (better for mobile)
    });

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track active section based on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (scrollPosition < window.innerHeight) {
        setActiveSection('hero');
      } else if (scrollPosition < window.innerHeight * 2) {
        setActiveSection('about');
      } else {
        setActiveSection('projects');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
}