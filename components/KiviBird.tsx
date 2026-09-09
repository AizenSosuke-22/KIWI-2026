"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KiviBird() {
  const [isFlapping, setIsFlapping] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (isFlapping) return;
    setIsFlapping(true);
    setTimeout(() => {
      setIsFlapping(false);
      router.push("/");
    }, 700);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-full flex items-center justify-center transition-shadow"
      style={{
        backgroundColor: "var(--color-green-light)",
        boxShadow: "0 4px 12px rgba(74, 107, 78, 0.15)",
      }}
      aria-label="Kivi (click to open dashboard)"
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 100 100"
        animate={isFlapping ? { rotate: [0, -8, 8, -4, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Kiwi bird - simple silhouette */}
        <g fill="var(--color-green)">
          {/* Body */}
          <ellipse cx="42" cy="55" rx="28" ry="24" />
          {/* Beak */}
          <path d="M65 52 L92 48 L65 58 Z" />
          {/* Eye */}
          <circle cx="52" cy="46" r="2.5" fill="var(--color-ink)" />
          {/* Legs */}
          <rect x="32" y="76" width="3" height="10" rx="1" />
          <rect x="46" y="76" width="3" height="10" rx="1" />
          {/* Feet */}
          <ellipse cx="33.5" cy="87" rx="4" ry="1.5" />
          <ellipse cx="47.5" cy="87" rx="4" ry="1.5" />
        </g>
        {/* Sleep indicator when idle */}
        {!isFlapping && (
          <motion.text
            x="72"
            y="35"
            fontSize="10"
            fill="var(--color-ink-muted)"
            fontFamily="var(--font-serif)"
            animate={{ opacity: [0.3, 0.7, 0.3], y: [35, 30, 25] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            z
          </motion.text>
        )}
      </motion.svg>
    </motion.button>
  );
}
