"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="eyebrow mb-8"
        >
          <span className="text-cyber-teal">●</span> {profile.location} · Available for work
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
          className="mx-auto mb-6 w-full max-w-2xl"
        >
          <Image
            src="/signature-white.png"
            alt={profile.name}
            width={1200}
            height={420}
            priority
            className="mx-auto h-auto w-full drop-shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          />
        </motion.div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm text-white/60 md:text-base">
          {profile.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              {i > 0 && <span className="text-cyber-teal/50">/</span>}
              <ScrambleText text={r} speed={20} />
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mb-10 max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-cyber-teal px-6 py-3 font-mono text-sm font-medium text-ink transition hover:shadow-glow"
          >
            <span className="relative">Get in touch</span>
          </a>
          <a
            href="#projects"
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-sm text-white/80 backdrop-blur transition hover:border-cyber-teal/40 hover:text-white"
          >
            View projects
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 font-mono text-sm text-white/60 transition hover:text-white"
          >
            Résumé ↗
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-14 font-mono text-[11px] text-white/40"
        >
          psst — press{" "}
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-white/70">
            `
          </kbd>{" "}
          for a terminal
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1 rounded-full bg-cyber-teal"
          />
        </div>
      </motion.div>
    </section>
  );
}
