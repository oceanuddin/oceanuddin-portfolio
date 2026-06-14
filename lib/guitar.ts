// Lightweight acoustic-guitar chord synthesis via the Web Audio API.
// No dependencies — plucked-string-ish tone using detuned oscillators + a
// quick decay envelope, strummed note-by-note.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function pluck(freq: number, start: number, dur = 1.8) {
  const ac = getCtx();
  if (!ac) return;

  const master = ac.createGain();
  master.connect(ac.destination);
  master.gain.value = 0.0;

  // two slightly detuned oscillators for a warmer body
  [0, 0.4].forEach((detune, idx) => {
    const osc = ac.createOscillator();
    osc.type = idx === 0 ? "triangle" : "sine";
    osc.frequency.value = freq;
    osc.detune.value = detune * 8;

    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, ac.currentTime + start);
    g.gain.exponentialRampToValueAtTime(idx === 0 ? 0.22 : 0.12, ac.currentTime + start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);

    osc.connect(g);
    g.connect(master);
    osc.start(ac.currentTime + start);
    osc.stop(ac.currentTime + start + dur + 0.05);
  });

  master.gain.value = 0.9;
}

// A warm open chord (G major-ish voicing), strummed.
const G_CHORD = [196.0, 246.94, 293.66, 392.0, 493.88]; // G3 B3 D4 G4 B4

export function strum() {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  G_CHORD.forEach((f, i) => pluck(f, i * 0.07));
}

// A single soft note (used on signature click).
export function note(freq = 329.63) {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  pluck(freq, 0, 1.4);
}
