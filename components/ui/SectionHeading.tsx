import ScrambleText from "./ScrambleText";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="eyebrow mb-3 flex items-center gap-3">
        <span className="text-white/40">{index}</span>
        <span className="h-px w-8 bg-cyber-teal/40" />
        <ScrambleText text={eyebrow} speed={22} />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
