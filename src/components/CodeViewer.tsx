import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const pythonCode = `import pytest
from app.services.auth import AuthService
from app.models.user import User

class TestLoginEndpoint:
    """Auto-generated tests for changes in auth/login.py"""

    def setup_method(self):
        self.auth = AuthService()
        self.test_user = User(
            email="dev@testforge.ai",
            password_hash="$2b$12$abc..."
        )

    def test_login_valid_credentials(self):
        result = self.auth.login(
            email="dev@testforge.ai",
            password="secure_pass_123"
        )
        assert result.status_code == 200
        assert "access_token" in result.json()

    def test_login_invalid_password(self):
        result = self.auth.login(
            email="dev@testforge.ai",
            password="wrong_password"
        )
        assert result.status_code == 401
        assert result.json()["error"] == "Invalid credentials"

    def test_login_rate_limiting(self):
        for _ in range(5):
            self.auth.login(
                email="dev@testforge.ai",
                password="wrong"
            )
        result = self.auth.login(
            email="dev@testforge.ai",
            password="secure_pass_123"
        )
        assert result.status_code == 429`;

const xmlCode = `<?xml version="1.0" encoding="UTF-8"?>
<testforge-config>
  <metadata>
    <repository>github.com/acme/backend</repository>
    <base-commit>a1b2c3d</base-commit>
    <head-commit>e4f5g6h</head-commit>
    <generated-at>2026-03-08T14:32:00Z</generated-at>
  </metadata>

  <test-suite name="auth_login_tests">
    <framework>pytest</framework>
    <target-file>app/services/auth/login.py</target-file>
    <coverage-estimate>87%</coverage-estimate>

    <test-cases count="3">
      <case name="test_login_valid_credentials"
            priority="critical"
            type="positive" />
      <case name="test_login_invalid_password"
            priority="high"
            type="negative" />
      <case name="test_login_rate_limiting"
            priority="medium"
            type="edge-case" />
    </test-cases>
  </test-suite>
</testforge-config>`;

type Tab = "python" | "xml";

const CodeViewer = () => {
  const [activeTab, setActiveTab] = useState<Tab>("python");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = activeTab === "python" ? pythonCode : xmlCode;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden glow-red">
        {/* Tab bar */}
        <div className="flex items-center gap-0 border-b border-border bg-secondary/50">
          <button
            onClick={() => setActiveTab("python")}
            className={`px-5 py-3 text-sm font-mono font-medium transition-colors relative ${
              activeTab === "python"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🐍 test_login.py
            {activeTab === "python" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("xml")}
            className={`px-5 py-3 text-sm font-mono font-medium transition-colors relative ${
              activeTab === "xml"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📄 config.xml
            {activeTab === "xml" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <div className="ml-auto pr-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary/40 animate-pulse-glow" />
            <span className="text-xs text-muted-foreground font-mono">AI Generated</span>
          </div>
        </div>

        {/* Code content */}
        <div className="overflow-auto max-h-[480px]">
          <pre className="p-5 text-sm leading-relaxed">
            <code className="font-mono text-secondary-foreground">
              {activeTab === "python" ? pythonCode : xmlCode}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeViewer;
