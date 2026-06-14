import { projects, type Project } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";

const accentMap: Record<Project["accent"], { glow: string; text: string; dot: string }> = {
  cyan: { glow: "rgba(34,211,238,0.18)", text: "text-cyber-cyan", dot: "bg-cyber-cyan" },
  teal: { glow: "rgba(94,234,212,0.18)", text: "text-cyber-teal", dot: "bg-cyber-teal" },
  violet: { glow: "rgba(167,139,250,0.18)", text: "text-cyber-violet", dot: "bg-cyber-violet" },
  ember: { glow: "rgba(251,146,60,0.18)", text: "text-cyber-ember", dot: "bg-cyber-ember" },
};

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading index="03" eyebrow="ls ./projects" title="Selected Work" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const a = accentMap[p.accent];
          return (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <GlassCard glow={a.glow} className="flex h-full flex-col p-6 md:p-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {p.name}
                  </h3>
                  <span className={`flex items-center gap-2 font-mono text-[11px] ${a.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot} animate-pulse`} />
                    {p.status}
                  </span>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-white/70">{p.blurb}</p>
                <ul className="mb-6 space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-white/60">
                      <span className={a.text}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
