import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import { motion, useMotionValue, useSpring } from "framer-motion";

const projects = [
  { title: "Futuristic SaaS Dashboard", img: project1, live: "#", code: "#", tech: ["React", "Node", "Postgres"] },
  { title: "E-commerce Platform", img: project2, live: "#", code: "#", tech: ["Next.js", "Stripe", "MongoDB"] },
  { title: "Realtime Data Viz", img: project3, live: "#", code: "#", tech: ["Vite", "WebSockets", "D3"] },
];

type Project = typeof projects[number];

const olderProjects = [project1, project2, project3, project2, project1, project3];

const ProjectCard = ({ p }: { p: Project }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxSpring = useSpring(rx, { stiffness: 300, damping: 20 });
  const rySpring = useSpring(ry, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set(-(py - 0.5) * 16);
    ry.set((px - 0.5) * 16);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: "preserve-3d" }}
        className="group poster-card will-change-transform"
      >
        <img src={p.img} alt={`${p.title} poster`} loading="lazy" className="poster-image" />
        <div className="poster-overlay">
          <div>
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {p.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button asChild size="sm"><a href={p.live} aria-label={`View ${p.title} live`}>View Live</a></Button>
              <Button variant="secondary" asChild size="sm"><a href={p.code} aria-label={`View ${p.title} source code`}>Source Code</a></Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Projects</h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {projects.map((p) => (
              <CarouselItem key={p.title} className="md:basis-1/2 lg:basis-1/3">
                <ProjectCard p={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-12 overflow-hidden" aria-label="Past work reel">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="flex gap-4 items-center"
        >
          {[...olderProjects, ...olderProjects].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Past project thumbnail ${idx + 1}`}
              loading="lazy"
              className="h-16 w-28 object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
