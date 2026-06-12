"use client";

import React, { useRef } from "react";
import { motion, useScroll, useMotionValue, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import NavBrand from "./NavBrand";
import NavMeta from "./NavMeta";
import NavLinks from "./NavLinks";
import NavCTA from "./NavCTA";

export default function Navbar() {
  const { scrollY } = useScroll();
  const navProgress = useMotionValue(1);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;
    lastScrollY.current = latest;

    if (latest <= 0) {
      navProgress.set(1);
      return;
    }

    // 250px to fully hide or show the navbar
    const SCROLL_DISTANCE = 250;
    
    let newProgress = navProgress.get() - (delta / SCROLL_DISTANCE);
    newProgress = Math.max(0, Math.min(1, newProgress));
    
    navProgress.set(newProgress);
  });

  // Smooth out the raw scroll progress with a critically damped spring
  const smoothedProgress = useSpring(navProgress, {
    stiffness: 400,
    damping: 40,
    mass: 1
  });

  // Hardware accelerated opacity and transform
  const opacity = useTransform(smoothedProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothedProgress, [0, 1], ["-20px", "0px"]);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full flex justify-center z-50 font-sans"
      style={{
        opacity,
        y,
        willChange: "opacity, transform"
      }}
    >
      {/* Stronger whitish blur for premium legibility */}
      <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-xl pointer-events-none" 
           style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }} 
      />
      
      <nav className="relative grid grid-cols-12 lg:items-start w-[92vw] pt-10 pb-6 px-10">
        <NavBrand />
        <NavMeta />
        <div className="col-start-7 col-span-6 flex items-center justify-between">
          <NavLinks />
          <NavCTA />
        </div>
      </nav>
    </motion.header>
  );
}
