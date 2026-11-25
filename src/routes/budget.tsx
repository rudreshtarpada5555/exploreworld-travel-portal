import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hotel, Utensils, Bus, Package, Calculator } from "lucide-react";
import { destinations } from "@/data/site";
import { calcBudget, inr, rates } from "@/lib/budget";
import { PageHeader, inputCls, btnPrimary } from "@/components/site/Layout";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget Calculator | ExploreWorld" }, { name: "description", content: "Estimate hotel, food, transport and miscellaneous costs for your trip." }, { property: "og:title", content: "Budget Calculator | ExploreWorld" }, { property: "og:description", content: "Estimate hotel, food, transport and miscellaneous costs for your trip." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const [dest, setDest] = useState("Goa");
  const [t, setT] = useState("2");
  const [d, setD] = useState("3");
  const [err, setErr] = useState("");
  const [res, setRes] = useState<ReturnType<typeof calcBudget>>(null);
  const calc = (e: React.FormEvent) => {
    e.preventDefault();
    const tn = Number(t), dn = Number(d);
    if (!Number.isInteger(tn) || tn < 1 || tn > 50) { setRes(null); return setErr("Travellers must be a whole number between 1 and 50."); }
    if (!Number.isInteger(dn) || dn < 1 || dn > 60) { setRes(null); return setErr("Days must be a whole number between 1 and 60."); }
    setErr(""); setRes(calcBudget(dest, tn, dn));
  };
  const r = rates[dest]!;
  const rows = res ? [
    { i: Hotel, l: "Hotel", v: res.hotel, n: `${inr(r.hotel)}/room/night · 2 per room` },
    { i: Utensils, l: "Food", v: res.food, n: `${inr(r.food)}/person/day` },
    { i: Bus, l: "Transport", v: res.transport, n: `${inr(r.transport)}/person (round trip)` },
    { i: Package, l: "Miscellaneous", v: res.misc, n: "10% of above" },
  ] : [];
  return (
    <>
      <PageHeader title="Budget Calculator" subtitle="Plan smart — estimate your trip cost in seconds." img={destinations[3]!.img} />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-12 lg:grid-cols-2">
        <form onSubmit={calc} className="space-y-5 rounded-2xl bg-card p-6 shadow-card md:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><Calculator className="text-accent" />Trip details</h2>
          <label className="block text-sm font-medium">Destination<select value={dest} onChange={(e) => setDest(e.target.value)} className={`${inputCls} mt-1`}>{destinations.map((x) => <option key={x.id}>{x.name}</option>)}</select></label>
          <label className="block text-sm font-medium">Number of travellers<input type="number" value={t} onChange={(e) => setT(e.target.value)} className={`${inputCls} mt-1`} /></label>
          <label className="block text-sm font-medium">Travel days<input type="number" value={d} onChange={(e) => setD(e.target.value)} className={`${inputCls} mt-1`} /></label>
          {err && <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{err}</p>}
          <button className={`${btnPrimary} w-full`}>Calculate Budget</button>
          <p className="text-xs text-muted-foreground">Estimates use sample prices for demonstration only.</p>
        </form>
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lift md:p-8">
          {res ? (
            <div className="animate-rise">
              <h2 className="text-2xl font-bold">Estimated cost for {dest}</h2>
              <ul className="mt-6 space-y-3">{rows.map(({ i: I, l, v, n }) => (
                <li key={l} className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-3"><I className="h-5 w-5 text-accent" /><div className="flex-1"><p className="font-medium">{l}</p><p className="text-xs opacity-70">{n}</p></div><span className="font-semibold">{inr(v)}</span></li>
              ))}</ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-sky p-4"><p className="text-xs opacity-80">Total estimated cost</p><p className="text-2xl font-bold">{inr(res.total)}</p></div>
                <div className="rounded-xl bg-primary-foreground/10 p-4"><p className="text-xs opacity-80">Per person</p><p className="text-2xl font-bold">{inr(res.perPerson)}</p></div>
              </div>
            </div>
          ) : <div className="grid h-full place-items-center text-center opacity-80"><div><Calculator className="mx-auto h-12 w-12 text-accent" /><p className="mt-3">Enter your trip details and click <b>Calculate Budget</b> to see the breakdown.</p></div></div>}
        </div>
      </section>
    </>
  );
}
