import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, ShieldCheck, CheckCircle2, X, ArrowRight, Loader2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import mfcLogo from "@/assets/mfcentral-logo.png.asset.json";

export const Route = createFileRoute("/authenticate")({
  head: () => ({
    meta: [
      { title: "Authenticate via MF Central — ABC Finance" },
      { name: "description", content: "Securely verify your PAN and registered mobile number to fetch your mutual fund holdings via MF Central." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  const mobileValid = /^[6-9]\d{9}$/.test(mobile);
  const canSubmit = panValid && mobileValid && consent;

  const panError = pan.length > 0 && !panValid ? "Enter a valid PAN (e.g., ABCDE1234F)" : "";
  const mobileError = mobile.length > 0 && !mobileValid ? "Enter a valid 10-digit mobile number" : "";

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AppHeader />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex h-20 w-32 items-center justify-center overflow-hidden rounded-2xl bg-mfc shadow-sm">
          <img src={mfcLogo.url} alt="MF Central" className="h-full w-full object-contain" />
        </div>

        <h1 className="mt-6 text-center text-[28px] font-semibold tracking-tight text-foreground sm:text-[32px]">
          Access Your Mutual Fund Holdings
        </h1>
        <p className="mt-2 max-w-lg text-center text-[14px] leading-relaxed text-muted-foreground">
          Verify your PAN and registered mobile number to securely fetch your mutual fund portfolio through MF Central.
        </p>

        <section className="mt-8 w-full rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] sm:p-8">
          <div className="space-y-5">
            <Field
              label="PAN Number"
              hint="As per your mutual fund records"
              error={panError}
            >
              <input
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="ABCDE1234F"
                maxLength={10}
                className={`w-full rounded-lg border bg-card px-3.5 py-2.5 text-[14px] tracking-wider text-foreground placeholder:tracking-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  panError ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                }`}
              />
            </Field>

            <Field
              label="Registered Mobile Number"
              hint="OTP will be sent to this number"
              error={mobileError}
            >
              <div className="flex">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-secondary px-3 text-[13px] font-medium text-muted-foreground">
                  +91
                </span>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  inputMode="numeric"
                  className={`w-full rounded-r-lg border bg-card px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    mobileError ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
            </Field>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/50 p-3.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-input accent-primary"
              />
              <span className="text-[13px] leading-relaxed text-foreground">
                I authorize <span className="font-medium">MF Central</span> and <span className="font-medium">ABC Finance</span> to securely retrieve my mutual fund holdings for the purpose of evaluating my loan eligibility.
              </span>
            </label>

            <button
              onClick={() => setOtpOpen(true)}
              disabled={!canSubmit}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              Fetch My Holdings
              <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <TrustBadge icon={<Lock className="h-3.5 w-3.5" />} label="Secure Data Sharing" />
            <TrustBadge icon={<ShieldCheck className="h-3.5 w-3.5" />} label="RBI Compliant Lending" />
            <TrustBadge icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Read-Only Portfolio Access" />
          </div>
        </section>

        <p className="mt-6 max-w-md text-center text-[12px] leading-relaxed text-muted-foreground">
          By proceeding, you agree to our{" "}
          <a className="text-primary hover:underline" href="#">Terms of Service</a> and{" "}
          <a className="text-primary hover:underline" href="#">Privacy Policy</a>. Your data is encrypted end-to-end.
        </p>
      </main>

      {otpOpen && (
        <OtpModal
          mobile={mobile}
          onClose={() => setOtpOpen(false)}
          onVerified={() => {
            setOtpOpen(false);
            navigate({ to: "/fetching" });
          }}
        />
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-[13px] font-medium text-foreground">{label}</label>
        {hint && !error && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-destructive">{error}</p>}
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-success/10 text-success">
        {icon}
      </span>
      <span className="text-[12px] font-medium text-foreground">{label}</span>
    </div>
  );
}

function OtpModal({
  mobile,
  onClose,
  onVerified,
}: {
  mobile: string;
  onClose: () => void;
  onVerified: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const otp = digits.join("");
  const otpComplete = otp.length === 6;
  const last4 = useMemo(() => (mobile.length >= 4 ? mobile.slice(-4) : "4567"), [mobile]);

  const handleChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    setError("");
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = Array(6).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  const verify = () => {
    if (!otpComplete) return;
    setVerifying(true);
    setError("");
    setTimeout(() => {
      // Demo: any 6-digit OTP works except "000000"
      if (otp === "000000") {
        setVerifying(false);
        setError("Invalid OTP. Please try again.");
        return;
      }
      setVerifying(false);
      setSuccess(true);
      setTimeout(onVerified, 900);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-t-2xl border border-border bg-card p-6 shadow-xl sm:rounded-xl">
        {success ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-[18px] font-semibold text-foreground">Verification Successful</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Redirecting to your portfolio…</p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-foreground">Verify Mobile Number</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  We have sent a 6-digit OTP to your registered mobile number ending with{" "}
                  <span className="font-medium text-foreground">{last4}</span>.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  maxLength={1}
                  className={`h-12 w-full rounded-lg border bg-card text-center text-[18px] font-semibold text-foreground focus:outline-none focus:ring-2 ${
                    error ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                  }`}
                />
              ))}
            </div>

            {error && <p className="mt-3 text-[12px] text-destructive">{error}</p>}

            <button
              onClick={verify}
              disabled={!otpComplete || verifying}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {verifying && <Loader2 className="h-4 w-4 animate-spin" />}
              {verifying ? "Verifying…" : "Verify OTP"}
            </button>

            <div className="mt-4 flex items-center justify-between text-[12px]">
              <span className="text-muted-foreground">
                Didn't receive the code?
              </span>
              {countdown > 0 ? (
                <span className="font-medium text-muted-foreground">Resend in 0:{countdown.toString().padStart(2, "0")}</span>
              ) : (
                <button
                  onClick={() => {
                    setCountdown(30);
                    setDigits(Array(6).fill(""));
                    setError("");
                    refs.current[0]?.focus();
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
