import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind CSS", level: 92 },
  { name: "MongoDB", level: 78 },
]; 

const reelSkills = skills.map((s) => s.name);
const subtitle = "Full-Stack Developer crafting cinematic web experiences.";

const About = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const inViewLeft = useInView(leftRef, { once: true, amount: 0.3 });
  const inViewSkills = useInView(skillsRef, { once: true, amount: 0.3 });

  const [typed, setTyped] = useState("");
  const typedStartedRef = useRef(false);

  const [progressValues, setProgressValues] = useState<Record<string, number>>(
    () => Object.fromEntries(skills.map((s) => [s.name, 0]))
  );

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AC) {
      audioCtxRef.current = new AC();
    }
    return () => {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (inViewLeft && !typedStartedRef.current) {
      typedStartedRef.current = true;
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setTyped(subtitle.slice(0, i));
        if (i >= subtitle.length) {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [inViewLeft]);

  const playWhoosh = () => {
    const ac = audioCtxRef.current;
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const filter = ac.createBiquadFilter();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ac.currentTime + 0.25);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ac.currentTime);
    gain.gain.setValueAtTime(0.0001, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, ac.currentTime + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.36);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.4);
  };

  const triggeredRef = useRef(false);
  useEffect(() => {
    if (inViewSkills && !triggeredRef.current) {
      triggeredRef.current = true;
      skills.forEach((s, idx) => {
        setTimeout(() => {
          setProgressValues((prev) => ({ ...prev, [s.name]: s.level }));
        }, idx * 120);
      });
      try {
        const muted = localStorage.getItem("sound-muted") === "true";
        if (!muted) playWhoosh();
      } catch (e) {
        // ignore
      }
    }
  }, [inViewSkills]);

  return (
    <section id="about" className="min-h-screen snap-start container py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">About</h2>
          <p className={`text-muted-foreground mb-2 transition-opacity duration-500 ${typed.length === subtitle.length ? "opacity-100" : "opacity-90"}`}>
            {typed}
            <span aria-hidden="true" className="ml-0.5">{typed.length < subtitle.length ? "|" : ""}</span>
          </p>
          <p className="text-muted-foreground mb-6">
            I’m a full-stack developer focused on building high-performance, accessible web apps with a strong eye for cinematic design and motion.
          </p>
          <div ref={skillsRef} className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm tracking-wide uppercase text-muted-foreground">{s.name}</span>
                  <Badge variant="secondary">{s.level}%</Badge>
                </div>
                <Progress value={progressValues[s.name]} className="h-2" />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-background to-muted shadow-xl ring-1 ring-primary/30" />
            <div className="absolute inset-3 rounded-full border-2 border-dashed border-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite]">
                  {reelSkills.map((label, idx) => {
                    const angle = (idx / reelSkills.length) * 360;
                    const radius = 110;
                    return (
                      <div
                        key={label}
                        className="absolute top-1/2 left-1/2"
                        style={{ transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)` }}
                      >
                        <Badge variant="secondary" className="text-xs px-2 py-1 shadow">
                          {label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
