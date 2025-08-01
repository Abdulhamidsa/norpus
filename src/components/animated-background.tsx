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
    const mousePosition = { x: 0, y: 0 };
    const mouseRadius = 100;

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
      originalX: number;
      originalY: number;
      vx = 0;
      vy = 0;
      friction = 0.95;
      springFactor = 0.05;
      pulseSpeed: number;
      pulsePhase: number;
      // parallaxFactor: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.baseSize = Math.random() * 1.2 + 0.7;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.11;
        this.speedY = (Math.random() - 0.5) * 0.11;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
        this.pulseSpeed = Math.random() * 0.8 + 0.4;
        this.pulsePhase = Math.random() * Math.PI * 2;
        // this.parallaxFactor = Math.random() * 0.5 + 0.7;
      }

      update(time: number) {
        // No parallax effect

        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 5;
          const pushY = Math.sin(angle) * force * 5;

          this.vx -= pushX;
          this.vy -= pushY;
        }

        // Spring back to original position
        const dx2 = this.originalX - this.x;
        const dy2 = this.originalY - this.y;

        this.vx += dx2 * this.springFactor;
        this.vy += dy2 * this.springFactor;

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Slow drift
        this.originalX += this.speedX;
        this.originalY += this.speedY;

        // Wrap around edges
        if (this.originalX > canvas!.width) this.originalX = 0;
        else if (this.originalX < 0) this.originalX = canvas!.width;

        if (this.originalY > canvas!.height) this.originalY = 0;
        else if (this.originalY < 0) this.originalY = canvas!.height;

        // Pulse animation (smaller amplitude)
        this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.13;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      // Fewer particles for a calmer effect
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 70);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx!.save();
            ctx!.strokeStyle = `rgba(255,255,255,${opacity * 0.08})`;
            ctx!.lineWidth = 0.7;
            // Draw a quadratic curve for a more organic look
            ctx!.beginPath();
            const midX = (particles[i].x + particles[j].x) / 2 + (dx + dy) * 0.04;
            const midY = (particles[i].y + particles[j].y) / 2 - (dx - dy) * 0.04;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.quadraticCurveTo(midX, midY, particles[j].x, particles[j].y);
            ctx!.stroke();
            ctx!.restore();
          }
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    }

    function animate() {
      if (!canvas) return;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() / 1000;
      for (const particle of particles) {
        particle.update(now);
        particle.draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0"></div>
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -30, 0, 30, 0],
            y: [0, 30, 0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </>
  );
}
