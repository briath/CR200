'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const ambientOrbs = [
  {
    id: 'orb-1',
    className: 'top-[-8%] left-[-6%] h-[38vw] w-[38vw] min-h-[260px] min-w-[260px] max-h-[520px] max-w-[520px] bg-primary/16',
    animate: { x: [0, 32, -12, 0], y: [0, 24, -20, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 15,
  },
  {
    id: 'orb-2',
    className: 'bottom-[-12%] right-[-10%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px] max-h-[620px] max-w-[620px] bg-secondary/14',
    animate: { x: [0, -24, 18, 0], y: [0, -22, 14, 0], scale: [1, 0.95, 1.05, 1] },
    duration: 18,
  },
  {
    id: 'orb-3',
    className: 'top-[18%] right-[12%] h-[18vw] w-[18vw] min-h-[160px] min-w-[160px] max-h-[260px] max-w-[260px] bg-accent/10',
    animate: { x: [0, 18, -14, 0], y: [0, -16, 10, 0], scale: [1, 1.1, 0.92, 1] },
    duration: 13,
  },
];

const nodes = [
  { id: 1, left: 8, top: 18, size: 10, duration: 6.2, x: 30, y: -24, phase: 0.2 },
  { id: 2, left: 18, top: 66, size: 12, duration: 7.1, x: -18, y: 28, phase: 1.1 },
  { id: 3, left: 26, top: 32, size: 8, duration: 6.5, x: 24, y: 18, phase: 0.7 },
  { id: 4, left: 39, top: 74, size: 14, duration: 8, x: -22, y: -26, phase: 1.8 },
  { id: 5, left: 48, top: 24, size: 10, duration: 7.3, x: 20, y: 24, phase: 0.9 },
  { id: 6, left: 58, top: 52, size: 9, duration: 6.8, x: -20, y: -18, phase: 1.5 },
  { id: 7, left: 66, top: 14, size: 12, duration: 8.2, x: 26, y: 20, phase: 2.1 },
  { id: 8, left: 76, top: 68, size: 10, duration: 7.4, x: -16, y: 22, phase: 1.4 },
  { id: 9, left: 87, top: 28, size: 14, duration: 8.4, x: -22, y: -16, phase: 2.5 },
  { id: 10, left: 90, top: 78, size: 9, duration: 6.7, x: 18, y: -24, phase: 0.4 },
  { id: 11, left: 12, top: 44, size: 7, duration: 5.9, x: 16, y: 16, phase: 1.9 },
  { id: 12, left: 72, top: 44, size: 8, duration: 6.1, x: -18, y: 18, phase: 2.9 },
];

const beamLines = [
  { id: 'line-1', left: '12%', top: '22%', width: '32%', rotate: '-14deg', delay: 0.1 },
  { id: 'line-2', left: '42%', top: '16%', width: '22%', rotate: '16deg', delay: 0.3 },
  { id: 'line-3', left: '54%', top: '62%', width: '28%', rotate: '-10deg', delay: 0.5 },
];

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type HeroBounds = {
  width: number;
  height: number;
  left: number;
  top: number;
};

type AnimatedNode = (typeof nodes)[number] & {
  currentX: number;
  currentY: number;
  opacity: number;
  scale: number;
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestPointer = useRef<PointerState>({ x: 0, y: 0, active: false });
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0, active: false });
  const [bounds, setBounds] = useState<HeroBounds>({ width: 0, height: 0, left: 0, top: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateBounds = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      setBounds({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      });
    };

    updateBounds();

    const section = sectionRef.current;
    if (!section) return;

    const observer = new ResizeObserver(() => updateBounds());
    observer.observe(section);

    window.addEventListener('resize', updateBounds, { passive: true });
    window.addEventListener('scroll', updateBounds, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const tick = (timestamp: number) => {
      setTime(timestamp / 1000);
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!bounds.width || !bounds.height) return;

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      latestPointer.current = {
        x,
        y,
        active: x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          setPointer(latestPointer.current);
          frameRef.current = null;
        });
      }
    };

    const handlePointerLeave = () => {
      latestPointer.current = { x: 0, y: 0, active: false };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          setPointer(latestPointer.current);
          frameRef.current = null;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [bounds]);

  const animatedNodes = useMemo<AnimatedNode[]>(() => {
    return nodes.map((node) => {
      const progress = (time / node.duration) * Math.PI * 2 + node.phase;
      const currentX = Math.sin(progress) * node.x;
      const currentY = Math.cos(progress * 0.9) * node.y;
      const pulse = (Math.sin(progress * 1.2) + 1) / 2;

      return {
        ...node,
        currentX,
        currentY,
        opacity: 0.34 + pulse * 0.36,
        scale: 0.96 + pulse * 0.16,
      };
    });
  }, [time]);

  const interactiveConnections = useMemo(() => {
    if (!pointer.active || !bounds.width || !bounds.height) {
      return [];
    }

    return animatedNodes
      .map((node) => {
        const centerX = (node.left / 100) * bounds.width + node.currentX + node.size / 2;
        const centerY = (node.top / 100) * bounds.height + node.currentY + node.size / 2;
        const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY);
        return { ...node, centerX, centerY, distance };
      })
      .filter((node) => node.distance < 220)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((node) => ({
        ...node,
        opacity: Math.max(0.12, 1 - node.distance / 220),
      }));
  }, [animatedNodes, bounds.height, bounds.width, pointer]);

  const pointerXPercent = bounds.width ? (pointer.x / bounds.width) * 100 : 0;
  const pointerYPercent = bounds.height ? (pointer.y / bounds.height) * 100 : 0;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,33,59,0.95),_transparent_42%),linear-gradient(135deg,#08111f_0%,#0b0f19_48%,#10182a_100%)]" />

        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:clamp(42px,5vw,72px)_clamp(42px,5vw,72px)] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

        {ambientOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full blur-3xl ${orb.className}`}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-35">
          {beamLines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                left: line.left,
                top: line.top,
                width: line.width,
                transform: `rotate(${line.rotate})`,
              }}
              animate={{ opacity: [0.12, 0.3, 0.12], scaleX: [0.96, 1.04, 0.96] }}
              transition={{
                duration: 5.8,
                delay: line.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {interactiveConnections.map((node) => (
              <motion.line
                key={node.id}
                x1={`${pointerXPercent}%`}
                y1={`${pointerYPercent}%`}
                x2={`${((node.centerX / bounds.width) * 100).toFixed(3)}%`}
                y2={`${((node.centerY / bounds.height) * 100).toFixed(3)}%`}
                stroke={`rgba(148, 223, 240, ${Math.min(0.38, node.opacity * 0.42)})`}
                strokeWidth="0.12"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: node.opacity * 0.7 }}
                transition={{ duration: 0.18 }}
              />
            ))}
          </svg>
        </div>

        <div className="absolute inset-0">
          {animatedNodes.map((node) => {
            const connectedNode = interactiveConnections.find((connection) => connection.id === node.id);
            const isConnected = Boolean(connectedNode);
            const finalScale = isConnected ? Math.max(node.scale, 1.12) : node.scale;
            const finalOpacity = isConnected ? Math.max(node.opacity, 0.82) : node.opacity;

            return (
              <div
                key={node.id}
                className="absolute rounded-full bg-white/75 shadow-[0_0_18px_rgba(0,209,255,0.22)]"
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  width: node.size,
                  height: node.size,
                  transform: `translate3d(${node.currentX}px, ${node.currentY}px, 0) scale(${finalScale})`,
                  opacity: finalOpacity,
                }}
              >
                <span className="absolute inset-0 rounded-full bg-primary/35 blur-md" />
              </div>
            );
          })}
        </div>

        {pointer.active && (
          <motion.div
            className="absolute pointer-events-none hidden md:block rounded-full border border-primary/15 bg-primary/6 blur-sm"
            style={{
              left: pointer.x - 72,
              top: pointer.y - 72,
              width: 144,
              height: 144,
            }}
            animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,15,25,0.08)_52%,rgba(11,15,25,0.58)_100%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl leading-tight font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI-агенты для продаж, поддержки и внутренних процессов
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Разрабатываем и внедряем AI-решения, которые берут на себя рутину,
          ускоряют обработку заявок и помогают команде работать быстрее.
        </motion.p>
        <motion.p
          className="text-sm sm:text-base md:text-lg mb-8 text-gray-400 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Интеграция с CRM, мессенджерами, базами знаний и внутренними API. От аудита
          процессов до запуска MVP обычно проходит 2-6 недель.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="px-6 sm:px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors glow"
          >
            Получить аудит процессов
          </Link>
          <Link
            href="#cases"
            className="px-6 sm:px-8 py-4 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-colors"
          >
            Посмотреть сценарии внедрения
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
