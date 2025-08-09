import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

const items = [
  { role: "Senior Full-Stack Developer", company: "CineTech Labs", period: "2022 – Present", details: "Leading a team building cinematic, high-performance web experiences for enterprise clients." },
  { role: "Frontend Engineer", company: "NeoWeb Studio", period: "2020 – 2022", details: "Built design systems and micro-interactions across multiple products." },
  { role: "Developer", company: "Freelance", period: "2018 – 2020", details: "Delivered full-stack projects for startups and agencies." },
];

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reel indicator state
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [iconY, setIconY] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const updateIconPos = (index: number) => {
    const c = containerRef.current;
    const el = itemRefs.current[index];
    if (c && el) {
      const ct = c.getBoundingClientRect().top;
      const r = el.getBoundingClientRect();
      setIconY(r.top - ct + r.height / 2 - 12);
    }
  };

  return (
    <section id="experience" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Experience</h2>
      <div ref={containerRef} className="relative pl-6 border-l border-border">
        <motion.div
          className="absolute -left-6 w-6 h-6 text-primary"
          style={{ top: iconY }}
          animate={{ rotate: hoverIndex !== null ? 360 : 0 }}
          transition={{ duration: 1, ease: "linear", repeat: hoverIndex !== null ? Infinity : 0 }}
          aria-hidden
        >
          <Film className="w-5 h-5" />
        </motion.div>
        {items.map((it, i) => (
          <div key={it.role} className="mb-8">
            <button
              ref={(el) => (itemRefs.current[i] = el)}
              className="w-full text-left group"
              onClick={() => toggle(i)}
              onMouseEnter={() => { setHoverIndex(i); updateIconPos(i); }}
              onMouseLeave={() => setHoverIndex(null)}
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
