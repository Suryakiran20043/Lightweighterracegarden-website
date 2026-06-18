'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Leaf, Sprout } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Vegetable Seeds', href: '/shop?category=vegetables' },
  { name: 'Flower Seeds', href: '/shop?category=flower-seeds' },
  { name: 'Fruit Seeds', href: '/shop?category=fruits-seeds' },
  { name: 'Roots & Tubers', href: '/shop?category=roots-tubers' },
  { name: 'Microgreens', href: '/shop?category=micro-seeds' },
  { name: 'Pots & Planters', href: '/shop?category=pots-planters' },
  { name: 'Combo Packs', href: '/shop?category=combo-packs' },
  { name: 'Grocery', href: '/shop?category=grocery' },
];

export default function PremiumCategoryBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const shineBackground = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.15),
      transparent 80%
    )
  `;

  return (
    <div className="hidden md:block w-full max-w-screen-2xl mx-auto px-4 lg:px-8 mt-2 pb-6">
      {/* The main bar container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex justify-center items-center h-[55px] rounded-[12px] bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_0_8px_20px_rgba(46,125,50,0.2)] backdrop-blur-md overflow-hidden"
      >
        {/* Dynamic Shine Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: shineBackground }}
        />

        <div className="relative z-10 flex justify-center items-center w-full px-2">
          {navLinks.map((link) => {
            let isActive = false;
            if (link.href === '/') {
              isActive = pathname === '/';
            } else if (link.href.includes('category=')) {
              const cat = link.href.split('category=')[1];
              isActive = pathname === '/shop' && searchParams.get('category') === cat;
            } else {
              isActive = pathname === link.href;
            }

            return <NavItem key={link.name} link={link} isActive={isActive} />;
          })}
        </div>
      </motion.div>
    </div>
  );
}

function NavItem({ link, isActive }: { link: any, isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative px-1 lg:px-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={link.href} className="block relative z-20 outline-none">
        <motion.div
          animate={{
            y: isHovered ? -4 : 0,
            textShadow: isHovered ? "0px 2px 8px rgba(255,255,255,0.4)" : "0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg font-medium text-[14px] tracking-[1px] uppercase transition-colors duration-300 ${
            isActive 
              ? 'text-white' 
              : 'text-white/90 hover:text-white'
          }`}
        >
          {isActive && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-[#A5D6A7]"
            >
              <Leaf className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          )}
          
          <span>{link.name}</span>
        </motion.div>
      </Link>

      {/* Hover Background Pill with Glass Glow */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            layoutId="navPill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className={`absolute inset-0 z-10 rounded-lg pointer-events-none ${
              isActive 
                ? 'bg-[#4CAF50]/30 shadow-[0_0_15px_rgba(76,175,80,0.5)]' 
                : 'bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Animated Underline (Center Outward) */}
      <motion.div
        initial={false}
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#A5D6A7] origin-center z-20 pointer-events-none shadow-[0_0_5px_rgba(165,214,167,0.8)]"
      />

      {/* Animated Seed-to-Sprout Effect */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#A5D6A7] z-30 pointer-events-none"
          >
            <Sprout className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dropdown Preview Target Area (For Future Mega Menu) */}
      <div className="absolute top-full left-0 w-full h-4 opacity-0" />
    </div>
  );
}
