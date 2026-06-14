import { experience } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading index="02" eyebrow="cat work.log" title="Experience" />
      <div className="relative">
        {/* timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyber-teal/50 via-white/10 to-transparent md:left-[9px]" />
        <div className="space-y-10">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 0.05}>
              <div className="relative pl-10 md:pl-14">
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-cyber-teal/60 bg-ink md:h-5 md:w-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-teal" />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {job.role}
                  </h3>
                  <span className="chip">{job.meta}</span>
                </div>
                <p className="mt-1 font-mono text-sm text-cyber-teal/80">{job.org}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 text-sm leading-relaxed text-white/70 md:text-base"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyber-violet" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
