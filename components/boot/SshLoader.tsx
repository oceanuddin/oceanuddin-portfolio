"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Line = { text: string; prompt?: boolean; delay: number; cls?: string };

const SCRIPT: Line[] = [
  { text: "ssh visitor@oceanuddin.com", prompt: true, delay: 60 },
  { text: "The authenticity of host 'oceanuddin.com' can't be established.", delay: 280 },
  { text: "ED25519 key fingerprint is SHA256:0c3a...n_uddin/portfolio.", delay: 120 },
  { text: "Are you sure you want to continue connecting? yes", delay: 260 },
  { text: "Warning: Permanently added 'oceanuddin.com' to known hosts.", delay: 220, cls: "text-white/45" },
  { text: "visitor@oceanuddin.com's password: ************", delay: 300 },
  { text: "Authenticating ......... [ OK ]", delay: 360, cls: "text-cyber-teal" },
  { text: "Loading portfolio modules .... [ OK ]", delay: 300, cls: "text-cyber-teal" },
  { text: "Negotiating glassmorphism .... [ OK ]", delay: 260, cls: "text-cyber-teal" },
  { text: "", delay: 120 },
  { text: "Welcome, visitor. Connection established.", delay: 200, cls: "text-cyber-cyan font-semibold" },
];

export default function SshLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    timers.current.forEach(clearTimeout);
    setVisible(false);
    setTimeout(onDone, 650);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      finish();
      return;
    }

    let acc = 0;
    SCRIPT.forEach((line, idx) => {
      acc += line.delay;
      // type the first (ssh) line char by char for effect
      if (idx === 0) {
        line.text.split("").forEach((_, ci) => {
          timers.current.push(
            setTimeout(() => setTyped(line.text.slice(0, ci + 1)), 60 + ci * 45)
          );
        });
        timers.current.push(
          setTimeout(() => {
            setShown((s) => [...s, line]);
            setTyped("");
          }, 60 + line.text.length * 45 + 200)
        );
        acc = 60 + line.text.length * 45 + 200;
        return;
      }
      timers.current.push(setTimeout(() => setShown((s) => [...s, line]), acc));
    });

    timers.current.push(setTimeout(finish, acc + 900));

    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink px-4"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative w-full max-w-2xl">
            <div className="glass-strong overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-white/40">
                  visitor — ssh — 80×24
                </span>
              </div>
              <div className="min-h-[260px] p-5 font-mono text-[13px] leading-relaxed md:text-sm">
                {shown.map((l, i) => (
                  <div key={i} className={l.cls ?? "text-white/70"}>
                    {l.prompt && <span className="text-cyber-teal">$ </span>}
                    {l.text}
                  </div>
                ))}
                {typed && (
                  <div className="text-white/80">
                    <span className="text-cyber-teal">$ </span>
                    {typed}
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyber-teal animate-blink" />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={finish}
              className="mt-4 mx-auto block font-mono text-xs text-white/35 transition hover:text-white/70"
            >
              press any key to skip →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
