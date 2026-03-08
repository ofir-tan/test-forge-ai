import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, ArrowRight, Loader2, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const Generate = () => {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [baseCommit, setBaseCommit] = useState("");
  const [headCommit, setHeadCommit] = useState("");
  const [framework, setFramework] = useState("DVV-One");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!repoUrl.trim()) errs.repoUrl = "Repository URL is required";
    else if (!/^https?:\/\/.+\..+\/.+\/.+/.test(repoUrl.trim()))
      errs.repoUrl = "Enter a valid repository URL";
    if (!baseCommit.trim()) errs.baseCommit = "Base commit is required";
    else if (!/^[a-f0-9]{4,40}$/i.test(baseCommit.trim()))
      errs.baseCommit = "Enter a valid commit hash";
    if (!headCommit.trim()) errs.headCommit = "Head commit is required";
    else if (!/^[a-f0-9]{4,40}$/i.test(headCommit.trim()))
      errs.headCommit = "Enter a valid commit hash";
    if (baseCommit.trim() && headCommit.trim() && baseCommit.trim() === headCommit.trim())
      errs.headCommit = "Head commit must differ from base commit";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerate = async () => {
    if (!validate()) return;
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise((r) => setTimeout(r, 2500));
    navigate("/results", {
      state: {
        repoUrl: repoUrl.trim(),
        baseCommit: baseCommit.trim(),
        headCommit: headCommit.trim(),
        framework,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <GitBranch className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Generate Tests</h1>
            <p className="text-muted-foreground">
              Enter your repository details and commit range to generate tests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-card p-6 md:p-8 space-y-6"
          >
            {/* Repo URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Repository URL
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repo"
                className="w-full h-11 px-4 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                maxLength={500}
              />
              {errors.repoUrl && (
                <p className="text-xs text-destructive">{errors.repoUrl}</p>
              )}
            </div>

            {/* Commits row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Base Commit
                </label>
                <input
                  type="text"
                  value={baseCommit}
                  onChange={(e) => setBaseCommit(e.target.value)}
                  placeholder="a1b2c3d"
                  className="w-full h-11 px-4 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  maxLength={40}
                />
                {errors.baseCommit && (
                  <p className="text-xs text-destructive">{errors.baseCommit}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Head Commit
                </label>
                <input
                  type="text"
                  value={headCommit}
                  onChange={(e) => setHeadCommit(e.target.value)}
                  placeholder="e4f5g6h"
                  className="w-full h-11 px-4 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  maxLength={40}
                />
                {errors.headCommit && (
                  <p className="text-xs text-destructive">{errors.headCommit}</p>
                )}
              </div>
            </div>

            {/* Test Framework */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Test Framework
              </label>
              <div className="relative">
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full h-11 px-4 pr-10 rounded-md border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors appearance-none"
                >
                  <option value="DVV-One">DVV-One</option>
                  <option value="pytest">pytest</option>
                  <option value="JUnit">JUnit</option>
                  <option value="Mocha">Mocha</option>
                  <option value="Jest">Jest</option>
                  <option value="RSpec">RSpec</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-red-intense flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing diff & generating tests…
                </>
              ) : (
                <>
                  Generate Tests
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs text-muted-foreground mt-6 font-mono"
          >
            Supports GitHub, GitLab, and Bitbucket repositories
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Generate;
