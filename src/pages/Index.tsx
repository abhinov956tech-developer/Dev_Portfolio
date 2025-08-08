import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground snap-y snap-mandatory">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <a href="#hero" className="font-display text-2xl tracking-wide story-link" aria-label="Go to top">ZS Portfolio</a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#about" className="hover-scale">About</a>
            <a href="#tech" className="hover-scale">Stack</a>
            <a href="#projects" className="hover-scale">Projects</a>
            <a href="#experience" className="hover-scale">Experience</a>
            <a href="#contact" className="hover-scale">Contact</a>
            <ThemeToggle />
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
        © {new Date().getFullYear()} Your Name · All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
