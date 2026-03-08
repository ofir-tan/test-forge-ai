import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, GitCommit, ExternalLink, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { useState } from "react";
import CodeViewer from "@/components/CodeViewer";
import Navbar from "@/components/Navbar";

interface LocationState {
  repoUrl: string;
  baseCommit: string;
  headCommit: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmitFeedback = () => {
    if (!rating && !feedback.trim()) return;
    // Placeholder — would send to backend
    setFeedbackSent(true);
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 px-6 text-center">
          <p className="text-muted-foreground mb-4">No results to display.</p>
          <button
            onClick={() => navigate("/generate")}
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Generate Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate("/generate")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to form
            </button>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Tests Generated{" "}
                <span className="text-primary">✓</span>
              </h1>
              <p className="text-muted-foreground">
                Your AI-generated test suite is ready to review.
              </p>
            </div>
          </motion.div>

          {/* Metadata bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-card p-4 mb-8 flex flex-wrap gap-x-8 gap-y-3 items-center font-mono text-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-foreground truncate max-w-[260px]">{state.repoUrl}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitCommit className="w-3.5 h-3.5" />
              <span className="text-foreground">{state.baseCommit.slice(0, 7)}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-foreground">{state.headCommit.slice(0, 7)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-primary font-medium">3 tests generated</span>
            </div>
          </motion.div>

          {/* Code viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CodeViewer />
          </motion.div>

          {/* Feedback box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 rounded-lg border border-border bg-card p-5"
          >
            {feedbackSent ? (
              <div className="text-center py-3">
                <p className="text-sm text-primary font-medium">Thanks for your feedback! 🎉</p>
                <p className="text-xs text-muted-foreground mt-1">Your input helps us improve test generation.</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground mb-3">
                  How was the generated output?
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setRating("up")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                      rating === "up"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful
                  </button>
                  <button
                    onClick={() => setRating("down")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                      rating === "down"
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    Needs work
                  </button>
                </div>
                <div className="flex gap-3">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Optional: Tell us what could be improved…"
                    rows={2}
                    maxLength={500}
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                  />
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={!rating && !feedback.trim()}
                    className="self-end px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/generate")}
              className="px-8 py-3 rounded-md border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Generate Again
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;
