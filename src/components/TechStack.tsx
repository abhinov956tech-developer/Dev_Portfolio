import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SiReact, SiNodedotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiVite, SiFramer } from "react-icons/si";

const techs = [
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Vite", icon: SiVite },
  { name: "Framer Motion", icon: SiFramer },
];

const TechStack = () => {
  return (
    <section id="tech" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Tech Stack</h2>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {techs.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="group perspective"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="film-card">
                      <Icon aria-hidden size={36} className="mb-2 text-foreground" />
                      <span className="text-lg font-semibold">{t.name}</span>
                      <span className="sr-only">{t.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-sm">
                    {t.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </div>
      </TooltipProvider>
    </section>
  );
};

export default TechStack;
