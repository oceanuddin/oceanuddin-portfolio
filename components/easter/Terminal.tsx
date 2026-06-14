"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { runCommand, HELP_LINES } from "@/lib/commands";
import MatrixRain from "./MatrixRain";

type Entry = { kind: "in" | "out"; text: string };

const BANNER: Entry[] = [
  { kind: "out", text: "ocean@portfolio:~$ interactive shell ready." },
  { kind: "out", text: "type 'help' to list commands · 'exit' or ` to close." },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Entry[]>(BANNER);
  const [input, setInput] = useState("");
  const [matrix, setMatrix] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // global hotkey: backtick toggles (when not typing in a field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "`" && (!typing || (e.target as HTMLElement)?.dataset.terminal)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        if (matrix) setMatrix(false);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [matrix]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const submit = () => {
    const value = input;
    setCmdHistory((h) => [value, ...h].slice(0, 50));
    setHistIdx(-1);
    setInput("");

    const res = runCommand(value);
    if (res.effect === "clear") {
      setHistory([]);
      return;
    }
    if (res.effect === "close") {
      setHistory((h) => [...h, { kind: "in", text: value }, { kind: "out", text: res.lines[0] }]);
      setTimeout(() => setOpen(false), 400);
      return;
    }
    if (res.effect === "matrix") {
      setMatrix(true);
    }
    setHistory((h) => [
      ...h,
      { kind: "in", text: value },
      ...res.lines.map((l) => ({ kind: "out" as const, text: l })),
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[ni] !== undefined) {
        setHistIdx(ni);
        setInput(cmdHistory[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = histIdx - 1;
      setHistIdx(ni);
      setInput(ni < 0 ? "" : cmdHistory[ni] ?? "");
    }
  };

  return (
    <>
      {matrix && <MatrixRain onExit={() => setMatrix(false)} />}

      {/* floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open terminal"
        data-cursor="hover"
        className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full glass-strong font-mono text-lg text-cyber-teal transition hover:shadow-glow"
      >
        {open ? "✕" : "_"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-5 z-[60] w-[min(92vw,520px)]"
          >
            <div className="glass-strong overflow-hidden rounded-xl shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-white/40">ocean@portfolio</span>
                <button
                  onClick={() => {
                    setHistory((h) => [...h, { kind: "in", text: "help" }, ...HELP_LINES.map((l) => ({ kind: "out" as const, text: l }))]);
                  }}
                  className="ml-auto font-mono text-[10px] text-white/40 hover:text-cyber-teal"
                >
                  help
                </button>
              </div>
              <div
                ref={bodyRef}
                onClick={() => inputRef.current?.focus()}
                className="h-72 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed"
              >
                {history.map((e, i) => (
                  <div
                    key={i}
                    className={
                      e.kind === "in"
                        ? "text-white/90"
                        : "whitespace-pre-wrap text-white/60"
                    }
                  >
                    {e.kind === "in" ? (
                      <>
                        <span className="text-cyber-teal">ocean@portfolio:~$ </span>
                        {e.text}
                      </>
                    ) : (
                      e.text || " "
                    )}
                  </div>
                ))}
                <div className="flex items-center text-white/90">
                  <span className="text-cyber-teal">ocean@portfolio:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    data-terminal="true"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    className="flex-1 bg-transparent font-mono text-[12.5px] text-white outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
