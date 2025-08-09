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
      <div className="grid gap-10 items-stretch">
        <div className="bg-card rounded-lg p-6 shadow">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:animate-[pulse_0.5s_ease-out_1] transition-shadow">
              <label className="block text-sm mb-1" htmlFor="name">Name</label>
              <Input id="name" required aria-label="Your name" />
            </div>
            <div className="rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:animate-[pulse_0.5s_ease-out_1] transition-shadow">
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <Input id="email" type="email" required aria-label="Your email" />
            </div>
            <div className="rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:animate-[pulse_0.5s_ease-out_1] transition-shadow">
              <label className="block text-sm mb-1" htmlFor="message">Message</label>
              <Textarea id="message" rows={5} required aria-label="Your message" />
            </div>
            <div className="relative">
              <Button type="submit" className="w-full relative overflow-hidden" aria-label="Send message" disabled={sent}>
                <span className={`transition-opacity ${sent ? "opacity-0" : "opacity-100"}`}>Send Message</span>
                {sent && <Send className="absolute text-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />}
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
      </div>
    </section>
  );
};

export default Contact;
