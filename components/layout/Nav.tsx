"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { sections } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 md:px-6 ${
          scrolled ? "glass-strong rounded-full py-2" : "py-2"
        } ${scrolled ? "mx-4 md:mx-auto" : ""}`}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Home">
          <Image
            src="/monogram-white.png"
            alt="Ocean Uddin"
            width={44}
            height={44}
            className="h-9 w-auto opacity-90"
            priority
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative rounded-full px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                  active === s.id
                    ? "text-cyber-teal"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {active === s.id && (
                  <span className="absolute inset-0 rounded-full bg-cyber-teal/10 ring-1 ring-cyber-teal/30" />
                )}
                <span className="relative">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-cyber-teal/90 px-4 py-1.5 font-mono text-xs font-medium text-ink transition hover:bg-cyber-teal"
          >
            Get in touch
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full glass md:hidden"
          aria-label="Toggle menu"
        >
          <span className="font-mono text-sm">{open ? "✕" : "≡"}</span>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="mx-4 mt-2 glass-strong rounded-2xl p-4 md:hidden">
          <ul className="grid gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 font-mono text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
