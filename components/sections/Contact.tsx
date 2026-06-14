"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const SCRAMBLE = "▚▞░▒▓█▙▟◤◢/<>#";

function scramble(str: string) {
  return str
    .split("")
    .map((c) => (c === "@" || c === "." ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]))
    .join("");
}

// deterministic mask for first paint (no Math.random → no hydration mismatch)
const MASK = profile.email
  .split("")
  .map((c) => (c === "@" || c === "." ? c : "▓"))
  .join("");

function DecryptEmail() {
  const [revealed, setRevealed] = useState(false);
  const [display, setDisplay] = useState(MASK);

  // randomize the mask only after mount (client-only)
  useEffect(() => {
    setDisplay(scramble(profile.email));
  }, []);

  const decrypt = () => {
    if (revealed) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplay(
        profile.email
          .split("")
          .map((c, idx) =>
            idx < i ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
          )
          .join("")
      );
      i++;
      if (i > profile.email.length) {
        clearInterval(id);
        setDisplay(profile.email);
        setRevealed(true);
      }
    }, 35);
  };

  return (
    <a
      href={`mailto:${profile.email}`}
      onMouseEnter={decrypt}
      onFocus={decrypt}
      data-cursor="hover"
      className="inline-block font-mono text-lg text-cyber-teal underline-offset-8 transition hover:underline md:text-2xl"
      aria-label={`Email ${profile.email}`}
    >
      {display}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-pad pb-0">
      <SectionHeading index="07" eyebrow="open connection" title="Let's build something" />

      <Reveal>
        <div className="glass rounded-3xl p-8 text-center md:p-14">
          <p className="mx-auto mb-8 max-w-lg text-balance text-white/70">
            I&apos;m actively looking for IT, systems, and cybersecurity roles in the Orlando
            area. Have an opening, an idea, or just want to talk shop? Reach out.
          </p>

          <div className="mb-8">
            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/40">
              decrypting on hover →
            </span>
            <DecryptEmail />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-white/80 transition hover:border-cyber-teal/40 hover:text-white"
            >
              GitHub ↗
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-white/80 transition hover:border-cyber-teal/40 hover:text-white"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-white/80 transition hover:border-cyber-teal/40 hover:text-white"
            >
              Résumé ↗
            </a>
          </div>
        </div>
      </Reveal>

      <footer className="mt-20 flex flex-col items-center gap-4 border-t border-white/5 py-10">
        <Image
          src="/monogram-white.png"
          alt="Ocean Uddin"
          width={60}
          height={60}
          className="h-10 w-auto opacity-50"
        />
        <p className="font-mono text-xs text-white/35">
          © {new Date().getFullYear()} Ocean Uddin · Built with Next.js · {profile.location}
        </p>
      </footer>
    </section>
  );
}
