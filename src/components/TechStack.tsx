import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const techs = [
  { name: "React" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "Tailwind" },
  { name: "MongoDB" },
  { name: "PostgreSQL" },
  { name: "Vite" },
  { name: "Framer Motion" },
];

const TechStack = () => {
  return (
    <section id="tech" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Tech Stack</h2>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {techs.map((t, i) => (
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
                    <span className="text-lg font-semibold">{t.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-sm">
                  {t.name}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
};

export default TechStack;
