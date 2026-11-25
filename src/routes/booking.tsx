import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { destinations, packages, HERO_IMG } from "@/data/site";
import { PageHeader, inputCls, btnPrimary, btnOutline } from "@/components/site/Layout";

export const Route = createFileRoute("/booking")({
  validateSearch: (s: Record<string, unknown>): { dest?: string; pkg?: string } => ({
    ...(typeof s["dest"] === "string" ? { dest: s["dest"] } : {}),
    ...(typeof s["pkg"] === "string" ? { pkg: s["pkg"] } : {}),
  }),
  head: () => ({ meta: [{ title: "Book Your Trip | ExploreWorld" }, { name: "description", content: "Fill in your travel details to create a demo booking request." }, { property: "og:title", content: "Book Your Trip | ExploreWorld" }, { property: "og:description", content: "Fill in your travel details to create a demo booking request." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

type F = { name: string; email: string; phone: string; dest: string; date: string; travellers: string; pkg: string };
function validate(f: F) {
  const e: Partial<Record<keyof F, string | undefined>> = {};
  if (f.name.trim().length < 3) e.name = "Please enter your full name (min 3 characters).";
  else if (!/^[a-zA-Z .]+$/.test(f.name.trim())) e.name = "Name can contain letters and spaces only.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";
  if (!f.dest) e.dest = "Please select a destination.";
  const today = new Date().toISOString().slice(0, 10);
  if (!f.date) e.date = "Please choose a travel date."; else if (f.date < today) e.date = "Travel date cannot be in the past.";
  const n = Number(f.travellers);
  if (!Number.isInteger(n) || n < 1 || n > 20) e.travellers = "Travellers must be between 1 and 20.";
  if (!f.pkg) e.pkg = "Please select a package.";
  return e;
}

function Page() {
  const s = Route.useSearch();
  const empty: F = { name: "", email: "", phone: "", dest: s.dest ?? "", date: "", travellers: "1", pkg: s.pkg ?? "" };
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<Partial<Record<keyof F, string | undefined>>>({});
  const [done, setDone] = useState<{ id: string; f: F } | null>(null);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); };
  const pkgOpts = packages.filter((p) => !f.dest || p.dest === f.dest);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(f); setErr(v);
    if (Object.keys(v).length === 0) setDone({ id: "EW" + Math.floor(100000 + Math.random() * 900000), f });
  };
  const field = (k: keyof F, label: string, el: React.ReactNode) => (
    <label className="block text-sm font-medium text-primary">{label}<div className="mt-1">{el}</div>{err[k] && <p className="mt-1 text-xs text-destructive">{err[k]}</p>}</label>
  );
  return (
    <>
      <PageHeader title="Book Your Trip" subtitle="A few details and your dream holiday is one step closer." img={HERO_IMG} />
      <section className="mx-auto max-w-3xl px-4 pt-12">
        {done ? (
          <div className="animate-rise rounded-2xl bg-card p-8 text-center shadow-lift">
            <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
            <h2 className="mt-4 text-3xl font-bold text-primary">Booking Request Received!</h2>
            <p className="mt-2 text-muted-foreground">Thank you, {done.f.name}. This is a demo confirmation — no data has been saved.</p>
            <dl className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3 rounded-xl bg-secondary p-5 text-left text-sm">
              <dt className="text-muted-foreground">Reference</dt><dd className="font-semibold">{done.id}</dd>
              <dt className="text-muted-foreground">Destination</dt><dd className="font-semibold">{done.f.dest}</dd>
              <dt className="text-muted-foreground">Package</dt><dd className="font-semibold">{done.f.pkg}</dd>
              <dt className="text-muted-foreground">Travel date</dt><dd className="font-semibold">{done.f.date}</dd>
              <dt className="text-muted-foreground">Travellers</dt><dd className="font-semibold">{done.f.travellers}</dd>
            </dl>
            <div className="mt-6 flex justify-center gap-3"><button onClick={() => { setDone(null); setF({ ...empty, dest: "", pkg: "" }); }} className={btnOutline}>New booking</button><Link to="/" className={btnPrimary}>Back to Home</Link></div>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="grid gap-5 rounded-2xl bg-card p-6 shadow-card md:grid-cols-2 md:p-8">
            <h2 className="text-2xl font-bold text-primary md:col-span-2">Travel Booking Form</h2>
            {field("name", "Full Name", <input className={inputCls} value={f.name} onChange={set("name")} placeholder="e.g. Dhruvi Patel" maxLength={60} />)}
            {field("email", "Email", <input type="email" className={inputCls} value={f.email} onChange={set("email")} placeholder="you@example.com" maxLength={100} />)}
            {field("phone", "Phone", <input type="tel" className={inputCls} value={f.phone} onChange={set("phone")} placeholder="10-digit mobile number" maxLength={10} />)}
            {field("dest", "Destination", <select className={inputCls} value={f.dest} onChange={(e) => { setF({ ...f, dest: e.target.value, pkg: "" }); setErr({ ...err, dest: undefined }); }}><option value="">Select destination</option>{destinations.map((d) => <option key={d.id}>{d.name}</option>)}</select>)}
            {field("date", "Travel Date", <input type="date" className={inputCls} value={f.date} onChange={set("date")} />)}
            {field("travellers", "Number of Travellers", <input type="number" min={1} max={20} className={inputCls} value={f.travellers} onChange={set("travellers")} />)}
            <div className="md:col-span-2">{field("pkg", "Package", <select className={inputCls} value={f.pkg} onChange={set("pkg")}><option value="">Select package</option>{pkgOpts.map((p) => <option key={p.id}>{p.title}</option>)}<option>Custom Package</option></select>)}</div>
            {Object.values(err).some(Boolean) && <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive md:col-span-2">Please correct the highlighted fields.</p>}
            <button className={`${btnPrimary} md:col-span-2`}>Submit Booking</button>
          </form>
        )}
      </section>
    </>
  );
}
