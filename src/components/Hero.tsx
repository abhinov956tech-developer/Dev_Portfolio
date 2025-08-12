import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { ThreeAvatar } from './ThreeAvatar';

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
          backgroundSize: '30px 30px sm:50px sm:50px'
        }}
      />
      
      {/* Radial Spotlight */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 sm:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-gradient-radial from-violet-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-grain" />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 min-h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Greeting */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light tracking-wide">
                Hey, I'm <span className="text-white font-medium">Abhinov</span>
                <span className="inline-block ml-1 animate-pulse">✨</span>
              </p>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-none">
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  A Fullstack
                </span>
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
              
              {/* Subtitle with typing effect */}
              <div className="max-w-full sm:max-w-lg">
                <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed">
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
              className="flex flex-col gap-4 sm:gap-6"
            >
              {/* Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Button
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-all duration-300 text-sm sm:text-base"
                  size="default"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-all duration-300 text-sm sm:text-base"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Projects
                </Button>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-2 sm:gap-3 justify-center xs:justify-start">
                {[
                  { icon: Github, href: "https://github.com/abhinov956tech-developer", label: "GitHub", target: "_blank" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/abhinov-dutta-a98509258", label: "LinkedIn", target: "_blank" },
                  { icon: Twitter, href: "https://twitter.com/abhinov_dutta03", label: "Twitter", target: "_blank" },
                  { icon: Mail, href: "abhinavdutta927@gmail.com", label: "Email", target: "_blank" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2 rounded-full bg-slate-800/50 hover:bg-violet-500/20 text-slate-400 hover:text-violet-400 transition-all duration-300 border border-slate-700/50 hover:border-violet-500/50"
                    aria-label={label}
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Avatar Section */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Concentric Rings - Responsive sizes */}
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
                        ? 'border-violet-400/40 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80' 
                        : index === 1 
                        ? 'border-purple-400/30 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96'
                        : 'border-coral-400/20 w-64 h-64 sm:w-80 sm:h-80 md:w-112 md:h-112'
                    }`}
                    style={{
                      boxShadow: `0 0 ${15 + index * 8}px rgba(139, 92, 246, ${0.3 - index * 0.1})`
                    }}
                  />
                ))}
              </div>

              {/* Chevron Brackets - Hidden on very small screens */}
              <div className="hidden xs:block absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 text-violet-400/30 text-2xl sm:text-4xl font-thin">‹</div>
              <div className="hidden xs:block absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 text-violet-400/30 text-2xl sm:text-4xl font-thin">›</div>

              {/* Avatar Container - Responsive sizes */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-2 sm:border-4 border-violet-400/50 shadow-2xl"
                style={{
                  boxShadow: `
                    0 0 30px rgba(139, 92, 246, 0.4),
                    inset 0 0 20px rgba(139, 92, 246, 0.1)
                  `
                }}
              >
                {/* Placeholder for 3D Avatar */}
                <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 mx-auto mb-2 sm:mb-4 flex items-center justify-center text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                      AD
                    </div>
                    <p className="text-violet-200 text-xs sm:text-sm">3D Avatar Placeholder</p>
                    <p className="text-violet-300/70 text-[10px] sm:text-xs mt-1 hidden sm:block">Replace with rendered portrait</p>
                  </div>
                </div>

                {/* Rim Light Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/20 via-transparent to-purple-600/20 mix-blend-overlay" />
                
                {/* Inner Glow */}
                <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-t from-violet-500/10 to-transparent" />
              </motion.div>

              {/* Floating Particles - Reduced on mobile */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-violet-400 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
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