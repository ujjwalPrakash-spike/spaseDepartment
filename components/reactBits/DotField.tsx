"use client";

import React, { useEffect, useRef } from "react";

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // High DPI support for sharp dots on Retina displays
    const dpr = window.devicePixelRatio || 1;
    
    // Grid spacing (adjust to change density)
    const spacing = 70; 
    const dotRadius = 1.5; 
    
    // Physics properties
    const repelRadius = 120;
    const repelRadiusSq = repelRadius * repelRadius; // Pre-calculated for massive performance boost
    const repelForce = 0.6; 
    const returnForce = 0.15; 

    // Using Float32Array for better memory performance if needed, but standard array is fine here.
    let dots: { x: number, y: number, originX: number, originY: number }[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
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

    window.addEventListener("resize", resize, { passive: true });
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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; 

      // BATCH RENDERING: Massive performance boost by only starting one path
      ctx.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Fast distance check using squared values (avoids expensive Math.sqrt)
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const distSq = dx * dx + dy * dy;

        let targetX = dot.originX;
        let targetY = dot.originY;

        if (distSq < repelRadiusSq) {
          const dist = Math.sqrt(distSq); // Only calculate precise distance if collision occurs
          const angle = Math.atan2(dy, dx);
          const force = (repelRadius - dist) * repelForce;
          targetX = dot.originX - Math.cos(angle) * force;
          targetY = dot.originY - Math.sin(angle) * force;
        }

        // LERP towards target
        dot.x += (targetX - dot.x) * returnForce;
        dot.y += (targetY - dot.y) * returnForce;

        // Draw dot into the batched path
        ctx.moveTo(dot.x + dotRadius, dot.y);
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
      }

      // Execute a single fill call for all dots
      ctx.fill();

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
