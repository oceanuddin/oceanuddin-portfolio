import { about } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading index="01" eyebrow="whoami" title="About" />
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="space-y-5 text-lg leading-relaxed text-white/75">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <GlassCard glow="rgba(94,234,212,0.18)" className="p-6">
            <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyber-teal">
              {about.lookingFor.title}
            </h3>
            <ul className="mb-5 space-y-2">
              {about.lookingFor.roles.map((r) => (
                <li key={r} className="flex items-center gap-2 text-white/80">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs leading-relaxed text-white/50">
              {about.lookingFor.note}
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
