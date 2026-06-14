"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A realistic SSH session: the human types commands/answers (irregular
// rhythm), the server pauses for latency then prints responses instantly,
// and tasks run before reporting [ OK ].
type Item =
  | { kind: "cmd"; text: string }
  | { kind: "prompt"; q: string; a: string; cls?: string }
  | { kind: "out"; text: string; cls?: string; latency: number }
  | { kind: "task"; label: string; cls?: string };

const SCRIPT: Item[] = [
  { kind: "cmd", text: "ssh visitor@oceanuddin.com" },
  { kind: "out", text: "The authenticity of host 'oceanuddin.com' can't be established.", latency: 820 },
  { kind: "out", text: "ED25519 key fingerprint is SHA256:0c3a...n_uddin/portfolio.", latency: 140 },
  { kind: "prompt", q: "Are you sure you want to continue connecting (yes/no)? ", a: "yes" },
  { kind: "out", text: "Warning: Permanently added 'oceanuddin.com' to known hosts.", cls: "text-white/45", latency: 300 },
  { kind: "prompt", q: "visitor@oceanuddin.com's password: ", a: "••••••••••••" },
  { kind: "task", label: "Authenticating", cls: "text-cyber-teal" },
  { kind: "task", label: "Loading portfolio modules", cls: "text-cyber-teal" },
  { kind: "task", label: "Negotiating glassmorphism", cls: "text-cyber-teal" },
  { kind: "out", text: "", latency: 160 },
  { kind: "out", text: "Welcome, visitor. Connection established.", cls: "text-cyber-cyan font-semibold", latency: 220 },
];

type Done = { text: string; cls?: string; prompt?: boolean };
type Active = { text: string; cls?: string; prompt?: boolean; cursor: boolean };

export default function SshLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState<Done[]>([]);
  const [active, setActive] = useState<Active | null>(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    setTimeout(onDone, 650);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mul = reduced ? 0.4 : 1; // Reduce Motion: same flow, faster

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timeouts.push(setTimeout(res, Math.max(0, ms * mul))));
    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    // Type a string with human-like jitter (slower after spaces/punctuation,
    // the odd hesitation), appended onto a fixed prefix.
    const human = async (prefix: string, str: string, cls?: string, prompt?: boolean) => {
      let cur = "";
      for (const ch of str) {
        if (cancelled) return;
        cur += ch;
        setActive({ text: prefix + cur, cls, prompt, cursor: true });
        let d = rnd(50, 120);
        if (/[ .,/?@]/.test(ch) && Math.random() < 0.4) d += rnd(70, 200);
        else if (Math.random() < 0.06) d += rnd(150, 320); // occasional pause
        await wait(d);
      }
    };

    const commit = (text: string, cls?: string, prompt?: boolean) => {
      setRendered((prev) => [...prev, { text, cls, prompt }]);
      setActive(null);
    };

    (async () => {
      for (const item of SCRIPT) {
        if (cancelled) return;

        if (item.kind === "cmd") {
          await wait(rnd(250, 500)); // pause before the user starts typing
          await human("", item.text, undefined, true);
          if (cancelled) return;
          await wait(rnd(260, 460)); // hit enter
          commit(item.text, undefined, true);
        } else if (item.kind === "prompt") {
          // server prints the question instantly, then the human answers
          setActive({ text: item.q, cls: item.cls, cursor: true });
          await wait(rnd(360, 700));
          await human(item.q, item.a, item.cls);
          if (cancelled) return;
          await wait(rnd(300, 520));
          commit(item.q + item.a, item.cls);
        } else if (item.kind === "out") {
          await wait(item.latency);
          if (cancelled) return;
          commit(item.text, item.cls);
        } else {
          // task: "label" → dots tick up → "[ OK ]"
          await wait(rnd(120, 260));
          for (let i = 1; i <= 3; i++) {
            if (cancelled) return;
            setActive({ text: `${item.label} ${".".repeat(i)}`, cls: item.cls, cursor: false });
            await wait(rnd(160, 300));
          }
          if (cancelled) return;
          await wait(rnd(120, 240));
          commit(`${item.label} ... [ OK ]`, item.cls);
        }
      }
      if (cancelled) return;
      await wait(700);
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
                    {l.text || " "}
                  </div>
                ))}
                {active && (
                  <div className={active.cls ?? "text-white/80"}>
                    {active.prompt && <span className="text-cyber-teal">$ </span>}
                    {active.text}
                    {active.cursor && (
                      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyber-teal animate-blink" />
                    )}
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
