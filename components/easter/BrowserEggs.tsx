"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MatrixRain from "./MatrixRain";
import { CTF_FLAG, profile } from "@/lib/content";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function BrowserEggs() {
  const [matrix, setMatrix] = useState(false);

  // console art for the curious recruiter who opens devtools
  useEffect(() => {
    const style =
      "color:#22d3ee;font-family:monospace;font-size:12px;line-height:1.3";
    console.log(
      `%c
   ___   _   _
  / _ \\ | | | |
 | | | || | | |
 | |_| || |_| |
  \\___/  \\___/   OCEAN UDDIN

  You found the console. 👀
  IT · Cybersecurity · Full-Stack · IoT
  ${profile.email}

  Hidden flag → ${CTF_FLAG}
  (mention it and you'll get my attention)
  Try the terminal too — press the backtick key.
`,
      style
    );
  }, []);

  // konami code
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          setMatrix(true);
          pos = 0;
        }
      } else {
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {matrix && <MatrixRain onExit={() => setMatrix(false)} />}
    </AnimatePresence>
  );
}
