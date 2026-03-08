import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GitCommit, ExternalLink, Clock, FlaskConical, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

interface TestRun {
  id: string;
  repoUrl: string;
  baseCommit: string;
  headCommit: string;
  testsCount: number;
  coverage: string;
  createdAt: string;
  status: "completed" | "running" | "failed";
}

const dummyRuns: TestRun[] = [
  {
    id: "1",
    repoUrl: "https://github.com/acme/backend",
    baseCommit: "a1b2c3d",
    headCommit: "e4f5g6h",
    testsCount: 3,
    coverage: "87%",
    createdAt: "2026-03-08T14:32:00Z",
    status: "completed",
  },
  {
    id: "2",
    repoUrl: "https://github.com/acme/frontend",
    baseCommit: "f8a9b0c",
    headCommit: "d1e2f3a",
    testsCount: 7,
    coverage: "92%",
    createdAt: "2026-03-07T10:15:00Z",
    status: "completed",
  },
  {
    id: "3",
    repoUrl: "https://github.com/acme/api-gateway",
    baseCommit: "1a2b3c4",
    headCommit: "5d6e7f8",
    testsCount: 5,
    coverage: "78%",
    createdAt: "2026-03-06T18:45:00Z",
    status: "completed",
  },
  {
    id: "4",
    repoUrl: "https://github.com/acme/ml-pipeline",
    baseCommit: "9g8h7i6",
    headCommit: "3j2k1l0",
    testsCount: 0,
    coverage: "—",
    createdAt: "2026-03-06T09:20:00Z",
    status: "failed",
  },
];

const statusStyles: Record<TestRun["status"], string> = {
  completed: "bg-primary/10 text-primary border-primary/20",
  running: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function repoName(url: string) {
  const parts = url.replace(/\/$/, "").split("/");
  return parts.slice(-2).join("/");
}

const Dashboard = () => {
  const navigate = useNavigate();

  // TODO: Replace dummyRuns with real API call when backend is ready:
  // import { getTestHistory } from "@/lib/api";
  // const [runs, setRuns] = useState<TestRun[]>([]);
  // useEffect(() => { getTestHistory().then(setRuns); }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Generation History</h1>
              <p className="text-muted-foreground">
                Browse all generated test suites.
              </p>
            </div>
            <button
              onClick={() => navigate("/generate")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-red-intense shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Generation
            </button>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-card overflow-hidden"
          >
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[1fr_140px_100px_100px_100px] gap-4 px-5 py-3 border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <span>Repository</span>
              <span>Commits</span>
              <span>Tests</span>
              <span>Coverage</span>
              <span>Status</span>
            </div>

            {dummyRuns.map((run, i) => (
              <motion.div
                key={run.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={() =>
                  run.status === "completed"
                    ? navigate("/results", {
                        state: {
                          repoUrl: run.repoUrl,
                          baseCommit: run.baseCommit,
                          headCommit: run.headCommit,
                        },
                      })
                    : undefined
                }
                className={`grid grid-cols-1 md:grid-cols-[1fr_140px_100px_100px_100px] gap-2 md:gap-4 px-5 py-4 border-b border-border last:border-b-0 transition-colors ${
                  run.status === "completed"
                    ? "hover:bg-secondary/50 cursor-pointer"
                    : "opacity-60"
                }`}
              >
                {/* Repo */}
                <div className="flex items-center gap-2 min-w-0">
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm text-foreground truncate">
                    {repoName(run.repoUrl)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto md:ml-2 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(run.createdAt)}
                  </span>
                </div>

                {/* Commits */}
                <div className="flex items-center gap-1.5 font-mono text-sm">
                  <GitCommit className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{run.baseCommit.slice(0, 7)}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-foreground">{run.headCommit.slice(0, 7)}</span>
                </div>

                {/* Tests count */}
                <div className="flex items-center gap-1.5 font-mono text-sm">
                  <FlaskConical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{run.testsCount}</span>
                </div>

                {/* Coverage */}
                <div className="font-mono text-sm text-foreground">
                  {run.coverage}
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[run.status]}`}
                  >
                    {run.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
