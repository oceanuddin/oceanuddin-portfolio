import { skills } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <SectionHeading index="04" eyebrow="cat stack.json" title="Tech Stack" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={(i % 3) * 0.06}>
            <GlassCard className="h-full p-5" glow="rgba(167,139,250,0.16)">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cyber-violet">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    data-cursor="hover"
                    className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/75 transition-colors hover:border-cyber-teal/40 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
