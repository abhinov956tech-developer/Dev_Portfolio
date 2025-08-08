import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light"; // default dark

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {isDark ? (
            <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center">
              <Sun />
            </motion.span>
          ) : (
            <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center">
              <Moon />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};

export default ThemeToggle;
