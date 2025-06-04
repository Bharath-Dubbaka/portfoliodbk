"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

const Contact = () => {
   const form = useRef(null);
   const apiKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY || "fallback-api-key";
   const templateId =
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "fallback-template-id";
   const serviceId =
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID_KEY || "fallback-service-id";
   const [errors, setErrors] = useState({});

   if (!apiKey || !templateId || !serviceId) {
      throw new Error("Missing environment variables: Check your .env file.");
   }

   const validateForm = () => {
      const formErrors = {};
      const formData = form.current;
      if (formData) {
         if (!formData.user_name.value)
            formErrors.user_name = "Name is required.";
         if (!formData.user_email.value)
            formErrors.user_email = "Email is required";
         else if (!/\S+@\S+\.\S+/.test(formData.user_email.value))
            formErrors.user_email = "Invalid email format.";
         if (!formData.user_subject.value)
            formErrors.user_subject = "Subject is required.";
         if (!formData.message.value)
            formErrors.message = "Message is required.";
      }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
   };

   const sendEmail = (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      if (form.current) {
         emailjs
            .sendForm(serviceId, templateId, form.current, {
               publicKey: apiKey,
            })
            .then(
               () => {
                  toast.success("Email sent successfully.", {
                     duration: 3000,
                  });
                  form.current?.reset();
                  setErrors({});
               },
               (error) => {
                  toast.error("Failed to send email. Please try again.");
               }
            );
      }
   };

   //styling and animations
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   // Parallax transforms
   const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

   // Intersection observer for triggering animations
   const [titleRef, titleInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
   });

   return (
      <section
         id="contact"
         className="min-h-screen bg-gradient-to-b from-gray-800 to-black pb-20 pt-16 md:pt-20"
      >
         <Toaster position="top-center" />
         <motion.div ref={titleRef} style={{ y }}>
            <motion.h2
               className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center"
               initial={{ opacity: 0, y: 50 }}
               animate={titleInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8 }}
            >
               Get in Touch
            </motion.h2>
            {/* Visible on mobile and tablet only (hidden on lg and up) */}
            <motion.p
               className="block lg:hidden text-xl text-gray-400 mb-6 mx-6 md:mx-16  text-center"
               initial={{ opacity: 0, y: 30 }}
               animate={titleInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
               Have a project, freelance opportunity, or just want to say hi?
               Drop a message and I will respond within 24 hours.
            </motion.p>
         </motion.div>

         <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6">
            {/* Left: Form + Headings */}
            <div className="w-full md:w-[65%] flex flex-col items-center lg:text-left lg:items-start max-w-xl ">
               <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-xl px-6 py-8 space-y-6 "
               >
                  {/* All fields remain unchanged */}
                  <div>
                     <label className="block mb-1 font-semibold text-white">
                        *Full Name
                     </label>
                     <input
                        type="text"
                        name="user_name"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                     />
                     {errors.user_name && (
                        <p className="text-sm text-red-400 mt-1">
                           {errors.user_name}
                        </p>
                     )}
                  </div>
                  <div>
                     <label className="block mb-1 font-semibold text-white">
                        *Email
                     </label>
                     <input
                        type="email"
                        name="user_email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                     />
                     {errors.user_email && (
                        <p className="text-sm text-red-400 mt-1">
                           {errors.user_email}
                        </p>
                     )}
                  </div>
                  <div>
                     <label className="block mb-1 font-semibold text-white">
                        *Subject
                     </label>
                     <input
                        type="text"
                        name="user_subject"
                        placeholder="Hiring inquiry, freelance, etc."
                        className="w-full px-4 py-3 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                     />
                     {errors.user_subject && (
                        <p className="text-sm text-red-400 mt-1">
                           {errors.user_subject}
                        </p>
                     )}
                  </div>
                  <div>
                     <label className="block mb-1 font-semibold text-white">
                        *Message
                     </label>
                     <textarea
                        name="message"
                        rows="5"
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                     ></textarea>
                     {errors.message && (
                        <p className="text-sm text-red-400 mt-1">
                           {errors.message}
                        </p>
                     )}
                  </div>
                  <button
                     type="submit"
                     className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-colors text-white"
                  >
                     Send Message
                  </button>
               </form>
            </div>
            <div className="hidden lg:flex flex-col mb-auto w-[30%]">
               <motion.p
                  className="text-xl text-gray-400 mb-10 text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
               >
                  Have a project, freelance opportunity, or just want to say hi?
                  Drop a message and I will respond back within 24 hours.
               </motion.p>
               {/* Right: Image */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-md "
               >
                  <img
                     src="/assets/itnew.png"
                     alt="Support Illustration"
                     className="w-full h-auto rounded-xl shadow-xl"
                  />
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
