import { createFileRoute } from "@tanstack/react-router";
import { hotels } from "@/data/site";
import { HotelCard } from "@/components/site/Cards";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/hotels")({
  head: () => ({ meta: [{ title: "Hotels | ExploreWorld" }, { name: "description", content: "Sample hotels in India's top tourist destinations with facilities and estimated prices." }, { property: "og:title", content: "Hotels | ExploreWorld" }, { property: "og:description", content: "Sample hotels in India's top tourist destinations with facilities and estimated prices." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageHeader title="Handpicked Hotels" subtitle="Comfortable stays in India's most popular destinations." img={hotels[0]!.img} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-12 sm:grid-cols-2 lg:grid-cols-3">{hotels.map((h) => <HotelCard key={h.id} h={h} />)}</section>
    </>
  ),
});
