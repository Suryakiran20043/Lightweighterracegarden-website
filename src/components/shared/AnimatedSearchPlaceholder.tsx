'use client';

import React, { useState, useEffect, useRef } from 'react';

const searchSuggestions = [
  "Search for Vegetable Seeds 🌱",
  "Search for Flower Seeds 🌸",
  "Search for Fruit Seeds 🍎",
  "Search for Microgreens 🥬",
  "Search for Organic Grocery 🛒",
  "Search for Grow Bags 🪴",
  "Search for Terrace Garden Kits 🌿",
  "Search for Fertilizers 🌾",
  "Search for Combo Packs 📦",
  "Search for Gardening Essentials 🌻",
  "Search Tomato Seeds...",
  "Search Chilli Seeds...",
  "Search Coriander Seeds...",
  "Search Brinjal Seeds...",
  "Search Okra Seeds...",
  "Search Marigold Seeds...",
  "Search Rose Seeds..."
];

interface AnimatedSearchPlaceholderProps {
  isFocused: boolean;
  value: string;
}

export default function AnimatedSearchPlaceholder({ isFocused, value }: AnimatedSearchPlaceholderProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Ref to track component mount status to avoid state updates on unmounted component
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Pause animation completely if user is typing
    if (value) return;

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDelay = 1500;

    const currentPhrase = searchSuggestions[currentIndex];

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause at the end of the phrase before deleting
      timer = setTimeout(() => {
        if (mounted.current) setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && displayText === '') {
      // Move to the next phrase and start typing
      if (mounted.current) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % searchSuggestions.length);
      }
    } else {
      // Determine the next text to display based on whether we are typing or deleting
      const delay = isDeleting ? deleteSpeed : typeSpeed;
      timer = setTimeout(() => {
        if (mounted.current) {
          setDisplayText((prev) => {
            const prevChars = Array.from(prev);
            const currentChars = Array.from(currentPhrase);
            return isDeleting 
              ? currentChars.slice(0, prevChars.length - 1).join('')
              : currentChars.slice(0, prevChars.length + 1).join('');
          });
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, value]);

  // Don't render the placeholder if user has typed something
  if (value) return null;

  return (
    <div className="absolute inset-y-0 left-0 pl-12 flex items-center pointer-events-none overflow-hidden w-full h-full text-sm text-stone-500 font-medium z-0">
      <span className="whitespace-nowrap">
        {displayText}
        <span 
          className="inline-block w-[2px] h-[1em] bg-[#2E7D32] ml-[2px] align-middle"
          style={{
            animation: "blink 1s step-start infinite"
          }}
        />
      </span>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}} />
    </div>
  );
}
