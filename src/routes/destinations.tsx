import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { destinations, destCategories } from "@/data/site";
import { DestinationCard } from "@/components/site/Cards";
import { PageHeader, inputCls } from "@/components/site/Layout";

export const Route = createFileRoute("/destinations")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] } : {}),
  head: () => ({ meta: [{ title: "Destinations | ExploreWorld" }, { name: "description", content: "Explore Goa, Kashmir, Manali, Jaipur, Kerala, Gujarat, Mumbai and Agra." }, { property: "og:title", content: "Destinations | ExploreWorld" }, { property: "og:description", content: "Explore Goa, Kashmir, Manali, Jaipur, Kerala, Gujarat, Mumbai and Agra." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [cat, setCat] = useState("All");
  const list = destinations.filter((d) => (cat === "All" || d.category === cat) && (d.name + d.state + d.desc).toLowerCase().includes(q.toLowerCase().trim()));
  return (
    <>
      <PageHeader title="Popular Destinations" subtitle="Discover the incredible diversity of India." img={destinations[1]!.img} />
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-card md:flex-row md:items-center">
          <div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations..." className={`${inputCls} pl-10`} /></div>
          <div className="flex flex-wrap gap-2">{destCategories.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"}`}>{c}</button>)}</div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} destination{list.length !== 1 && "s"} found</p>
        {list.length ? <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
          : <div className="mt-6 rounded-2xl bg-secondary p-10 text-center"><p className="font-semibold text-primary">No destinations match your search.</p><button onClick={() => { setQ(""); setCat("All"); }} className="mt-3 text-sm font-semibold text-accent underline">Clear filters</button></div>}
      </section>
    </>
  );
}
