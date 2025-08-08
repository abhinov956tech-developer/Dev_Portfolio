import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SiReact, SiNodedotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiVite, SiFramer } from "react-icons/si";

const techs = [
  { name: "React", icon: SiReact, tip: "Hooks + memoization to avoid wasted re-renders." },
  { name: "Node.js", icon: SiNodedotjs, tip: "Stream responses for snappy APIs." },
  { name: "TypeScript", icon: SiTypescript, tip: "Model domain types first; narrow with zod." },
  { name: "Tailwind CSS", icon: SiTailwindcss, tip: "Design tokens via CSS vars for themes." },
  { name: "MongoDB", icon: SiMongodb, tip: "Lean schemas + indexes for hot queries." },
  { name: "PostgreSQL", icon: SiPostgresql, tip: "CTEs + partial indexes for speed." },
  { name: "Vite", icon: SiVite, tip: "Code-split routes; prefetch on hover." },
  { name: "Framer Motion", icon: SiFramer, tip: "Use variants + layout for smoothness." },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const TechStack = () => {
  return (
    <section id="tech" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Tech Stack</h2>
      <TooltipProvider>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {techs.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div key={t.name} variants={cardVariants} className="group perspective">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      {/* Flip-card inner */}
                      <div className="film-card min-h-[140px] [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                        {/* Front */}
                        <div className="flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
                          <Icon
                            aria-hidden
                            size={36}
                            className="mb-2 text-foreground transition-colors duration-300 group-hover:text-accent group-hover:[filter:drop-shadow(0_0_8px_hsl(var(--accent)_/_0.5))]"
                          />
                          <span className="text-lg font-semibold">{t.name}</span>
                          <span className="sr-only">{t.name}</span>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <p className="text-sm text-muted-foreground">{t.tip}</p>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-sm">
                    {t.tip}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </motion.div>
      </TooltipProvider>
    </section>
  );
};

export default TechStack;
