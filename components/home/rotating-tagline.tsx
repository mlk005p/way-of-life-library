"use client";

import { useEffect, useState } from "react";

import { HERO_TAGLINES } from "@/lib/brand";
import { cn } from "@/lib/utils";

type RotatingTaglineProps = {
  className?: string;
};

const INTERVAL_MS = 4500;
const FADE_MS = 500;

export function RotatingTagline({ className }: RotatingTaglineProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    let fadeTimeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setVisible(false);
      fadeTimeout = setTimeout(() => {
        setIndex((current) => (current + 1) % HERO_TAGLINES.length);
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <p
      className={cn(
        "min-h-[1.75rem] font-body text-body-lg text-text-secondary transition-opacity duration-500 ease-in-out",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-live="polite"
    >
      {HERO_TAGLINES[index]}
    </p>
  );
}
