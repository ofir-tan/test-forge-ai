import { motion } from "framer-motion";
import { Clock, Target, Ruler, Monitor, Search } from "lucide-react";

const benefits = [
  { icon: Clock, label: "Speed", desc: "Commit range to test files in seconds" },
  { icon: Target, label: "Relevance", desc: "Tests based on actual code changes" },
  { icon: Ruler, label: "Consistency", desc: "Same conventions, every time" },
  { icon: Monitor, label: "Zero Setup", desc: "Runs entirely in the browser" },
  { icon: Search, label: "Full Visibility", desc: "Review every file before integrating" },
];

const Benefits = () => {
  return (
    <section className="py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Benefits</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Built for velocity
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{b.label}</h3>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
