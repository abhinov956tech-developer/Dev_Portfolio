import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import grain from "@/assets/film-grain.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [8, -8]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-8, 8]);
  const zoom = useSpring(1, { stiffness: 80, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="hero" className="relative min-h-screen snap-start overflow-hidden bg-hero-gradient">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-60"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{ backgroundImage: `url(${grain})` }}
        aria-hidden
      />
      <div className="rain-overlay" aria-hidden />

      <motion.div
        onMouseMove={onMove}
        style={{ rotateX, rotateY, scale: zoom }}
        className="relative z-10 container mx-auto px-6 md:px-10 min-h-screen flex items-center justify-center text-center"
      >
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-6xl md:text-8xl tracking-tight leading-none text-foreground drop-shadow-xl"
          >
            YOUR NAME
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground"
          >
            Full-Stack Developer crafting performant, cinematic web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <Button
              variant="hero"
              size="lg"
              className="hover-shake"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="View my work"
            >
              View My Work
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="vignette" aria-hidden />
    </section>
  );
};

export default Hero;
