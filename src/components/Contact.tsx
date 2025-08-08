import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen snap-start container py-20 md:py-28">
      <h2 className="font-display text-4xl md:text-5xl mb-10">Contact</h2>
      <div className="grid md:grid-cols-2 gap-10 items-stretch">
        <div className="bg-card rounded-lg p-6 shadow">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">Name</label>
              <Input id="name" required aria-label="Your name" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <Input id="email" type="email" required aria-label="Your email" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="message">Message</label>
              <Textarea id="message" rows={5} required aria-label="Your message" />
            </div>
            <div className="relative">
              <Button type="submit" className="w-full" aria-label="Send message">
                Send Message
              </Button>
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: 120, y: -80 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                  >
                    <Send className="text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
        <div className="rounded-lg p-6 bg-surface-gradient">
          <p className="text-muted-foreground">Based in Earth · Available for remote work.</p>
          <div className="mt-6 h-64 w-full rounded-md bg-accent/20 flex items-center justify-center text-accent-foreground">Map or Illustration</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
