import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    // triggerOnce: true,
  });
  const [ref2, inView2] = useInView({
    threshold: 0.2,
    // triggerOnce: true,
  });
  const [ref3, inView3] = useInView({
    threshold: 0.2,
    // triggerOnce: true,
  });
  return (
    <section id="about" className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-6 w-full md:max-w-[80%]">
        <motion.div>
          {/* Header */}
          <div className="mb-8">
            <motion.p
              ref={ref}
              className="text-sm md:text-base text-gray-500 uppercase tracking-wider mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              WHO THE HECK AM I?
            </motion.p>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="text-blue-600">I'M A GROWTH</span>
              <br />
              <span className="text-blue-600">PARTNER, BRAND</span>
              <br />
              <span className="text-blue-600">BUILDER, AND PROBLEM-</span>
              <br />
              <span className="text-blue-600">SOLVER WHO ALSO</span>
              <br />
              <span className="text-blue-600">BUILDS WHAT I DESIGN</span>
            </motion.h2>
          </div>

          {/* Divider */}
          <motion.div
            className="border-t-2 border-gray-300 my-10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Main Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              ref={ref2}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  What Drives Me
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  I don't just market businesses — I grow them. From ranking a
                  brand #1 on Google against 81 lakh competing results, to
                  building a café's entire digital presence from scratch, to
                  designing a custom POS system they still run on daily — I
                  solve the whole problem, not just one piece of it.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Growth Strategist
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Brand Builder
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Entrepreneur
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Additional Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView3 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              ref={ref3}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-black">
                  Unique Background
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  My foundation in{" "}
                  <span className="font-semibold text-blue-400">
                    Digital Marketing, SEO, Branding, and Content Strategy
                  </span>{" "}
                  comes from real client work — not theory. And because I also
                  build full-stack web applications, I don't just hand off a
                  strategy and hope someone else executes it well.{" "}
                  <span className="font-semibold text-blue-400">
                    I build the websites/apps, the brand, and the system myself.
                  </span>
                </p>
              </div>

              {/* <motion.div
                        className="text-center md:text-right"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                     >
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 border-2 border-blue-600 hover:border-blue-700">
                           More About Me
                        </button>
                     </motion.div> */}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          {/* <motion.div
                  className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
               >
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                     Ready to Build or Hire?
                  </h3>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                     Whether you're hiring or need someone to prototype and ship
                     quickly—I can deliver. I build fast, customized, and
                     responsive solutions at competitive prices.
                  </p>
               </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
