import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const items = [
  { role: "Senior Full-Stack Developer", company: "CineTech Labs", period: "2022 – Present", details: "Leading a team building cinematic, high-performance web experiences for enterprise clients." },
  { role: "Frontend Engineer", company: "NeoWeb Studio", period: "2020 – 2022", details: "Built design systems and micro-interactions across multiple products." },
  { role: "Developer", company: "Freelance", period: "2018 – 2020", details: "Delivered full-stack projects for startups and agencies." },
];

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
      audioCtxRef.current = new Ctx();
    }
    return () => {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    };
  }, []);

  const playWhoosh = () => {
    if (isMuted) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const duration = 0.35;
    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      const envelope = Math.pow(1 - t, 2);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    source.stop(ctx.currentTime + duration + 0.01);
  };

  const toggle = (i: number) => {
    setOpenIndex((prev) => {
      const willOpen = prev !== i;
      if (willOpen) playWhoosh();
      return willOpen ? i : null;
    });
  };

  return (
    <section id="experience" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Experience</h2>
      <div className="relative pl-6 border-l border-border">
        {items.map((it, i) => (
          <div key={it.role} className="mb-8">
            <button
              className="w-full text-left group"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--background))] ring-2 ring-primary" />
                <div>
                  <div className="font-semibold">{it.role} · {it.company}</div>
                  <div className="text-sm text-muted-foreground">{it.period}</div>
                </div>
              </div>
              <div className={`shutter ${openIndex === i ? "open" : ""}`}>
                <p className="text-sm text-muted-foreground">{it.details}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Label htmlFor="sound-toggle" className="text-sm text-muted-foreground">Sound effects</Label>
        <Switch
          id="sound-toggle"
          checked={!isMuted}
          onCheckedChange={(checked) => setIsMuted(!checked)}
          aria-label="Toggle sound effects"
        />
        <span className="text-xs text-muted-foreground">{isMuted ? "Muted" : "On"}</span>
      </div>
    </section>
  );
};

export default Experience;
