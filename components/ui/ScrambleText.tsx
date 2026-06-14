"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>$#%&*";

type Props = {
  text: string;
  className?: string;
  /** ms per reveal step */
  speed?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

/** Decrypt-style text reveal triggered when scrolled into view. */
export default function ScrambleText({
  text,
  className = "",
  speed = 28,
  as = "span",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      setDone(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const run = () => {
      let progress = 0;
      interval = setInterval(() => {
        const out = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < progress) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setDisplay(out);
        frame++;
        if (frame % 2 === 0) progress++;
        if (progress > text.length) {
          if (interval) clearInterval(interval);
          setDisplay(text);
          setDone(true);
        }
      }, speed);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [text, speed]);

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag className={className}>
      <span ref={ref} data-done={done} aria-label={text}>
        {display}
      </span>
    </Tag>
  );
}
