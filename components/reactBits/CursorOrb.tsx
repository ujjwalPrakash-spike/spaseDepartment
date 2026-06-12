"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorOrb() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const mouse = useRef({ x: 0, y: 0 });
  const ringCurrent = useRef({ x: 0, y: 0 });
  const dotCurrent = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    // Disable strictly on screen widths < 768px (standard mobile breakpoint)
    if (window.innerWidth < 768) {
      setIsDesktop(false);
      return;
    }

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        setIsVisible(true);
        // Snap instantly to the first mouse move coordinate to avoid flying in
        ringCurrent.current = { x: e.clientX, y: e.clientY };
        dotCurrent.current = { x: e.clientX, y: e.clientY };
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      if (hasMoved.current) {
        const ringEase = 0.15;
        ringCurrent.current.x += (mouse.current.x - ringCurrent.current.x) * ringEase;
        ringCurrent.current.y += (mouse.current.y - ringCurrent.current.y) * ringEase;

        const dotEase = 0.8;
        dotCurrent.current.x += (mouse.current.x - dotCurrent.current.x) * dotEase;
        dotCurrent.current.y += (mouse.current.y - dotCurrent.current.y) * dotEase;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringCurrent.current.x}px, ${ringCurrent.current.y}px, 0) translate(-50%, -50%)`;
        }
        
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotCurrent.current.x}px, ${dotCurrent.current.y}px, 0) translate(-50%, -50%)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div 
      style={{ opacity: isVisible ? 1 : 0 }} 
      className="pointer-events-none z-[9999] transition-opacity duration-300 ease-in-out"
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-[1.5px] border-[#999999]/40 bg-transparent"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#1A4DFF]"
      />
    </div>
  );
}
