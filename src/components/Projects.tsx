import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const projects = [
  { title: "Futuristic SaaS Dashboard", img: project1, live: "#", code: "#", tech: ["React", "Node", "Postgres"] },
  { title: "E-commerce Platform", img: project2, live: "#", code: "#", tech: ["Next.js", "Stripe", "MongoDB"] },
  { title: "Realtime Data Viz", img: project3, live: "#", code: "#", tech: ["Vite", "WebSockets", "D3"] },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Projects</h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {projects.map((p) => (
              <CarouselItem key={p.title} className="md:basis-1/2 lg:basis-1/3">
                <div className="group poster-card">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
