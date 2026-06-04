import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  Wallet,
  CreditCard,
  ShoppingBag,
  Plane,
  Receipt,
  CheckCircle2,
  TrendingDown,
  Smartphone,
  FileCheck,
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import { QrCode, PartyPopper, ListChecks, FileSignature, KeyRound } from "lucide-react";
import { HeartPulse, GraduationCap, Home, Stethoscope, Gift, Briefcase } from "lucide-react";
import { TrendingUp } from "lucide-react";
import heroIllustration from "@/assets/hero-credit-upi.png";
import juspayLogo from "@/assets/juspay-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Credit Line on UPI Against Mutual Funds — ABC Finance" },
      {
        name: "description",
        content:
          "Borrow against your mutual funds at just 12.99% p.a. Spend instantly on UPI — your investments stay invested and keep growing. 100% digital, no income proof needed. Powered by Juspay.",
      },
      { property: "og:title", content: "Credit Line on UPI Against Mutual Funds — ABC Finance" },
      {
        property: "og:description",
        content:
          "Borrow against your mutual funds at 12.99% p.a. Spend instantly on UPI. Your investments keep growing.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <LandingHeader />
      <Hero />
      <Comparison />
      <ValueProp />
      <UseCases />
      <HowItWorks />
      <WhyChoose />
      <FAQ />
      <Footer />
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">ABC Finance</span>
            <span className="text-[11px] text-muted-foreground">Credit Line on UPI · LAMF</span>
          </div>
        </Link>

        <Link
          to="/authenticate"
          className="hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex"
        >
          Get Started <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/60 via-background to-background" />
        <div className="absolute right-[-15%] top-[-25%] -z-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-20%] -z-10 h-[360px] w-[360px] rounded-full bg-success/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
          {/* Left: copy */}
          <div className="flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-semibold text-foreground shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)]">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Powered by
              </span>
              <span className="h-3.5 w-px bg-border" />
              <img
                src={juspayLogo.url}
                alt="Juspay"
                width={80}
                height={22}
                className="h-5 w-auto"
              />
            </span>

            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[12px] font-semibold text-success">
              <Sparkles className="h-3.5 w-3.5" />
              Starting at just 12.99% p.a.
            </span>

            <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[56px] lg:text-[64px]">
              Credit Line on <span className="text-primary">UPI</span> Against Your Mutual Funds
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              100% digital process <span className="text-border">|</span> No income proof needed{" "}
              <span className="text-border">|</span> Keep your investments growing
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/authenticate"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-primary to-primary/80 px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-all hover:shadow-[0_14px_36px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
              >
                <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                Check Your Credit Limit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-success">
                <span className="text-success">✦</span> No impact on your CIBIL score{" "}
                <span className="text-success">✦</span>
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[12px] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              RBI Compliant <span className="text-border">•</span> Bank-grade security
            </div>
          </div>

          {/* Right: hero illustration */}
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_70%)]" />
            {/* Floating chips */}
            <FloatingChip className="left-2 top-6 hidden sm:flex" tint="bg-rose-100 text-rose-700">
              <Wallet className="h-3.5 w-3.5" /> Emergency Fund
            </FloatingChip>
            <FloatingChip
              className="right-2 top-16 hidden sm:flex"
              tint="bg-sky-100 text-sky-700"
            >
              <Plane className="h-3.5 w-3.5" /> Travel
            </FloatingChip>
            <FloatingChip
              className="left-6 bottom-10 hidden sm:flex"
              tint="bg-amber-100 text-amber-700"
            >
              <Receipt className="h-3.5 w-3.5" /> Bill Payments
            </FloatingChip>
            <FloatingChip
              className="right-6 bottom-20 hidden sm:flex"
              tint="bg-emerald-100 text-emerald-700"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Shopping
            </FloatingChip>

            <img
              src={heroIllustration}
              alt="Credit Line on UPI illustration"
              width={1024}
              height={1024}
              className="relative w-full max-w-[520px] drop-shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
            />
          </div>
        </div>
      </section>

    </>
  );
}

function FloatingChip({
  children,
  className = "",
  tint,
}: {
  children: ReactNode;
  className?: string;
  tint: string;
}) {
  return (
    <span
      className={`absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-[11px] font-semibold shadow-[0_8px_20px_-8px_rgba(15,23,42,0.18)] ${tint} ${className}`}
    >
      {children}
    </span>
  );
}

function Comparison() {
  const rows = [
    { name: "ABC Finance CLOU Against Mutual Funds", rate: "12.99%", highlight: true },
    { name: "Personal Loan", rate: "14% – 20%" },
    { name: "Credit Card", rate: "24% – 36%" },
    { name: "Selling Your Mutual Funds", rate: "Loss of future returns" },
  ];
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Compare & save"
          title="Lowest cost of credit, by design"
          subtitle="See how borrowing against your mutual funds compares to the alternatives."
        />

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-secondary/60 text-[12px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold sm:px-6">Credit Product</th>
                <th className="px-4 py-3 text-right font-semibold sm:px-6">Interest Rate (p.a.)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.name}
                  className={`border-t border-border ${
                    r.highlight ? "bg-success/8" : ""
                  }`}
                  style={r.highlight ? { backgroundColor: "color-mix(in oklab, var(--success) 8%, transparent)" } : undefined}
                >
                  <td className="px-4 py-4 font-medium text-foreground sm:px-6">
                    <div className="flex items-center gap-2">
                      {r.highlight && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                      )}
                      <span className={r.highlight ? "font-semibold" : ""}>{r.name}</span>
                      {r.highlight && (
                        <span className="ml-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 text-right tabular-nums sm:px-6 ${
                      r.highlight ? "font-semibold text-success" : "text-foreground"
                    }`}
                  >
                    {r.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-center text-[13px] italic text-muted-foreground">
          Why redeem your investments when you can borrow against them?
        </p>
      </div>
    </section>
  );
}

function ValueProp() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-background via-accent/20 to-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The smarter way"
          title="Your mutual funds. Your credit line. Both, at the same time."
          subtitle="Unlock liquidity without disturbing your long-term wealth — the best of both worlds."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-xl sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-success/10 blur-2xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="relative mt-5 text-[20px] font-semibold text-foreground">
              Pledge mutual funds as collateral
            </h3>
            <p className="relative mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Your mutual funds stay invested in the market and keep earning returns. You only
              pledge them as security — no redemption, no exit loads, no capital gains tax.
            </p>
            <ul className="relative mt-5 space-y-2 text-[13px] text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> SIPs continue uninterrupted</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> NAV growth stays yours</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Dividends keep flowing in</li>
            </ul>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-xl sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="relative mt-5 text-[20px] font-semibold text-foreground">
              Spend via UPI, instantly
            </h3>
            <p className="relative mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Your credit line goes live on your favourite UPI app — powered by Juspay. Scan any
              QR, pay any merchant, and pay interest only on what you actually use.
            </p>
            <ul className="relative mt-5 space-y-2 text-[13px] text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Works on GPay, PhonePe, Paytm & more</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Interest only on usage</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Flexible repayment, anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const items = [
    {
      icon: <HeartPulse className="h-7 w-7" />,
      title: "Emergency Fund",
      desc: "Tap into instant liquidity for medical or urgent needs — without redeeming your investments.",
      tag: "Instant",
      gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
      ring: "ring-rose-200/60",
    },
    {
      icon: <Home className="h-7 w-7" />,
      title: "Home Renovation",
      desc: "Upgrade your home today, repay at your pace — only on what you use.",
      tag: "Flexible",
      gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
      ring: "ring-amber-200/60",
    },
    {
      icon: <Briefcase className="h-7 w-7" />,
      title: "Business Cash Flow",
      desc: "Bridge working capital gaps and pay vendors instantly via UPI.",
      tag: "On-demand",
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      ring: "ring-emerald-200/60",
    },
    {
      icon: <CreditCard className="h-7 w-7" />,
      title: "Credit Card Bill Payoff",
      desc: "Clear high-cost credit card dues at a fraction of the interest rate.",
      tag: "Save big",
      gradient: "from-fuchsia-500/15 via-fuchsia-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
      ring: "ring-fuchsia-200/60",
    },
  ];
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 via-background to-secondary/30 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(ellipse_at_center,theme(colors.primary/12),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Built for real life"
          title="One credit line. Every moment that matters."
          subtitle="From emergencies to celebrations — unlock the value of your mutual funds and pay any UPI QR, instantly."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ${it.iconBg} ${it.ring} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
                >
                  {it.icon}
                </div>
                <span className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                  {it.tag}
                </span>
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Pay via UPI <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> Funds in 5 minutes</span>
          <span className="inline-flex items-center gap-1.5"><IndianRupee className="h-3.5 w-3.5 text-primary" /> Interest only on usage</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Your MFs stay invested</span>
          <span className="inline-flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-primary" /> Pay any UPI QR</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <TrendingDown className="h-5 w-5" />,
      title: "Check Eligible Limit",
      desc: "Link your mutual fund portfolio and instantly view your pre-approved credit limit.",
      visual: <VisualCreditLimit />,
    },
    {
      icon: <FileSignature className="h-5 w-5" />,
      title: "Pledge Digitally",
      desc: "Select the mutual funds you wish to pledge as collateral — fully digital, zero paperwork.",
      visual: <VisualSelectFunds />,
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Activate on UPI",
      desc: "Your credit line goes live on your favourite UPI app, powered by Juspay.",
      visual: <VisualVerifyPledge />,
    },
    {
      icon: <QrCode className="h-5 w-5" />,
      title: "Spend & Repay",
      desc: "Pay any UPI QR, repay flexibly. Your mutual funds stay invested throughout.",
      visual: <VisualActivateUpi />,
    },
  ];
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Get a UPI credit line against your mutual funds in 4 simple steps"
          subtitle="A seamless flow for existing customers — from portfolio assessment to UPI activation."
        />
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                  {s.icon}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-5">{s.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualCreditLimit() {
  return (
    <div className="rounded-lg border border-border bg-gradient-to-br from-success/8 to-accent/40 p-3">
      <div className="flex items-start gap-2 rounded-md bg-card p-2.5 shadow-sm">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
          <PartyPopper className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-foreground">Congratulations!</p>
          <p className="text-[10px] leading-snug text-muted-foreground">
            Your portfolio unlocks a credit limit of
          </p>
          <p className="mt-0.5 whitespace-nowrap text-[14px] font-semibold tabular-nums text-success">₹10,00,000</p>
        </div>
      </div>
    </div>
  );
}

function VisualSelectFunds() {
  const funds = [
    { name: "ICICI Mid Cap Fund", value: "₹82,400", checked: true },
    { name: "HDFC Large Cap Fund", value: "₹64,150", checked: true },
    { name: "Axis Bluechip Fund", value: "₹41,900", checked: false },
  ];
  return (
    <div className="rounded-lg border border-border bg-card p-2.5">
      {funds.map((f, i) => (
        <div
          key={f.name}
          className={`flex items-center gap-2 py-1.5 ${i > 0 ? "border-t border-border/60" : ""}`}
        >
          <span
            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
              f.checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {f.checked && <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} />}
          </span>
          <span className="flex-1 truncate text-[10px] font-medium text-foreground">{f.name}</span>
          <span className="text-[10px] tabular-nums text-muted-foreground">{f.value}</span>
        </div>
      ))}
    </div>
  );
}

function VisualVerifyPledge() {
  const steps = [
    { label: "Confirm Funds", done: true },
    { label: "OTP Verification", done: true },
    { label: "E-Sign Agreement", done: false },
  ];
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                s.done ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {s.done ? <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} /> : <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />}
            </span>
            <span
              className={`text-[10px] font-medium ${
                s.done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualActivateUpi() {
  return (
    <div className="rounded-lg border border-border bg-gradient-to-br from-primary/8 to-accent/40 p-3">
      <div className="mx-auto w-full max-w-[140px] rounded-md bg-card p-2.5 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          <span className="text-[10px] font-semibold text-foreground">UPI Credit Line Activated</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 rounded-md bg-accent/60 p-2">
          <QrCode className="h-7 w-7 text-primary" />
          <button className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

function WhyChoose() {
  const items = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Mutual Funds Stay Invested",
      desc: "Your portfolio keeps earning market returns while you borrow against it.",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Instant UPI Spending",
      desc: "Scan any QR, pay any merchant — your credit line works on every UPI app.",
    },
    {
      icon: <FileCheck className="h-5 w-5" />,
      title: "Zero Paperwork",
      desc: "Fully digital pledge and KYC. Activate in minutes, not days.",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Pay Only on Usage",
      desc: "Interest only on what you actually spend — nothing more.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Powered by Juspay",
      desc: "Bank-grade payment rails — secure, reliable, lightning-fast.",
      badge: "Tech Partner",
    },
  ];
  return (
    <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why ABC Finance"
          title="Why choose Credit Line on UPI against Mutual Funds"
          subtitle="The smartest way to unlock liquidity — without disturbing your wealth."
        />
        <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {it.icon}
                </div>
                {it.badge && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {it.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{it.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "What is CLOU against Mutual Funds?",
      a: "Credit Line on UPI (CLOU) against Mutual Funds is a pre-approved credit limit secured by your mutual fund holdings. You pledge your funds digitally as collateral and spend the credit line via any UPI app — without redeeming your investments.",
    },
    {
      q: "Which mutual funds are eligible as collateral?",
      a: "Most equity and debt mutual funds from leading AMCs in India are eligible. Once you link your portfolio, we automatically show you the funds that qualify along with the credit limit each unlocks.",
    },
    {
      q: "How is my credit limit calculated?",
      a: "Your limit is a percentage of the current market value of your eligible mutual funds — typically up to 50% for equity and up to 80% for debt funds, subject to lender policy and a soft credit check.",
    },
    {
      q: "What happens to my mutual funds while they are pledged?",
      a: "They stay invested in your name and continue to earn market returns, dividends and NAV growth. They are simply marked as collateral with the depository — you cannot redeem them until the pledge is released.",
    },
    {
      q: "How do I spend using the credit line?",
      a: "Once activated, your credit line is linked to your preferred UPI app via Juspay. You can scan any UPI QR or pay any UPI ID — the amount is debited from your credit line, not your bank account.",
    },
    {
      q: "What is the repayment process?",
      a: "A monthly statement is generated on a fixed billing date. You can repay the full amount or opt for flexible EMIs via auto-debit, UPI or net-banking. You only pay interest on the amount actually used.",
    },
    {
      q: "Will pledging mutual funds affect my CIBIL score?",
      a: "The initial eligibility check is a soft enquiry and has no impact on your CIBIL score. Timely repayments help build your credit profile positively.",
    },
    {
      q: "Is there a processing fee?",
      a: "A nominal one-time processing fee may apply and is transparently disclosed during onboarding. There are no hidden charges, and interest is charged only on the amount you actually use.",
    },
  ];
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQs"
          title="Questions, answered"
          subtitle="Everything you need to know before getting started."
        />
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-6"
      >
        <span className="text-[14px] font-semibold text-foreground sm:text-[15px]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[13px] leading-relaxed text-muted-foreground sm:px-6 sm:text-[14px]">
          {a}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">A</span>
              </div>
              <span className="text-[15px] font-semibold text-foreground">ABC Finance</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Smarter credit for a digital India.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">About</a>
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms & Conditions</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-[12px] leading-relaxed text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Disclosure:</span> Credit services are
            facilitated in partnership with RBI-regulated lenders. CLOU is powered by Juspay.
            Investment in securities is subject to market risks. Read all documents carefully
            before availing credit.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} ABC Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-foreground sm:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}