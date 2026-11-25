import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { packages, pkgCategories, budgets } from "@/data/site";
import { PackageCard } from "@/components/site/Cards";
import { PageHeader, inputCls } from "@/components/site/Layout";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [{ title: "Travel Packages | ExploreWorld" }, { name: "description", content: "Curated holiday packages with days, prices and facilities for every traveller." }, { property: "og:title", content: "Travel Packages | ExploreWorld" }, { property: "og:description", content: "Curated holiday packages with days, prices and facilities for every traveller." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const [b, setB] = useState(0);
  const [cat, setCat] = useState("All");
  const range = budgets[b]!;
  const list = packages.filter((p) => (cat === "All" || p.category === cat) && p.price >= range.min && p.price <= range.max);
  return (
    <>
      <PageHeader title="Travel Packages" subtitle="All-inclusive holidays designed for unforgettable journeys." img={packages[4]!.img} />
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="grid gap-4 rounded-2xl bg-card p-4 shadow-card md:grid-cols-2">
          <label className="text-sm font-medium">Budget<select value={b} onChange={(e) => setB(+e.target.value)} className={`${inputCls} mt-1`}>{budgets.map((x, i) => <option key={x.label} value={i}>{x.label}</option>)}</select></label>
          <label className="text-sm font-medium">Travel category<select value={cat} onChange={(e) => setCat(e.target.value)} className={`${inputCls} mt-1`}>{pkgCategories.map((c) => <option key={c}>{c}</option>)}</select></label>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} package{list.length !== 1 && "s"} found</p>
        {list.length ? <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PackageCard key={p.id} p={p} />)}</div>
          : <div className="mt-6 rounded-2xl bg-secondary p-10 text-center"><p className="font-semibold text-primary">No packages match these filters.</p><button onClick={() => { setB(0); setCat("All"); }} className="mt-3 text-sm font-semibold text-accent underline">Reset filters</button></div>}
      </section>
    </>
  );
}
