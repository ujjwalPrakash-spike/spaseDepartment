"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="w-full relative z-10 pt-20 pb-0 overflow-hidden md:overflow-visible">
      <div className="grid grid-cols-12 h-auto md:h-[280px] w-full px-10">
        
        {/* Brand & Copyright */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-between h-full pl-6 md:pl-8 py-8 md:py-0 md:pb-10">
          <div>
            <span className="font-bold text-[24px] leading-none tracking-tight text-[#1A4DFF] block mb-1.5">
              {footer.brand}
            </span>
            <span className="font-bold text-[24px] leading-none tracking-tight text-[#111111] block">
              {footer.location}
            </span>
          </div>
          <div className="text-[15px] font-bold text-[#111111] flex items-center gap-3 mt-12 md:mt-0">
            {footer.copyright}
            <span className="w-[26px] h-[26px] rounded-full border border-black/10 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 bg-[#1A4DFF] rounded-full"></span>
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="col-span-12 md:col-span-2 flex flex-col gap-3 pl-6 md:pl-8 h-full justify-end py-8 md:py-0 md:pb-10">
          {footer.links.map((link) => (
            <Link key={link.label} href={link.href} className="text-[#1A4DFF] text-[16px] font-bold hover:opacity-70 transition-opacity tracking-tight w-fit">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="col-span-12 md:col-span-2 flex flex-col gap-3 pl-6 md:pl-8 h-full justify-end py-8 md:py-0 md:pb-10">
          {footer.socials.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" className="text-[#1A4DFF] text-[16px] font-bold hover:opacity-70 transition-opacity tracking-tight w-fit">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Empty spacing column */}
        <div className="hidden md:block md:col-span-2 h-full"></div>

        {/* Creator & Scroll to top */}
        <div className="col-span-12 md:col-span-2 flex items-end justify-between pl-6 md:pl-8 pr-4 h-full py-8 md:py-0 md:pb-10 relative">
          <span className="text-[#1A4DFF] text-[15px] font-normal opacity-90 mb-1 max-w-[140px] leading-[1.4]">
            {footer.creator}
          </span>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="md:absolute right-[-10px] bottom-8 w-[52px] h-[52px] rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-transform border border-black/5 shrink-0"
            aria-label="Back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A4DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
