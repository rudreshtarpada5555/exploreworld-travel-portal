import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Plane, Hotel, Map, Calculator, Award, Users, Heart, Clock } from "lucide-react";
import { destinations } from "@/data/site";
import { PageHeader, SectionTitle, btnPrimary } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us | ExploreWorld" }, { name: "description", content: "Learn about ExploreWorld, our mission, vision and travel services." }, { property: "og:title", content: "About Us | ExploreWorld" }, { property: "og:description", content: "Learn about ExploreWorld, our mission, vision and travel services." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});
const services = [{ i: Map, t: "Destination Guides" }, { i: Plane, t: "Holiday Packages" }, { i: Hotel, t: "Hotel Recommendations" }, { i: Calculator, t: "Budget Planning" }];
const reasons = [{ i: Award, t: "10+ years of travel expertise" }, { i: Users, t: "50,000+ happy travellers" }, { i: Heart, t: "Personalised trip planning" }, { i: Clock, t: "Round-the-clock assistance" }];

function Page() {
  return (
    <>
      <PageHeader title="About ExploreWorld" subtitle="Helping travellers discover the beauty of India since 2016." img={destinations[4]!.img} />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-16 md:grid-cols-2">
        <img src={destinations[7]!.img} alt="Taj Mahal" className="h-80 w-full rounded-2xl object-cover shadow-lift" />
        <div><p className="text-sm font-semibold uppercase tracking-widest text-accent">Who we are</p><h2 className="mt-2 text-3xl font-bold text-primary">Your gateway to unforgettable journeys</h2><p className="mt-4 text-muted-foreground">ExploreWorld is a travel and tourism portal that brings together the best destinations, holiday packages and hotels in one easy place. Whether you dream of Kashmir's valleys or Goa's beaches, we help you plan with confidence.</p><Link to="/packages" className={`${btnPrimary} mt-6`}>Browse packages</Link></div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-16 md:grid-cols-2">
        {[{ i: Target, t: "Our Mission", d: "To make travel simple, affordable and joyful for everyone by offering trusted information and well-planned experiences." }, { i: Eye, t: "Our Vision", d: "To become India's most loved travel companion, inspiring people to explore every corner of the country and the world." }].map(({ i: I, t, d }) => (
          <div key={t} className="card-lift rounded-2xl bg-card p-8"><I className="h-10 w-10 text-accent" /><h3 className="mt-4 text-2xl font-bold text-primary">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <SectionTitle eyebrow="What we offer" title="Our Services" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ i: I, t }) => <div key={t} className="card-lift rounded-2xl bg-card p-6 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-sky text-primary-foreground"><I /></span><h3 className="mt-4 font-bold text-primary">{t}</h3></div>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <SectionTitle eyebrow="Trust" title="Why Travellers Choose Us" />
        <div className="grid gap-4 sm:grid-cols-2">{reasons.map(({ i: I, t }) => <div key={t} className="flex items-center gap-4 rounded-2xl bg-secondary p-5"><I className="h-8 w-8 text-accent" /><p className="font-semibold text-primary">{t}</p></div>)}</div>
      </section>
    </>
  );
}
