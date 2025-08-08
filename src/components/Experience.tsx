import { useState } from "react";

const items = [
  { role: "Senior Full-Stack Developer", company: "CineTech Labs", period: "2022 – Present", details: "Leading a team building cinematic, high-performance web experiences for enterprise clients." },
  { role: "Frontend Engineer", company: "NeoWeb Studio", period: "2020 – 2022", details: "Built design systems and micro-interactions across multiple products." },
  { role: "Developer", company: "Freelance", period: "2018 – 2020", details: "Delivered full-stack projects for startups and agencies." },
];

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((v) => (v === i ? null : i));

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
      <div className="mt-6 text-xs text-muted-foreground">Sound effects optional · <span className="opacity-70">mute</span></div>
    </section>
  );
};

export default Experience;
