"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseSize = Math.random() * 0.8 + 0.5; // Smaller particles
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.3; // Much slower movement
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
        this.pulseSpeed = Math.random() * 0.5 + 0.2; // Slower pulse
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        // Very gentle movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Simple edge wrapping
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;

        // Gentle pulse animation
        this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 3; // Reduced shadow
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      // Fewer particles for better performance
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 20000), 40);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 120; // Reduced connection distance
      const maxConnections = 3; // Limit connections per particle

      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15; // More subtle lines
            ctx!.save();
            ctx!.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y); // Simple lines instead of curves
            ctx!.stroke();
            ctx!.restore();
            connections++;
          }
        }
      }
    }

    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime: number) {
      if (currentTime - lastTime >= frameInterval) {
        if (!canvas) return;
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        const now = performance.now() / 1000;

        for (const particle of particles) {
          particle.update(now);
          particle.draw();
        }
        connectParticles();
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate(0);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0"></div>
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/8 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/6 rounded-full filter blur-2xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </>
  );
}
