import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Film } from "lucide-react";

const Index = () => {
  const [active, setActive] = useState<string>("hero");
  const [showCut, setShowCut] = useState(false);

  useEffect(() => {
    const ids = ["hero", "about", "tech", "projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setActive((prev) => {
              if (prev !== id) {
                setShowCut(true);
                window.setTimeout(() => setShowCut(false), 260);
              }
              return id;
            });
          }
        });
      },
      { threshold: 0.6 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) => `hover-scale story-link ${active === id ? "nav-active" : ""}`;

  const toggleDirectorsCut = () => {
    document.body.classList.toggle("dc-theme");
  };

  return (
    <div className="min-h-screen bg-background text-foreground snap-y snap-mandatory">
      {showCut && <div className="fade-cut fixed inset-0 z-[70]" aria-hidden />}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <a href="#hero" className="font-display text-2xl tracking-wide story-link flex flex-row items-center" aria-label="Go to top" style={{ display: 'flex', alignItems: 'center', gap: '1px', }}>
            <img className="h-8 my-auto" src='/sign.png' alt="Logo" style={{ display: 'inline', verticalAlign: 'middle' }} />
            <span style={{ display: 'inline', verticalAlign: 'middle' }}>Portfolio</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#about" className={linkClass("about")} aria-current={active === "about" ? "page" : undefined}>About</a>
            <a href="#tech" className={linkClass("tech")} aria-current={active === "tech" ? "page" : undefined}>Stack</a>
            <a href="#projects" className={linkClass("projects")} aria-current={active === "projects" ? "page" : undefined}>Projects</a>
            <a href="#experience" className={linkClass("experience")} aria-current={active === "experience" ? "page" : undefined}>Experience</a>
            <a href="#contact" className={linkClass("contact")} aria-current={active === "contact" ? "page" : undefined}>Contact</a>
            <ThemeToggle />
            <button
              onClick={toggleDirectorsCut}
              aria-label="Toggle Director's Cut theme"
              className="p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Director's cut"
            >
              <Film className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Abhinov Dutta · All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
