import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NavBrand() {
  const { brandBottom } = siteConfig.navbar;
  
  return (
    <div className="col-start-1 col-span-3 flex flex-col items-start">
  <Link
    href="/"
    aria-label="Link to Homepage"
    className="relative inline-flex mb-2"
  >
    <span className="font-bold text-[22px] leading-none tracking-tight text-[#1A4DFF]">
      {siteConfig.navbar.brandTop}
    </span>
  </Link>

  <div className="relative">
    <button
      type="button"
      aria-label={brandBottom}
      className="flex items-center gap-2"
    >
      <span className="font-bold text-[18px] leading-none tracking-tight text-[#111111]">
        {brandBottom}
      </span>

      <svg
        className="w-[12px] h-auto flex-shrink-0"
        fill="none"
        viewBox="0 0 10 7"
        style={{ transform: "rotateX(180deg)" }}
      >
        {/* circles */}
      </svg>
    </button>
  </div>
</div>
  );
}
