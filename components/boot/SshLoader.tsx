"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Line = { text: string; prompt?: boolean; pause: number; cls?: string };

// The full SSH session, typed out line by line like a live terminal.
const SCRIPT: Line[] = [
  { text: "ssh visitor@oceanuddin.com", prompt: true, pause: 320 },
  { text: "The authenticity of host 'oceanuddin.com' can't be established.", pause: 120 },
  { text: "ED25519 key fingerprint is SHA256:0c3a...n_uddin/portfolio.", pause: 120 },
  { text: "Are you sure you want to continue connecting (yes/no)? yes", pause: 280 },
  { text: "Warning: Permanently added 'oceanuddin.com' to known hosts.", pause: 160, cls: "text-white/45" },
  { text: "visitor@oceanuddin.com's password: ************", pause: 360 },
  { text: "Authenticating ......... [ OK ]", pause: 240, cls: "text-cyber-teal" },
  { text: "Loading portfolio modules .... [ OK ]", pause: 220, cls: "text-cyber-teal" },
  { text: "Negotiating glassmorphism .... [ OK ]", pause: 220, cls: "text-cyber-teal" },
  { text: "", pause: 120 },
  { text: "Welcome, visitor. Connection established.", pause: 300, cls: "text-cyber-cyan font-semibold" },
];

export default function SshLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState<Line[]>([]);
  const [typingLine, setTypingLine] = useState<Line | null>(null);
  const [typingText, setTypingText] = useState("");
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    setTimeout(onDone, 650);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Type each command/response out character by character, in order.
    // Reduce Motion: keep the typing effect but run it noticeably faster.
    const speedMul = reduced ? 0.4 : 1;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timeouts.push(setTimeout(res, Math.max(0, ms * speedMul)));
      });

    (async () => {
      for (const line of SCRIPT) {
        if (cancelled) return;
        setTypingLine(line);
        // command/prompt lines type slower (human), output streams faster
        const perChar = line.prompt ? 55 : line.text.length > 38 ? 11 : 20;
        for (let c = 0; c <= line.text.length; c++) {
          if (cancelled) return;
          setTypingText(line.text.slice(0, c));
          await wait(perChar);
        }
        if (cancelled) return;
        setRendered((prev) => [...prev, line]);
        setTypingLine(null);
        setTypingText("");
        await wait(line.pause);
      }
      if (cancelled) return;
      await wait(650);
      finish();
    })();

    const onKey = () => {
      cancelled = true;
      finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
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
              <div className="min-h-[280px] p-5 font-mono text-[13px] leading-relaxed md:text-sm">
                {rendered.map((l, i) => (
                  <div key={i} className={l.cls ?? "text-white/70"}>
                    {l.prompt && <span className="text-cyber-teal">$ </span>}
                    {l.text || " "}
                  </div>
                ))}
                {typingLine && (
                  <div className={typingLine.cls ?? "text-white/80"}>
                    {typingLine.prompt && <span className="text-cyber-teal">$ </span>}
                    {typingText}
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyber-teal animate-blink" />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={finish}
              className="mx-auto mt-4 block font-mono text-xs text-white/35 transition hover:text-white/70"
            >
              press any key to skip →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
