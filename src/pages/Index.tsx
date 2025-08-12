import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Film, Menu, X } from "lucide-react";

const Index = () => {
  const [active, setActive] = useState<string>("hero");
  const [showCut, setShowCut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    // Add a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const linkClass = (id: string) => `hover-scale story-link ${active === id ? "nav-active" : ""}`;

  const toggleDirectorsCut = () => {
    document.body.classList.toggle("dc-theme");
  };

  return (
    <div className="min-h-screen bg-background text-foreground snap-y snap-mandatory">
      {showCut && <div className="fade-cut fixed inset-0 z-[70]" aria-hidden />}
      
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between py-3 px-4 sm:px-6">
          {/* Logo */}
          <a 
            href="#hero" 
            className="font-display text-lg sm:text-xl md:text-2xl tracking-wide story-link flex items-center gap-1 sm:gap-2" 
            aria-label="Go to top"
            onClick={handleNavClick}
          >
            <img 
              className="h-6 sm:h-7 md:h-8" 
              src='/sign.png' 
              alt="Logo"
            />
            <span className="hidden xs:inline">Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
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

          {/* Mobile Menu Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleDirectorsCut}
              aria-label="Toggle Director's Cut theme"
              className="p-1.5 rounded-md opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Director's cut"
            >
              <Film className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="mobile-menu-button p-1.5 rounded-md hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        } absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg`}>
          <nav className="container px-4 py-4">
            <div className="flex flex-col space-y-3">
              <a 
                href="#about" 
                className={`${linkClass("about")} py-2 px-3 rounded-md text-sm font-medium transition-colors`}
                aria-current={active === "about" ? "page" : undefined}
                onClick={handleNavClick}
              >
                About
              </a>
              <a 
                href="#tech" 
                className={`${linkClass("tech")} py-2 px-3 rounded-md text-sm font-medium transition-colors`}
                aria-current={active === "tech" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Stack
              </a>
              <a 
                href="#projects" 
                className={`${linkClass("projects")} py-2 px-3 rounded-md text-sm font-medium transition-colors`}
                aria-current={active === "projects" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Projects
              </a>
              <a 
                href="#experience" 
                className={`${linkClass("experience")} py-2 px-3 rounded-md text-sm font-medium transition-colors`}
                aria-current={active === "experience" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Experience
              </a>
              <a 
                href="#contact" 
                className={`${linkClass("contact")} py-2 px-3 rounded-md text-sm font-medium transition-colors`}
                aria-current={active === "contact" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Contact
              </a>
            </div>
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
      
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground px-4">
        © {new Date().getFullYear()} Abhinov Dutta · All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;