"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header({ activeSection, setActiveSection }) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
         setActiveSection(sectionId);
      }
   };

   const navigationSections = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
   ];

   return (
      <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-b border-indigo-100 shadow-sm backdrop-blur-md">
         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-[4rem]">
               {/* Logo */}
               <Link href="/" className="flex flex-col justify-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-800 to-pink-800 text-transparent bg-clip-text tracking-tight">
                     Bharath Dubbaka
                  </div>
               </Link>

               {/* Desktop Nav */}
               <nav className="hidden lg:flex space-x-6">
                  {navigationSections.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`text-sm font-medium transition duration-200 hover:scale-105 transform rounded-md px-2 py-1 ${
                           activeSection === section.id
                              ? "text-indigo-700 border-b-2 bg-slate-300 border-indigo-700"
                              : "text-slate-600 hover:text-indigo-600"
                        }`}
                     >
                        {section.label}
                     </button>
                  ))}
               </nav>

               {/* Mobile Menu Button */}
               <div className="lg:hidden flex items-center">
                  <button
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md"
                  >
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>
               </div>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
               <div className="lg:hidden mt-2 py-2 bg-white rounded-md shadow-md border border-indigo-100">
                  {navigationSections.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => {
                           scrollToSection(section.id);
                           setIsMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                           activeSection === section.id
                              ? "text-indigo-700 font-semibold"
                              : "text-slate-700 hover:text-indigo-600"
                        }`}
                     >
                        {section.label}
                     </button>
                  ))}
               </div>
            )}
         </div>
      </header>
   );
}
