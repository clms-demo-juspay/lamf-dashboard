import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Info,
  ArrowRight,
  ArrowLeft,
  Building2,
  Wallet,
  Loader2,
  FileText,
  Receipt,
  Minus,
  Equal,
  X,
  Lock,
  RefreshCw,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import mfCentralLogo from "@/assets/mfcentral-logo.png.asset.json";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review Charges & Confirm Pledge — ABC Finance" },
      {
        name: "description",
        content:
          "Review your sanction summary, applicable charges and confirm pledge to activate your Loan Against Mutual Funds account.",
      },
    ],
  }),
  component: ReviewPage,
});

interface SelectedFund {
  id: string;
  name: string;
  amc: string;
  amcBg: string;
  amcFg: string;
  nav: number;
  units: number;
  ltv: number;
}

const FALLBACK: SelectedFund[] = [
  { id: "sbi", name: "SBI Bluechip Fund Direct Growth", amc: "SBI", amcBg: "#22409A", amcFg: "#FFFFFF", nav: 91.15, units: 842, ltv: 0.5 },
  { id: "hdfc", name: "HDFC Balanced Advantage Fund Direct Growth", amc: "HDFC", amcBg: "#004C8F", amcFg: "#FFFFFF", nav: 62.8, units: 1256, ltv: 0.6 },
  { id: "icici", name: "ICICI Prudential Technology Fund Direct Growth", amc: "ICICI", amcBg: "#B02A30", amcFg: "#FFFFFF", nav: 214.3, units: 425, ltv: 0.45 },
  { id: "nippon", name: "Nippon India Small Cap Fund Direct Growth", amc: "NIP", amcBg: "#D71920", amcFg: "#FFFFFF", nav: 186.75, units: 680, ltv: 0.4 },
  { id: "uti", name: "UTI Mastershare Unit Scheme Direct Growth", amc: "UTI", amcBg: "#E11932", amcFg: "#FFFFFF", nav: 12.45, units: 3, ltv: 0.5 },
];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const CHARGES = [
  { label: "Stamp Duty", amount: 199, hint: "As per state stamp act" },
  { label: "Processing Fee", amount: 499, hint: "One-time fee for pledge processing" },
  { label: "GST on Processing Fee", amount: 90, hint: "18% GST as per GoI" },
  { label: "Pledge Creation Charges", amount: 59, hint: "Charged by RTA/Depository" },
];

function ReviewPage() {
  const navigate = useNavigate();
  const [funds, setFunds] = useState<SelectedFund[]>(FALLBACK);
  const [consents, setConsents] = useState({ c1: false, c2: false, c3: false });
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [otpOpen, setOtpOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lamf:selection");
      if (raw) {
        const parsed = JSON.parse(raw) as SelectedFund[];
        if (Array.isArray(parsed) && parsed.length > 0) setFunds(parsed);
      }
    } catch {}
  }, []);

  const totals = useMemo(() => {
    let portfolio = 0;
    let pledged = 0;
    let loan = 0;
    for (const f of funds) {
      const v = f.nav * f.units;
      portfolio += v;
      pledged += v;
      loan += v * f.ltv;
    }
    const ltv = pledged > 0 ? Math.round((loan / pledged) * 100) : 0;
    return { portfolio, pledged, loan, ltv };
  }, [funds]);

  const chargesTotal = CHARGES.reduce((s, c) => s + c.amount, 0);
  const netDisbursed = Math.max(0, totals.loan - chargesTotal);
  const allConsented = consents.c1 && consents.c2 && consents.c3;

  // Processing simulation
  useEffect(() => {
    if (!processing) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 1400));
    timers.push(setTimeout(() => setStep(2), 2800));
    timers.push(setTimeout(() => setStep(3), 4200));
    timers.push(setTimeout(() => setStep(4), 5600));
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(
            "lamf:activation",
            JSON.stringify({
              approvedLimit: totals.loan,
              portfolio: totals.portfolio,
              funds,
              charges: chargesTotal,
              activatedAt: new Date().toISOString(),
            }),
          );
        } catch {}
        navigate({ to: "/success" });
      }, 6600),
    );
    return () => timers.forEach(clearTimeout);
  }, [processing, navigate, totals.loan, totals.portfolio, funds, chargesTotal]);

  return (
    <div className="min-h-screen bg-background pb-36 font-sans antialiased">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go Back
              </Link>
              <span className="text-muted-foreground">·</span>
              <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                Step 3 of 4
              </p>
            </div>
            <h1 className="mt-1 text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
              Review Charges & Confirm Pledge
            </h1>
            <p className="mt-1 max-w-2xl text-[14px] text-muted-foreground">
              Please review the applicable charges and confirm your pledge request before activating
              your loan account.
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success sm:inline-flex">
            <ShieldCheck className="h-3 w-3" />
            Secure & RBI Compliant
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Sanction Summary */}
            <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-start justify-between gap-4 border-b border-border bg-gradient-to-br from-accent/60 to-card px-5 py-4">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-wide text-primary">
                    Sanction Summary
                  </p>
                  <p className="mt-1 text-[16px] font-semibold text-foreground">
                    Overdraft Against Mutual Funds
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Eligible Loan Amount
                  </p>
                  <p className="mt-0.5 text-[24px] font-semibold tabular-nums text-primary">
                    {inr(totals.loan)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-5 py-5 sm:grid-cols-3">
                <SummaryItem label="Approved LTV" value={`${totals.ltv}%`} />
                <SummaryItem label="Selected Mutual Funds" value={`${funds.length} Schemes`} />
                <SummaryItem label="Total Portfolio Value" value={inr(totals.portfolio)} />
                <SummaryItem label="Loan Type" value="Overdraft Against MF" />
                <SummaryItem label="Relationship Manager" value="Self-Service Digital" />
                <SummaryItem label="Tenure" value="12 months (auto-renew)" />
              </div>
            </section>

            {/* Pledged Holdings */}
            <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <h2 className="text-[15px] font-semibold text-foreground">Pledged Holdings</h2>
                <span className="text-[11px] text-muted-foreground">{funds.length} schemes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-2.5">Scheme</th>
                      <th className="px-3 py-2.5">Fund House</th>
                      <th className="px-3 py-2.5 text-right">Units</th>
                      <th className="px-3 py-2.5 text-right">Current Value</th>
                      <th className="px-5 py-2.5 text-right">Pledged Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((f) => {
                      const v = f.nav * f.units;
                      return (
                        <tr key={f.id} className="border-b border-border last:border-0">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2.5">
                              <AmcLogo fund={f} />
                              <span className="line-clamp-1 font-medium text-foreground">
                                {f.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-muted-foreground">{f.amc} MF</td>
                          <td className="px-3 py-3 text-right tabular-nums text-foreground">
                            {f.units.toLocaleString("en-IN")}
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums text-foreground">
                            {inr(v)}
                          </td>
                          <td className="px-5 py-3 text-right font-semibold tabular-nums text-foreground">
                            {inr(v)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-secondary/40 text-[12px]">
                      <td colSpan={3} className="px-5 py-3 font-medium text-muted-foreground">
                        Total Portfolio Value
                      </td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-foreground">
                        {inr(totals.portfolio)}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums text-foreground">
                        {inr(totals.pledged)}
                      </td>
                    </tr>
                    <tr className="bg-accent/40 text-[12px]">
                      <td colSpan={4} className="px-5 py-3 font-medium text-primary">
                        Eligible Drawing Power
                      </td>
                      <td className="px-5 py-3 text-right text-[14px] font-semibold tabular-nums text-primary">
                        {inr(totals.loan)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {/* Charges */}
            <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-start justify-between border-b border-border px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-primary" />
                    <h2 className="text-[15px] font-semibold text-foreground">Charges Deducted from Sanctioned Limit</h2>
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    No upfront payment required. These one-time charges will be auto-deducted from
                    your sanctioned loan limit at the time of activation.
                  </p>
                </div>
                <span className="rounded-md bg-success/10 px-2 py-1 text-[11px] font-medium text-success">
                  Zero Upfront Payment
                </span>
              </div>
              <div className="divide-y divide-border">
                {CHARGES.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between px-5 py-3 text-[13px]"
                  >
                    <div>
                      <p className="font-medium text-foreground">{c.label}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{c.hint}</p>
                    </div>
                    <p className="tabular-nums font-medium text-foreground">{inr(c.amount)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-border bg-secondary/40 px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-foreground">Total Deductible Charges</p>
                  <p className="text-[22px] font-semibold tabular-nums text-primary">
                    {inr(chargesTotal)}
                  </p>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Effective {((chargesTotal / Math.max(totals.loan, 1)) * 100).toFixed(2)}% of sanctioned limit
                </p>
              </div>
            </section>

            {/* Consents */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <h2 className="text-[15px] font-semibold text-foreground">Customer Consents</h2>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Please read and authorize the following to proceed.
              </p>
              <div className="mt-4 space-y-3">
                <Consent
                  checked={consents.c1}
                  onChange={(v) => setConsents((s) => ({ ...s, c1: v }))}
                >
                  I authorize creation of <a className="font-medium text-primary hover:underline" href="#">lien / pledge</a> on the selected mutual fund units with the RTA.
                </Consent>
                <Consent
                  checked={consents.c2}
                  onChange={(v) => setConsents((s) => ({ ...s, c2: v }))}
                >
                  I agree to the applicable <a className="font-medium text-primary hover:underline" href="#">charges and fees</a> being deducted from my sanctioned loan limit at activation.
                </Consent>
                <Consent
                  checked={consents.c3}
                  onChange={(v) => setConsents((s) => ({ ...s, c3: v }))}
                >
                  I have read and accepted the <a className="font-medium text-primary hover:underline" href="#">Loan Terms & Conditions</a> and <a className="font-medium text-primary hover:underline" href="#">Most Important Terms</a>.
                </Consent>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                Disbursal Summary
              </p>
              <div className="mt-4 space-y-3 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">Sanctioned Limit</span>
                  <span className="text-[13px] font-medium tabular-nums text-foreground">
                    {inr(totals.loan)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Minus className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Less: One-time Charges
                  </span>
                </div>
                <div className="space-y-1.5 rounded-md bg-secondary/40 px-3 py-2.5">
                  <Row label="Stamp Duty" value={inr(199)} muted />
                  <Row label="Processing Fee" value={inr(499)} muted />
                  <Row label="GST" value={inr(90)} muted />
                  <Row label="Pledge Creation" value={inr(59)} muted />
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-foreground">Total Deductions</span>
                    <span className="text-[13px] font-semibold tabular-nums text-foreground">
                      − {inr(chargesTotal)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Equal className="h-3 w-3 text-primary" />
                  <span className="text-[11px] font-medium uppercase tracking-wide text-primary">
                    Net Available to Use
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-accent/40 px-3 py-2.5">
                  <span className="text-[13px] font-semibold text-foreground">Disbursed Limit</span>
                  <span className="text-[18px] font-semibold tabular-nums text-primary">
                    {inr(netDisbursed)}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  No money debited from your bank. Charges are netted off your sanctioned limit at
                  activation.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <Info className="h-4 w-4 flex-shrink-0 text-blue-600" />
              <div className="text-[12px] leading-relaxed text-blue-900">
                <p className="font-semibold">Important</p>
                <p className="mt-1">
                  Your sanctioned limit will become available immediately after successful pledge
                  confirmation and lien marking by the RTA.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                <p className="text-[13px] font-semibold text-foreground">Why this is safe</p>
              </div>
              <ul className="mt-3 space-y-2 text-[12px] text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-success" />
                  Your units stay in your demat / folio.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-success" />
                  Only a lien is marked via the RTA — no transfer of ownership.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-success" />
                  Interest charged only on amount utilized.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="grid grid-cols-3 gap-6 lg:gap-10">
            <BarStat label="Sanctioned Amount" value={inr(totals.loan)} accent />
            <BarStat label="Less: Charges" value={`− ${inr(chargesTotal)}`} />
            <BarStat label="Net Disbursed" value={inr(netDisbursed)} accent />
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/eligibility"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              disabled={!allConsented}
              onClick={() => setOtpOpen(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              Confirm Pledge & Activate Loan
              <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
        {!allConsented && (
          <p className="border-t border-border bg-warning/5 px-4 py-1.5 text-center text-[11px] text-warning sm:px-6 lg:px-8">
            Please accept all consents to proceed.
          </p>
        )}
      </div>

      {/* MFCentral OTP modal */}
      {otpOpen && !processing && (
        <MFCentralOtpModal
          mobile="•••••• 8452"
          onClose={() => setOtpOpen(false)}
          onVerified={() => {
            setOtpOpen(false);
            setProcessing(true);
          }}
        />
      )}

      {/* Processing overlay */}
      {processing && <ProcessingOverlay step={step} />}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span
        className={`tabular-nums ${
          muted ? "text-[12px] text-muted-foreground" : "text-[13px] font-medium text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function BarStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-[16px] font-semibold tabular-nums sm:text-[18px] ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Consent({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
        checked ? "border-primary/40 bg-accent/40" : "border-border hover:bg-secondary/50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-input accent-primary"
      />
      <span className="text-[13px] leading-relaxed text-foreground">{children}</span>
    </label>
  );
}

function AmcLogo({ fund }: { fund: SelectedFund }) {
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-bold ring-1 ring-black/5"
      style={{
        backgroundColor: fund.amcBg || "#E5E7EB",
        color: fund.amcFg || "#111827",
      }}
      aria-label={fund.amc}
    >
      {fund.amc}
    </div>
  );
}

function MFCentralOtpModal({
  mobile,
  onClose,
  onVerified,
}: {
  mobile: string;
  onClose: () => void;
  onVerified: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const otp = digits.join("");
  const filled = otp.length === 6;

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    setError(null);
    if (clean && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  };

  const verify = () => {
    if (!filled || verifying) return;
    setVerifying(true);
    setError(null);
    setTimeout(() => {
      // demo: accept any 6 digits
      setVerifying(false);
      onVerified();
    }, 1200);
  };

  const resend = () => {
    if (seconds > 0) return;
    setSeconds(30);
    setDigits(["", "", "", "", "", ""]);
    setError(null);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative border-b border-border bg-gradient-to-br from-accent/60 to-card px-6 py-5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white p-1.5 ring-1 ring-black/5">
              <img
                src={mfCentralLogo.url}
                alt="MF Central"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Powered by MF Central
              </p>
              <h3 className="text-[16px] font-semibold text-foreground">
                Authorize Lien on Mutual Funds
              </h3>
            </div>
          </div>
          <p className="mt-3 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-2.5 text-[11.5px] leading-relaxed text-blue-900">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-600" />
            <span>
              MF Central (KFintech &amp; CAMS) will legally mark a lien on your selected schemes
              after OTP verification. Your units stay in your folio.
            </span>
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[13px] text-foreground">
            Enter the 6-digit OTP sent to your MF Central registered mobile
          </p>
          <p className="mt-1 text-[13px] font-semibold text-foreground">+91 {mobile}</p>

          <div className="mt-5 flex justify-between gap-2" onPaste={onPaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                disabled={verifying}
                className={`h-12 w-full rounded-lg border bg-background text-center text-[18px] font-semibold tabular-nums text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 ${
                  error ? "border-destructive" : "border-input"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="mt-2 text-[12px] font-medium text-destructive">{error}</p>
          )}

          <div className="mt-4 flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">
              {seconds > 0 ? (
                <>Resend OTP in <span className="font-medium text-foreground">{seconds}s</span></>
              ) : (
                "Didn't receive the OTP?"
              )}
            </span>
            <button
              onClick={resend}
              disabled={seconds > 0}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
            >
              <RefreshCw className="h-3 w-3" />
              Resend
            </button>
          </div>

          <button
            onClick={verify}
            disabled={!filled || verifying}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            {verifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying with MF Central…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Verify & Authorize Lien
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-success" />
            Secured by MF Central • RBI &amp; SEBI compliant
          </p>
        </div>
      </div>
    </div>
  );
}

function ProcessingOverlay({ step }: { step: number }) {
  const steps = [
    { label: "Charges Deducted", desc: "₹847 netted off from sanctioned limit", icon: Wallet },
    { label: "Pledge Request Submitted", desc: "Forwarded to RTA (KFintech/CAMS)", icon: FileText },
    { label: "Mutual Fund Lien Created", desc: "Lien marked on selected schemes", icon: ShieldCheck },
    { label: "Overdraft Account Activated", desc: "Loan limit ready to use", icon: Building2 },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in">
        <div className="border-b border-border bg-gradient-to-br from-accent/60 to-card px-6 py-5">
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-[12px] font-medium uppercase tracking-wide">Processing</p>
          </div>
          <h3 className="mt-1 text-[18px] font-semibold text-foreground">
            Creating your pledge & activating account
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Please do not close or refresh this window.
          </p>
        </div>
        <div className="px-6 py-5">
          <ol className="space-y-4">
            {steps.map((s, i) => {
              const done = i < step;
              const active = i === step;
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      done
                        ? "bg-success text-white"
                        : active
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p
                      className={`text-[14px] font-medium ${
                        done || active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{s.desc}</p>
                  </div>
                  {done && (
                    <span className="mt-1 text-[11px] font-medium text-success">Completed</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}