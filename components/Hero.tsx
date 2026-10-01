"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 bg-transparent">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm uppercase tracking-widest text-[#94A3B8] mb-4"
      >
        Welcome to my portfolio
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
      >
        Hi, I am Madhulika
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-[#94A3B8] max-w-xl"
      >
        CSE student and developer, building things that combine clean design with real engineering.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 flex gap-4"
      >
        <a
          href="#projects"
          className="bg-[#10B981] text-[#090D16] hover:bg-[#0d9668] transition-all font-semibold px-6 py-3 rounded-lg shadow-lg shadow-[#10B981]/20"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="border border-[#10B981]/40 text-[#F8FAFC] hover:bg-[#10B981]/10 transition-all font-semibold px-6 py-3 rounded-lg"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}