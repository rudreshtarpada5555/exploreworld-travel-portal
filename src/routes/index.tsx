import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Wallet, Headphones, MapPinned, Quote, Star } from "lucide-react";
import { HERO_IMG, destinations, packages, testimonials } from "@/data/site";
import { DestinationCard, PackageCard } from "@/components/site/Cards";
import { SectionTitle, btnPrimary, btnOutline } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Explore the World, Create Memories | ExploreWorld" }, { name: "description", content: "Discover handpicked Indian destinations, travel packages and hotels with ExploreWorld." }, { property: "og:title", content: "Explore the World, Create Memories | ExploreWorld" }, { property: "og:description", content: "Discover handpicked Indian destinations, travel packages and hotels with ExploreWorld." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

const why = [
  { icon: MapPinned, t: "Handpicked Destinations", d: "Curated experiences across India's most loved places." },
  { icon: Wallet, t: "Best Value Prices", d: "Transparent estimates and plans for every budget." },
  { icon: ShieldCheck, t: "Safe & Trusted", d: "Verified hotels and reliable travel partners." },
  { icon: Headphones, t: "24/7 Support", d: "Friendly travel experts whenever you need help." },
];

function Home() {
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return setErr("Please enter a destination to search.");
    nav({ to: "/destinations", search: { q: q.trim() } });
  };
  return (
    <>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <img src={HERO_IMG} alt="Tropical beach" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto w-full max-w-7xl px-4 text-primary-foreground">
          <div className="max-w-3xl animate-rise">
            <p className="mb-4 inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-sm backdrop-blur">India's friendly travel portal</p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">Explore the World, Create Memories</h1>
            <p className="mt-5 max-w-xl text-lg opacity-90">Find breathtaking destinations, curated holiday packages and comfortable hotels — and plan your perfect trip in minutes.</p>
            <form onSubmit={go} className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-card p-2 shadow-lift sm:flex-row">
              <div className="flex flex-1 items-center gap-2 px-3 text-foreground"><Search className="h-5 w-5 text-muted-foreground" /><input value={q} onChange={(e) => { setQ(e.target.value); setErr(""); }} placeholder="Where do you want to go? e.g. Goa" className="w-full bg-transparent py-3 outline-none" /></div>
              <button className={btnPrimary}>Search</button>
            </form>
            {err && <p className="mt-2 text-sm font-medium text-destructive-foreground">⚠ {err}</p>}
            <Link to="/destinations" search={{}} className="mt-6 inline-flex rounded-full border border-primary-foreground px-6 py-3 font-semibold transition hover:bg-primary-foreground hover:text-primary">Explore Destinations →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24">
        <SectionTitle eyebrow="Top picks" title="Popular Destinations" sub="From sun-kissed beaches to snowy valleys, explore India's favourites." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{destinations.slice(0, 4).map((d) => <DestinationCard key={d.id} d={d} />)}</div>
        <div className="mt-8 text-center"><Link to="/destinations" search={{}} className={btnOutline}>View all destinations</Link></div>
      </section>

      <section className="mt-24 bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Holiday deals" title="Featured Travel Packages" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{packages.slice(0, 3).map((p) => <PackageCard key={p.id} p={p} />)}</div>
          <div className="mt-8 text-center"><Link to="/packages" className={btnPrimary}>See all packages</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24">
        <SectionTitle eyebrow="Why ExploreWorld" title="Why Choose Us" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ icon: I, t, d }) => (
            <div key={t} className="card-lift rounded-2xl bg-card p-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-sky text-primary-foreground"><I /></span>
              <h3 className="mt-4 text-lg font-bold text-primary">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24">
        <SectionTitle eyebrow="Testimonials" title="What Our Travellers Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card-lift rounded-2xl bg-card p-6">
              <Quote className="h-8 w-8 text-accent" />
              <blockquote className="mt-3 text-sm text-muted-foreground">"{t.text}"</blockquote>
              <div className="mt-4 flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-chart-4 text-chart-4" : "text-border"}`} />)}</div>
              <figcaption className="mt-2 font-semibold text-primary">{t.name} <span className="text-sm font-normal text-muted-foreground">· {t.city}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
