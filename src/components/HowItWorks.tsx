import { motion } from "framer-motion";
import { GitCommit, Zap, Eye } from "lucide-react";

const steps = [
  {
    icon: GitCommit,
    number: "01",
    title: "Submit Your Commits",
    description: "Paste your repo URL, base commit, and head commit. That's it — three fields, zero config.",
  },
  {
    icon: Zap,
    number: "02",
    title: "AI Analyzes the Diff",
    description: "TestForge reads the diff, understands the intent, and generates framework-compliant test files.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Review & Ship",
    description: "Browse generated tests in a split-panel viewer. Copy, integrate, and move on.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Three steps. Zero friction.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="p-8 rounded-lg bg-card border border-border transition-all duration-300 hover:border-primary/40 hover:glow-red h-full">
                <span className="font-mono text-xs text-primary/60">{step.number}</span>
                <div className="mt-4 mb-5 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
