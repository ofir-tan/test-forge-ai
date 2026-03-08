import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-mono font-bold text-[10px]">TF</span>
        </div>
        <span className="font-semibold text-sm">TestForge AI</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 TestForge AI. Turn hours into seconds.
      </p>
    </div>
  </footer>
);

export default Footer;
