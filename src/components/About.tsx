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
    <section id="about" className="min-h-screen snap-start container py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">About</h2>
          
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            I'm a full-stack developer focused on building high-performance, accessible web apps with a strong eye for cinematic design and motion.
          </p>
          
          {/* Skills Section */}
          <div ref={skillsRef} className="space-y-4 sm:space-y-6">
            {skills.map((s) => (
              <div key={s.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground font-medium">
                    {s.name}
                  </span>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {s.level}%
                  </Badge>
                </div>
                <Progress 
                  value={progressValues[s.name]} 
                  className="h-1.5 sm:h-2 w-full" 
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-48 h-64 sm:w-56 sm:h-80 md:w-64 md:h-96 lg:w-72 lg:h-[28rem] xl:w-80 xl:h-[32rem] 2xl:w-96 2xl:h-[36rem] rounded-sm ring-1 ring-border/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden mx-auto lg:mx-0">
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