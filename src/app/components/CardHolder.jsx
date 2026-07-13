"use client";
import "../globals.css";
import { projects } from "./data";
import Card from "./Card";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CardHolder() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const [titleRef, titleinView] = useInView({ threshold: 0.2 });
  const [cardsRef, cardsinView] = useInView({ threshold: 0.2 });
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <section ref={container} className="main bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleinView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={titleinView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-blue-600/90">MY WORK</span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-xl lg:text-xl font-black leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={titleinView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xl font-semibold text-gray-600 leading-relaxed">
              Here are some of my recent projects that showcase my skills and
              passion for development
            </span>
          </motion.p>
        </motion.div>

        {/* Projects grid NEW*/}
        <div className="main">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
