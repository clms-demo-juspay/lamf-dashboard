import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Wallet,
  FileText,
  Layers,
  TrendingUp,
  Star,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Loan Activated — ABC Finance" },
      {
        name: "description",
        content:
          "Your Loan Against Mutual Funds account is now active. Start drawing funds instantly.",
      },
    ],
  }),
  component: SuccessPage,
});

interface SelectedFund {
  id: string;
  name: string;
  amc: string;
  nav: number;
  units: number;
  ltv: number;
}

interface Activation {
  approvedLimit: number;
  portfolio: number;
  funds: SelectedFund[];
  charges: number;
  activatedAt: string;
}

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const FALLBACK: Activation = {
  approvedLimit: 500000,
  portfolio: 1000000,
  funds: [],
  charges: 847,
  activatedAt: new Date().toISOString(),
};

function SuccessPage() {
  const [data, setData] = useState<Activation>(FALLBACK);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lamf:activation");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const accountNo = "LAMF00000005477";
  const ltv = data.portfolio > 0 ? Math.round((data.approvedLimit / data.portfolio) * 100) : 50;
  const totalUnits = useMemo(
    () => data.funds.reduce((s, f) => s + f.units, 0),
    [data.funds],
  );
  const activatedDate = new Date(data.activatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const copyAccount = () => {
    navigator.clipboard.writeText(accountNo).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32 font-sans antialiased">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-success/10 via-card to-accent/40 px-6 py-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-success via-primary to-success" />
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/20" />
            <span className="absolute inset-2 animate-pulse rounded-full bg-success/30" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[12px] font-medium text-success">
            <Sparkles className="h-3 w-3" />
            Loan Successfully Activated
          </div>
          <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-foreground sm:text-[32px]">
            Congratulations, Rahul!
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-[14px] text-muted-foreground">
            Your Loan Against Mutual Funds account is now active. You can start drawing funds
            instantly using your approved overdraft limit.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Loan Account No.
              </p>
              <p className="text-[15px] font-semibold tabular-nums tracking-wider text-foreground">
                {accountNo}
              </p>
            </div>
            <button
              onClick={copyAccount}
              className="ml-2 inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1.5 text-[11px] font-medium text-primary hover:bg-accent"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: account + portfolio + utilisation + actions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Account Details */}
            <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-start justify-between border-b border-border bg-gradient-to-br from-primary to-primary/80 px-5 py-5 text-primary-foreground">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-wide opacity-90">
                    Overdraft Against Mutual Funds
                  </p>
                  <p className="mt-1 text-[13px] opacity-90 tabular-nums tracking-wider">
                    {accountNo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide opacity-90">Approved Limit</p>
                  <p className="mt-0.5 text-[24px] font-semibold tabular-nums">
                    {inr(data.approvedLimit)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-5 py-5 sm:grid-cols-3">
                <DetailItem label="Available Limit" value={inr(data.approvedLimit)} accent />
                <DetailItem label="Drawing Power" value={inr(data.approvedLimit)} />
                <DetailItem label="Interest Rate" value="10.25% p.a." />
                <DetailItem label="Interest Type" value="Daily Reducing Balance" />
                <DetailItem label="Activation Date" value={activatedDate} />
                <DetailItem label="Tenure" value="12 months (auto-renew)" />
              </div>
            </section>

            {/* Portfolio */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-foreground">Portfolio Summary</h2>
                <Link to="/eligibility" className="text-[12px] font-medium text-primary hover:underline">
                  View pledged funds →
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                <Kpi label="Portfolio Value" value={inr(data.portfolio)} icon={<Wallet className="h-4 w-4" />} />
                <Kpi
                  label="Units Pledged"
                  value={totalUnits > 0 ? totalUnits.toLocaleString("en-IN") : "4,523"}
                  icon={<Layers className="h-4 w-4" />}
                />
                <Kpi
                  label="Fund Schemes"
                  value={String(data.funds.length || 5)}
                  icon={<Layers className="h-4 w-4" />}
                />
                <Kpi label="Margin Available" value={`${ltv}%`} icon={<ShieldCheck className="h-4 w-4" />} />
                <Kpi label="LTV" value={`${ltv}%`} icon={<TrendingUp className="h-4 w-4" />} accent />
              </div>
            </section>

            {/* Utilisation Example */}
            <section className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <h2 className="text-[15px] font-semibold text-foreground">
                You only pay for what you use
              </h2>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Interest is charged on a daily reducing balance — only on the amount you actually
                withdraw.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <UtilCard label="Approved Limit" value={inr(data.approvedLimit)} tone="muted" />
                <UtilCard label="If you use" value={inr(100000)} tone="warning" />
                <UtilCard label="Interest charged on" value={inr(100000)} tone="primary" />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <div className="flex h-3 w-full">
                  <div className="h-full bg-primary" style={{ width: "20%" }} />
                  <div className="h-full bg-secondary" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>Utilised {inr(100000)} (20%)</span>
                <span>Unused {inr(400000)}</span>
              </div>
              <p className="mt-3 text-[12px] text-muted-foreground">
                <span className="font-medium text-foreground">No interest</span> on the unused
                ₹4,00,000. Pay any amount, any time — no foreclosure charges.
              </p>
            </section>

            {/* Next Actions */}
            <section>
              <h2 className="text-[15px] font-semibold text-foreground">What would you like to do next?</h2>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ActionCard
                  title="Withdraw Funds"
                  desc="Transfer money to your bank instantly via IMPS/RTGS."
                  icon={<Wallet className="h-5 w-5" />}
                  primary
                />
                <ActionCard
                  title="View Loan Statement"
                  desc="Track utilisation, interest and repayments."
                  icon={<FileText className="h-5 w-5" />}
                />
                <ActionCard
                  title="Manage Pledged Funds"
                  desc="View and unpledge mutual fund holdings."
                  icon={<ShieldCheck className="h-5 w-5" />}
                />
                <ActionCard
                  title="Increase Limit"
                  desc="Pledge additional holdings to grow your limit."
                  icon={<TrendingUp className="h-5 w-5" />}
                />
              </div>
            </section>
          </div>

          {/* Right: feedback + important info */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <h3 className="text-[14px] font-semibold text-foreground">How was your experience?</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Your feedback helps us improve.
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    className="rounded-md p-1 transition-transform hover:scale-110"
                    aria-label={`${n} stars`}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        n <= rating
                          ? "fill-warning text-warning"
                          : "fill-secondary text-border"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-[12px] font-medium text-foreground">
                    {rating} / 5
                  </span>
                )}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what we can improve."
                rows={3}
                className="mt-3 w-full rounded-lg border border-input bg-card px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                disabled={rating === 0}
                className="mt-3 w-full rounded-lg bg-primary py-2 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                Submit Feedback
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <h3 className="text-[14px] font-semibold text-foreground">Important Information</h3>
              <ul className="mt-3 space-y-2.5 text-[12px] text-muted-foreground">
                <Info text="Interest is charged only on the amount you utilise — not on the sanctioned limit." />
                <Info text="You may repay partially or fully at any time, with no foreclosure charges." />
                <Info text="Additional mutual funds can be pledged later to increase your limit." />
                <Info text="Margin calls may apply if portfolio value falls below required thresholds." />
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-[12px] text-muted-foreground">
              Need help? Call{" "}
              <span className="font-medium text-foreground">1800-123-4567</span> or email{" "}
              <span className="font-medium text-foreground">lamf@abcfinance.in</span>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky bottom actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            All limits & lien marking confirmed by RTA.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/eligibility"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-[13px] font-medium text-muted-foreground hover:text-foreground"
            >
              View Loan Dashboard
            </Link>
            <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary">
              <Download className="h-4 w-4" />
              Download Sanction Letter
            </button>
            <button className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Start Using Loan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 text-[14px] font-semibold tabular-nums ${
          accent ? "text-success" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Kpi({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className={`flex items-center gap-1.5 ${accent ? "text-primary" : "text-muted-foreground"}`}>
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p
        className={`mt-1.5 text-[15px] font-semibold tabular-nums ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function UtilCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "muted" | "warning" | "primary";
}) {
  const styles = {
    muted: "border-border bg-secondary/40 text-foreground",
    warning: "border-warning/30 bg-warning/10 text-foreground",
    primary: "border-primary/30 bg-accent/40 text-primary",
  } as const;
  return (
    <div className={`rounded-lg border p-4 ${styles[tone]}`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-[20px] font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  icon,
  primary,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      className={`group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
        primary
          ? "border-primary/40 bg-accent/30"
          : "border-border bg-card"
      }`}
    >
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
          primary ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-foreground">{title}</p>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}

function Info({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />
      <span>{text}</span>
    </li>
  );
}