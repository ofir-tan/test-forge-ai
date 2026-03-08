import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-radial-fade">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary">AI-Powered Test Generation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          From commit range to
          <br />
          <span className="text-gradient-red">test suite</span> in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          TestForge AI analyzes your code changes and generates production-ready test cases — automatically. Stop writing boilerplate. Start shipping confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={() => navigate('/generate')} className="px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-red-intense">
            Start Generating Tests
          </button>
          <button onClick={() => document.getElementById('live-preview')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-md border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
            View Demo
          </button>
        </motion.div>

        {/* Terminal-style stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 inline-flex items-center gap-8 font-mono text-sm text-muted-foreground"
        >
          <span><span className="text-primary font-semibold">30s</span> avg generation</span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="hidden sm:inline"><span className="text-primary font-semibold">87%</span> coverage target</span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="hidden sm:inline"><span className="text-primary font-semibold">0</span> config required</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
