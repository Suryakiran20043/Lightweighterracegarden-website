'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    // Generate random leaves
    const newLeaves = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100, // percentage width
      y: Math.random() * 100, // percentage height
      size: Math.random() * 15 + 10, // 10px to 25px
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -20, // negative delay so they start immediately at different phases
    }));
    setLeaves(newLeaves);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          className="absolute opacity-10 text-moss"
          width={leaf.size}
          height={leaf.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [`${leaf.x}%`, `${leaf.x + (Math.random() * 10 - 5)}%`],
            rotate: [leaf.rotation, leaf.rotation + 360],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: leaf.delay,
          }}
        >
          {/* Detailed organic leaf path */}
          <path d="M2 22C2 22 6 18 12 17C18 16 22 10 22 2C22 2 14 2 8 8C2 14 2 22 2 22Z" fill="currentColor" />
          <path d="M2 22C8 16 14 12 22 2" stroke="#FCFBF8" strokeWidth="0.5" />
        </motion.svg>
      ))}
    </div>
  );
}
