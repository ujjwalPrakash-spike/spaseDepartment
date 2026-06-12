import React from "react";
import NavBrand from "./NavBrand";
import NavMeta from "./NavMeta";
import NavLinks from "./NavLinks";
import NavCTA from "./NavCTA";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-[1000] font-sans bg-transparent">
      <nav className="grid grid-cols-12 lg:items-start relative w-full pt-10 pb-6 px-10">
        <NavBrand />
        <NavMeta />
        <div className="col-start-7 col-span-6 flex items-center justify-between">
          <NavLinks />
          <NavCTA />
        </div>
      </nav>
    </header>
  );
}
