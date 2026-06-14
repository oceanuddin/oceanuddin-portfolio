import { interests } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";

export default function Interests() {
  return (
    <section id="interests" className="section-pad">
      <SectionHeading index="06" eyebrow="./offline.sh" title="Beyond the Screen" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {interests.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.06}>
            <GlassCard className="h-full p-6" glow="rgba(251,146,60,0.14)">
              <div className="mb-4 text-3xl text-cyber-ember">{it.glyph}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">{it.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{it.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
