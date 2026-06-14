export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* animated aurora blobs */}
      <div className="absolute -left-[10%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-cyber-cyan/20 blur-[120px] animate-aurora-1" />
      <div className="absolute right-[-10%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-cyber-violet/20 blur-[130px] animate-aurora-2" />
      <div className="absolute bottom-[-15%] left-[30%] h-[50vh] w-[50vh] rounded-full bg-cyber-ember/10 blur-[120px] animate-aurora-3" />
      {/* faint grid */}
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,#06070a_95%)]" />
      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
