"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** subtle 3D tilt + cursor-tracking glow */
  interactive?: boolean;
  glow?: string; // rgba string for the spotlight
};

export default function GlassCard({
  children,
  className = "",
  interactive = true,
  glow = "rgba(34,211,238,0.18)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${glow}, transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={interactive ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      className={`glass group relative overflow-hidden rounded-2xl ${className}`}
    >
      {interactive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
