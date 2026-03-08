// ============================================================
// API Service — TestForge AI
// Uncomment and update BASE_URL when backend is ready.
// ============================================================

// const BASE_URL = "https://your-api-url.com/api";

// ----------------------------------------------------------
// POST /generate — Submit a new test generation job
// ----------------------------------------------------------
// interface GenerateRequest {
//   repoUrl: string;
//   baseCommit: string;
//   headCommit: string;
//   framework: string;
// }
//
// interface GenerateResponse {
//   id: string;
//   status: "running" | "completed" | "failed";
// }
//
// export async function generateTests(data: GenerateRequest): Promise<GenerateResponse> {
//   const res = await fetch(`${BASE_URL}/generate`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error(`Generate failed: ${res.statusText}`);
//   return res.json();
// }

// ----------------------------------------------------------
// GET /results/:id — Fetch generated test results
// ----------------------------------------------------------
// interface TestResult {
//   id: string;
//   repoUrl: string;
//   baseCommit: string;
//   headCommit: string;
//   framework: string;
//   status: "completed" | "running" | "failed";
//   testsCount: number;
//   coverage: string;
//   pythonCode: string;
//   xmlConfig: string;
//   createdAt: string;
// }
//
// export async function getTestResult(id: string): Promise<TestResult> {
//   const res = await fetch(`${BASE_URL}/results/${id}`);
//   if (!res.ok) throw new Error(`Fetch result failed: ${res.statusText}`);
//   return res.json();
// }

// ----------------------------------------------------------
// GET /history — Fetch all generated test runs
// ----------------------------------------------------------
// export async function getTestHistory(): Promise<TestResult[]> {
//   const res = await fetch(`${BASE_URL}/history`);
//   if (!res.ok) throw new Error(`Fetch history failed: ${res.statusText}`);
//   return res.json();
// }

// ----------------------------------------------------------
// POST /feedback — Submit feedback for a generation
// ----------------------------------------------------------
// interface FeedbackRequest {
//   generationId: string;
//   rating: "up" | "down" | null;
//   comment: string;
// }
//
// export async function submitFeedback(data: FeedbackRequest): Promise<void> {
//   const res = await fetch(`${BASE_URL}/feedback`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error(`Feedback submit failed: ${res.statusText}`);
// }
