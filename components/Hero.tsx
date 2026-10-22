
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  profileImageUrl: string;
};

export default function Hero({ profileImageUrl }: HeroProps) {
  return (
    <>
      <section id="top" className="portfolio-cover" aria-label="Portfolio">
        <motion.p
          className="cover-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          PERSONAL PORTFOLIO
        </motion.p>

        <motion.h1
          className="cover-title"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          PORTFOLIO<span></span>
        </motion.h1>

        <motion.div
          className="cover-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <span>DEVELOPMENT · DESIGN · IDEAS</span>
          <a href="#intro" className="scroll-cue">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
          <span>G N V P M A D H U L I K A</span>
        </motion.div>
      </section>

      <section id="intro" className="intro-section section-shell">
        <motion.div
          className="intro-copy"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <p className="eyebrow">HELLO, I AM</p>
          <h2>
            G N V P
            <br />
            Madhulika<span>.</span>
          </h2>
          <p className="intro-description">
            Computer Science &amp; Engineering student, developer, and creative thinker.
          </p>
          <a href="#projects" className="primary-link">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <motion.div
          className="portrait-frame"
          initial={{ opacity: 0, y: 18, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="portrait-placeholder">
            <Image
              src={profileImageUrl}
              alt="Portrait of G n v p Madhulika"
              fill
              priority
              sizes="(max-width: 760px) 90vw, 38vw"
              className="portrait-image"
              unoptimized
            />
          </div>
          <span className="portrait-note">A LITTLE ABOUT ME ↙</span>
        </motion.div>
      </section>
    </>
  );
}
