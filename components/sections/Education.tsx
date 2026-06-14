import { education, certifications } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <SectionHeading index="05" eyebrow="verify --credentials" title="Education & Certs" />

      <Reveal>
        <GlassCard glow="rgba(34,211,238,0.18)" className="mb-6 p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold text-white md:text-2xl">
              {education.school}
            </h3>
            <span className="chip">{education.meta}</span>
          </div>
          <p className="mt-1 font-mono text-sm text-cyber-teal/80">{education.degree}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">{education.note}</p>
        </GlassCard>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.07}>
            <GlassCard className="h-full p-5" glow="rgba(94,234,212,0.16)">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyber-teal/40 font-mono text-xs text-cyber-teal">
                  ✓
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                  {c.issuer}
                </span>
              </div>
              <h4 className="mb-2 text-base font-semibold text-white">{c.name}</h4>
              <p className="text-xs leading-relaxed text-white/60">{c.desc}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
