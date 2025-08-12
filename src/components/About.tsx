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
    <section id="about" className="relative min-h-screen snap-start container py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Top-left Orange Geometric Accent */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        whileInView={{ opacity: 0.6, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-16 sm:top-24 left-4 sm:left-8 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-orange-400 to-orange-500 rotate-45 shadow-lg z-10"
        style={{
          boxShadow: '0 0 20px rgba(251, 146, 60, 0.3)'
        }}
      />

      {/* Bottom-right Orange Geometric Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-24 right-8 w-8 h-8 z-10"
      >
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 transform rotate-12 shadow-lg"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: '0 0 25px rgba(251, 146, 60, 0.4)'
          }}
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Soft Ambient Glow behind text */}
          <div className="absolute -inset-8 bg-gradient-radial from-slate-100/10 via-slate-100/5 to-transparent rounded-3xl blur-2xl dark:from-slate-800/20 dark:via-slate-800/10" />
          
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl mb-4">About</h2>
            
            <p className="text-muted-foreground mb-6">
              I'm a full-stack developer focused on building high-performance, accessible web apps with a strong eye for cinematic design and motion.
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
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
          style={{ opacity: 1, transform: "none", left: "66px", top: "-1px", width: "574.222px" }}
        >
          {/* Enhanced shadow for portrait frame */}
          <div 
            className="relative mx-auto w-64 h-96 md:w-80 md:h-[32rem] lg:w-96 lg:h-[36rem] rounded-sm ring-1 ring-border/20 overflow-hidden"
            style={{
              filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.2))',
              boxShadow: '0 8px 30px rgb(0,0,0,0.12)'
            }}
          >
            <img 
              src="/me.png" 
              alt="Portrait of Your Name" 
              loading="lazy" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-in-out" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-border/10" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;