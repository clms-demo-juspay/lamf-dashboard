import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function AppHeader() {
  const { location } = useRouterState();
  const steps = [
    { path: "/authenticate", label: "Authenticate" },
    { path: "/fetching", label: "Fetch Holdings" },
    { path: "/eligibility", label: "Select & Pledge" },
    { path: "/review", label: "Confirm & Pay" },
    { path: "/success", label: "Activated" },
  ];
  let activeIdx = Math.max(
    0,
    steps.findIndex((s) => s.path === location.pathname),
  );
  if (location.pathname === "/success") activeIdx = 4;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">ABC Finance</span>
            <span className="text-[11px] text-muted-foreground">Loan Against Mutual Funds</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {steps.map((s, i) => {
            const active = i === activeIdx;
            const done = i < activeIdx;
            return (
              <div key={s.path} className="flex items-center gap-1">
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-accent text-accent-foreground"
                      : done
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  {s.label}
                </div>
                {i < steps.length - 1 && <span className="h-px w-6 bg-border" />}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-[12px] font-medium text-muted-foreground sm:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          RBI Compliant • 256-bit Encrypted
        </div>
      </div>
    </header>
  );
}