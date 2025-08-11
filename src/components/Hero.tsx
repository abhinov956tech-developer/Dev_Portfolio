import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [2, -2]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-2, 2]);
  
  const [typed, setTyped] = useState("");
  const subtitle = " Passionate about crafting seamless cinematic user experiences at the intersection of creativity and functionality.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(subtitle.slice(0, i));
      if (i >= subtitle.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
      onMouseMove={onMove}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Radial Spotlight */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-grain" />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 container mx-auto px-6 md:px-12 min-h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Greeting */}
              <p className="text-sm md:text-base text-slate-300 font-light tracking-wide">
                Hey, I'm <span className="text-white font-medium">Abhinov</span>
                <span className="inline-block ml-1 animate-pulse">✨</span>
              </p>
              
              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  A Fullstack
                </span>
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
              
              {/* Subtitle with typing effect */}
              <div className="max-w-lg">
                <p className="text-slate-400 text-lg leading-relaxed">
                  <span>{typed}</span>
                  <span className="animate-pulse text-violet-400">
                    {typed.length < subtitle.length ? '|' : ''}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* CTAs and Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <div className="flex gap-4">
                <Button
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-all duration-300"
                  size="lg"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-all duration-300"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Projects
                </Button>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Mail, href: "#", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2 rounded-full bg-slate-800/50 hover:bg-violet-500/20 text-slate-400 hover:text-violet-400 transition-all duration-300 border border-slate-700/50 hover:border-violet-500/50"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Avatar Section */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Concentric Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 - index * 0.15 }}
                    transition={{ 
                      duration: 2,
                      delay: 0.8 + index * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className={`absolute rounded-full border-2 ${
                      index === 0 
                        ? 'border-violet-400/40 w-80 h-80' 
                        : index === 1 
                        ? 'border-purple-400/30 w-96 h-96'
                        : 'border-coral-400/20 w-112 h-112'
                    }`}
                    style={{
                      boxShadow: `0 0 ${20 + index * 10}px rgba(139, 92, 246, ${0.3 - index * 0.1})`
                    }}
                  />
                ))}
              </div>

              {/* Chevron Brackets */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-violet-400/30 text-4xl font-thin">‹</div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-violet-400/30 text-4xl font-thin">›</div>

              {/* Avatar Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-violet-400/50 shadow-2xl"
                style={{
                  boxShadow: `
                    0 0 40px rgba(139, 92, 246, 0.4),
                    inset 0 0 20px rgba(139, 92, 246, 0.1)
                  `
                }}
              >
                {/* Placeholder for 3D Avatar - Replace this with your actual 3D rendered portrait */}
                <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      AD
                    </div>
                    <p className="text-violet-200 text-sm">3D Avatar Placeholder</p>
                    <p className="text-violet-300/70 text-xs mt-1">Replace with rendered portrait</p>
                  </div>
                </div>

                {/* Rim Light Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/20 via-transparent to-purple-600/20 mix-blend-overlay" />
                
                {/* Inner Glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-t from-violet-500/10 to-transparent" />
              </motion.div>

              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400 rounded-full"
                  animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/40" />
    </section>
  );
};

export default Hero;