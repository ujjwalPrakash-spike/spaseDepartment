"use client";

import React, { useEffect, useRef } from "react";

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // High DPI support for sharp dots on Retina displays
    const dpr = window.devicePixelRatio || 1;
    
    const spacing = 60; // Distance between dots to match previous backgroundSize
    const dotRadius = 1.2; // Size of dots
    let dots: { x: number, y: number, originX: number, originY: number }[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      // Center the grid slightly based on remainder
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * spacing + offsetX;
          const py = j * spacing + offsetY;
          dots.push({
            x: px,
            y: py,
            originX: px,
            originY: py
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initDots();
    };

    window.addEventListener("resize", resize);
    resize();

    const mouse = { x: -1000, y: -1000 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // Match the opacity: 0.25 from earlier

      // Physics properties
      const repelRadius = 120; // How far the mouse affects dots
      const repelForce = 0.6; // How strongly they are pushed away
      const returnForce = 0.15; // How fast they spring back to origin

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Distance from mouse
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.originX;
        let targetY = dot.originY;

        if (dist < repelRadius) {
          // Push away from mouse
          const angle = Math.atan2(dy, dx);
          const force = (repelRadius - dist) * repelForce;
          targetX = dot.originX - Math.cos(angle) * force;
          targetY = dot.originY - Math.sin(angle) * force;
        }

        // LERP towards target
        dot.x += (targetX - dot.x) * returnForce;
        dot.y += (targetY - dot.y) * returnForce;

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
