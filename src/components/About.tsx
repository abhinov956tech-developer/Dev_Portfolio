import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";
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
  return (
    <section id="about" className="min-h-screen snap-start container py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">About</h2>
          <p className="text-muted-foreground mb-6">
            I’m a full-stack developer focused on building high-performance, accessible web apps with a strong eye for cinematic design and motion.
          </p>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm tracking-wide uppercase text-muted-foreground">{s.name}</span>
                  <Badge variant="secondary">{s.level}%</Badge>
                </div>
                <Progress value={s.level} className="h-2" />
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
          <img src={portrait} alt="Developer portrait" loading="lazy" className="w-full max-w-md mx-auto rounded-lg shadow-xl" />
          <div className="absolute inset-0 rounded-lg ring-1 ring-primary/30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
