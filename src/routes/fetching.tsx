import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, User, Building2, Wallet } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/fetching")({
  head: () => ({
    meta: [
      { title: "Fetching Holdings — ABC Finance" },
      { name: "description", content: "Securely retrieving your mutual fund holdings from MF Central." },
    ],
  }),
  component: FetchingPage,
});

const STEPS = [
  "Identity Verified",
  "Mobile Verified",
  "MF Central Connected",
  "Fetching Portfolio Holdings",
  "Evaluating Eligible Funds",
  "Calculating Drawing Power",
];

function FetchingPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const total = 5500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / total) * 100);
      setProgress(p);
      if (elapsed >= total) {
        clearInterval(interval);
        setTimeout(() => navigate({ to: "/eligibility" }), 350);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [navigate]);

  const activeStep = Math.min(STEPS.length, Math.floor((progress / 100) * STEPS.length));

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AppHeader />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        <section className="w-full rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] sm:p-8">
          {/* Connection visual */}
          <div className="relative flex items-center justify-between rounded-xl bg-gradient-to-b from-secondary/60 to-card px-2 py-6 sm:px-6">
            <Node icon={<User className="h-5 w-5" />} label="You" />
            <Pipe />
            <Node icon={<Building2 className="h-5 w-5" />} label="MF Central" highlight />
            <Pipe />
            <Node icon={<Wallet className="h-5 w-5" />} label="ABC Finance" />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-[20px] font-semibold text-foreground sm:text-[22px]">
              Fetching your mutual fund investments
            </h1>
            <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-muted-foreground">
              Please wait while we securely retrieve your holdings and calculate your eligible loan amount.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-[12px] font-medium">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-secondary/30">
            {STEPS.map((label, i) => {
              const done = i < activeStep;
              const current = i === activeStep && progress < 100;
              return (
                <li key={label} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      done
                        ? "bg-success/10 text-success"
                        : current
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : current ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <span
                    className={`text-[13px] ${
                      done ? "text-foreground" : current ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="mt-5 text-center text-[12px] text-muted-foreground">
          🔒 End-to-end encrypted • Powered by MF Central
        </p>
      </main>
    </div>
  );
}

function Node({ icon, label, highlight }: { icon: React.ReactNode; label: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border ${
          highlight
            ? "border-primary/30 bg-card text-primary shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
            : "border-border bg-card text-foreground"
        }`}
      >
        {icon}
      </div>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function Pipe() {
  return (
    <div className="relative mx-2 h-px flex-1 overflow-hidden bg-border">
      <div className="absolute inset-y-0 left-0 w-12 animate-[slide_1.4s_linear_infinite] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <style>{`@keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(600%); } }`}</style>
    </div>
  );
}