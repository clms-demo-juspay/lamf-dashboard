import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Info,
  ChevronDown,
  TrendingUp,
  Wallet,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Select Funds & Eligibility — ABC Finance" },
      { name: "description", content: "Select mutual funds to pledge and calculate your loan eligibility in real time." },
    ],
  }),
  component: EligibilityPage,
});

type Category = "Equity" | "Debt" | "Hybrid";

interface Fund {
  id: string;
  name: string;
  amc: string;
  amcBg: string;
  amcFg: string;
  badge: string;
  category: Category;
  nav: number;
  units: number;
  ltv: number; // 0-1
  pledgeable: boolean;
}

const FUNDS: Fund[] = [
  {
    id: "uti",
    name: "UTI Mastershare Unit Scheme Direct Growth Plan",
    amc: "UTI",
    amcBg: "#E11932",
    amcFg: "#FFFFFF",
    badge: "Large Cap Equity",
    category: "Equity",
    nav: 12.45,
    units: 3,
    ltv: 0.5,
    pledgeable: true,
  },
  {
    id: "mirae",
    name: "Mirae Asset Equity Allocator Fund of Fund Direct Plan - Growth",
    amc: "MA",
    amcBg: "#F58220",
    amcFg: "#FFFFFF",
    badge: "Hybrid",
    category: "Hybrid",
    nav: 89.72,
    units: 1571,
    ltv: 0.55,
    pledgeable: true,
  },
  {
    id: "sbi",
    name: "SBI Bluechip Fund Direct Growth",
    amc: "SBI",
    amcBg: "#22409A",
    amcFg: "#FFFFFF",
    badge: "Large Cap Equity",
    category: "Equity",
    nav: 91.15,
    units: 842,
    ltv: 0.5,
    pledgeable: true,
  },
  {
    id: "hdfc",
    name: "HDFC Balanced Advantage Fund Direct Growth",
    amc: "HDFC",
    amcBg: "#004C8F",
    amcFg: "#FFFFFF",
    badge: "Hybrid",
    category: "Hybrid",
    nav: 62.8,
    units: 1256,
    ltv: 0.6,
    pledgeable: true,
  },
  {
    id: "icici",
    name: "ICICI Prudential Technology Fund Direct Growth",
    amc: "ICICI",
    amcBg: "#B02A30",
    amcFg: "#FFFFFF",
    badge: "Sectoral Equity",
    category: "Equity",
    nav: 214.3,
    units: 425,
    ltv: 0.45,
    pledgeable: true,
  },
  {
    id: "nippon",
    name: "Nippon India Small Cap Fund Direct Growth",
    amc: "NIP",
    amcBg: "#D71920",
    amcFg: "#FFFFFF",
    badge: "Small Cap Equity",
    category: "Equity",
    nav: 186.75,
    units: 680,
    ltv: 0.4,
    pledgeable: true,
  },
  {
    id: "kotak",
    name: "Kotak Corporate Bond Fund Direct Growth",
    amc: "KTK",
    amcBg: "#ED1C24",
    amcFg: "#FFFFFF",
    badge: "Debt Fund",
    category: "Debt",
    nav: 48.2,
    units: 2350,
    ltv: 0.75,
    pledgeable: true,
  },
  {
    id: "axis-elss",
    name: "Axis Long Term Equity Fund Direct Growth",
    amc: "AXIS",
    amcBg: "#AE1140",
    amcFg: "#FFFFFF",
    badge: "ELSS",
    category: "Equity",
    nav: 42.35,
    units: 1240,
    ltv: 0,
    pledgeable: false,
  },
  {
    id: "dsp-elss",
    name: "DSP Tax Saver Fund Direct Growth",
    amc: "DSP",
    amcBg: "#0047BB",
    amcFg: "#FFFFFF",
    badge: "ELSS",
    category: "Equity",
    nav: 18.65,
    units: 2680,
    ltv: 0,
    pledgeable: false,
  },
  {
    id: "absl-elss",
    name: "Aditya Birla Sun Life Tax Relief 96 Direct Growth",
    amc: "ABSL",
    amcBg: "#E31837",
    amcFg: "#FFFFFF",
    badge: "ELSS",
    category: "Equity",
    nav: 38.9,
    units: 850,
    ltv: 0,
    pledgeable: false,
  },
];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const inr2 = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);

type FilterKey = "All" | Category;
type SortKey = "value" | "loan" | "name";

function EligibilityPage() {
  const navigate = useNavigate();
  // selection state: id -> pledged units
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");
  const [sort, setSort] = useState<SortKey>("value");
  const [calculated, setCalculated] = useState(false);

  const totals = useMemo(() => {
    let portfolio = 0;
    let drawing = 0;
    for (const f of FUNDS) {
      const v = f.nav * f.units;
      portfolio += v;
      if (f.pledgeable) drawing += v * f.ltv;
    }
    return { portfolio, drawing };
  }, []);

  const visible = useMemo(() => {
    let arr = FUNDS.filter((f) => filter === "All" || f.category === filter).filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase()),
    );
    arr = [...arr].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "loan") return b.nav * b.units * b.ltv - a.nav * a.units * a.ltv;
      return b.nav * b.units - a.nav * a.units;
    });
    return arr;
  }, [query, filter, sort]);

  const summary = useMemo(() => {
    let pledgeValue = 0;
    let loan = 0;
    let count = 0;
    for (const f of FUNDS) {
      if (!f.pledgeable) continue;
      const u = selected[f.id] ?? 0;
      if (u > 0) {
        count += 1;
        pledgeValue += u * f.nav;
        loan += u * f.nav * f.ltv;
      }
    }
    return { pledgeValue, loan, count };
  }, [selected]);

  const toggleSelect = (f: Fund, on: boolean) => {
    if (!f.pledgeable) return;
    setSelected((s) => {
      const next = { ...s };
      if (on) next[f.id] = f.units;
      else delete next[f.id];
      return next;
    });
    setExpanded((e) => ({ ...e, [f.id]: on }));
    setCalculated(false);
  };

  const setUnits = (f: Fund, u: number) => {
    if (!f.pledgeable) return;
    const clamped = Math.max(0, Math.min(f.units, Math.floor(u)));
    setSelected((s) => {
      const next = { ...s };
      if (clamped === 0) delete next[f.id];
      else next[f.id] = clamped;
      return next;
    });
    setCalculated(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32 font-sans antialiased">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page title */}
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
            Loan Against Mutual Funds
          </h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Select the mutual funds you want to pledge and calculate your eligible loan amount instantly.
          </p>
        </div>

        {/* Portfolio Summary */}
        <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-primary">
                    RS
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">Rahul Sharma</p>
                    <p className="text-[12px] text-muted-foreground">
                      PAN: <span className="font-medium tracking-wider text-foreground">ABCPS1234K</span>
                    </p>
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                <CheckCircle2 className="h-3 w-3" />
                Verified via MF Central
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Kpi
                icon={<Wallet className="h-4 w-4" />}
                label="Total Portfolio Value"
                value={inr(totals.portfolio)}
              />
              <Kpi
                icon={<TrendingUp className="h-4 w-4" />}
                label="Eligible Drawing Power"
                value={inr(totals.drawing)}
                accent
              />
              <Kpi
                icon={<Layers className="h-4 w-4" />}
                label="Number of Funds"
                value={String(FUNDS.length)}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              <p className="text-[13px] font-medium text-foreground">Pledge Summary</p>
            </div>
            <div className="mt-4 space-y-3">
              <Row label="Selected Funds" value={`${summary.count} of ${FUNDS.filter((f) => f.pledgeable).length} pledgeable`} />
              <Row label="Pledge Value" value={inr(summary.pledgeValue)} />
              <div className="h-px bg-border" />
              <Row label="Eligible Loan" value={inr(summary.loan)} strong />
              <Row
                label="Remaining Unpledged"
                value={inr(totals.portfolio - summary.pledgeValue)}
                muted
              />
              <Row
                label="Non-Pledgeable (ELSS Lock-in)"
                value={`${FUNDS.filter((f) => !f.pledgeable).length} funds`}
                muted
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-6 rounded-xl border border-border bg-card p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mutual funds"
                className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-border bg-secondary p-0.5">
                {(["All", "Equity", "Debt", "Hybrid"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setFilter(k === "All" ? "All" : (k as Category))}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
                      filter === k
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k === "All" ? "All Funds" : k}
                  </button>
                ))}
              </div>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none rounded-lg border border-input bg-card py-2 pl-3 pr-8 text-[12px] font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="value">Sort: Highest Value</option>
                  <option value="loan">Sort: Highest Loan Eligibility</option>
                  <option value="name">Sort: Fund Name</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* Fund list */}
        <section className="mt-4 space-y-3">
          {visible.length === 0 ? (
            <EmptyState />
          ) : (
            visible.map((f) => (
              <FundCard
                key={f.id}
                fund={f}
                selectedUnits={selected[f.id] ?? 0}
                expanded={!!expanded[f.id]}
                onToggleExpand={() =>
                  setExpanded((e) => ({ ...e, [f.id]: !e[f.id] }))
                }
                onToggleSelect={(on) => toggleSelect(f, on)}
                onUnitsChange={(u) => setUnits(f, u)}
              />
            ))
          )}
        </section>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            <BarStat label="Selected Funds" value={String(summary.count)} />
            <BarStat label="Total Pledge Value" value={inr(summary.pledgeValue)} />
            <BarStat label="Eligible Loan Amount" value={inr(summary.loan)} accent />
          </div>
          <button
            disabled={summary.count === 0}
            onClick={() => {
              if (!calculated) {
                setCalculated(true);
                return;
              }
              const payload = FUNDS.filter((f) => (selected[f.id] ?? 0) > 0).map((f) => ({
                id: f.id,
                name: f.name,
                amc: f.amc,
                amcBg: f.amcBg,
                amcFg: f.amcFg,
                nav: f.nav,
                units: selected[f.id] ?? 0,
                ltv: f.ltv,
              }));
              try {
                sessionStorage.setItem("lamf:selection", JSON.stringify(payload));
              } catch {}
              navigate({ to: "/review" });
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            {calculated ? "Proceed to Create Pledge" : "Confirm Final Eligibility"}
            <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={accent ? "text-primary" : "text-muted-foreground"}>{icon}</span>
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p
        className={`mt-2 text-[20px] font-semibold tabular-nums ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span
        className={`text-[13px] tabular-nums ${
          strong ? "text-[15px] font-semibold text-primary" : muted ? "text-muted-foreground" : "font-medium text-foreground"
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
        className={`mt-0.5 truncate text-[15px] font-semibold tabular-nums sm:text-[17px] ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CategoryBadge({ category, label }: { category: Category; label: string }) {
  const styles: Record<Category, string> = {
    Equity: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    Debt: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Hybrid: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${styles[category]}`}>
      {label}
    </span>
  );
}

function FundCard({
  fund,
  selectedUnits,
  expanded,
  onToggleExpand,
  onToggleSelect,
  onUnitsChange,
}: {
  fund: Fund;
  selectedUnits: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleSelect: (on: boolean) => void;
  onUnitsChange: (u: number) => void;
}) {
  const marketValue = fund.nav * fund.units;
  const eligibleLoan = marketValue * fund.ltv;
  const isSelected = selectedUnits > 0;
  const pledgeValue = selectedUnits * fund.nav;
  const pledgeLoan = pledgeValue * fund.ltv;
  const pledgeable = fund.pledgeable;

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-card transition-shadow ${
        isSelected && pledgeable
          ? "border-primary/40 shadow-[0_0_0_1px_rgba(37,99,235,0.15)]"
          : "border-border shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
      } ${!pledgeable ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-start gap-3 sm:flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            disabled={!pledgeable}
            onChange={(e) => pledgeable && onToggleSelect(e.target.checked)}
            className={`mt-1 h-4 w-4 rounded border-input accent-primary ${
              !pledgeable ? "cursor-not-allowed opacity-40" : "cursor-pointer"
            }`}
          />
          <AmcLogo fund={fund} disabled={!pledgeable} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className={`line-clamp-2 text-[14px] font-medium sm:line-clamp-1 ${pledgeable ? "text-foreground" : "text-muted-foreground"}`}>
                {fund.name}
              </p>
              {!pledgeable && (
                <span
                  title="ELSS (Equity Linked Savings Scheme) funds have a mandatory 3-year lock-in period from the date of investment. They cannot be pledged during this period."
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border"
                >
                  <Lock className="h-3 w-3" />
                  Cannot Pledge
                </span>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              <CategoryBadge category={fund.category} label={fund.badge} />
              <span>NAV {inr2(fund.nav)}</span>
              <span>•</span>
              <span>{fund.units.toLocaleString("en-IN")} units available</span>
              {!pledgeable && (
                <>
                  <span>•</span>
                  <span className="text-destructive">3-year lock-in active</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid flex-shrink-0 grid-cols-3 gap-4 sm:gap-6">
          <Cell label="Market Value" value={inr(marketValue)} muted={!pledgeable} />
          <Cell
            label={
              <span className="inline-flex items-center gap-1">
                LTV
                {pledgeable && (
                  <span title="Loan-to-Value: maximum percentage of fund value lendable per RBI guidelines.">
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </span>
                )}
              </span>
            }
            value={pledgeable ? `${Math.round(fund.ltv * 100)}%` : "—"}
            muted={!pledgeable}
          />
          <Cell label="Eligible Loan" value={pledgeable ? inr(eligibleLoan) : "—"} accent={pledgeable} muted={!pledgeable} />
        </div>

        {pledgeable ? (
          <button
            onClick={onToggleExpand}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center self-end rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:self-center"
            aria-label="Expand"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        ) : (
          <div
            title="ELSS funds are locked-in for 3 years and cannot be pledged."
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center self-end rounded-md border border-border sm:self-center"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {pledgeable && expanded && (
        <div className="border-t border-border bg-secondary/30 px-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
            <div>
              <label className="text-[12px] font-medium text-foreground">Quantity to Pledge</label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={fund.units}
                  value={selectedUnits === 0 ? "" : selectedUnits}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/^0+(?=\d)/, "");
                    onUnitsChange(raw === "" ? 0 : Number(raw));
                  }}
                  className="w-28 rounded-lg border border-input bg-card px-3 py-2 text-[13px] tabular-nums text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-[11px] text-muted-foreground">/ {fund.units.toLocaleString("en-IN")} units</span>
                <button
                  onClick={() => onUnitsChange(fund.units)}
                  className="ml-auto rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-accent"
                >
                  Max
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={fund.units}
                step={1}
                value={selectedUnits}
                onChange={(e) => onUnitsChange(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat label="Pledge Value" value={inr(pledgeValue)} />
              <MiniStat label="Eligible Loan" value={inr(pledgeLoan)} accent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Cell({
  label,
  value,
  accent,
  muted,
}: {
  label: React.ReactNode;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="min-w-[88px]">
      <p className={`text-[11px] font-medium uppercase tracking-wide ${muted ? "text-muted-foreground/60" : "text-muted-foreground"}`}>{label}</p>
      <p
        className={`mt-0.5 text-[14px] font-semibold tabular-nums ${
          accent ? "text-primary" : muted ? "text-muted-foreground/60" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold tabular-nums ${accent ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return _EmptyState();
}

function AmcLogo({ fund, disabled }: { fund: Fund; disabled?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tracking-tight shadow-sm ring-1 ring-black/5 ${disabled ? "grayscale opacity-50" : ""}`}
      style={{ backgroundColor: fund.amcBg, color: fund.amcFg }}
      aria-label={`${fund.amc} logo`}
    >
      {fund.amc}
    </div>
  );
}

function _EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Layers className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-foreground">
        No eligible mutual funds available for pledge.
      </h3>
      <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">
        Only approved mutual fund schemes can be used for loan eligibility assessment.
      </p>
    </div>
  );
}