"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 w-full z-50 bg-[#f4f4f5]/90 backdrop-blur-sm border-b border-gray-300 flex text-sm font-medium tracking-tight text-black"
    >
      <div className="flex w-full items-stretch divide-x divide-gray-300">
        {/* Logo Section */}
        <div className="flex-[1.5] flex flex-col justify-center px-6 py-4">
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold text-lg leading-tight">awwwards.conf</span>
            <div className="flex items-center text-xl font-medium mt-1 leading-tight">
              New York <ChevronDown className="w-4 h-4 ml-1 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 px-6 py-4 flex flex-col justify-center text-gray-700 text-sm">
          <div className="leading-tight">December 5-6 /</div>
          <div className="leading-tight">L'Alliance New York /</div>
          <div className="leading-tight">FIAF</div>
        </div>

        {/* Links Section */}
        <div className="flex-[2] grid grid-cols-3 divide-x divide-gray-300">
          <button className="flex items-center justify-center text-blue-600 hover:bg-black/5 transition-colors uppercase text-xs font-bold tracking-widest h-full w-full">
            Speakers
          </button>
          <button className="flex items-center justify-center text-blue-600 hover:bg-black/5 transition-colors uppercase text-xs font-bold tracking-widest h-full w-full">
            Schedule
          </button>
          <button className="flex items-center justify-center text-blue-600 hover:bg-black/5 transition-colors uppercase text-xs font-bold tracking-widest h-full w-full">
            Activities
          </button>
        </div>

        {/* CTA Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-4">
          <button className="border border-blue-600 text-blue-600 rounded-full px-8 py-2.5 flex items-center text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors uppercase tracking-widest">
            Sold Out <ArrowUpRight className="w-3 h-3 ml-2" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}